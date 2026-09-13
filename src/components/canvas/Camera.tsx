'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useGameStore } from '@/stores/gameStore';

const WORLD_SCALE = 1.22;
const LERP_FACTOR = 0.05;
const INTRO_DURATION = 2200;
const CAMERA_BOUNDS = {
  minX: -10,
  maxX: 10,
  minZ: -9,
  maxZ: 12,
  minY: 0.4,
  maxY: 8,
};

function clampCamera(pos: Vector3): Vector3 {
  pos.x = Math.max(CAMERA_BOUNDS.minX, Math.min(CAMERA_BOUNDS.maxX, pos.x));
  pos.y = Math.max(CAMERA_BOUNDS.minY, Math.min(CAMERA_BOUNDS.maxY, pos.y));
  pos.z = Math.max(CAMERA_BOUNDS.minZ, Math.min(CAMERA_BOUNDS.maxZ, pos.z));
  return pos;
}

export function FollowCamera() {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  const introStarted = useRef(performance.now());
  const introComplete = useRef(false);

  useFrame(() => {
    const now = performance.now();
    const introElapsed = now - introStarted.current;

    if (!introComplete.current && introElapsed < INTRO_DURATION) {
      const progress = Math.min(1, introElapsed / INTRO_DURATION);
      const ease = progress * progress * (3 - 2 * progress);
      const introPosition = new Vector3(0, 8.2 - ease * 2.8, 11.5 - ease * 2.5);
      camera.position.lerp(introPosition, 0.12);
      const introLookAt = new Vector3(0, 0, 0);
      targetLookAt.current.lerp(introLookAt, 0.12);
      camera.lookAt(targetLookAt.current);
      if (progress >= 1) introComplete.current = true;
      return;
    }

    const { characterPosition } = useGameStore.getState();
    const charPos = new Vector3(...characterPosition).multiplyScalar(WORLD_SCALE);

    const offset = new Vector3(0, 4.8, 5.8).multiplyScalar(WORLD_SCALE);
    const desiredPos = clampCamera(charPos.clone().add(offset));

    targetPosition.current.lerp(desiredPos, LERP_FACTOR);
    camera.position.copy(targetPosition.current);

    const lookAt = charPos.clone().add(new Vector3(0, -0.8, -1).multiplyScalar(WORLD_SCALE));
    targetLookAt.current.lerp(lookAt, LERP_FACTOR);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
