'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useGameStore } from '@/stores/gameStore';

const LERP_FACTOR = 0.05;

export function FollowCamera() {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  const cameraOffset = useRef(new Vector3(0, 4, 6));
  const lookOffset = useRef(new Vector3(0, 1.2, 0));

  useFrame(() => {
    const { characterPosition, characterRotation } = useGameStore.getState();

    const charPos = new Vector3(...characterPosition);

    const offset = cameraOffset.current.clone();
    offset.applyAxisAngle(new Vector3(0, 1, 0), characterRotation);
    const desiredPos = charPos.clone().add(offset);

    targetPosition.current.lerp(desiredPos, LERP_FACTOR);
    camera.position.copy(targetPosition.current);

    const lookAt = charPos.clone().add(lookOffset.current);
    targetLookAt.current.lerp(lookAt, LERP_FACTOR);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
