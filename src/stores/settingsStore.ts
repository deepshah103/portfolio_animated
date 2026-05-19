import { create } from 'zustand';
import { QualityTier, QualitySettings, detectQualityTier, getQualitySettings } from '@/utils/deviceDetection';

interface SettingsState {
  qualityTier: QualityTier;
  settings: QualitySettings;
  initialized: boolean;
  initQuality: () => void;
  setQualityTier: (tier: QualityTier) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  qualityTier: 'high',
  settings: {
    shadows: true,
    postProcessing: true,
    particles: true,
    particleCount: 200,
    shadowMapSize: 2048,
    pixelRatio: 2,
  },
  initialized: false,
  initQuality: () => {
    const tier = detectQualityTier();
    const settings = getQualitySettings(tier);
    set({ qualityTier: tier, settings, initialized: true });
  },
  setQualityTier: (tier) => {
    const settings = getQualitySettings(tier);
    set({ qualityTier: tier, settings });
  },
}));
