'use client';

import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box3, Vector3, Group } from 'three';
import { useKeyboard } from '@/hooks/useKeyboard';
import { createAIContext, updateAI, AIContext, AIPose } from '@/systems/characterAI';
import { ZONES } from '@/data/zones';
import { Html, useGLTF } from '@react-three/drei';
import { assetPath } from '@/utils/basePath';
import { useGameStore } from '@/stores/gameStore';

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

const INTERACTION_ANCHORS: Record<string, { position: [number, number, number]; rotationY: number }> = {
  // Bed runs along Z. Keep the robot centered on the mattress with its head
  // toward the pillow/headboard and a fixed orientation independent of approach.
  bed: { position: [4.5, 0, 3.72], rotationY: 0 },
  // Couch has one intended sitting direction. Do not inherit the user's
  // approach angle when entering the interaction.
  couch: { position: [0, 0, 3], rotationY: 0 },
  // Face the coffee station in the lounge.
  lounge: { position: [3.0, 0, 1.5], rotationY: 0 },
};

function RobotModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const modelMetrics = useMemo(() => {
    const clone = scene.clone();
    clone.updateWorldMatrix(true, true);
    const box = new Box3().setFromObject(clone);
    return { centerY: (box.min.y + box.max.y) / 2 };
  }, [scene]);

  return (
    <primitive
      object={scene.clone()}
      scale={[1, 1, 1]}
      position={[0, -modelMetrics.centerY, 0]}
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
      <mesh castShadow><cylinderGeometry args={[0.055, 0.045, 0.1, 12]} /><meshStandardMaterial color="#ffffff" roughness={0.45} /></mesh>
      <mesh position={[0.065, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.028, 0.008, 8, 16]} /><meshStandardMaterial color="#ffffff" roughness={0.45} /></mesh>
      {[0, 1, 2].map((i) => <mesh key={i} position={[(i - 1) * 0.025, 0.095 + i * 0.018, 0]}><sphereGeometry args={[0.012, 8, 8]} /><meshStandardMaterial color="#d7f7ff" emissive="#8eeeff" emissiveIntensity={0.4} transparent opacity={0.55} /></mesh>)}
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

  const { setCharacterPosition, setCharacterRotation, setCurrentAnimation, controlMode, setControlMode, updateLastInputTime } = useGameStore();

  useFrame((_, delta) => {
    if (!meshRef.current || !bodyRef.current) return;

    const { controlMode, lastInputTime, isInteracting, currentZone } = useGameStore.getState();
    const { forward, backward, left, right, mobileX, mobileZ } = keys.current;
    const hasMobileInput = Math.abs(mobileX) > 0.1 || Math.abs(mobileZ) > 0.1;
    const isUserInput = forward || backward || left || right || hasMobileInput;

    if (isInteracting && currentZone && INTERACTION_POSES[currentZone] && activeInteraction.current !== currentZone) {
      const anchor = INTERACTION_ANCHORS[currentZone] || {
        position: ZONES.find((zone) => zone.id === currentZone)?.interactionPoint ?? [0, 0, 0],
        rotationY: meshRef.current.rotation.y,
      };

      meshRef.current.position.set(anchor.position[0], anchor.position[1], anchor.position[2]);
      velocityRef.current.set(0, 0, 0);
      targetRotation.current = anchor.rotationY;
      meshRef.current.rotation.y = anchor.rotationY;
      bodyRef.current.rotation.set(0, 0, 0);
      bodyRef.current.position.set(0, 0.95, 0);
      setPose(INTERACTION_POSES[currentZone]);
      activeInteraction.current = currentZone;
    }

    if (!isInteracting && activeInteraction.current) activeInteraction.current = null;

    const storePos = useGameStore.getState().characterPosition;
    const meshPos = meshRef.current.position;
    if (Math.abs(storePos[0] - meshPos.x) > 2 || Math.abs(storePos[2] - meshPos.z) > 2) {
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
    } else if (controlMode === 'user' && !isInteracting) {
      const direction = new Vector3();
      if (forward) direction.z -= 1;
      if (backward) direction.z += 1;
      if (left) direction.x -= 1;
      if (right) direction.x += 1;
      if (hasMobileInput) { direction.x += mobileX; direction.z += mobileZ; }
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
      const charPos: [number, number, number] = [meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z];
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

    let targetRotX = 0;
    const targetRotZ = 0;
    let targetPosY = 0.95;
    let targetBodyZ = 0;

    if (pose === 'sleep') {
      // Sleep flat on the mattress, aligned with the bed's Z axis.
      targetRotX = -Math.PI / 2;
      targetPosY = 0.95;
      targetBodyZ = 0;
    } else if (pose === 'sit') {
      // Sit into the couch without changing the fixed furniture-facing direction.
      targetRotX = -0.12;
      targetPosY = 0.68;
      targetBodyZ = 0.12;
    } else if (pose === 'typing') {
      targetPosY = 0.87;
    } else if (pose === 'coffee') {
      targetRotX = 0.16;
      targetPosY = 0.9;
    } else if (pose === 'phone') {
      targetRotX = 0.18;
    } else if (pose === 'examining') {
      targetRotX = -0.1;
    }

    bodyRef.current.rotation.x += (targetRotX - bodyRef.current.rotation.x) * 4 * delta;
    bodyRef.current.rotation.z += (targetRotZ - bodyRef.current.rotation.z) * 4 * delta;
    bodyRef.current.position.y += (targetPosY - bodyRef.current.position.y) * 4 * delta;
    bodyRef.current.position.z += (targetBodyZ - bodyRef.current.position.z) * 4 * delta;

    const isActivityPose = ['sleep', 'sit', 'typing', 'phone', 'coffee', 'examining'].includes(pose);
    if (isActivityPose) velocityRef.current.set(0, 0, 0);

    const newPos = meshRef.current.position.clone().add(velocityRef.current);
    newPos.x = Math.max(ROOM_BOUNDS.minX, Math.min(ROOM_BOUNDS.maxX, newPos.x));
    newPos.z = Math.max(ROOM_BOUNDS.minZ, Math.min(ROOM_BOUNDS.maxZ, newPos.z));
    meshRef.current.position.copy(newPos);

    if (!['sleep', 'sit', 'typing'].includes(pose)) {
      const diff = targetRotation.current - meshRef.current.rotation.y;
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

    setCharacterPosition([meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z]);
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
          <div className="rounded-full border border-cyan-300 bg-white/90 px-3 py-1 text-xs font-medium text-cyan-700 shadow-[0_0_10px_rgba(0,200,255,0.2)] backdrop-blur-sm">{label}</div>
        </Html>
      )}
    </group>
  );
}
