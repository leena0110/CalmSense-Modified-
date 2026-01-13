import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import BreathingExercise from './components/BreathingExercise';
import CalmingTools from './components/CalmingTools';
import EmotionRecognition from './components/EmotionRecognition';
import SoundTherapy from './components/SoundTherapy';
import SettingsPanel from './components/SettingsPanel'; // We'll create this
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    darkMode: false,
    soundEnabled: true,
    fontSize: 16
  });
  const [currentMood, setCurrentMood] = useState('calm');
  const [character, setCharacter] = useState('girl');
  const [showSettings, setShowSettings] = useState(false); // New state for settings panel

  const updateSettings = (key, value) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Apply settings to document
    if (key === 'darkMode') {
      document.body.classList.toggle('dark-mode', value);
    }
    if (key === 'fontSize') {
      document.documentElement.style.fontSize = `${value}px`;
    }
  };

  const activityCards = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      emoji: '🌬️',
      description: 'Calm breathing with circles',
      bgColor: '#E3F2FD',
      image: '/images/activities/breathing.png'
    },
    {
      id: 'calming',
      title: 'Calming Tools',
      emoji: '🫧',
      description: 'Bubbles, colors & more',
      bgColor: '#F3E5F5',
      image: '/images/activities/bubbles.png'
    },
    {
      id: 'emotion',
      title: 'How Do You Feel?',
      emoji: '😊',
      description: 'Share your feelings',
      bgColor: '#E8F5E9',
      image: '/images/activities/feelings.png'
    },
    {
      id: 'sounds',
      title: 'Sound Therapy',
      emoji: '🎵',
      description: 'Nature & calming sounds',
      bgColor: '#FFF3E0',
      image: '/images/activities/sounds.png'
    }
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'breathing':
        return <BreathingExercise soundEnabled={accessibilitySettings.soundEnabled} />;
      case 'calming':
        return <CalmingTools soundEnabled={accessibilitySettings.soundEnabled} />;
      case 'emotion':
        return <EmotionRecognition currentMood={currentMood} setCurrentMood={setCurrentMood} />;
      case 'sounds':
        return <SoundTherapy soundEnabled={accessibilitySettings.soundEnabled} />;
      default:
        return (
          <HomeScreen 
            activityCards={activityCards}
            setCurrentScreen={setCurrentScreen}
            currentMood={currentMood}
            character={character}
          />
        );
    }
  };

  const appStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url('/images/backgrounds/home-bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'relative'
  };

  return (
    <div 
      className={`app-container ${accessibilitySettings.darkMode ? 'dark' : ''}`}
      style={appStyle}
    >
      {/* Settings Panel Overlay */}
      <SettingsPanel 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={accessibilitySettings}
        updateSettings={updateSettings}
        character={character}
        setCharacter={setCharacter}
      />
      
      <header className="app-header">
        <div className="header-left">
          <img src="/CalmSenselogo.png" alt="CalmSense Logo" className="header-logo" />
          <h1>CalmSense</h1>
        </div>
        
        <div className="header-right">
          <div className="mood-indicator">
            <span className="mood-label">Current Mood:</span>
            <span className="mood-emoji">
              {currentMood === 'joy' && '😊'}
              {currentMood === 'sadness' && '😔'}
              {currentMood === 'anger' && '😠'}
              {currentMood === 'fear' && '😨'}
              {currentMood === 'anxiety' && '😰'}
              {currentMood === 'disgust' && '😖'}
              {currentMood === 'calm' && '😌'}
            </span>
          </div>
          
          <button 
            className="settings-button"
            onClick={() => setShowSettings(true)}
            aria-label="Open settings"
          >
            <span className="settings-icon">⚙️</span>
            <span className="settings-text">Settings</span>
          </button>
          
          {currentScreen !== 'home' && (
            <button 
              className="home-button"
              onClick={() => setCurrentScreen('home')}
              aria-label="Go back to home"
            >
              🏠 Home
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        {renderScreen()}
      </main>

      <footer className="app-footer">
        <p>Designed with care for autistic children • Safe & Calm Space</p>
        <p className="student-info">RollNo: CB.SC.U4CSE23526 • Name: LEENA SRI K</p>
      </footer>
    </div>
  );
}

export default App;