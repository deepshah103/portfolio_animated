'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useGameStore } from '@/stores/gameStore';

const LERP_FACTOR = 0.05;
const CAMERA_BOUNDS = {
  minX: -7,
  maxX: 7,
  minZ: -6,
  maxZ: 8,
  minY: 0.3,
  maxY: 5,
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

  useFrame(() => {
    const { characterPosition } = useGameStore.getState();

    const charPos = new Vector3(...characterPosition);

    const offset = new Vector3(0, 5, 5);
    const desiredPos = clampCamera(charPos.clone().add(offset));

    targetPosition.current.lerp(desiredPos, LERP_FACTOR);
    camera.position.copy(targetPosition.current);

    const lookAt = charPos.clone().add(new Vector3(0, -0.5, -1));
    targetLookAt.current.lerp(lookAt, LERP_FACTOR);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
