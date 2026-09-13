'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Group } from 'three';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useGameStore } from '@/stores/gameStore';
import { createAIContext, updateAI, AIContext, AIPose } from '@/systems/characterAI';
import { Html, useGLTF } from '@react-three/drei';
import { assetPath } from '@/utils/basePath';

const MOVE_SPEED = 3;
const AI_MOVE_SPEED = 2;
const ROTATION_SPEED = 8;
const AI_RETURN_DELAY = 10000;

const ROOM_BOUNDS = {
  minX: -6,
  maxX: 6,
  minZ: -5.5,
  maxZ: 5.5,
};

const MODEL_PATH = assetPath('/models/character/scene.gltf');

function RobotModel() {
  const { scene } = useGLTF(MODEL_PATH);
  return (
    <primitive
      object={scene.clone()}
      scale={[1.0, 1.0, 1.0]}
      position={[0, 0.95, 0]}
      castShadow
    />
  );
}

useGLTF.preload(MODEL_PATH);

const POSE_LABELS: Record<AIPose, string> = {
  idle: '',
  walk: '',
  sleep: '💤 Sleeping...',
  sit: '💻 Coding...',
  typing: '⌨️ Working...',
  phone: '📱 Checking phone...',
  coffee: '☕ Drinking coffee...',
  examining: '🔍 Examining...',
};

export function Character() {
  const meshRef = useRef<Group>(null);
  const bodyRef = useRef<Group>(null);
  const velocityRef = useRef(new Vector3());
  const targetRotation = useRef(0);
  const aiContext = useRef<AIContext>(createAIContext());
  const keys = useKeyboard();
  const [bobPhase, setBobPhase] = useState(0);
  const [pose, setPose] = useState<AIPose>('idle');

  const {
    setCharacterPosition,
    setCharacterRotation,
    setCurrentAnimation,
    controlMode,
    setControlMode,
    updateLastInputTime,
  } = useGameStore();

  useFrame((_, delta) => {
    if (!meshRef.current || !bodyRef.current) return;

    const { controlMode, lastInputTime, isInteracting } = useGameStore.getState();

    const { forward, backward, left, right, mobileX, mobileZ } = keys.current;
    const hasMobileInput = Math.abs(mobileX) > 0.1 || Math.abs(mobileZ) > 0.1;
    const isUserInput = forward || backward || left || right || hasMobileInput;

    // Teleport: sync position from store if teleported
    const storePos = useGameStore.getState().characterPosition;
    const meshPos = meshRef.current.position;
    const dx = Math.abs(storePos[0] - meshPos.x);
    const dz = Math.abs(storePos[2] - meshPos.z);
    if (dx > 2 || dz > 2) {
      meshRef.current.position.set(storePos[0], 0, storePos[2]);
      velocityRef.current.set(0, 0, 0);
    }

    // User takes over from AI
    if (isUserInput && controlMode === 'ai') {
      setControlMode('user');
      updateLastInputTime();
      setPose('idle');
    }

    if (isUserInput) {
      updateLastInputTime();
    }

    // Return to AI after inactivity
    if (controlMode === 'user' && !isUserInput && Date.now() - lastInputTime > AI_RETURN_DELAY) {
      setControlMode('ai');
      aiContext.current = createAIContext();
    }

    let isMoving = false;

    if (controlMode === 'user' && !isInteracting) {
      // User control (keyboard + mobile joystick)
      const direction = new Vector3();
      if (forward) direction.z -= 1;
      if (backward) direction.z += 1;
      if (left) direction.x -= 1;
      if (right) direction.x += 1;

      if (hasMobileInput) {
        direction.x += mobileX;
        direction.z += mobileZ;
      }

      if (direction.length() > 0) {
        direction.normalize();
        targetRotation.current = Math.atan2(direction.x, direction.z);
        velocityRef.current.lerp(direction.multiplyScalar(MOVE_SPEED * delta), 0.2);
        isMoving = true;
        setPose('walk');
      } else {
        velocityRef.current.lerp(new Vector3(), 0.2);
        setPose('idle');
      }
    } else if (controlMode === 'ai' && !isInteracting) {
      // AI control
      const charPos: [number, number, number] = [
        meshRef.current.position.x,
        meshRef.current.position.y,
        meshRef.current.position.z,
      ];

      const result = updateAI(aiContext.current, charPos, delta);
      aiContext.current = result.ctx;
      setPose(result.pose);

      if (result.moveDirection) {
        const dir = new Vector3(result.moveDirection[0], 0, result.moveDirection[2]);
        targetRotation.current = Math.atan2(dir.x, dir.z);
        velocityRef.current.lerp(dir.multiplyScalar(AI_MOVE_SPEED * delta), 0.15);
        isMoving = true;
      } else {
        velocityRef.current.lerp(new Vector3(), 0.15);
      }
    } else {
      velocityRef.current.lerp(new Vector3(), 0.2);
    }

    // Apply pose transforms to body
    let targetRotX = 0;
    let targetRotZ = 0;
    let targetPosY = 0;
    if (pose === 'sleep') {
      targetRotZ = Math.PI / 2;
      targetPosY = 0.35;
    } else if (pose === 'sit' || pose === 'typing') {
      targetPosY = -0.15;
    } else if (pose === 'coffee') {
      targetRotX = 0.15;
    } else if (pose === 'phone') {
      targetRotX = 0.2;
    } else if (pose === 'examining') {
      targetRotX = -0.1;
    }

    bodyRef.current.rotation.x += (targetRotX - bodyRef.current.rotation.x) * 3 * delta;
    bodyRef.current.rotation.z += (targetRotZ - bodyRef.current.rotation.z) * 3 * delta;
    bodyRef.current.position.y += (targetPosY - bodyRef.current.position.y) * 3 * delta;

    // Don't move during activities
    const isActivityPose = pose === 'sleep' || pose === 'sit' || pose === 'typing' || pose === 'phone' || pose === 'coffee' || pose === 'examining';
    if (isActivityPose) {
      velocityRef.current.set(0, 0, 0);
      isMoving = false;
    }

    // Apply movement with bounds
    const newPos = meshRef.current.position.clone().add(velocityRef.current);
    newPos.x = Math.max(ROOM_BOUNDS.minX, Math.min(ROOM_BOUNDS.maxX, newPos.x));
    newPos.z = Math.max(ROOM_BOUNDS.minZ, Math.min(ROOM_BOUNDS.maxZ, newPos.z));
    meshRef.current.position.copy(newPos);

    // Smooth rotation (don't rotate while sleeping or sitting)
    if (pose !== 'sleep' && pose !== 'sit' && pose !== 'typing') {
      const currentRotY = meshRef.current.rotation.y;
      const diff = targetRotation.current - currentRotY;
      const wrappedDiff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
      meshRef.current.rotation.y += wrappedDiff * ROTATION_SPEED * delta;
    }

    // Bob animation when walking
    if (isMoving) {
      setBobPhase((prev) => prev + delta * 12);
      meshRef.current.position.y = Math.abs(Math.sin(bobPhase)) * 0.03;
      setCurrentAnimation('walk');
    } else {
      meshRef.current.position.y = 0;
      setCurrentAnimation(pose);
    }

    setCharacterPosition([
      meshRef.current.position.x,
      meshRef.current.position.y,
      meshRef.current.position.z,
    ]);
    setCharacterRotation(meshRef.current.rotation.y);
  });

  const label = POSE_LABELS[pose];

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <group ref={bodyRef}>
        <RobotModel />
      </group>

      {/* Activity status bubble */}
      {label && controlMode === 'ai' && (
        <Html position={[0, 1.2, 0]} center distanceFactor={5} style={{ pointerEvents: 'none' }}>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,200,255,0.2)] text-xs font-medium text-cyan-700 whitespace-nowrap border border-cyan-300">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}
