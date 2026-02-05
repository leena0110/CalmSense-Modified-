# Lab Evaluation - 1

**Student Name:** Leena Sri K  
**Roll Number:** CB.SC.U4CSE23526  
**Course:** Full Stack Development  
**Date:** 5/2/2026  
**Total Marks:** 50

---

## 1. About the Use Case

CalmSense is a web-based sensory regulation application designed for autistic children (ages 6-12) to manage emotions and develop self-regulation skills. The child opens the app and sees a friendly home screen with four activity options. When feeling overwhelmed, the child navigates to "How Do You Feel?" and selects their emotion from six Inside Out-inspired characters (Joy, Sadness, Anger, Fear, Anxiety, Disgust). The system validates their feeling and suggests coping activities. The child can then use guided breathing exercises with visual animations, calming sensory tools (color mixer, fidget spinner, rain simulation), or mix nature sounds in Sound Therapy. Parents can configure accessibility settings like dark mode, font size, and sound controls. The app maintains child safety with no ads, external links, or data collection.

---

## 2. GitHub Repository

**Repository URL:** [Insert your GitHub repo link here]

**Lab 1 (Before Extension):** Uploaded separately

---

## 3. Extension Completed Today

### 3a. New Webpage Added: Mood Journal (Forms)

A new **Mood Journal** page has been added with a complete form for children to log their daily emotions.

**Features of the Form:**
- Text input for child's name
- Date picker for entry date
- Dropdown select for emotion selection
- Textarea for describing feelings
- Range slider for intensity level (1-10)
- Submit button with form validation
- Success message display
- List of past entries

**Route:** `/journal`

### 3b. Routing Implementation

Installed `react-router-dom` and implemented routing:
- `/` → Home Screen
- `/breathing` → Breathing Exercise
- `/calming` → Calming Tools
- `/emotion` → Emotion Recognition
- `/sounds` → Sound Therapy
- `/journal` → Mood Journal (NEW)

---

## 4. Concepts Implemented - Table

| Concept | Code Proof / Screenshot |
|---------|------------------------|
| **Function Component** | **File:** `HomeScreen.js`<br>```jsx<br>function HomeScreen({ activityCards, setCurrentScreen }) {<br>  return (<br>    <div className="home-screen">...</div><br>  );<br>}<br>```<br>[Insert Screenshot] |
| **Class Component** | **File:** `MoodJournal.js` (Lines 25-165)<br>```jsx<br>class MoodJournal extends Component {<br>  constructor(props) {<br>    super(props);<br>    this.state = {<br>      formData: {...},<br>      entries: [],<br>      submitted: false<br>    };<br>  }<br>  render() { return (...); }<br>}<br>```<br>[Insert Screenshot] |
| **Event** | **File:** `MoodJournal.js` (Lines 46-68)<br>```jsx<br>handleChange(e) {<br>  const { name, value } = e.target;<br>  this.setState(prevState => ({<br>    formData: { ...prevState.formData, [name]: value }<br>  }));<br>}<br><br>handleSubmit(e) {<br>  e.preventDefault();<br>  this.setState(prevState => ({<br>    entries: [...prevState.entries, prevState.formData]<br>  }));<br>}<br>```<br>**Usage:** `onChange={this.handleChange}`, `onSubmit={this.handleSubmit}`<br>[Insert Screenshot] |
| **State Management** | **File:** `MoodJournal.js` (Lines 29-40)<br>```jsx<br>// In constructor:<br>this.state = {<br>  formData: {<br>    childName: '',<br>    date: '',<br>    emotion: '',<br>    description: '',<br>    intensity: 5<br>  },<br>  entries: [],<br>  submitted: false<br>};<br><br>// Updating state:<br>this.setState({ submitted: true });<br>```<br>[Insert Screenshot] |
| **Stateless Component** | **File:** `MoodJournal.js` (Lines 6-22)<br>```jsx<br>// No state, only props<br>const EntryCard = ({ entry, index }) => {<br>  return (<br>    <div className="entry-card"><br>      <p><strong>{entry.childName}</strong> - {entry.date}</p><br>      <p>Feeling: {entry.emotion}</p><br>    </div><br>  );<br>};<br><br>const SuccessMessage = () => {<br>  return (<br>    <div className="success-message"><br>      ✅ Entry saved successfully!<br>    </div><br>  );<br>};<br>```<br>[Insert Screenshot] |
| **Forms** | **File:** `MoodJournal.js` (Lines 80-140)<br>```jsx<br><form onSubmit={this.handleSubmit}><br>  <input type="text" name="childName" <br>    value={formData.childName} <br>    onChange={this.handleChange} required /><br>  <input type="date" name="date" ... /><br>  <select name="emotion" ...>...</select><br>  <textarea name="description" ... /><br>  <input type="range" name="intensity" ... /><br>  <button type="submit">Save Entry</button><br></form><br>```<br>[Insert Screenshot] |
| **Routing** | **File:** `App.js`<br>```jsx<br>import { Routes, Route, Link, useNavigate } from 'react-router-dom';<br><br><Routes><br>  <Route path="/" element={<HomeScreen />} /><br>  <Route path="/breathing" element={<BreathingExercise />} /><br>  <Route path="/calming" element={<CalmingTools />} /><br>  <Route path="/emotion" element={<EmotionRecognition />} /><br>  <Route path="/sounds" element={<SoundTherapy />} /><br>  <Route path="/journal" element={<MoodJournal />} /><br></Routes><br>```<br>[Insert Screenshot] |
| **Hooks** | **File:** `App.js`<br>```jsx<br>// useState Hook<br>const [currentMood, setCurrentMood] = useState('calm');<br>const [accessibilitySettings, setAccessibilitySettings] = useState({...});<br><br>// useNavigate Hook<br>const navigate = useNavigate();<br>navigate('/journal');<br>```<br>**File:** `BreathingExercise.js`<br>```jsx<br>// useEffect Hook<br>useEffect(() => {<br>  // Timer logic<br>}, [isBreathing]);<br>```<br>[Insert Screenshot] |

---

## 5. Screenshots

### 5.1 Home Screen with Navigation
[Insert Screenshot - showing Journal link in header]

### 5.2 Mood Journal Form (Empty)
[Insert Screenshot - showing empty form]

### 5.3 Mood Journal Form (Filled)
[Insert Screenshot - showing filled form before submit]

### 5.4 Mood Journal (After Submit)
[Insert Screenshot - showing success message and entry list]

### 5.5 Routing in Action
[Insert Screenshot - showing URL change /journal]

---

## 6. Project Structure (After Extension)

```
CALMSENSE/
├── src/
│   ├── components/
│   │   ├── HomeScreen.js         ← Function Component
│   │   ├── BreathingExercise.js  ← Hooks (useState, useEffect)
│   │   ├── MoodJournal.js        ← Class Component + Forms + Events
│   │   ├── MoodJournal.css       ← NEW
│   │   └── ... (other components)
│   ├── App.js                    ← Routing + useNavigate Hook
│   └── index.js                  ← BrowserRouter
├── package.json                  ← Added react-router-dom
└── README.md
```

---

## 7. New Dependencies Added

```json
{
  "dependencies": {
    "react-router-dom": "^6.x.x"
  }
}
```

---

## 8. How to Run

```bash
# Navigate to project
cd calmsense

# Install dependencies (includes react-router-dom)
npm install

# Start development server
npm start

# Access the app
# Home: http://localhost:3000/
# Journal: http://localhost:3000/journal
```

---

## 9. Reference

- React JS Concepts: https://www.tutorialspoint.com/reactjs/index.htm

---

## 10. Marking Criteria

| Criteria | Marks | Self-Assessment |
|----------|-------|-----------------|
| UI Aspects | 10 | Clean, child-friendly interface with accessibility features |
| Concepts Implemented from React JS | 30 | All concepts implemented: Function Component, Class Component, Events, State Management, Stateless Component, Forms, Routing, Hooks |
| Extension Level | 10 | Added complete Mood Journal page with forms, routing, and multiple React concepts |
| **Total** | **50** | |

---

**Submitted By:** Leena Sri K (CB.SC.U4CSE23526)  
**Date:** 5/2/2026
