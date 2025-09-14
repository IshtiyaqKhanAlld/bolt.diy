// app/genx/core/GenXRootInterceptor.tsx
import React, { useEffect, useRef, useState } from 'react';
import { GenXDOMManipulator } from './GenXDOMManipulator';
import { GenXStyleInjector } from '../styling/GenXStyleInjector';
import { GenXEventInterceptor } from '../events/GenXEventInterceptor';
import { GenXAPIProxy } from '../api/GenXAPIProxy';
import { GenXFlexibleLayout } from '../layout/GenXFlexibleLayout';

const GenXLoadingScreen = () => (
  <div className="genx-loading-screen">
    <div>Loading GenX.code...</div>
  </div>
);

interface GenXConfig {
  branding: {
    name: string;
    colors: Record<string, string>;
    fonts: string[];
    logo?: string;
  };
  features: Record<string, boolean>;
  layout: {
    addSidebar?: boolean;
    addTopBar?: boolean;
    addBottomBar?: boolean;
    customPanels?: Array<{
      position: 'left' | 'right' | 'top' | 'bottom' | 'floating';
      component: React.ComponentType;
    }>;
  };
  overrides: {
    css?: string;
    components?: Record<string, React.ComponentType>;
    functions?: Record<string, Function>;
  };
}

export const GenXRootInterceptor: React.FC<{
  children: React.ReactNode;
  config: GenXConfig;
  originalApp: React.ComponentType;
}> = ({ children, config, originalApp: OriginalApp }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Initialize all interceptors
    GenXStyleInjector.inject(config.branding, config.overrides.css);
    // GenXDOMManipulator.initialize(containerRef.current, config);
    GenXDOMManipulator.initialize();
    GenXEventInterceptor.initialize(config);
    GenXAPIProxy.initialize(config.overrides.functions);
    
    setIsReady(true);
    
    return () => {
      // Cleanup interceptors
      GenXStyleInjector.cleanup();
      GenXDOMManipulator.cleanup();
      GenXEventInterceptor.cleanup();
      GenXAPIProxy.cleanup();
    };
  }, [config]);

  if (!isReady) {
    return <GenXLoadingScreen />;
  }

  return (
    <div ref={containerRef} className="genx-root-container" data-genx="true">
      {/* Flexible Layout System */}
      <GenXFlexibleLayout config={config.layout}>
        {/* Core App - Completely Untouched */}
        <div className="genx-core-app-container">
          <OriginalApp />
          {children}
        </div>
      </GenXFlexibleLayout>
    </div>
  );
};