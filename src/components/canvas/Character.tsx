'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Group } from 'three';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useGameStore } from '@/stores/gameStore';
import { createAIContext, updateAI, AIContext, AIPose } from '@/systems/characterAI';
import { ZONES } from '@/data/zones';
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

const INTERACTION_POSES: Record<string, AIPose> = {
  bed: 'sleep',
  couch: 'sit',
  lounge: 'coffee',
};

const INTERACTION_ROTATIONS: Record<string, number> = {
  bed: 0,
  couch: Math.PI,
  lounge: -Math.PI / 2,
};

function RobotModel() {
  const { scene } = useGLTF(MODEL_PATH);
  return (
    <primitive
      object={scene.clone()}
      scale={[1.0, 1.0, 1.0]}
      position={[0, 0.32, 0]}
      castShadow
    />
  );
}

useGLTF.preload(MODEL_PATH);

const POSE_LABELS: Record<AIPose, string> = {
  idle: '',
  walk: '',
  sleep: '💤 Sleeping...',
  sit: '🛋️ Relaxing...',
  typing: '⌨️ Working...',
  phone: '📱 Checking phone...',
  coffee: '☕ Having coffee...',
  examining: '🔍 Examining...',
};

function CoffeeMug() {
  return (
    <group position={[0.42, 0.58, 0.12]} rotation={[0.15, 0, -0.08]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.055, 0.045, 0.1, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.45} />
      </mesh>
      <mesh position={[0.065, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.028, 0.008, 8, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.45} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.025, 0.095 + i * 0.018, 0]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#d7f7ff" emissive="#8eeeff" emissiveIntensity={0.4} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export function Character() {
  const meshRef = useRef<Group>(null);
  const bodyRef = useRef<Group>(null);
  const velocityRef = useRef(new Vector3());
  const targetRotation = useRef(0);
  const aiContext = useRef<AIContext>(createAIContext());
  const activeInteraction = useRef<string | null>(null);
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

    const { controlMode, lastInputTime, isInteracting, currentZone } = useGameStore.getState();
    const { forward, backward, left, right, mobileX, mobileZ } = keys.current;
    const hasMobileInput = Math.abs(mobileX) > 0.1 || Math.abs(mobileZ) > 0.1;
    const isUserInput = forward || backward || left || right || hasMobileInput;

    // Furniture interaction: snap to the interaction point and commit to a
    // dedicated pose while E/interaction mode is active.
    if (isInteracting && currentZone && INTERACTION_POSES[currentZone] && activeInteraction.current !== currentZone) {
      const targetZone = ZONES.find((zone) => zone.id === currentZone);
      if (targetZone) {
        meshRef.current.position.set(targetZone.interactionPoint[0], 0, targetZone.interactionPoint[2]);
        velocityRef.current.set(0, 0, 0);
        targetRotation.current = INTERACTION_ROTATIONS[currentZone] ?? 0;
        meshRef.current.rotation.y = targetRotation.current;
        setPose(INTERACTION_POSES[currentZone]);
        activeInteraction.current = currentZone;
      }
    }

    if (!isInteracting && activeInteraction.current) activeInteraction.current = null;

    const storePos = useGameStore.getState().characterPosition;
    const meshPos = meshRef.current.position;
    const dx = Math.abs(storePos[0] - meshPos.x);
    const dz = Math.abs(storePos[2] - meshPos.z);
    if (dx > 2 || dz > 2) {
      meshRef.current.position.set(storePos[0], 0, storePos[2]);
      velocityRef.current.set(0, 0, 0);
    }

    if (isUserInput && controlMode === 'ai') {
      setControlMode('user');
      updateLastInputTime();
      setPose('idle');
    }

    if (isUserInput) updateLastInputTime();

    if (controlMode === 'user' && !isUserInput && !isInteracting && Date.now() - lastInputTime > AI_RETURN_DELAY) {
      setControlMode('ai');
      aiContext.current = createAIContext();
    }

    let isMoving = false;

    if (isInteracting && currentZone && INTERACTION_POSES[currentZone]) {
      velocityRef.current.lerp(new Vector3(), 0.35);
      setPose(INTERACTION_POSES[currentZone]);
      isMoving = false;
    } else if (controlMode === 'user' && !isInteracting) {
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

    // Furniture pose transforms.
    let targetRotX = 0;
    const targetRotZ = pose === 'sleep' ? Math.PI / 2 : 0;
    let targetPosY = 0;

    if (pose === 'sleep') {
      // Lay the robot along the bed, with the body center safely above the mattress.
      targetPosY = 0.45;
    } else if (pose === 'sit') {
      // Lower and lean the robot back into the couch.
      targetRotX = -0.35;
      targetPosY = -0.05;
    } else if (pose === 'typing') {
      targetPosY = -0.08;
    } else if (pose === 'coffee') {
      targetRotX = 0.18;
      targetPosY = -0.02;
    } else if (pose === 'phone') {
      targetRotX = 0.2;
    } else if (pose === 'examining') {
      targetRotX = -0.1;
    }

    bodyRef.current.rotation.x += (targetRotX - bodyRef.current.rotation.x) * 4 * delta;
    bodyRef.current.rotation.z += (targetRotZ - bodyRef.current.rotation.z) * 4 * delta;
    bodyRef.current.position.y += (targetPosY - bodyRef.current.position.y) * 4 * delta;

    const isActivityPose = pose === 'sleep' || pose === 'sit' || pose === 'typing' || pose === 'phone' || pose === 'coffee' || pose === 'examining';
    if (isActivityPose) {
      velocityRef.current.set(0, 0, 0);
      isMoving = false;
    }

    const newPos = meshRef.current.position.clone().add(velocityRef.current);
    newPos.x = Math.max(ROOM_BOUNDS.minX, Math.min(ROOM_BOUNDS.maxX, newPos.x));
    newPos.z = Math.max(ROOM_BOUNDS.minZ, Math.min(ROOM_BOUNDS.maxZ, newPos.z));
    meshRef.current.position.copy(newPos);

    if (pose !== 'sleep' && pose !== 'sit' && pose !== 'typing') {
      const currentRotY = meshRef.current.rotation.y;
      const diff = targetRotation.current - currentRotY;
      const wrappedDiff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
      meshRef.current.rotation.y += wrappedDiff * ROTATION_SPEED * delta;
    }

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
        {pose === 'coffee' && <CoffeeMug />}
      </group>

      {label && (controlMode === 'ai' || useGameStore.getState().isInteracting) && (
        <Html position={[0, 1.2, 0]} center distanceFactor={5} style={{ pointerEvents: 'none', zIndex: 10 }}>
          <div className="rounded-full border border-cyan-300 bg-white/90 px-3 py-1 text-xs font-medium text-cyan-700 shadow-[0_0_10px_rgba(0,200,255,0.2)] backdrop-blur-sm">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}
