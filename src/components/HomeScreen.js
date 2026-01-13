import React from 'react';
import './HomeScreen.css';

function HomeScreen({ activityCards, setCurrentScreen, currentMood, character }) {
  const moodMessages = {
  joy: "You're feeling happy! Let's keep the good vibes going! 🌈",
  sadness: "It's okay to feel sad. Let's find something calming to do. 🫂",
  anger: "Feeling angry is normal. Let's help you feel calmer. 🌬️",
  anxiety: "Take a deep breath. We'll find something soothing. 🌿",
  fear: "You're feeling scared. We're here to help you feel safe. 🛡️",
  disgust: "Feeling yucky? Let's find something fresh and clean. 🌿"
};

  const characterImages = {
    girl: '👧',
    boy: '👦'
  };

  const moodEmojis = {
  joy: '😊',
  sadness: '😔',
  anger: '😠',
  anxiety: '😰',
  calm: '😌',
  fear: '😨',
  disgust: '😖'
};

  return (
    <div className="home-screen">
      <div className="welcome-container">
        <div className="welcome-banner">
          <div className="welcome-content">
            <div className="character-welcome">
              <div className="character-avatar" role="img" aria-label="Avatar">
                {characterImages[character]}
              </div>
              <div className="welcome-text">
                <h2>Welcome to CalmSense</h2>
                <p className="subtitle">Your Safe Space for Sensory Regulation</p>
              </div>
            </div>
            
            <div className="instructions">
              <div className="instruction-icon">👉</div>
              <p className="instruction-text">
                Choose an activity below to help you feel calm and happy
              </p>
            </div>
          </div>
          
          <div className="mood-display">
            <div className="mood-card">
              <div className="mood-header">
                <span className="mood-title">How are you feeling?</span>
                <span className="mood-emoji-large">{moodEmojis[currentMood]}</span>
              </div>
              <div className="mood-body">
                <p className="mood-message">{moodMessages[currentMood]}</p>
                <div className="mood-suggestion">
                  <span className="suggestion-icon">💡</span>
                  <span className="suggestion-text">
                    Click "How Do You Feel?" to change your mood
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="activities-section">
        <h3 className="section-title">Choose Your Calm Activity</h3>
        <p className="section-subtitle">
          Each activity is designed to help you feel better and more regulated
        </p>
        
        <div className="activities-grid">
          {activityCards.map(card => (
            <div
              key={card.id}
              className="activity-card"
              onClick={() => setCurrentScreen(card.id)}
              style={{ '--card-color': card.bgColor }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && setCurrentScreen(card.id)}
              aria-label={`Go to ${card.title}`}
            >
              <div className="activity-icon">
                <img 
                  src={card.image || card.emoji} 
                  alt={card.title}
                  className="activity-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="activity-emoji">${card.emoji}</span>`;
                  }}
                />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="activity-hint">
                <span className="hint-text">Click to start</span>
                <span className="hint-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="safety-reminder">
        <div className="safety-content">
          <div className="safety-icon">💙</div>
          <div className="safety-text">
            <h4>You are safe here</h4>
            <p>
              Remember: All feelings are welcome. Take your time, go at your own pace, 
              and know that this is your calm space.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default HomeScreen;