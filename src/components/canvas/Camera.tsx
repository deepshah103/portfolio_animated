'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useGameStore } from '@/stores/gameStore';

const LERP_FACTOR = 0.05;
const CAMERA_BOUNDS = {
  minX: -9.5,
  maxX: 9.5,
  minZ: -9.5,
  maxZ: 9.5,
  minY: 0.5,
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

  useFrame(() => {
    const { characterPosition, characterRotation } = useGameStore.getState();

    const charPos = new Vector3(...characterPosition);

    // Camera behind, at character eye level, farther back to see full body
    const offset = new Vector3(0, 1.5, 7);
    offset.applyAxisAngle(new Vector3(0, 1, 0), characterRotation);
    const desiredPos = clampCamera(charPos.clone().add(offset));

    targetPosition.current.lerp(desiredPos, LERP_FACTOR);
    camera.position.copy(targetPosition.current);

    // Look at character feet/ground level so legs are always in frame
    const lookAt = charPos.clone().add(new Vector3(0, 0.5, 0));
    targetLookAt.current.lerp(lookAt, LERP_FACTOR);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
