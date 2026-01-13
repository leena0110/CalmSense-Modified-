import React, { useState, useEffect, useRef } from 'react';
import './CalmingTools.css';

function CalmingTools({ soundEnabled }) {
  const [activeTool, setActiveTool] = useState('colors');
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [mixedColor, setMixedColor] = useState('#6f5b9a');
  const [colorName, setColorName] = useState('');
  const [spinnerRotation, setSpinnerRotation] = useState(0);
  const [spinnerSpeed, setSpinnerSpeed] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastTouchX, setLastTouchX] = useState(0);
  const [lastTouchY, setLastTouchY] = useState(0);

  // Rain sound
  const [rainPlaying, setRainPlaying] = useState(false);
  const [rainVolume, setRainVolume] = useState(0.3);
  const [rainAudio, setRainAudio] = useState(null);

  // Refs
  const spinnerRef = useRef(null);
  const rafIdRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Clean up
  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (rainAudio) {
        rainAudio.pause();
        rainAudio.currentTime = 0;
      }
    };
  }, []);

  // Handle rain sound
  useEffect(() => {
    if (soundEnabled && rainPlaying && activeTool === 'rain') {
      const audio = new Audio('/sounds/rain.mp3');
      audio.loop = true;
      audio.volume = rainVolume;
      audio.play().catch(error => {
        console.log("Rain audio play failed:", error);
      });
      setRainAudio(audio);
      
      return () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      };
    } else if (rainAudio) {
      rainAudio.pause();
      rainAudio.currentTime = 0;
      setRainAudio(null);
    }
  }, [soundEnabled, rainPlaying, activeTool]);

  // Handle rain volume changes
  useEffect(() => {
    if (rainAudio) {
      rainAudio.volume = rainVolume;
    }
  }, [rainVolume, rainAudio]);

  // Color mixing function
  const mixColors = () => {
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    const mixed = {
      r: Math.floor((rgb1.r * 0.6 + rgb2.r * 0.4)),
      g: Math.floor((rgb1.g * 0.6 + rgb2.g * 0.4)),
      b: Math.floor((rgb1.b * 0.6 + rgb2.b * 0.4))
    };
    
    const mixedHex = `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`;
    setMixedColor(mixedHex);
    
    let name = '';
    if (mixed.r > mixed.g && mixed.r > mixed.b) {
      if (mixed.r > 200) name = 'Sunset Red';
      else if (mixed.r > 150) name = 'Coral Pink';
      else name = 'Maroon';
    } else if (mixed.g > mixed.r && mixed.g > mixed.b) {
      if (mixed.g > 200) name = 'Mint Green';
      else if (mixed.g > 150) name = 'Forest Green';
      else name = 'Olive';
    } else if (mixed.b > mixed.r && mixed.b > mixed.g) {
      if (mixed.b > 200) name = 'Sky Blue';
      else if (mixed.b > 150) name = 'Ocean Blue';
      else name = 'Midnight Blue';
    } else {
      if (mixed.r > 200) name = 'Soft Pink';
      else if (mixed.r > 150) name = 'Lavender';
      else name = 'Twilight Purple';
    }
    
    setColorName(name);
    
    if (soundEnabled) {
      const successSound = new Audio('/sounds/complete.mp3');
      successSound.volume = 0.2;
      successSound.play().catch(console.log);
    }
  };

  // Spinner functions
  useEffect(() => {
    const animateSpinner = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      if (isSpinning && spinnerSpeed > 0) {
        setSpinnerRotation(prev => (prev + spinnerSpeed * deltaTime * 0.01) % 360);
        setSpinnerSpeed(prev => Math.max(0, prev - deltaTime * 0.001));
        
        if (spinnerSpeed <= 0.1) {
          setIsSpinning(false);
          setSpinnerSpeed(0);
        }
      }
      
      if (isSpinning) {
        rafIdRef.current = requestAnimationFrame(animateSpinner);
      }
    };
    
    if (isSpinning) {
      rafIdRef.current = requestAnimationFrame(animateSpinner);
    }
    
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isSpinning, spinnerSpeed]);

  const handleSpin = (speedBoost = 2) => {
    const newSpeed = spinnerSpeed + speedBoost;
    setSpinnerSpeed(newSpeed);
    if (!isSpinning && newSpeed > 0) {
      setIsSpinning(true);
      lastTimeRef.current = 0;
    }
  };

  const handleSpinnerClick = () => {
    handleSpin(1);
  };

  const handleSpinnerDragStart = (e) => {
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    setLastTouchX(clientX);
    setLastTouchY(clientY);
  };

  const handleSpinnerDrag = (e) => {
    e.preventDefault();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - lastTouchX;
    const deltaY = clientY - lastTouchY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    const speedBoost = Math.min(distance * 0.1, 10);
    handleSpin(speedBoost);
    
    setLastTouchX(clientX);
    setLastTouchY(clientY);
  };

  const resetSpinner = () => {
    setIsSpinning(false);
    setSpinnerSpeed(0);
    setSpinnerRotation(0);
  };

  const toggleRainSound = () => {
    if (soundEnabled) {
      if (rainPlaying) {
        setRainPlaying(false);
      } else {
        setRainPlaying(true);
      }
    }
  };

  // Updated tools array without bubbles
  const tools = [
    { id: 'colors', name: 'Color Mixer', emoji: '🎨', image: '/images/activities/colors.png' },
    { id: 'spinner', name: 'Fidget Spinner', emoji: '🌀', image: '/images/misc/spinner.png' },
    { id: 'rain', name: 'Rain on Window', emoji: '🌧️', image: '/images/misc/raindrop.png' }
  ];

  return (
    <div className="calming-tools-container">
      <div className="tools-header">
        <h2>✨ Calming Sensory Tools</h2>
        <p className="tools-subtitle">
          Interactive tools to help you feel calm and regulated
        </p>
      </div>

      <div className="tools-navigation">
        {tools.map(tool => (
          <button
            key={tool.id}
            className={`tool-nav-btn ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTool(tool.id);
              if (tool.id === 'rain' && rainPlaying) {
                setRainPlaying(false);
              }
              if (tool.id === 'spinner') {
                resetSpinner();
              }
            }}
            aria-label={`Switch to ${tool.name}`}
          >
            <div className="nav-icon">
              <img 
                src={tool.image} 
                alt={tool.name}
                className="nav-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `<span class="nav-emoji">${tool.emoji}</span>`;
                }}
              />
            </div>
            <span className="nav-label">{tool.name}</span>
          </button>
        ))}
      </div>

      <div className="tool-content-area">
        {/* Color Mixer Tool */}
        {activeTool === 'colors' && (
          <div className="tool-section colors-tool">
            <div className="colors-header">
              <h3>Create Beautiful Colors</h3>
              <p className="colors-description">
                Mix two colors together to create new calming colors
              </p>
            </div>

            <div className="color-mixer-container">
              <div className="color-selection">
                <div className="color-picker-group">
                  <div 
                    className="color-preview" 
                    style={{ backgroundColor: color1 }}
                    aria-label="First color preview"
                  >
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="color-input"
                      aria-label="Select first color"
                    />
                  </div>
                  <span className="color-label">Color 1</span>
                </div>

                <div className="mix-symbol">+</div>

                <div className="color-picker-group">
                  <div 
                    className="color-preview" 
                    style={{ backgroundColor: color2 }}
                    aria-label="Second color preview"
                  >
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="color-input"
                      aria-label="Select second color"
                    />
                  </div>
                  <span className="color-label">Color 2</span>
                </div>

                <div className="mix-symbol">=</div>

                <div className="color-result-group">
                  <div 
                    className="mixed-color-preview"
                    style={{ backgroundColor: mixedColor }}
                    onClick={mixColors}
                    role="button"
                    tabIndex={0}
                    aria-label="Mixed color result"
                  >
                    <div className="mixed-color-shine"></div>
                  </div>
                  <span className="color-label">Mixed Color</span>
                </div>
              </div>

              <button
                className="mix-colors-btn"
                onClick={mixColors}
                aria-label="Mix colors"
              >
                <span className="btn-icon">🎨</span>
                <span className="btn-text">Mix Colors</span>
              </button>

              {colorName && (
                <div className="color-result-display">
                  <div className="result-card">
                    <div className="result-header">
                      <span className="result-emoji">✨</span>
                      <h4>You created "{colorName}"!</h4>
                    </div>
                    <p className="result-description">
                      A beautiful new color has been created!
                    </p>
                    <div className="color-details">
                      <span className="color-hex">{mixedColor}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="color-tips">
              <h4>💡 Color Mixing Tips:</h4>
              <div className="tips-grid">
                <div className="tip-card">
                  <div className="tip-icon">🎯</div>
                  <p>Try blue + yellow = green</p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">🎯</div>
                  <p>Red + blue = purple</p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">🎯</div>
                  <p>Green + red = brown</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fidget Spinner Tool */}
        {activeTool === 'spinner' && (
          <div className="tool-section spinner-tool">
            <div className="spinner-header">
              <h3>Fidget Spinner</h3>
              <p className="spinner-description">
                Tap or swipe to spin gently. Watch the colors blend as it spins!
              </p>
            </div>

            <div className="spinner-container">
              <div className="spinner-instructions">
                <div className="instruction-text">
                  <div className="instruction-main">Tap or swipe to spin!</div>
                  <div className="instruction-tip">
                    💡 Drag quickly to spin faster, or tap to give it a spin!
                  </div>
                </div>
              </div>

              <div className="spinner-visual">
                <div 
                  ref={spinnerRef}
                  className="fidget-spinner"
                  style={{ transform: `rotate(${spinnerRotation}deg)` }}
                  onClick={handleSpinnerClick}
                  onMouseDown={handleSpinnerDragStart}
                  onMouseMove={isSpinning ? handleSpinnerDrag : undefined}
                  onTouchStart={handleSpinnerDragStart}
                  onTouchMove={isSpinning ? handleSpinnerDrag : undefined}
                  role="button"
                  tabIndex={0}
                  aria-label="Spin the fidget spinner"
                >
                  <div className="spinner-center">
                    <div className="center-dot"></div>
                    <div className="center-ring"></div>
                  </div>
                  <div className="spinner-arm arm1">
                    <div className="spinner-weight weight1"></div>
                  </div>
                  <div className="spinner-arm arm2">
                    <div className="spinner-weight weight2"></div>
                  </div>
                  <div className="spinner-arm arm3">
                    <div className="spinner-weight weight3"></div>
                  </div>
                  <div className="spinner-ring"></div>
                </div>
              </div>

              <div className="spinner-status">
                <div className="status-text">
                  {isSpinning ? 'Spinning! 🌀' : 'Stopped 🌙'}
                </div>
              </div>

              <div className="speed-indicator">
                <div className="speed-label">Speed:</div>
                <div className="speed-value">{Math.round(spinnerSpeed * 10) / 10}</div>
              </div>

              <div className="spinner-controls">
                <button
                  className="spin-control-btn spin"
                  onClick={() => handleSpin(3)}
                  aria-label="Spin the spinner"
                >
                  <span className="btn-icon">🌀</span>
                  <span className="btn-text">Spin</span>
                </button>
                
                <button
                  className="spin-control-btn reset"
                  onClick={resetSpinner}
                  aria-label="Reset spinner"
                >
                  <span className="btn-icon">🔄</span>
                  <span className="btn-text">Reset</span>
                </button>
              </div>
            </div>

            <div className="spinner-tips">
              <h4>🌟 How to Use:</h4>
              <div className="instruction-steps">
                <div className="instruction-step">
                  <div className="step-number">1</div>
                  <p>Tap the spinner to spin slowly</p>
                </div>
                <div className="instruction-step">
                  <div className="step-number">2</div>
                  <p>Drag quickly to spin faster</p>
                </div>
                <div className="instruction-step">
                  <div className="step-number">3</div>
                  <p>Watch it slow down gently</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rain on Window Tool */}
        {activeTool === 'rain' && (
          <div className="tool-section rain-tool">
            <div className="rain-header">
              <h3>Gentle Rain on Window</h3>
              <p className="rain-description">
                Watch and listen to calming rain falling
              </p>
            </div>

            <div className="rain-simulation">
              <div className="window-view">
                <div className="window-frame">
                  <div className="window-glass">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="raindrop"
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${1 + Math.random() * 2}s`,
                          animationPlayState: rainPlaying ? 'running' : 'paused'
                        }}
                      />
                    ))}
                    
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={`streak-${i}`}
                        className="rain-streak"
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 1}s`,
                          animationDuration: `${0.5 + Math.random() * 1}s`,
                          animationPlayState: rainPlaying ? 'running' : 'paused'
                        }}
                      />
                    ))}
                    
                    <div className="water-droplets">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div
                          key={`droplet-${i}`}
                          className="droplet"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationPlayState: rainPlaying ? 'running' : 'paused'
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="window-reflection"></div>
                  </div>
                </div>
                
                <div className="window-sill">
                  <div className="sill-details"></div>
                </div>
              </div>

              <div className="rain-controls">
                <div className="volume-control">
                  <label htmlFor="rainVolume" className="volume-label">
                    <span className="label-icon">🔊</span>
                    <span className="label-text">Rain Volume</span>
                  </label>
                  <input
                    type="range"
                    id="rainVolume"
                    min="0"
                    max="1"
                    step="0.1"
                    value={rainVolume}
                    onChange={(e) => setRainVolume(parseFloat(e.target.value))}
                    className="volume-slider"
                    aria-label="Adjust rain volume"
                    disabled={!soundEnabled}
                  />
                  <span className="volume-value">{Math.round(rainVolume * 100)}%</span>
                </div>

                <button
                  className={`rain-sound-btn ${rainPlaying ? 'active' : ''}`}
                  onClick={toggleRainSound}
                  disabled={!soundEnabled}
                  aria-label={rainPlaying ? "Turn rain sound off" : "Turn rain sound on"}
                >
                  <span className="btn-icon">{rainPlaying ? '🔊' : '🔇'}</span>
                  <span className="btn-text">
                    {rainPlaying ? 'Rain Sound On' : 'Rain Sound Off'}
                  </span>
                </button>
                
                {!soundEnabled && (
                  <div className="sound-disabled-note">
                    <span className="note-icon">⚠️</span>
                    <p>Enable sound in settings to hear the rain</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rain-benefits">
              <h4>🌈 Benefits of Rain Sounds:</h4>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">😌</div>
                  <p>Promotes relaxation</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🎯</div>
                  <p>Improves focus</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">😴</div>
                  <p>Helps with sleep</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="tools-footer">
        <div className="footer-message">
          <span className="message-icon">💡</span>
          <p>
            Use these tools when you need to feel calm or regulated. 
            Each tool is designed to be gentle and soothing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CalmingTools;