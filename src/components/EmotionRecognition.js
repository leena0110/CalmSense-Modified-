import React, { useState } from 'react';
import './EmotionRecognition.css';

function EmotionRecognition({ currentMood, setCurrentMood }) {
  const [selectedEmotion, setSelectedEmotion] = useState(currentMood);
  const [imageErrors, setImageErrors] = useState({});
  
  const emotions = [
    { 
      id: 'joy', 
      label: 'Joy', 
      emoji: '😊',
      color: '#FFD700',
      description: "You're feeling happy and excited!",
      characterImage: '/images/characters/joy.png'
    },
    { 
      id: 'sadness', 
      label: 'Sadness', 
      emoji: '😔',
      color: '#2196F3',
      description: "It's okay to feel blue sometimes.",
      characterImage: '/images/characters/sadness.png'
    },
    { 
      id: 'anger', 
      label: 'Anger', 
      emoji: '😠',
      color: '#F44336',
      description: "Feeling fiery? Let's cool down.",
      characterImage: '/images/characters/anger.png'
    },
    { 
      id: 'fear', 
      label: 'Fear', 
      emoji: '😨',
      color: '#9C27B0',
      description: "It's scary, but you're safe here.",
      characterImage: '/images/characters/fear.png'
    },
    { 
      id: 'disgust', 
      label: 'Disgust', 
      emoji: '😖',
      color: '#4CAF50',
      description: "Yucky feelings happen to everyone.",
      characterImage: '/images/characters/disgust.png'
    },
    { 
      id: 'anxiety', 
      label: 'Anxiety', 
      emoji: '😰',
      color: '#FF9800',
      description: "Feeling worried? Let's breathe together.",
      characterImage: '/images/characters/anxiety.png' // Using fear image for anxiety
    }
  ];

  const suggestedActivities = {
    joy: [
      { activity: 'Color Mixer', description: 'Mix fun colors to celebrate!', icon: '🎨' },
      { activity: 'Bubble Popper', description: 'Pop bubbles for more joy', icon: '🫧' },
      { activity: 'Sound Therapy', description: 'Listen to happy nature sounds', icon: '🎵' }
    ],
    sadness: [
      { activity: 'Breathing Exercise', description: 'Gentle breathing to feel better', icon: '🌬️' },
      { activity: 'Rain on Window', description: 'Watch calming rain', icon: '🌧️' },
      { activity: 'Sound Therapy', description: 'Soft ocean waves', icon: '🎵' }
    ],
    anger: [
      { activity: 'Breathing Exercise', description: 'Calm breathing to release anger', icon: '🌬️' },
      { activity: 'Fidget Spinner', description: 'Spin to release energy', icon: '🌀' },
      { activity: 'Bubble Popper', description: 'Pop bubbles safely', icon: '🫧' }
    ],
    fear: [
      { activity: '4-2-6 Breathing', description: 'Special breathing for fear', icon: '🌬️' },
      { activity: 'Rain on Window', description: 'Focus on gentle rain', icon: '🌧️' },
      { activity: 'Sound Therapy', description: 'White noise to calm mind', icon: '🎵' }
    ],
    anxiety: [
      { activity: '4-2-6 Breathing', description: 'Special breathing for anxiety', icon: '🌬️' },
      { activity: 'Rain on Window', description: 'Focus on gentle rain', icon: '🌧️' },
      { activity: 'Sound Therapy', description: 'White noise to calm mind', icon: '🎵' }
    ],
    disgust: [
      { activity: 'Color Mixer', description: 'Create fresh new colors', icon: '🎨' },
      { activity: 'Bubble Popper', description: 'Pop away yucky feelings', icon: '🫧' },
      { activity: 'Sound Therapy', description: 'Clean forest sounds', icon: '🎵' }
    ]
  };

  const emotionDescriptions = {
    joy: "Joy helps us appreciate happy moments and celebrate good times. She's always looking for the bright side!",
    sadness: "Sadness helps us slow down, ask for help, and connect with others who care about us.",
    anger: "Anger alerts us when something isn't fair. It helps us set boundaries and stand up for ourselves.",
    fear: "Fear keeps us safe from danger and helps us prepare for challenges. It's our protective emotion.",
    anxiety: "Anxiety is like a warning signal. It helps us be careful and prepare. Take deep breaths and remember you're safe.",
    disgust: "Disgust protects us from things that might be harmful or gross. It helps us make healthy choices."
  };

  const handleEmotionSelect = (emotionId) => {
    setSelectedEmotion(emotionId);
    setCurrentMood(emotionId);
  };

  // Handle image errors safely
  const handleImageError = (emotionId) => {
    setImageErrors(prev => ({
      ...prev,
      [emotionId]: true
    }));
  };

  const currentEmotion = emotions.find(e => e.id === selectedEmotion) || emotions[0];

  return (
    <div className="emotion-container">
      <div className="emotion-header">
        <h2>🎭 How Are You Feeling Today?</h2>
        <p className="emotion-subtitle">
          All feelings are welcome here. Choose how you feel right now.
        </p>
      </div>

      <div className="emotion-intro">
        <div className="intro-card">
          <div className="intro-icon">💭</div>
          <div className="intro-content">
            <h3>It's Okay to Feel</h3>
            <p>Every emotion has a purpose. Recognizing how we feel is the first step to feeling better.</p>
          </div>
        </div>
      </div>

      <div className="emotion-selection-section">
        <h3>Tap how you're feeling:</h3>
        <div className="emotion-grid emotion-grid-3x3">
          {emotions.map(emotion => (
            <button
              key={emotion.id}
              className={`emotion-card ${selectedEmotion === emotion.id ? 'selected' : ''}`}
              onClick={() => handleEmotionSelect(emotion.id)}
              style={{ 
                '--emotion-color': emotion.color,
                backgroundColor: selectedEmotion === emotion.id ? `${emotion.color}20` : 'rgba(255, 255, 255, 0.9)'
              }}
              aria-label={`Select ${emotion.label} emotion`}
            >
              <div className="emotion-visual">
                <div className="character-image-container-large">
                  {!imageErrors[emotion.id] ? (
                    <img 
                      src={emotion.characterImage} 
                      alt={emotion.label}
                      className="character-image-large"
                      onError={() => handleImageError(emotion.id)}
                    />
                  ) : (
                    <span className="character-emoji-large">{emotion.emoji}</span>
                  )}
                </div>
                <div 
                  className="emotion-circle"
                  style={{ 
                    backgroundColor: emotion.color,
                    boxShadow: `0 8px 25px ${emotion.color}80`
                  }}
                ></div>
              </div>
              <div className="emotion-info">
                <h4 className="emotion-name">{emotion.label}</h4>
                <p className="emotion-tagline">{emotion.description}</p>
                {selectedEmotion === emotion.id && (
                  <div className="selected-indicator">
                    <span className="indicator-icon">✓</span>
                    <span className="indicator-text">Selected</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentEmotion && (
        <div className="emotion-details-section">
          <div className="current-emotion-display">
            <div className="emotion-highlight">
              <div 
                className="highlight-circle-large"
                style={{ 
                  backgroundColor: currentEmotion.color,
                  boxShadow: `0 15px 40px ${currentEmotion.color}80`
                }}
              >
                <div className="highlight-content-large">
                  {!imageErrors[currentEmotion.id] ? (
                    <img 
                      src={currentEmotion.characterImage} 
                      alt={currentEmotion.label}
                      className="highlight-character-large"
                      onError={() => handleImageError(currentEmotion.id)}
                    />
                  ) : (
                    <span className="highlight-emoji-large">{currentEmotion.emoji}</span>
                  )}
                  <span className="highlight-label-large">{currentEmotion.label}</span>
                </div>
              </div>
            </div>
            
            <div className="emotion-message">
              <div className="message-header">
                <span className="message-icon">💬</span>
                <h3>You're feeling {currentEmotion.label}</h3>
              </div>
              <p className="message-text">{emotionDescriptions[selectedEmotion] || "Your feelings are important and valid."}</p>
              
              <div className="validation-card">
                <div className="validation-icon">💙</div>
                <div className="validation-text">
                  <p><strong>It's okay to feel {currentEmotion.label.toLowerCase()}.</strong></p>
                  <p>Thank you for sharing how you feel. Your feelings are important.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="suggested-activities-section">
            <div className="section-header">
              <h4>✨ Suggested Activities for {currentEmotion.label}</h4>
              <p className="section-subtitle">
                Try these calming activities that might help you feel better
              </p>
            </div>
            
            <div className="activity-suggestions">
              {(suggestedActivities[selectedEmotion] || suggestedActivities.joy).map((item, index) => (
                <div key={index} className="activity-suggestion">
                  <div className="suggestion-number">{index + 1}</div>
                  <div className="suggestion-icon">{item.icon}</div>
                  <div className="suggestion-details">
                    <h5>{item.activity}</h5>
                    <p>{item.description}</p>
                  </div>
                  <div className="suggestion-arrow">→</div>
                </div>
              ))}
            </div>
          </div>

          <div className="emotion-tips-section">
            <h4>📝 Tips for when you feel {currentEmotion.label.toLowerCase()}:</h4>
            <div className="tips-container">
              {selectedEmotion === 'joy' && (
                <div className="tips-grid">
                  <div className="tip-item">
                    <div className="tip-icon">🎉</div>
                    <p>Celebrate your happiness!</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">📝</div>
                    <p>Write down what made you happy</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🤗</div>
                    <p>Share your joy with someone</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🎨</div>
                    <p>Create something colorful</p>
                  </div>
                </div>
              )}
              {selectedEmotion === 'sadness' && (
                <div className="tips-grid">
                  <div className="tip-item">
                    <div className="tip-icon">🫂</div>
                    <p>It's okay to cry or be quiet</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">☕</div>
                    <p>Do something comforting</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">⏳</div>
                    <p>Remember sadness passes like weather</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">📖</div>
                    <p>Read a comforting story</p>
                  </div>
                </div>
              )}
              {selectedEmotion === 'anger' && (
                <div className="tips-grid">
                  <div className="tip-item">
                    <div className="tip-icon">🌬️</div>
                    <p>Take 10 deep breaths</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🤸</div>
                    <p>Try stretching or gentle movement</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">💭</div>
                    <p>Count slowly to 10 before reacting</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">✏️</div>
                    <p>Draw how you feel</p>
                  </div>
                </div>
              )}
              {(selectedEmotion === 'fear' || selectedEmotion === 'anxiety') && (
                <div className="tips-grid">
                  <div className="tip-item">
                    <div className="tip-icon">👁️</div>
                    <p>Name 5 things you can see</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🤲</div>
                    <p>Hold something comforting</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">⏰</div>
                    <p>Remember fear/anxiety is temporary</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🌿</div>
                    <p>Focus on your breathing</p>
                  </div>
                </div>
              )}
              {selectedEmotion === 'disgust' && (
                <div className="tips-grid">
                  <div className="tip-item">
                    <div className="tip-icon">🌿</div>
                    <p>Find something fresh and clean</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🎨</div>
                    <p>Create something beautiful</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🚫</div>
                    <p>It's okay to say no to yucky things</p>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">💧</div>
                    <p>Drink cold water</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="emotion-reminders">
            <div className="reminder-card">
              <div className="reminder-icon">🌈</div>
              <div className="reminder-content">
                <h5>All Feelings Are Temporary</h5>
                <p>Emotions come and go like weather. No feeling lasts forever.</p>
              </div>
            </div>
            <div className="reminder-card">
              <div className="reminder-icon">🤗</div>
              <div className="reminder-content">
                <h5>You're Safe Here</h5>
                <p>However you feel, you're welcome here in this calm space.</p>
              </div>
            </div>
            <div className="reminder-card">
              <div className="reminder-icon">💪</div>
              <div className="reminder-content">
                <h5>Sharing Makes You Strong</h5>
                <p>Recognizing and sharing feelings is a sign of strength.</p>
              </div>
            </div>
          </div>

          <div className="inside-out-info">
            <div className="info-header">
              <span className="info-icon">🎬</span>
              <h4>About Emotions</h4>
            </div>
            <p className="info-text">
              Each emotion has an important job in our lives. They help us understand 
              ourselves and connect with others. Learning about our feelings helps us 
              navigate the world in a healthy way.
            </p>
            <div className="info-tip">
              <span className="tip-icon">💡</span>
              <p><strong>Tip:</strong> Try naming your emotions throughout the day. It helps!</p>
            </div>
          </div>
        </div>
      )}

      <div className="emotion-encouragement">
        <div className="encouragement-content">
          <div className="encouragement-icon">🌟</div>
          <div className="encouragement-text">
            <h4>You're Doing Great!</h4>
            <p>Checking in with your feelings is an important skill. Keep practicing!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmotionRecognition;