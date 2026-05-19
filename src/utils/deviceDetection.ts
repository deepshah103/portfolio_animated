export type QualityTier = 'high' | 'medium' | 'low';

export function detectQualityTier(): QualityTier {
  if (typeof window === 'undefined') return 'high';

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) return 'low';

  const glContext = gl as WebGLRenderingContext;
  const debugInfo = glContext.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo
    ? glContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
    : '';

  // Check for mobile/integrated GPUs
  const isLowEnd =
    /intel|mesa|swiftshader|llvmpipe|microsoft basic/i.test(renderer) ||
    navigator.hardwareConcurrency <= 2 ||
    (window.screen.width * window.devicePixelRatio) < 1280;

  const isMidRange =
    navigator.hardwareConcurrency <= 4 ||
    /mali|adreno|apple gpu/i.test(renderer);

  if (isLowEnd) return 'low';
  if (isMidRange) return 'medium';
  return 'high';
}

export interface QualitySettings {
  shadows: boolean;
  postProcessing: boolean;
  particles: boolean;
  particleCount: number;
  shadowMapSize: number;
  pixelRatio: number;
}

export function getQualitySettings(tier: QualityTier): QualitySettings {
  switch (tier) {
    case 'high':
      return {
        shadows: true,
        postProcessing: true,
        particles: true,
        particleCount: 200,
        shadowMapSize: 2048,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      };
    case 'medium':
      return {
        shadows: true,
        postProcessing: false,
        particles: true,
        particleCount: 100,
        shadowMapSize: 1024,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
      };
    case 'low':
      return {
        shadows: false,
        postProcessing: false,
        particles: false,
        particleCount: 0,
        shadowMapSize: 512,
        pixelRatio: 1,
      };
  }
}
