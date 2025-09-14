
import React from 'react';

export interface GenXBranding {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    border: string;
    [key: string]: string; // Allow additional color properties
  };
  fonts: string[];
  logo?: string;
}

export interface GenXFeatures {
  analytics: boolean;
  autoSave: boolean;
  formValidation: boolean;
  keyboardShortcuts: boolean;
  commandPalette: boolean;
  aiAssistant: boolean;
  [key: string]: boolean; // Allow additional feature flags
}

export interface GenXCustomPanel {
  position: 'left' | 'right' | 'top' | 'bottom' | 'floating';
  component: React.ComponentType<any>;
  id?: string;
  title?: string;
}

export interface GenXLayout {
  addSidebar?: boolean;
  addTopBar?: boolean;
  addBottomBar?: boolean;
  customPanels?: GenXCustomPanel[];
}

export interface GenXOverrides {
  css?: string;
  functions?: {
    [key: string]: (original: Function, ...args: any[]) => any;
  };
  components?: {
    [key: string]: React.ComponentType<any>;
  };
}

export interface GenXConfig {
  branding: GenXBranding;
  features: GenXFeatures;
  layout: GenXLayout;
  overrides: GenXOverrides;
}