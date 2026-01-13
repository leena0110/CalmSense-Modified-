import React, { useState, useEffect } from 'react';
import './SoundTherapy.css';

function SoundTherapy({ soundEnabled }) {
  const [activeSounds, setActiveSounds] = useState({});
  const [volumes, setVolumes] = useState({});
  const [masterVolume, setMasterVolume] = useState(0.7);
  const [currentPreset, setCurrentPreset] = useState(null);
  const [showVolumeAlert, setShowVolumeAlert] = useState(false);
  
  const soundLibrary = [
    { 
      id: 'ocean', 
      name: 'Ocean Waves', 
      emoji: '🌊', 
      color: '#03A9F4', 
      file: '/sounds/ocean.mp3',
      description: 'Calm waves on the shore'
    },
    { 
      id: 'forest', 
      name: 'Forest Sounds', 
      emoji: '🌲', 
      color: '#4CAF50', 
      file: '/sounds/forest.mp3',
      description: 'Peaceful forest ambience'
    },
    { 
      id: 'birds', 
      name: 'Morning Birds', 
      emoji: '🐦', 
      color: '#FF9800', 
      file: '/sounds/birds.mp3',
      description: 'Gentle bird chirping'
    },
    { 
      id: 'stream', 
      name: 'Mountain Stream', 
      emoji: '💧', 
      color: '#00BCD4', 
      file: '/sounds/stream.mp3',
      description: 'Gentle flowing water'
    },
    { 
      id: 'wind', 
      name: 'Soft Wind', 
      emoji: '🍃', 
      color: '#8BC34A', 
      file: '/sounds/wind.mp3',
      description: 'Calm wind through trees'
    },
    { 
      id: 'fire', 
      name: 'Crackling Fire', 
      emoji: '🔥', 
      color: '#FF5722', 
      file: '/sounds/fire.mp3',
      description: 'Warm fireplace sounds'
    }
  ];

  // Initialize volumes and audio elements
  useEffect(() => {
    const initialVolumes = {};
    soundLibrary.forEach(sound => {
      initialVolumes[sound.id] = 0.5;
    });
    setVolumes(initialVolumes);
  }, []);

  // Volume alert for first time users
  useEffect(() => {
    const hasSeenAlert = localStorage.getItem('hasSeenVolumeAlert');
    if (!hasSeenAlert && soundEnabled) {
      setShowVolumeAlert(true);
      localStorage.setItem('hasSeenVolumeAlert', 'true');
    }
  }, [soundEnabled]);

  const toggleSound = (soundId) => {
    if (!soundEnabled) return;
    
    const sound = soundLibrary.find(s => s.id === soundId);
    if (!sound) return;
    
    if (activeSounds[soundId]) {
      // Stop the sound
      const audio = document.getElementById(`audio-${soundId}`);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    } else {
      // Start the sound
      const audio = document.getElementById(`audio-${soundId}`);
      if (audio) {
        audio.volume = volumes[soundId] * masterVolume;
        audio.play().catch(error => {
          console.log("Audio play failed:", error);
        });
      }
    }
    
    setActiveSounds(prev => ({
      ...prev,
      [soundId]: !prev[soundId]
    }));
  };

  const handleVolumeChange = (soundId, newVolume) => {
    setVolumes(prev => ({
      ...prev,
      [soundId]: newVolume
    }));
    
    // Update the audio volume immediately if playing
    const audio = document.getElementById(`audio-${soundId}`);
    if (audio && !audio.paused) {
      audio.volume = newVolume * masterVolume;
    }
  };

  const loadPreset = (preset) => {
    // Stop all sounds first
    soundLibrary.forEach(sound => {
      if (activeSounds[sound.id]) {
        const audio = document.getElementById(`audio-${sound.id}`);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    });
    
    setActiveSounds({});
    setCurrentPreset(preset);
    
    // Small delay before starting new sounds
    setTimeout(() => {
      switch(preset) {
        case 'relax':
          ['forest', 'stream'].forEach(id => {
            toggleSound(id);
            handleVolumeChange(id, 0.6);
          });
          break;
          
        case 'focus':
          ['birds', 'stream'].forEach(id => {
            toggleSound(id);
            handleVolumeChange(id, 0.5);
          });
          break;
          
        case 'sleep':
          ['ocean', 'wind'].forEach(id => {
            toggleSound(id);
            handleVolumeChange(id, 0.4);
          });
          break;
          
        case 'nature':
          ['birds', 'stream', 'wind'].forEach(id => {
            toggleSound(id);
            handleVolumeChange(id, 0.5);
          });
          break;
          
        default:
          break;
      }
    }, 100);
  };

  const stopAllSounds = () => {
    soundLibrary.forEach(sound => {
      if (activeSounds[sound.id]) {
        const audio = document.getElementById(`audio-${sound.id}`);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    });
    setActiveSounds({});
    setCurrentPreset(null);
  };

  const calculateActiveSoundsCount = () => {
    return Object.values(activeSounds).filter(Boolean).length;
  };

  const getSoundVisualization = (soundId) => {
    if (!activeSounds[soundId]) return null;
    
    const visualConfigs = {
      ocean: { type: 'wave', color: '#03A9F4' },
      forest: { type: 'pulse', color: '#4CAF50' },
      birds: { type: 'float', color: '#FF9800' },
      stream: { type: 'flow', color: '#00BCD4' },
      wind: { type: 'sway', color: '#8BC34A' },
      fire: { type: 'flicker', color: '#FF5722' }
    };
    
    const config = visualConfigs[soundId];
    if (!config) return null;
    
    return (
      <div className={`sound-visual ${config.type}`}>
        <div className="visual-bar" style={{ backgroundColor: config.color }}></div>
        <div className="visual-bar delay-1" style={{ backgroundColor: config.color }}></div>
        <div className="visual-bar delay-2" style={{ backgroundColor: config.color }}></div>
      </div>
    );
  };

  return (
    <div className="sound-therapy-container">
      {/* Hidden audio elements */}
      {soundLibrary.map(sound => (
        <audio
          key={sound.id}
          id={`audio-${sound.id}`}
          src={sound.file}
          loop
          preload="auto"
        />
      ))}

      <div className="sound-header">
        <h2>🎵 Sound Therapy Room</h2>
        <p className="sound-subtitle">
          Mix gentle nature sounds to create your perfect calm environment
        </p>
      </div>

      <div className="sound-intro">
        <div className="intro-card">
          <div className="intro-icon">🎯</div>
          <div className="intro-content">
            <h3>Why Sound Therapy?</h3>
            <p>Gentle nature sounds can help calm the mind, improve focus, and reduce stress.</p>
          </div>
        </div>
      </div>

      <div className="sound-controls-section">
        <div className="master-controls">
          <div className="volume-controls">
            <div className="volume-slider-group">
              <label htmlFor="masterVolume" className="volume-label">
                <span className="label-icon">🔊</span>
                <span className="label-text">Overall Volume</span>
              </label>
              <input
                type="range"
                id="masterVolume"
                min="0"
                max="1"
                step="0.1"
                value={masterVolume}
                onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                className="master-volume-slider"
                aria-label="Adjust overall volume"
                disabled={!soundEnabled}
              />
              <span className="volume-value">{Math.round(masterVolume * 100)}%</span>
            </div>
          </div>

          <div className="active-sounds-info">
            <div className="active-count">
              <span className="count-number">{calculateActiveSoundsCount()}</span>
              <span className="count-label">Active Sounds</span>
            </div>
            <button 
              className="stop-all-btn"
              onClick={stopAllSounds}
              aria-label="Stop all sounds"
              disabled={calculateActiveSoundsCount() === 0}
            >
              <span className="btn-icon">⏹️</span>
              <span className="btn-text">Stop All</span>
            </button>
          </div>
        </div>

        <div className="preset-selector">
          <h4>Quick Sound Presets:</h4>
          <div className="preset-grid">
            <button 
              className={`preset-card ${currentPreset === 'relax' ? 'active' : ''}`}
              onClick={() => loadPreset('relax')}
              aria-label="Load relaxation preset"
            >
              <div className="preset-icon">😌</div>
              <div className="preset-info">
                <h5>Relax</h5>
                <p>Forest & Stream</p>
              </div>
            </button>
            
            <button 
              className={`preset-card ${currentPreset === 'focus' ? 'active' : ''}`}
              onClick={() => loadPreset('focus')}
              aria-label="Load focus preset"
            >
              <div className="preset-icon">🎯</div>
              <div className="preset-info">
                <h5>Focus</h5>
                <p>Birds & Stream</p>
              </div>
            </button>
            
            <button 
              className={`preset-card ${currentPreset === 'sleep' ? 'active' : ''}`}
              onClick={() => loadPreset('sleep')}
              aria-label="Load sleep preset"
            >
              <div className="preset-icon">😴</div>
              <div className="preset-info">
                <h5>Sleep</h5>
                <p>Ocean & Wind</p>
              </div>
            </button>
            
            <button 
              className={`preset-card ${currentPreset === 'nature' ? 'active' : ''}`}
              onClick={() => loadPreset('nature')}
              aria-label="Load nature preset"
            >
              <div className="preset-icon">🌿</div>
              <div className="preset-info">
                <h5>Nature</h5>
                <p>Birds, Stream & Wind</p>
              </div>
            </button>
          </div>
        </div>

        <div className="sound-library">
          <h4>Choose Your Nature Sounds:</h4>
          <div className="sound-grid">
            {soundLibrary.map(sound => (
              <div 
                key={sound.id}
                className={`sound-card ${activeSounds[sound.id] ? 'active' : ''}`}
                style={{ 
                  '--sound-color': sound.color,
                  borderColor: activeSounds[sound.id] ? sound.color : 'rgba(0,0,0,0.1)'
                }}
              >
                <div className="sound-header">
                  <div className="sound-icon">{sound.emoji}</div>
                  <div className="sound-info">
                    <h5>{sound.name}</h5>
                    <p className="sound-description">{sound.description}</p>
                  </div>
                  <button
                    className="sound-toggle"
                    onClick={() => toggleSound(sound.id)}
                    aria-label={`${activeSounds[sound.id] ? 'Stop' : 'Play'} ${sound.name}`}
                    disabled={!soundEnabled && !activeSounds[sound.id]}
                  >
                    <span className="toggle-icon">
                      {activeSounds[sound.id] ? '⏸️' : '▶️'}
                    </span>
                    <span className="toggle-text">
                      {activeSounds[sound.id] ? 'Stop' : 'Play'}
                    </span>
                  </button>
                </div>

                {activeSounds[sound.id] && (
                  <div className="sound-controls">
                    <div className="sound-visualization">
                      {getSoundVisualization(sound.id)}
                    </div>
                    
                    <div className="sound-volume-control">
                      <label htmlFor={`volume-${sound.id}`} className="sound-volume-label">
                        <span className="volume-icon">🔈</span>
                        <span className="volume-text">Volume</span>
                      </label>
                      <input
                        type="range"
                        id={`volume-${sound.id}`}
                        min="0"
                        max="1"
                        step="0.1"
                        value={volumes[sound.id] || 0.5}
                        onChange={(e) => handleVolumeChange(sound.id, parseFloat(e.target.value))}
                        className="sound-volume-slider"
                        aria-label={`Adjust volume for ${sound.name}`}
                        style={{
                          background: `linear-gradient(to right, ${sound.color}, ${sound.color}${Math.round((volumes[sound.id] || 0.5) * 100)}%, #e0e0e0 0%)`
                        }}
                      />
                      <span className="sound-volume-value">
                        {Math.round((volumes[sound.id] || 0.5) * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sound-mixer">
        <div className="mixer-header">
          <h4>🎛️ Sound Mixer Display</h4>
          <p className="mixer-subtitle">
            Visual representation of your current sound mix
          </p>
        </div>
        
        <div className="mixer-visual">
          <div className="mixer-bars">
            {soundLibrary
              .filter(sound => activeSounds[sound.id])
              .map(sound => (
                <div 
                  key={sound.id}
                  className="mixer-bar"
                  style={{ 
                    height: `${(volumes[sound.id] || 0.5) * 100}%`,
                    backgroundColor: sound.color,
                    width: `${100 / Math.max(calculateActiveSoundsCount(), 1)}%`
                  }}
                  aria-label={`${sound.name} playing at ${Math.round((volumes[sound.id] || 0.5) * 100)}% volume`}
                >
                  <div className="bar-content">
                    <span className="bar-icon">{sound.emoji}</span>
                    <span className="bar-percentage">
                      {Math.round((volumes[sound.id] || 0.5) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
          
          {calculateActiveSoundsCount() === 0 && (
            <div className="no-sounds-message">
              <div className="message-icon">🎵</div>
              <div className="message-content">
                <h5>No sounds playing</h5>
                <p>Start some sounds above to see the mixer in action!</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mixer-info">
          <div className="info-item">
            <span className="info-label">Active Sounds:</span>
            <span className="info-value">{calculateActiveSoundsCount()}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Master Volume:</span>
            <span className="info-value">{Math.round(masterVolume * 100)}%</span>
          </div>
          <div className="info-item">
            <span className="info-label">Current Preset:</span>
            <span className="info-value">{currentPreset ? currentPreset.charAt(0).toUpperCase() + currentPreset.slice(1) : 'None'}</span>
          </div>
        </div>
      </div>

      <div className="sound-benefits">
        <h4>🌟 Benefits of Sound Therapy</h4>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">😌</div>
            <div className="benefit-content">
              <h5>Reduces Stress</h5>
              <p>Calming sounds lower cortisol levels</p>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <div className="benefit-content">
              <h5>Improves Focus</h5>
              <p>Nature sounds help concentration</p>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">😴</div>
            <div className="benefit-content">
              <h5>Better Sleep</h5>
              <p>Helps regulate sleep patterns</p>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌈</div>
            <div className="benefit-content">
              <h5>Emotional Balance</h5>
              <p>Helps regulate mood and emotions</p>
            </div>
          </div>
        </div>
      </div>

      {!soundEnabled && (
        <div className="sound-disabled-message">
          <div className="message-icon">🔇</div>
          <div className="message-content">
            <h5>Sound is Disabled</h5>
            <p>Enable sound in the settings to hear the calming nature sounds.</p>
            <p className="secondary-text">You can still use the visual elements for a calming experience.</p>
          </div>
        </div>
      )}

      {showVolumeAlert && (
        <div className="volume-alert">
          <div className="alert-content">
            <div className="alert-icon">🔊</div>
            <div className="alert-text">
              <h5>Volume Tip</h5>
              <p>Start with lower volumes and adjust to your comfort level. Remember to protect your hearing.</p>
            </div>
            <button 
              className="alert-close"
              onClick={() => setShowVolumeAlert(false)}
              aria-label="Close alert"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="sound-tips">
        <h4>💡 Tips for Best Experience:</h4>
        <div className="tips-list">
          <div className="tip-item">
            <div className="tip-icon">🎧</div>
            <p>Use headphones for best sound quality</p>
          </div>
          <div className="tip-item">
            <div className="tip-icon">🎛️</div>
            <p>Mix 2-3 sounds for balanced experience</p>
          </div>
          <div className="tip-item">
            <div className="tip-icon">⏱️</div>
            <p>Start with lower volumes and adjust</p>
          </div>
          <div className="tip-item">
            <div className="tip-icon">🌿</div>
            <p>Nature sounds work well together</p>
          </div>
          <div className="tip-item">
            <div className="tip-icon">🛋️</div>
            <p>Use in comfortable, quiet spaces</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoundTherapy;