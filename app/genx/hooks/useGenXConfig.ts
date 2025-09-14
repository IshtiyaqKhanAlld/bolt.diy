// =============================================================================
// app/genx/hooks/useGenXConfig.ts - React Hook for Configuration
// =============================================================================

import { useState, useEffect } from 'react';
import type { GenXConfig, GenXFeatures, GenXBranding } from '../types/genx.types';
import { GENX_CONFIG } from '../config/genx.config';
import { createGenXConfig } from '../config/genx.utils';

export const useGenXConfig = (initialConfig: GenXConfig = GENX_CONFIG) => {
  const [config, setConfig] = useState<GenXConfig>(initialConfig);
  
  const updateConfig = (updates: Partial<GenXConfig>) => {
    setConfig(prev => createGenXConfig({ ...prev, ...updates }));
  };
  
  const toggleFeature = (feature: keyof GenXFeatures) => {
    setConfig(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };
  
  const updateBranding = (branding: Partial<GenXBranding>) => {
    setConfig(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        ...branding,
        colors: {
          ...prev.branding.colors,
          ...branding.colors
        }
      }
    }));
  };
  
  return {
    config,
    updateConfig,
    toggleFeature,
    updateBranding
  };
};