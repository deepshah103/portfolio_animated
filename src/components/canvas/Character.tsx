'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useGameStore } from '@/stores/gameStore';

const MOVE_SPEED = 3;
const ROTATION_SPEED = 8;
const AI_RETURN_DELAY = 10000;

const ROOM_BOUNDS = {
  minX: -9,
  maxX: 9,
  minZ: -9,
  maxZ: 9,
};

export function Character() {
  const meshRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(new Vector3());
  const targetRotation = useRef(0);
  const keys = useKeyboard();
  const [bobPhase, setBobPhase] = useState(0);

  const {
    setCharacterPosition,
    setCharacterRotation,
    setCurrentAnimation,
    controlMode,
    setControlMode,
    updateLastInputTime,
    lastInputTime,
  } = useGameStore();

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const { forward, backward, left, right } = keys.current;
    const isMoving = forward || backward || left || right;

    if (isMoving && controlMode === 'ai') {
      setControlMode('user');
      updateLastInputTime();
    }

    if (isMoving) {
      updateLastInputTime();
    }

    if (controlMode === 'user' && !isMoving && Date.now() - lastInputTime > AI_RETURN_DELAY) {
      setControlMode('ai');
    }

    if (controlMode === 'user') {
      const direction = new Vector3();

      if (forward) direction.z -= 1;
      if (backward) direction.z += 1;
      if (left) direction.x -= 1;
      if (right) direction.x += 1;

      if (direction.length() > 0) {
        direction.normalize();
        targetRotation.current = Math.atan2(direction.x, direction.z);

        velocityRef.current.lerp(
          direction.multiplyScalar(MOVE_SPEED * delta),
          0.2
        );
      } else {
        velocityRef.current.lerp(new Vector3(), 0.2);
      }
    } else {
      velocityRef.current.lerp(new Vector3(), 0.1);
    }

    const newPos = meshRef.current.position.clone().add(velocityRef.current);
    newPos.x = Math.max(ROOM_BOUNDS.minX, Math.min(ROOM_BOUNDS.maxX, newPos.x));
    newPos.z = Math.max(ROOM_BOUNDS.minZ, Math.min(ROOM_BOUNDS.maxZ, newPos.z));
    meshRef.current.position.copy(newPos);

    const currentRotY = meshRef.current.rotation.y;
    const diff = targetRotation.current - currentRotY;
    const wrappedDiff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
    meshRef.current.rotation.y += wrappedDiff * ROTATION_SPEED * delta;

    if (isMoving) {
      setBobPhase((prev) => prev + delta * 10);
      meshRef.current.position.y = Math.abs(Math.sin(bobPhase)) * 0.05;
      setCurrentAnimation('walk');
    } else {
      meshRef.current.position.y = 0;
      setCurrentAnimation('idle');
    }

    setCharacterPosition([
      meshRef.current.position.x,
      meshRef.current.position.y,
      meshRef.current.position.z,
    ]);
    setCharacterRotation(meshRef.current.rotation.y);
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.6, 8, 16]} />
        <meshStandardMaterial color="#3a6ea5" roughness={0.7} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#f5c6a0" roughness={0.8} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.7, -0.02]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.9} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.35, 0.9, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
        <meshStandardMaterial color="#3a6ea5" roughness={0.7} />
      </mesh>
      <mesh position={[0.35, 0.9, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
        <meshStandardMaterial color="#3a6ea5" roughness={0.7} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.1, 0.3, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 8]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.7} />
      </mesh>
      <mesh position={[0.1, 0.3, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 8]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.7} />
      </mesh>

      {/* Forward direction indicator */}
      <mesh position={[0, 1.55, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#f0b090" roughness={0.8} />
      </mesh>
    </group>
  );
}
