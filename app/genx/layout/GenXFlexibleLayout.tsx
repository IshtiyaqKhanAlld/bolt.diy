// app/genx/layout/GenXFlexibleLayout.tsx
import React from 'react';
import { GenXBottomBar } from '../components/GenXPanels';
import { GenXTopBar } from '../components/GenXPanels';
import { GenXSidebar } from '../components/GenXPanels';

interface LayoutConfig {
  addSidebar?: boolean;
  addTopBar?: boolean;
  addBottomBar?: boolean;
  customPanels?: Array<{
    position: 'left' | 'right' | 'top' | 'bottom' | 'floating';
    component: React.ComponentType;
  }>;
}

export const GenXFlexibleLayout: React.FC<{
  children: React.ReactNode;
  config: LayoutConfig;
}> = ({ children, config }) => {
  const renderPanel = (panel: any, index: number) => {
    const PanelComponent = panel.component;
    
    return (
      <div key={index} className={`genx-panel genx-panel-${panel.position}`}>
        <PanelComponent />
      </div>
    );
  };

  return (
    <div className="genx-app-container">
      {/* Top Bar */}
      {config.addTopBar && (
        <div className="genx-top-bar">
          <GenXTopBar />
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="genx-main-layout">
        {/* Sidebar */}
        {config.addSidebar && (
          <div className="genx-sidebar-container">
            <GenXSidebar />
          </div>
        )}
        
        {/* Core App Content */}
        <div className="genx-content-wrapper">
          {children}
        </div>
        
        {/* Right Panels */}
        <div className="genx-right-panels">
          {config.customPanels
            ?.filter(p => p.position === 'right')
            .map(renderPanel)}
        </div>
      </div>
      
      {/* Bottom Bar */}
      {config.addBottomBar && (
        <div className="genx-bottom-bar">
          <GenXBottomBar />
        </div>
      )}
      
      {/* Floating Panels */}
      <div className="genx-floating-panels">
        {config.customPanels
          ?.filter(p => p.position === 'floating')
          .map(renderPanel)}
      </div>
    </div>
  );
};