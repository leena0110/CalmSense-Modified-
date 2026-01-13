import React from 'react';
import './AccessibilityToolbar.css';

function AccessibilityToolbar({ settings, updateSettings, character, setCharacter }) {
  const handleFontSize = (increase) => {
    const newSize = increase ? settings.fontSize + 2 : settings.fontSize - 2;
    if (newSize >= 12 && newSize <= 24) {
      updateSettings('fontSize', newSize);
    }
  };

  return (
    <div className="accessibility-toolbar">
      <div className="toolbar-container">
        <div className="toolbar-controls">
          <div className="control-group">
            <button 
              className="toolbar-btn"
              onClick={() => updateSettings('darkMode', !settings.darkMode)}
              aria-label={settings.darkMode ? "Switch to light mode" : "Switch to dark mode"}
              data-tooltip={settings.darkMode ? "Light Mode" : "Dark Mode"}
            >
              <span className="btn-icon">{settings.darkMode ? '☀️' : '🌙'}</span>
              <span className="btn-text">{settings.darkMode ? 'Light' : 'Dark'}</span>
            </button>
            
            <button 
              className="toolbar-btn"
              onClick={() => updateSettings('soundEnabled', !settings.soundEnabled)}
              aria-label={settings.soundEnabled ? "Turn sound off" : "Turn sound on"}
              data-tooltip={settings.soundEnabled ? "Mute Sounds" : "Unmute Sounds"}
            >
              <span className="btn-icon">{settings.soundEnabled ? '🔊' : '🔇'}</span>
              <span className="btn-text">{settings.soundEnabled ? 'Sound On' : 'Sound Off'}</span>
            </button>
          </div>
          
          <div className="control-group">
            <div className="font-controls">
              <span className="font-label">Text:</span>
              <div className="font-buttons">
                <button 
                  className="font-btn"
                  onClick={() => handleFontSize(false)}
                  aria-label="Decrease font size"
                  data-tooltip="Smaller Text"
                >
                  <span className="font-btn-icon">A-</span>
                </button>
                <span className="font-size-display">{settings.fontSize}px</span>
                <button 
                  className="font-btn"
                  onClick={() => handleFontSize(true)}
                  aria-label="Increase font size"
                  data-tooltip="Larger Text"
                >
                  <span className="font-btn-icon">A+</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="control-group">
            <div className="character-select">
              <span className="char-label">Avatar:</span>
              <div className="char-buttons">
                <button 
                  className={`char-btn ${character === 'girl' ? 'active' : ''}`}
                  onClick={() => setCharacter('girl')}
                  aria-label="Choose girl avatar"
                  data-tooltip="Girl Avatar"
                >
                  👧
                </button>
                <button 
                  className={`char-btn ${character === 'boy' ? 'active' : ''}`}
                  onClick={() => setCharacter('boy')}
                  aria-label="Choose boy avatar"
                  data-tooltip="Boy Avatar"
                >
                  👦
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessibilityToolbar;