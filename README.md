CalmSense - Sensory Regulation Application for Autistic Children

📋 About the Project
CalmSense is a digital sensory regulation application designed specifically for autistic children to help them manage emotions, practice calming techniques, and develop self-regulation skills in a safe, engaging environment.

🎯 Key Features
Breathing Exercises - Guided breathing with visual animations

Calming Sensory Tools - Color mixer, fidget spinner, rain simulation

Emotion Recognition - Inside Out-inspired character interactions

Sound Therapy - Customizable nature soundscapes

Accessibility First - Dark mode, adjustable fonts, sound controls

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)

npm or yarn

Installation

# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd calmsense

# Install dependencies
npm install

# Start development server
npm start
Build for Production
bash
npm run build
🏗️ Project Structure
CALMSENSE/
├── public/
│   ├── images/
│   │   ├── activities/        # Activity icons
│   │   ├── backgrounds/       # Screen backgrounds
│   │   ├── characters/        # Emotion characters
│   │   └── misc/              # Additional graphics
│   ├── sounds/                # Audio files for sound therapy
│   ├── CalmSenselogo.png      # Application logo
│   ├── favicon.ico           # Browser icon
│   ├── index.html            # Main HTML file
│   ├── manifest.json         # PWA configuration
│   ├── robots.txt            # Search engine instructions
│   ├── logo192.png           # PWA icon (small)
│   └── logo512.png           # PWA icon (large)
├── src/
│   ├── components/           # React components
│   │   ├── AccessibilityToolbar.js/.css
│   │   ├── BreathingExercise.js/.css
│   │   ├── CalmingTools.js/.css
│   │   ├── EmotionRecognition.js/.css
│   │   ├── HomeScreen.js/.css
│   │   ├── SettingsPanel.js/.css
│   │   └── SoundTherapy.js/.css
│   ├── App.js               # Main application component
│   ├── App.css              # Main styles
│   ├── App.test.js          # Test file
│   ├── index.js             # Application entry point
│   ├── index.css            # Global styles
│   ├── logo.svg             # React logo
│   ├── reportWebVitals.js   # Performance monitoring
│   └── setupTests.js        # Test configuration
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
├── package-lock.json        # Dependency lock file
└── README.md               # This file
🛠️ Technology Stack
Frontend: React.js 18.2.0

Styling: CSS3 with Grid/Flexbox

Audio: Web Audio API

Build Tool: Create React App

Deployment: Static hosting (Netlify/Vercel/GitHub Pages)

📱 Features in Detail
1. Breathing Exercises
Three breathing patterns: 4-2-6 (Relax), 4-4-4 (Balance), 5-0-5 (Calm)

Visual circle animation for guidance

Timer and cycle tracking

Celebration animations every 3 cycles

2. Calming Sensory Tools
Color Mixer: Interactive color blending with name generation

Fidget Spinner: Physics-based spinning with drag controls

Rain Simulation: Animated rain with sound controls

3. Emotion Recognition
Six emotions (Joy, Sadness, Anger, Fear, Anxiety, Disgust)

Large character images (180px) for clear visibility

Validation messages and coping suggestions

Mood updates in header

4. Sound Therapy
Six nature sounds: ocean, forest, birds, stream, wind, fire

Individual volume controls for each sound

Quick presets (Relax, Focus, Sleep, Nature)

Visual sound mixer display

5. Accessibility Features
Dark/Light mode toggle

Adjustable font size (12-24px)

Sound on/off controls

Character avatar selection (girl/boy)

Touch-optimized interfaces

🎨 Design Principles
Simplicity: Clean, uncluttered interfaces

Consistency: Predictable interactions

Accessibility: WCAG-inspired guidelines

Engagement: Interactive elements with immediate feedback

Safety: No ads, no external links, no data collection

📱 Responsive Design
Desktop (>1024px): Multi-column layouts

Tablet (768-1024px): 2-column adaptive grids

Mobile (<480px): Single-column touch-optimized

Minimum touch target: 48×48px

🔧 Customization
The application can be easily customized by:

Adding new emotion characters in /public/images/characters/

Adding new sound files in /public/sounds/

Modifying color themes in CSS variables

Adding new breathing patterns in BreathingExercise.js

🧪 Testing
bash
# Run test suite
npm test

# Run with coverage
npm test -- --coverage
📄 License
This project is developed for educational purposes as part of academic coursework.

👤 Author
Leena Sri K
Roll No: CB.SC.U4CSE23526
Academic Project - Sensory Regulation Application

🙏 Acknowledgments
Inspired by Inside Out characters for emotion recognition

Nature sounds sourced from free, royalty-free libraries

Designed with guidance from autism therapy resources

Built with accessibility as a primary concern

Designed with care for autistic children • Safe & Calm Space