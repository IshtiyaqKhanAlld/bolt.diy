// =============================================================================
// app/genx/config/genx.utils.ts - Configuration Utilities
// =============================================================================
import { GENX_CONFIG } from './genx.config';
import type { GenXConfig, GenXFeatures, GenXBranding } from '../types/genx.types';
export const createGenXConfig = (overrides: Partial<GenXConfig> = {}): GenXConfig => {
  return {
    ...GENX_CONFIG,
    ...overrides,
    branding: {
      ...GENX_CONFIG.branding,
      ...overrides.branding,
      colors: {
        ...GENX_CONFIG.branding.colors,
        ...overrides.branding?.colors
      }
    },
    features: {
      ...GENX_CONFIG.features,
      ...overrides.features
    },
    layout: {
      ...GENX_CONFIG.layout,
      ...overrides.layout
    },
    overrides: {
      ...GENX_CONFIG.overrides,
      ...overrides.overrides
    }
  };
};

// // Example usage for customization:
// export const createCustomGenXConfig = () => {
//   return createGenXConfig({
//     branding: {
//       name: 'My Custom GenX',
//       colors: {
//         primary: '#ff6b35', // Custom orange
//         accent: '#4ecdc4'   // Custom teal
//       }
//     },
//     features: {
//       analytics: false,   // Disable analytics
//       aiAssistant: true   // Keep AI assistant
//     }
//   });
// };