// =============================================================================
// MINIMAL GENX REBRAND - Only Name, Logo, Favicon Changes
// =============================================================================

// =============================================================================
// 1. UPDATE: app/genx/config/genx.config.ts - Minimal Changes Only
// =============================================================================

import React from 'react';
import type { GenXConfig } from '../types/genx.types';

export const GENX_CONFIG: GenXConfig = {
  branding: {
    name: 'GenX.code',
    // Keep original colors - NO CHANGES
    colors: {
      primary: '#8A5FFF',      // Original bolt purple
      secondary: '#1389fd',    // Original bolt blue  
      accent: '#803cef',       // Original bolt accent
      background: '#0a0a0a',   // Keep dark
      surface: '#1a1a1a',     // Keep surface
      text: '#ffffff',         // Keep white text
      border: '#333333'        // Keep borders
    },
    // Keep original fonts - NO CHANGES
    fonts: ['Inter', 'system-ui', 'sans-serif'],
    logo: '/genx-logo.svg'
  },
  features: {
    // DISABLE all new features - keep original functionality
    analytics: false,
    autoSave: false,
    formValidation: false,
    keyboardShortcuts: false,
    commandPalette: false,
    aiAssistant: false
  },
  layout: {
    // DISABLE all layout changes - keep original layout
    addSidebar: false,
    addTopBar: false,
    addBottomBar: false,
    customPanels: [] // No new panels
  },
  overrides: {
    // MINIMAL CSS - Only logo and name changes
    css: `
      /* Only override document title and favicon */
      head title {
        content: "GenX.code" !important;
      }
      
      /* Keep all original styling - no visual changes */
      /* This ensures 100% visual compatibility */
    `,
    functions: {
      // Override console.log to show GenX branding in dev tools
      'console.log': (original: Function, ...args: any[]) => {
        original('[GenX.code]', ...args);
      }
    }
  }
};

// import React from 'react';
// import type { GenXConfig } from '../types/genx.types';
// import {
//   GenXAIAssistant,
//   GenXQuickActions,
//   GenXSidebar,
//   GenXTopBar,
//   GenXBottomBar
// } from '../components/GenXPanels';

// export const GENX_CONFIG: GenXConfig = {
//   branding: {
//     name: 'GenX.code',
//     colors: {
//       primary: '#00ff94',
//       secondary: '#0099ff',
//       accent: '#ff0099',
//       background: '#0a0a0a',
//       surface: '#1a1a1a',
//       text: '#ffffff',
//       border: '#333333'
//     },
//     fonts: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
//     logo: '/genx-logo.svg'
//   },
//   features: {
//     analytics: true,
//     autoSave: true,
//     formValidation: true,
//     keyboardShortcuts: true,
//     commandPalette: true,
//     aiAssistant: true
//   },
//   layout: {
//     addSidebar: true,
//     addTopBar: true,
//     addBottomBar: true,
//     customPanels: [
//       {
//         position: 'right',
//         component: GenXAIAssistant,
//         id: 'ai-assistant',
//         title: 'AI Assistant'
//       },
//       {
//         position: 'floating',
//         component: GenXQuickActions,
//         id: 'quick-actions',
//         title: 'Quick Actions'
//       }
//     ]
//   },
//   overrides: {
//     css: `
//       /* GenX Enhanced Styles */
//       .genx-enhanced-background {
//         background: linear-gradient(135deg, var(--genx-background), var(--genx-surface));
//       }
      
//       .genx-panel-header {
//         padding: 12px 16px;
//         border-bottom: 1px solid var(--genx-border);
//         background: var(--genx-surface);
//       }
      
//       .genx-panel-header h3,
//       .genx-panel-header h4 {
//         margin: 0;
//         color: var(--genx-text);
//         font-size: 14px;
//         font-weight: 600;
//       }
      
//       .genx-panel-content {
//         padding: 16px;
//       }
      
//       .genx-ai-input,
//       .genx-search-input {
//         width: 100%;
//         padding: 8px 12px;
//         border: 1px solid var(--genx-border);
//         border-radius: 6px;
//         background: var(--genx-background);
//         color: var(--genx-text);
//         font-family: inherit;
//       }
      
//       .genx-action-grid {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         gap: 8px;
//       }
      
//       .genx-action-button {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         gap: 4px;
//         padding: 12px 8px;
//         border: 1px solid var(--genx-border);
//         border-radius: 6px;
//         background: var(--genx-surface);
//         color: var(--genx-text);
//         cursor: pointer;
//         transition: all 0.2s ease;
//       }
      
//       .genx-action-button:hover {
//         background: var(--genx-primary);
//         color: var(--genx-background);
//         transform: translateY(-1px);
//       }
      
//       .genx-action-icon {
//         font-size: 16px;
//       }
      
//       .genx-action-label {
//         font-size: 10px;
//         font-weight: 500;
//       }
//     `,
//     functions: {
//       'console.log': (original: Function, ...args: any[]) => {
//         original('[GenX]', ...args);
//       }
//     },
//     components: {
//       // You can override specific components here if needed
//       // 'Header': CustomGenXHeader,
//       // 'Chat': CustomGenXChat,
//     }
//   }
// };