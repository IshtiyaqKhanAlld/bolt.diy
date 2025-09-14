// =============================================================================
// app/genx/components/GenXPanels.tsx - Panel Components
// =============================================================================

import React from 'react';

export const GenXAIAssistant: React.FC = () => {
  return (
    <div className="genx-ai-assistant-panel">
      <div className="genx-panel-header">
        <h3>GenX AI Assistant</h3>
      </div>
      <div className="genx-panel-content">
        <div className="genx-ai-chat">
          <p>Ask me anything about your code...</p>
          <input 
            type="text" 
            placeholder="How can I help you code today?"
            className="genx-ai-input"
          />
        </div>
      </div>
    </div>
  );
};

export const GenXQuickActions: React.FC = () => {
  const actions = [
    { label: 'New Project', icon: '🚀', action: () => console.log('New Project') },
    { label: 'AI Code Gen', icon: '🤖', action: () => console.log('AI Code Gen') },
    { label: 'Debug', icon: '🐛', action: () => console.log('Debug') },
    { label: 'Deploy', icon: '🌐', action: () => console.log('Deploy') },
  ];

  return (
    <div className="genx-quick-actions-panel">
      <div className="genx-panel-header">
        <h4>Quick Actions</h4>
      </div>
      <div className="genx-panel-content">
        <div className="genx-action-grid">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="genx-action-button"
            >
              <span className="genx-action-icon">{action.icon}</span>
              <span className="genx-action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const GenXSidebar: React.FC = () => {
  return (
    <div className="genx-sidebar">
      <div className="genx-sidebar-header">
        <div className="genx-logo">
          <span className="genx-logo-icon">⚡</span>
          <span className="genx-logo-text">GenX.code</span>
        </div>
      </div>
      <nav className="genx-sidebar-nav">
        <div className="genx-nav-section">
          <h5>Workspace</h5>
          <ul>
            <li><a href="#projects">📁 Projects</a></li>
            <li><a href="#recent">📄 Recent Files</a></li>
            <li><a href="#templates">📋 Templates</a></li>
          </ul>
        </div>
        <div className="genx-nav-section">
          <h5>AI Tools</h5>
          <ul>
            <li><a href="#ai-chat">🤖 AI Chat</a></li>
            <li><a href="#code-gen">💻 Code Generator</a></li>
            <li><a href="#debug">🐛 Smart Debug</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export const GenXTopBar: React.FC = () => {
  return (
    <div className="genx-top-bar">
      <div className="genx-top-bar-left">
        <div className="genx-breadcrumb">
          <span>GenX.code</span>
          <span className="genx-separator">/</span>
          <span>My Project</span>
        </div>
      </div>
      <div className="genx-top-bar-center">
        <div className="genx-search-bar">
          <input 
            type="text" 
            placeholder="Search files, commands, or ask AI..." 
            className="genx-search-input"
          />
        </div>
      </div>
      <div className="genx-top-bar-right">
        <button className="genx-action-btn">⚙️</button>
        <button className="genx-action-btn">👤</button>
      </div>
    </div>
  );
};

export const GenXBottomBar: React.FC = () => {
  return (
    <div className="genx-bottom-bar">
      <div className="genx-status-left">
        <span className="genx-status-item">✅ Ready</span>
        <span className="genx-status-item">🔗 Connected</span>
      </div>
      <div className="genx-status-right">
        <span className="genx-status-item">TypeScript</span>
        <span className="genx-status-item">UTF-8</span>
        <span className="genx-status-item">Line 42</span>
      </div>
    </div>
  );
};

export const GenXLoadingScreen: React.FC = () => {
  return (
    <div className="genx-loading-screen">
      <div className="genx-loading-content">
        <div className="genx-loading-logo">
          <span className="genx-loading-icon">⚡</span>
          <h1>GenX.code</h1>
        </div>
        <div className="genx-loading-spinner">
          <div className="genx-spinner"></div>
        </div>
        <p>Initializing your development environment...</p>
      </div>
    </div>
  );
};