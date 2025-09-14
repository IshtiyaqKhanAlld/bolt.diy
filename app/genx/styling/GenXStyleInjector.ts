
// app/genx/core/styling/GenXStyleInjector.ts
export class GenXStyleInjector {
  private static styleElements: HTMLStyleElement[] = [];
  private static observer: MutationObserver | null = null;
  
  // This is called from GenXRootInterceptor when app starts
  static inject(branding: any, customCSS?: string) {
    console.log('[GenX] Injecting styles and overrides...');
    
    // STEP 1: Generate base GenX styles that override everything
    const baseStyles = this.generateBaseStyles(branding);
    this.injectStyles('genx-base-overrides', baseStyles);
    
    // STEP 2: Inject custom CSS overrides
    if (customCSS) {
      this.injectStyles('genx-custom-overrides', customCSS);
    }
    
    // STEP 3: Start watching for new DOM elements and apply overrides
    this.startDynamicOverrideWatching(branding);
  }
  
  // =============================================================================
  // 2. BASE STYLE GENERATION - Override ALL existing styles + FIXED LAYOUT
  // =============================================================================
  
  private static generateBaseStyles(branding: any): string {
    return `
      /* =================================================================== */
      /* GENX GLOBAL OVERRIDES - These override ALL existing styles */
      /* =================================================================== */
      
      /* Override ALL CSS custom properties used by the app */
      :root {
        /* GenX Color Variables */
        ${Object.entries(branding.colors)
          .map(([key, value]) => `--genx-${key}: ${value};`)
          .join('\n        ')}
        
        /* Override Original App Variables with GenX Colors */
        --bolt-elements-background-depth-1: var(--genx-background) !important;
        --bolt-elements-bg-depth-1: var(--genx-background) !important;
        --bolt-elements-textPrimary: var(--genx-text) !important;
        --bolt-elements-borderColor: var(--genx-border) !important;
        --bolt-elements-border: var(--genx-border) !important;
        --bolt-elements-artifacts-background: var(--genx-surface) !important;
        --bolt-elements-artifacts-backgroundHover: var(--genx-primary) !important;
        --bolt-elements-artifacts-borderColor: var(--genx-border) !important;
        --bolt-elements-textSecondary: var(--genx-text) !important;
        --bolt-elements-ring: var(--genx-primary) !important;
        
        /* Override theme colors */
        --primary-color: var(--genx-primary) !important;
        --secondary-color: var(--genx-secondary) !important;
        --accent-color: var(--genx-accent) !important;
        
        /* Override scrollbar colors */
        --modern-scrollbar-thumb-background: var(--genx-primary) !important;
        --modern-scrollbar-thumb-backgroundHover: var(--genx-accent) !important;
      }
      
      /* =================================================================== */
      /* FONT OVERRIDES - Change ALL fonts to GenX fonts */
      /* =================================================================== */
      
      *, *::before, *::after {
        font-family: ${branding.fonts.join(', ')} !important;
      }
      
      /* Specific font overrides for different elements */
      body, html {
        font-family: ${branding.fonts.join(', ')} !important;
        background: var(--genx-background) !important;
        color: var(--genx-text) !important;
      }
      
      /* =================================================================== */
      /* COMPONENT OVERRIDES - Override specific app components */
      /* =================================================================== */
      
      /* Header Overrides */
      header {
        background: rgba(0, 0, 0, 0.9) !important;
        backdrop-filter: blur(20px) !important;
        border-bottom: 1px solid var(--genx-border) !important;
      }
      
      /* Logo area styling */
      .z-logo a {
        background: linear-gradient(45deg, var(--genx-primary), var(--genx-secondary));
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }
      
      /* Chat area overrides */
      .flex.flex-col.h-full.w-full.bg-bolt-elements-background-depth-1 {
        background: linear-gradient(135deg, var(--genx-background), var(--genx-surface)) !important;
      }
      
      /* Button overrides */
      button {
        transition: all 0.3s ease !important;
      }
      
      button:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba(0, 255, 148, 0.3) !important;
      }
      
      /* Input field overrides */
      input, textarea {
        background: var(--genx-surface) !important;
        border-color: var(--genx-border) !important;
        color: var(--genx-text) !important;
      }
      
      input:focus, textarea:focus {
        border-color: var(--genx-primary) !important;
        box-shadow: 0 0 0 2px rgba(0, 255, 148, 0.2) !important;
      }
      
      /* =================================================================== */
      /* FIXED GENX LAYOUT - Clean Flexbox Layout */
      /* =================================================================== */
      
      .genx-app-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background: var(--genx-background);
        position: relative;
        z-index: 999;
      }

      /* Top Bar */
      .genx-top-bar {
        height: 60px;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--genx-border);
        display: flex;
        align-items: center;
        padding: 0 20px;
        z-index: 1000;
        flex-shrink: 0;
      }

      /* Main Layout */
      .genx-main-layout {
        display: flex;
        flex: 1;
        overflow: hidden;
      }

      /* Sidebar */
      .genx-sidebar-container {
        width: 280px;
        background: var(--genx-surface);
        border-right: 1px solid var(--genx-border);
        overflow-y: auto;
        flex-shrink: 0;
      }

      /* Content Wrapper - This is where original app goes */
      .genx-content-wrapper {
        flex: 1;
        background: var(--genx-background);
        overflow: hidden;
        position: relative;
      }

      /* Right Panels */
      .genx-right-panels {
        width: 350px;
        background: var(--genx-surface);
        border-left: 1px solid var(--genx-border);
        overflow-y: auto;
        flex-shrink: 0;
      }

      /* Bottom Bar */
      .genx-bottom-bar {
        height: 30px;
        background: var(--genx-surface);
        border-top: 1px solid var(--genx-border);
        display: flex;
        align-items: center;
        padding: 0 20px;
        font-size: 12px;
        flex-shrink: 0;
      }

      /* Floating Panels */
      .genx-floating-panels {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 2000;
        pointer-events: none;
      }

      .genx-panel-floating {
        pointer-events: all;
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(0, 255, 148, 0.3);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 10px;
        box-shadow: 0 10px 30px rgba(0, 255, 148, 0.1);
        min-width: 280px;
        max-width: 400px;
      }
      
      /* =================================================================== */
      /* COMPONENT SPECIFIC STYLES */
      /* =================================================================== */

      /* Top Bar Components */
      .genx-top-bar-left {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .genx-top-bar-center {
        flex: 1;
        display: flex;
        justify-content: center;
        padding: 0 20px;
      }

      .genx-top-bar-right {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .genx-search-bar {
        width: 100%;
        max-width: 500px;
      }

      .genx-search-input {
        width: 100%;
        padding: 8px 16px;
        border: 1px solid var(--genx-border);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.1);
        color: var(--genx-text);
        font-size: 14px;
        outline: none;
        transition: all 0.3s ease;
      }

      .genx-search-input:focus {
        border-color: var(--genx-primary);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 2px rgba(0, 255, 148, 0.2);
      }

      .genx-search-input::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }

      /* Action Buttons */
      .genx-action-btn {
        width: 36px;
        height: 36px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: var(--genx-text);
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .genx-action-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
      }

      /* Sidebar Styles */
      .genx-sidebar {
        height: 100%;
        overflow-y: auto;
      }

      .genx-sidebar-header {
        padding: 20px;
        border-bottom: 1px solid var(--genx-border);
        text-align: center;
      }

      .genx-logo-sidebar img {
        max-width: 140px;
        height: auto;
        filter: brightness(1.1);
      }

      .genx-sidebar-nav {
        padding: 20px 0;
      }

      .genx-nav-section {
        margin-bottom: 24px;
        padding: 0 20px;
      }

      .genx-nav-section h5 {
        color: var(--genx-text);
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0 0 12px 0;
        opacity: 0.7;
      }

      .genx-nav-section ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .genx-nav-section li {
        margin: 4px 0;
      }

      .genx-nav-section a {
        color: var(--genx-text);
        text-decoration: none;
        padding: 8px 12px;
        border-radius: 6px;
        display: block;
        transition: all 0.2s ease;
        font-size: 14px;
      }

      .genx-nav-section a:hover {
        background: rgba(0, 255, 148, 0.1);
        color: var(--genx-primary);
        transform: translateX(4px);
      }

      /* Bottom Bar Styles */
      .genx-status-left {
        display: flex;
        gap: 16px;
      }

      .genx-status-right {
        margin-left: auto;
        display: flex;
        gap: 16px;
      }

      .genx-status-item {
        color: var(--genx-text);
        opacity: 0.7;
        font-size: 11px;
      }
      
      /* =================================================================== */
      /* ANIMATIONS AND EFFECTS */
      /* =================================================================== */
      
      .genx-glow {
        animation: genxGlow 2s ease-in-out infinite alternate;
      }
      
      @keyframes genxGlow {
        from { 
          box-shadow: 0 0 5px var(--genx-primary);
          transform: scale(1);
        }
        to { 
          box-shadow: 0 0 20px var(--genx-primary);
          transform: scale(1.02);
        }
      }
      
      /* Click animation */
      .genx-clicked {
        animation: genxClickPulse 0.2s ease;
      }
      
      @keyframes genxClickPulse {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
      }

      /* Loading states */
      .genx-loading-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: radial-gradient(circle at center, var(--genx-surface), var(--genx-background));
        color: var(--genx-text);
        font-family: 'JetBrains Mono', monospace;
      }

      .genx-loading-content {
        text-align: center;
      }

      .genx-loading-content div {
        font-size: 18px;
        margin-top: 20px;
        animation: genxPulse 2s ease-in-out infinite;
      }

      @keyframes genxPulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
      
      /* =================================================================== */
      /* SCROLLBAR STYLING */
      /* =================================================================== */

      .genx-sidebar-container::-webkit-scrollbar,
      .genx-right-panels::-webkit-scrollbar {
        width: 6px;
      }

      .genx-sidebar-container::-webkit-scrollbar-track,
      .genx-right-panels::-webkit-scrollbar-track {
        background: transparent;
      }

      .genx-sidebar-container::-webkit-scrollbar-thumb,
      .genx-right-panels::-webkit-scrollbar-thumb {
        background: rgba(0, 255, 148, 0.3);
        border-radius: 3px;
      }

      .genx-sidebar-container::-webkit-scrollbar-thumb:hover,
      .genx-right-panels::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 255, 148, 0.5);
      }
      
      /* =================================================================== */
      /* RESPONSIVE DESIGN */
      /* =================================================================== */
      
      @media (max-width: 1200px) {
        .genx-right-panels {
          width: 300px;
        }
        
        .genx-sidebar-container {
          width: 250px;
        }
      }

      @media (max-width: 768px) {
        .genx-sidebar-container,
        .genx-right-panels {
          display: none;
        }
        
        .genx-floating-panels {
          position: relative;
          top: auto;
          right: auto;
          padding: 10px;
        }
        
        .genx-panel-floating {
          margin: 10px 0;
          width: 100%;
          box-sizing: border-box;
        }
      }
      
      /* =================================================================== */
      /* DEBUG MODE STYLES */
      /* =================================================================== */
      
      .genx-debug-mode * {
        outline: 1px solid rgba(0, 255, 148, 0.3) !important;
      }
      
      .genx-debug-mode *:hover {
        outline: 2px solid var(--genx-primary) !important;
        background: rgba(0, 255, 148, 0.1) !important;
      }
    `;
  }
  
  // =============================================================================
  // 3. STYLE INJECTION - How CSS gets added to DOM
  // =============================================================================
  
  private static injectStyles(id: string, css: string) {
    console.log(`[GenX] Injecting styles: ${id}`);
    
    // Remove existing style with same ID
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
    
    // Create and inject new style element
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    
    // Add to head with high priority
    document.head.appendChild(style);
    
    // Track for cleanup
    this.styleElements.push(style);
    
    console.log(`[GenX] Successfully injected ${css.length} characters of CSS`);
  }
  
  // =============================================================================
  // 4. DYNAMIC OVERRIDE SYSTEM - Watches for new elements
  // =============================================================================
  
  private static startDynamicOverrideWatching(branding: any) {
    console.log('[GenX] Starting dynamic override watcher...');
    
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            this.applyGenXOverridesToElement(element, branding);
          }
        });
      });
    });
    
    // Watch entire document for changes
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }
  
  // =============================================================================
  // 5. ELEMENT-SPECIFIC OVERRIDES - Applied to new elements
  // =============================================================================
  
  private static applyGenXOverridesToElement(element: Element, branding: any) {
    // Apply GenX classes to specific elements
    
    // Override bolt-elements classes
    if (element.matches('[class*="bolt-elements"]')) {
      element.classList.add('genx-enhanced-element');
    }
    
    // Override background elements
    if (element.matches('.bolt-elements-background-depth-1')) {
      element.classList.add('genx-enhanced-background');
    }
    
    // Override text elements
    if (element.matches('[class*="textPrimary"]')) {
      element.classList.add('genx-enhanced-text');
    }
    
    // Override buttons
    if (element.matches('button')) {
      element.classList.add('genx-enhanced-button');
    }
    
    // Override inputs
    if (element.matches('input, textarea')) {
      element.classList.add('genx-enhanced-input');
    }
    
    // Add GenX attributes for identification
    element.setAttribute('data-genx-enhanced', 'true');
  }
  
  // =============================================================================
  // 6. CLEANUP SYSTEM
  // =============================================================================
  
  static cleanup() {
    console.log('[GenX] Cleaning up style overrides...');
    
    // Remove all injected styles
    this.styleElements.forEach(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
    this.styleElements = [];
    
    // Stop watching for changes
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    console.log('[GenX] Cleanup complete');
  }
}

// =============================================================================
// 8. DEBUG MODE FUNCTION
// =============================================================================

// Add this to see exactly what GenX is doing:
export const enableGenXDebugMode = () => {
  document.body.classList.add('genx-debug-mode');
  console.log('[GenX] Debug mode enabled - all elements outlined');
};