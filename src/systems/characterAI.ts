import { ZONES } from '@/data/zones';

export type AIState = 'idle' | 'navigating' | 'performing';
export type AIPose = 'walk' | 'idle' | 'sleep' | 'sit' | 'phone' | 'coffee' | 'typing' | 'examining';

export interface AIContext {
  state: AIState;
  targetZone: string | null;
  targetPosition: [number, number, number] | null;
  stateTimer: number;
  idleDuration: number;
  activityDuration: number;
  currentPose: AIPose;
}

const ZONE_POSES: Record<string, AIPose> = {
  'bed': 'sleep',
  'coding-desk': 'sit',
  'workstation': 'typing',
  'phone-dock': 'phone',
  'lounge': 'coffee',
  'whiteboard': 'examining',
  'ai-corner': 'typing',
  'data-dashboard': 'examining',
  'bookshelf': 'examining',
  'skill-shelf': 'examining',
};

export function createAIContext(): AIContext {
  return {
    state: 'idle',
    targetZone: null,
    targetPosition: null,
    stateTimer: 0,
    idleDuration: 1 + Math.random() * 2,
    activityDuration: 8 + Math.random() * 15,
    currentPose: 'idle',
  };
}

export function pickRandomZone(currentZoneId: string | null): typeof ZONES[0] {
  const available = ZONES.filter((z) => z.id !== currentZoneId);
  return available[Math.floor(Math.random() * available.length)];
}

export function updateAI(
  ctx: AIContext,
  characterPosition: [number, number, number],
  delta: number
): { ctx: AIContext; moveDirection: [number, number, number] | null; pose: AIPose } {
  const newCtx = { ...ctx };
  newCtx.stateTimer += delta;

  switch (newCtx.state) {
    case 'idle': {
      if (newCtx.stateTimer >= newCtx.idleDuration) {
        const zone = pickRandomZone(newCtx.targetZone);
        newCtx.state = 'navigating';
        newCtx.targetZone = zone.id;
        newCtx.targetPosition = zone.interactionPoint;
        newCtx.stateTimer = 0;
      }
      return { ctx: newCtx, moveDirection: null, pose: 'idle' };
    }

    case 'navigating': {
      if (!newCtx.targetPosition) {
        newCtx.state = 'idle';
        newCtx.stateTimer = 0;
        return { ctx: newCtx, moveDirection: null, pose: 'idle' };
      }

      const dx = newCtx.targetPosition[0] - characterPosition[0];
      const dz = newCtx.targetPosition[2] - characterPosition[2];
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < 0.5) {
        newCtx.state = 'performing';
        newCtx.stateTimer = 0;
        newCtx.currentPose = ZONE_POSES[newCtx.targetZone || ''] || 'idle';

        // Duration based on activity
        if (newCtx.currentPose === 'sleep') {
          newCtx.activityDuration = 15 + Math.random() * 20;
        } else if (newCtx.currentPose === 'sit' || newCtx.currentPose === 'typing') {
          newCtx.activityDuration = 12 + Math.random() * 18;
        } else if (newCtx.currentPose === 'coffee') {
          newCtx.activityDuration = 6 + Math.random() * 8;
        } else {
          newCtx.activityDuration = 8 + Math.random() * 12;
        }

        return { ctx: newCtx, moveDirection: null, pose: newCtx.currentPose };
      }

      const nx = dx / dist;
      const nz = dz / dist;
      return { ctx: newCtx, moveDirection: [nx, 0, nz], pose: 'walk' };
    }

    case 'performing': {
      if (newCtx.stateTimer >= newCtx.activityDuration) {
        newCtx.state = 'idle';
        newCtx.stateTimer = 0;
        newCtx.idleDuration = 1 + Math.random() * 2;
        newCtx.currentPose = 'idle';
      }
      return { ctx: newCtx, moveDirection: null, pose: newCtx.currentPose };
    }
  }
}
