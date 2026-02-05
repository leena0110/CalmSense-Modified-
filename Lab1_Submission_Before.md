# Lab 1 Submission - CalmSense Application

**Student Name:** Leena Sri K  
**Roll Number:** CB.SC.U4CSE23526  
**Course:** Full Stack Development - Lab 1  
**Date:** February 2026

---

## 1. About the Use Case

CalmSense is a web-based sensory regulation application designed for autistic children (ages 6-12) to manage emotions and develop self-regulation skills. The child opens the app and sees a friendly home screen with four activity options. When feeling overwhelmed, the child navigates to "How Do You Feel?" and selects their emotion from six Inside Out-inspired characters (Joy, Sadness, Anger, Fear, Anxiety, Disgust). The system validates their feeling and suggests coping activities. The child can then use guided breathing exercises with visual animations, calming sensory tools (color mixer, fidget spinner, rain simulation), or mix nature sounds in Sound Therapy. Parents can configure accessibility settings like dark mode, font size, and sound controls. The app maintains child safety with no ads, external links, or data collection.

---

## 2. Project Structure (Before Extension)

```
CALMSENSE/
├── public/
│   ├── images/
│   │   ├── activities/
│   │   ├── backgrounds/
│   │   ├── characters/
│   │   └── misc/
│   ├── sounds/
│   ├── CalmSenselogo.png
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── AccessibilityToolbar.js/.css
│   │   ├── BreathingExercise.js/.css
│   │   ├── CalmingTools.js/.css
│   │   ├── EmotionRecognition.js/.css
│   │   ├── HomeScreen.js/.css
│   │   ├── SettingsPanel.js/.css
│   │   └── SoundTherapy.js/.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

---

## 3. Features Implemented in Lab 1

### 3.1 Home Screen
- Welcome message with character avatar
- Four activity cards with icons and descriptions
- Current mood indicator in header
- Settings button access

### 3.2 Breathing Exercises
- Three breathing patterns: 4-2-6 (Relax), 4-4-4 (Balance), 5-0-5 (Calm)
- Visual circle animation for inhale-hold-exhale guidance
- Timer and cycle tracking
- Celebration animations every 3 cycles

### 3.3 Calming Sensory Tools
- **Color Mixer:** Interactive color blending with name generation
- **Fidget Spinner:** Physics-based spinning with drag controls
- **Rain Simulation:** Animated rain with sound controls

### 3.4 Emotion Recognition
- Six emotions: Joy, Sadness, Anger, Fear, Anxiety, Disgust
- Inside Out-inspired character images
- Validation messages and coping suggestions
- Mood updates in header

### 3.5 Sound Therapy
- Six nature sounds: ocean, forest, birds, stream, wind, fire
- Individual volume controls
- Quick presets: Relax, Focus, Sleep, Nature

### 3.6 Accessibility Features
- Dark/Light mode toggle
- Adjustable font size (12-24px)
- Sound on/off controls
- Character avatar selection (girl/boy)

---

## 4. Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | React.js 18.2.0 |
| Styling | CSS3 with Flexbox/Grid |
| Audio | Web Audio API |
| Build Tool | Create React App |

---

## 5. Screenshots

### Home Screen
[Insert screenshot of Home Screen here]

### Breathing Exercise
[Insert screenshot of Breathing Exercise here]

### Emotion Recognition
[Insert screenshot of Emotion Recognition here]

### Sound Therapy
[Insert screenshot of Sound Therapy here]

### Settings Panel
[Insert screenshot of Settings Panel here]

---

## 6. GitHub Repository

**Repository URL:** [Insert your GitHub repo link here]

---

## 7. How to Run

```bash
# Clone repository
git clone <repository-url>

# Navigate to project
cd calmsense

# Install dependencies
npm install

# Start development server
npm start
```

---

**Submitted By:** Leena Sri K (CB.SC.U4CSE23526)
