import React, { useState, useEffect } from 'react';
import './BreathingExercise.css';

function BreathingExercise({ soundEnabled }) {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [breathPattern, setBreathPattern] = useState('relax');
  const [cycles, setCycles] = useState(0);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const patterns = {
    'relax': { inhale: 4, hold: 2, exhale: 6, name: 'Relaxing Breath', color: '#4CAF50' },
    'energy': { inhale: 4, hold: 4, exhale: 4, name: 'Balanced Breath', color: '#2196F3' },
    'calm': { inhale: 5, hold: 0, exhale: 5, name: 'Calming Breath', color: '#9C27B0' }
  };

  useEffect(() => {
    let timer;
    if (isBreathing) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Move to next phase
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              return patterns[breathPattern].hold;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              return patterns[breathPattern].exhale;
            } else {
              setBreathPhase('inhale');
              const newCycles = cycles + 1;
              const newTotal = totalBreaths + 1;
              setCycles(newCycles);
              setTotalBreaths(newTotal);
              
              // Show celebration every 3 cycles
              if (newCycles % 3 === 0) {
                setShowCelebration(true);
                setCompletedSessions(prev => prev + 1);
                setTimeout(() => setShowCelebration(false), 2000);
              }
              
              return patterns[breathPattern].inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathing, breathPhase, breathPattern]);

  const handleStartStop = () => {
    if (!isBreathing) {
      setBreathPhase('inhale');
      setTimeLeft(patterns[breathPattern].inhale);
    }
    setIsBreathing(!isBreathing);
  };

  const resetExercise = () => {
    setIsBreathing(false);
    setBreathPhase('inhale');
    setTimeLeft(patterns[breathPattern].inhale);
    setCycles(0);
    setTotalBreaths(0);
  };

  const getInstructions = () => {
    switch (breathPhase) {
      case 'inhale': return 'Breathe IN slowly...';
      case 'hold': return 'Hold gently...';
      case 'exhale': return 'Breathe OUT slowly...';
      default: return 'Ready to breathe?';
    }
  };

  const getPhaseIcon = () => {
    switch (breathPhase) {
      case 'inhale': return '⬆️';
      case 'hold': return '⏸️';
      case 'exhale': return '⬇️';
      default: return '🌬️';
    }
  };

  // Calculate circle size for smooth animation
  const getCircleSize = () => {
    switch (breathPhase) {
      case 'inhale': return 'grow';
      case 'hold': return 'hold';
      case 'exhale': return 'shrink';
      default: return 'normal';
    }
  };

  return (
    <div className="breathing-container">
      <div className="breathing-header">
        <h2>🌬️ Breathing Exercise</h2>
        <p className="breathing-subtitle">
          Follow the gentle circle to practice calming breathing
        </p>
      </div>

      <div className="breathing-main">
        <div className="breathing-visual-container">
          <div className={`breathing-visual ${getCircleSize()}`}>
            <div className="breathing-circle">
              <div className="circle-inner">
                <div className="phase-display">
                  <span className="phase-icon">{getPhaseIcon()}</span>
                  <span className="phase-text">{breathPhase.toUpperCase()}</span>
                </div>
                <div className="time-display">
                  <span className="time-number">{timeLeft}</span>
                  <span className="time-label">seconds</span>
                </div>
                <div className="breathing-guide">
                  <div className="guide-line"></div>
                  <div className="guide-dot"></div>
                </div>
              </div>
              <div className="circle-ripple"></div>
              <div className="circle-ripple delay-1"></div>
            </div>
          </div>
          
          <div className="breathing-instruction">
            <div className="instruction-card">
              <span className="instruction-icon">💭</span>
              <p className="instruction-text">{getInstructions()}</p>
            </div>
          </div>
        </div>

        <div className="breathing-controls">
          <div className="control-buttons">
            <button
              className={`breathing-btn ${isBreathing ? 'pause' : 'start'}`}
              onClick={handleStartStop}
              aria-label={isBreathing ? "Pause breathing" : "Start breathing"}
            >
              <span className="btn-icon">{isBreathing ? '⏸️' : '▶️'}</span>
              <span className="btn-text">{isBreathing ? 'Pause' : 'Start Breathing'}</span>
            </button>
            
            <button
              className="breathing-btn reset"
              onClick={resetExercise}
              aria-label="Reset breathing exercise"
            >
              <span className="btn-icon">🔄</span>
              <span className="btn-text">Reset</span>
            </button>
          </div>

          <div className="pattern-selector">
            <h4>Choose Breathing Pattern:</h4>
            <div className="pattern-grid">
              {Object.entries(patterns).map(([key, pattern]) => (
                <button
                  key={key}
                  className={`pattern-card ${breathPattern === key ? 'active' : ''}`}
                  onClick={() => {
                    setBreathPattern(key);
                    setIsBreathing(false);
                    setTimeLeft(pattern.inhale);
                  }}
                  style={{ '--pattern-color': pattern.color }}
                >
                  <div className="pattern-header">
                    <span className="pattern-emoji">
                      {key === 'relax' && '😌'}
                      {key === 'energy' && '⚡'}
                      {key === 'calm' && '🕊️'}
                    </span>
                    <span className="pattern-name">{pattern.name}</span>
                  </div>
                  <div className="pattern-timing">
                    {pattern.inhale}-{pattern.hold}-{pattern.exhale}
                  </div>
                  <div className="pattern-description">
                    {key === 'relax' && 'For relaxation'}
                    {key === 'energy' && 'For balance'}
                    {key === 'calm' && 'For calmness'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="breathing-stats">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🌀</div>
                <div className="stat-content">
                  <span className="stat-value">{cycles}</span>
                  <span className="stat-label">Cycles</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌬️</div>
                <div className="stat-content">
                  <span className="stat-value">{totalBreaths}</span>
                  <span className="stat-label">Breaths</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <span className="stat-value">{completedSessions}</span>
                  <span className="stat-label">Sessions</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <span className="stat-value">{patterns[breathPattern].name}</span>
                  <span className="stat-label">Pattern</span>
                </div>
              </div>
            </div>
          </div>

          {showCelebration && (
            <div className="celebration-popup">
              <div className="celebration-content">
                <span className="celebration-emoji">🎉</span>
                <h3>Amazing! You completed a session!</h3>
                <p>You've taken {totalBreaths} deep breaths today!</p>
                <div className="confetti">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="confetti-piece"></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {totalBreaths > 0 && !showCelebration && (
            <div className="progress-message">
              <div className="progress-content">
                <span className="progress-emoji">🌟</span>
                <p>
                  <strong>Great job!</strong> You've taken {totalBreaths} deep breaths today!
                </p>
              </div>
            </div>
          )}

          <div className="breathing-tips">
            <h4>💡 Tips for Better Breathing:</h4>
            <div className="tips-list">
              <div className="tip-item">
                <span className="tip-check">✓</span>
                <p>Sit comfortably with a straight back</p>
              </div>
              <div className="tip-item">
                <span className="tip-check">✓</span>
                <p>Place one hand on your belly to feel breathing</p>
              </div>
              <div className="tip-item">
                <span className="tip-check">✓</span>
                <p>Close your eyes if it feels comfortable</p>
              </div>
              <div className="tip-item">
                <span className="tip-check">✓</span>
                <p>Go at your own pace - it's okay to pause anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="breathing-guide-section">
        <h4>🎯 How to Use This Exercise:</h4>
        <div className="guide-steps">
          <div className="guide-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h5>Choose a Pattern</h5>
              <p>Select a breathing pattern that feels comfortable</p>
            </div>
          </div>
          <div className="guide-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h5>Watch the Circle</h5>
              <p>Breathe in when it grows, out when it shrinks</p>
            </div>
          </div>
          <div className="guide-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h5>Follow the Timer</h5>
              <p>Follow the countdown for each breathing phase</p>
            </div>
          </div>
          <div className="guide-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h5>Celebrate Progress</h5>
              <p>Earn stars for every 3 cycles completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreathingExercise;