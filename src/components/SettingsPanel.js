import React from 'react';
import './SettingsPanel.css';

function SettingsPanel({ isOpen, onClose, settings, updateSettings, character, setCharacter }) {
  const handleFontSize = (increase) => {
    const newSize = increase ? settings.fontSize + 2 : settings.fontSize - 2;
    if (newSize >= 12 && newSize <= 24) {
      updateSettings('fontSize', newSize);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="settings-overlay" onClick={onClose}></div>
      
      <div className="settings-panel">
        <div className="settings-header">
          <h3 className="settings-title">⚙️ Accessibility Settings</h3>
          <button 
            className="settings-close-btn"
            onClick={onClose}
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>
        
        <div className="settings-content">
          <div className="settings-section">
            <h4 className="section-title">Display Settings</h4>
            
            <div className="setting-item">
              <div className="setting-label">
                <span className="setting-icon">🌙</span>
                <span className="setting-text">Theme</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`theme-btn ${settings.darkMode ? '' : 'active'}`}
                  onClick={() => updateSettings('darkMode', false)}
                  aria-label="Switch to light theme"
                >
                  <span className="btn-icon">☀️</span>
                  <span className="btn-text">Light</span>
                </button>
                <button 
                  className={`theme-btn ${settings.darkMode ? 'active' : ''}`}
                  onClick={() => updateSettings('darkMode', true)}
                  aria-label="Switch to dark theme"
                >
                  <span className="btn-icon">🌙</span>
                  <span className="btn-text">Dark</span>
                </button>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <span className="setting-icon">🔊</span>
                <span className="setting-text">Sound</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`sound-btn ${settings.soundEnabled ? 'active' : ''}`}
                  onClick={() => updateSettings('soundEnabled', true)}
                  aria-label="Turn sound on"
                >
                  <span className="btn-icon">🔊</span>
                  <span className="btn-text">On</span>
                </button>
                <button 
                  className={`sound-btn ${!settings.soundEnabled ? 'active' : ''}`}
                  onClick={() => updateSettings('soundEnabled', false)}
                  aria-label="Turn sound off"
                >
                  <span className="btn-icon">🔇</span>
                  <span className="btn-text">Off</span>
                </button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h4 className="section-title">Text Size</h4>
            <div className="setting-item">
              <div className="setting-label">
                <span className="setting-icon">A</span>
                <span className="setting-text">Font Size</span>
              </div>
              <div className="setting-control">
                <div className="font-size-controls">
                  <button 
                    className="font-btn"
                    onClick={() => handleFontSize(false)}
                    aria-label="Decrease font size"
                  >
                    <span className="font-btn-icon">A-</span>
                  </button>
                  <div className="font-size-display">
                    <span className="font-size-value">{settings.fontSize}px</span>
                  </div>
                  <button 
                    className="font-btn"
                    onClick={() => handleFontSize(true)}
                    aria-label="Increase font size"
                  >
                    <span className="font-btn-icon">A+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h4 className="section-title">Avatar</h4>
            <div className="setting-item">
              <div className="setting-label">
                <span className="setting-icon">👤</span>
                <span className="setting-text">Choose Avatar</span>
              </div>
              <div className="setting-control">
                <div className="avatar-options">
                  <button 
                    className={`avatar-btn ${character === 'girl' ? 'active' : ''}`}
                    onClick={() => setCharacter('girl')}
                    aria-label="Choose girl avatar"
                  >
                    <span className="avatar-icon">👧</span>
                    <span className="avatar-text">Girl</span>
                  </button>
                  <button 
                    className={`avatar-btn ${character === 'boy' ? 'active' : ''}`}
                    onClick={() => setCharacter('boy')}
                    aria-label="Choose boy avatar"
                  >
                    <span className="avatar-icon">👦</span>
                    <span className="avatar-text">Boy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button 
            className="settings-done-btn"
            onClick={onClose}
            aria-label="Close settings"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}

export default SettingsPanel;