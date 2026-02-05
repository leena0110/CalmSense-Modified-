# Lab 1 - Use Case Description

## CalmSense: Sensory Regulation Application for Autistic Children

**Student Name:** Leena Sri K  
**Roll Number:** CB.SC.U4CSE23526  
**Course:** Full Stack Development  
**Date:** February 2026

---

## 1. Project Overview

**Application Name:** CalmSense  
**Domain:** Healthcare / Mental Wellness / Special Education  
**Target Users:** Autistic children (ages 6-12) and their caregivers  

**Purpose:** CalmSense is a digital sensory regulation application designed to help autistic children manage emotions, practice calming techniques, and develop self-regulation skills in a safe, engaging, and accessible environment.

---

## 2. Actors

| Actor | Description |
|-------|-------------|
| **Primary Actor: Child User** | Autistic child (age 6-12) who uses the app for emotional regulation |
| **Secondary Actor: Parent/Caregiver** | Adult who configures settings and monitors child's progress |
| **System** | CalmSense application that provides therapeutic activities |

---

## 3. Use Case Diagram Description

### Main Use Cases:
1. **UC-01:** Perform Breathing Exercise
2. **UC-02:** Use Calming Tools
3. **UC-03:** Identify and Express Emotions
4. **UC-04:** Play Sound Therapy
5. **UC-05:** Configure Accessibility Settings

---

## 4. Detailed Use Case Descriptions

---

### UC-01: Perform Breathing Exercise

| Field | Description |
|-------|-------------|
| **Use Case ID** | UC-01 |
| **Use Case Name** | Perform Breathing Exercise |
| **Actor** | Child User |
| **Description** | Child performs guided breathing exercises with visual animations to calm down and regulate emotions |
| **Preconditions** | 1. Application is open and running<br>2. Child is on the home screen |
| **Postconditions** | 1. Child completes breathing cycles<br>2. Child feels calmer<br>3. Progress is displayed with celebration animation |

**Main Flow (Basic Path):**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Child clicks on "Breathing Exercise" card on home screen | System navigates to Breathing Exercise screen |
| 2 | Child selects a breathing pattern (Relax/Balance/Calm) | System displays the selected pattern details (4-2-6, 4-4-4, or 5-0-5) |
| 3 | Child clicks "Start" button | System begins the breathing animation cycle |
| 4 | Child follows the visual circle animation | System displays: "Breathe IN slowly..." with expanding circle |
| 5 | Child holds breath when prompted | System displays: "Hold gently..." with static circle |
| 6 | Child exhales when prompted | System displays: "Breathe OUT slowly..." with shrinking circle |
| 7 | Child completes multiple cycles | System tracks cycles and displays count |
| 8 | Child completes 3 cycles | System shows celebration animation with positive reinforcement |
| 9 | Child clicks "Stop" or "Home" button | System stops exercise and returns to home screen |

**Alternative Flows:**

| Alt Flow | Condition | Action |
|----------|-----------|--------|
| A1 | Child wants to change pattern mid-exercise | Child clicks different pattern; System resets and starts new pattern |
| A2 | Child wants to reset progress | Child clicks "Reset" button; System resets cycle count to 0 |
| A3 | Child feels overwhelmed | Child clicks "Home" button; System immediately returns to safe home screen |

**Exception Flows:**

| Exception | Condition | Action |
|-----------|-----------|--------|
| E1 | Sound is disabled in settings | System provides visual-only guidance without audio cues |

---

### UC-02: Use Calming Tools

| Field | Description |
|-------|-------------|
| **Use Case ID** | UC-02 |
| **Use Case Name** | Use Calming Tools |
| **Actor** | Child User |
| **Description** | Child interacts with sensory tools (Color Mixer, Fidget Spinner, Rain Simulation) for calming |
| **Preconditions** | 1. Application is open<br>2. Child is on home screen |
| **Postconditions** | 1. Child has interacted with calming tools<br>2. Child experiences sensory regulation |

**Main Flow (Basic Path):**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Child clicks "Calming Tools" card | System navigates to Calming Tools screen |
| 2 | Child selects a tool (Color Mixer/Fidget Spinner/Rain) | System displays the selected tool interface |
| 3a | **Color Mixer:** Child selects colors to mix | System blends colors and generates creative color names |
| 3b | **Fidget Spinner:** Child drags/swipes the spinner | System animates spinner with physics-based rotation |
| 3c | **Rain Simulation:** Child watches rain animation | System displays animated raindrops on window with optional sound |
| 4 | Child interacts freely with the tool | System responds to all touch/click interactions |
| 5 | Child clicks "Back" or switches tool | System navigates accordingly |

**Alternative Flows:**

| Alt Flow | Condition | Action |
|----------|-----------|--------|
| A1 | Child wants to switch between tools | Child clicks different tool tab; System loads new tool |
| A2 | Child adjusts rain sound volume | System adjusts audio level or mutes if sound disabled |

---

### UC-03: Identify and Express Emotions

| Field | Description |
|-------|-------------|
| **Use Case ID** | UC-03 |
| **Use Case Name** | Identify and Express Emotions |
| **Actor** | Child User |
| **Description** | Child identifies their current emotion using Inside Out-inspired characters and receives coping suggestions |
| **Preconditions** | 1. Application is open<br>2. Child is experiencing an emotion they want to express |
| **Postconditions** | 1. Child's mood is updated in system<br>2. Child receives validation and coping suggestions<br>3. Header mood indicator reflects selected emotion |

**Main Flow (Basic Path):**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Child clicks "How Do You Feel?" card | System navigates to Emotion Recognition screen |
| 2 | Child views all 6 emotion characters | System displays: Joy, Sadness, Anger, Fear, Anxiety, Disgust with large (180px) images |
| 3 | Child clicks on an emotion character | System highlights selected emotion with visual feedback |
| 4 | Child confirms selection | System displays: Validation message ("It's okay to feel...") |
| 5 | System shows emotion description | System explains why this emotion is important and valid |
| 6 | System suggests coping activities | System displays 3 recommended activities based on emotion |
| 7 | Child clicks suggested activity (optional) | System navigates to that activity |
| 8 | Child returns home | System updates mood indicator in header to show selected emotion |

**Alternative Flows:**

| Alt Flow | Condition | Action |
|----------|-----------|--------|
| A1 | Child cannot identify emotion | Child explores all characters by hovering/clicking each one |
| A2 | Child's emotion changes | Child can select different emotion; System updates accordingly |

**Emotion-Activity Mapping:**

| Emotion | Suggested Activities |
|---------|---------------------|
| Joy | Color Mixer, Bubble Popper, Upbeat Sounds |
| Sadness | Breathing Exercise, Rain Simulation, Ocean Waves |
| Anger | Breathing Exercise, Fidget Spinner, Bubble Popper |
| Fear | 4-2-6 Breathing, Rain Simulation, White Noise |
| Anxiety | 4-2-6 Breathing, Rain Simulation, Calming Sounds |
| Disgust | Color Mixer, Bubble Popper, Forest Sounds |

---

### UC-04: Play Sound Therapy

| Field | Description |
|-------|-------------|
| **Use Case ID** | UC-04 |
| **Use Case Name** | Play Sound Therapy |
| **Actor** | Child User |
| **Description** | Child listens to and mixes nature sounds for relaxation and focus |
| **Preconditions** | 1. Application is open<br>2. Sound is enabled in accessibility settings<br>3. Device has audio output capability |
| **Postconditions** | 1. Child has listened to calming sounds<br>2. Custom sound mix is playing (if created) |

**Main Flow (Basic Path):**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Child clicks "Sound Therapy" card | System navigates to Sound Therapy screen |
| 2 | Child views available sounds | System displays 6 sound options: Ocean, Forest, Birds, Stream, Wind, Fire |
| 3 | Child clicks on a sound icon | System starts playing that sound |
| 4 | Child adjusts volume slider | System adjusts individual sound volume |
| 5 | Child adds more sounds | System layers multiple sounds together |
| 6 | Child selects a preset (optional) | System applies preset: Relax, Focus, Sleep, or Nature |
| 7 | Child clicks sound again to stop | System stops that individual sound |
| 8 | Child returns home | System stops all sounds (or continues based on settings) |

**Alternative Flows:**

| Alt Flow | Condition | Action |
|----------|-----------|--------|
| A1 | Sound is disabled globally | System displays message: "Enable sounds in Settings" |
| A2 | Child wants all sounds off | Child clicks "Stop All" button; System mutes everything |

---

### UC-05: Configure Accessibility Settings

| Field | Description |
|-------|-------------|
| **Use Case ID** | UC-05 |
| **Use Case Name** | Configure Accessibility Settings |
| **Actor** | Parent/Caregiver (or Child) |
| **Description** | User configures app accessibility features for optimal experience |
| **Preconditions** | 1. Application is open |
| **Postconditions** | 1. Settings are applied immediately<br>2. Settings persist across sessions |

**Main Flow (Basic Path):**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | User clicks Settings (⚙️) button in header | System opens Settings panel overlay |
| 2 | User toggles Dark Mode | System switches between light/dark theme immediately |
| 3 | User adjusts Font Size slider (12-24px) | System updates all text sizes in real-time |
| 4 | User toggles Sound On/Off | System enables/disables all audio globally |
| 5 | User selects Character Avatar (Girl/Boy) | System updates avatar shown on home screen |
| 6 | User clicks "Close" or outside panel | System closes Settings panel and saves preferences |

**Settings Options:**

| Setting | Options | Default |
|---------|---------|---------|
| Dark Mode | On / Off | Off |
| Font Size | 12px - 24px | 16px |
| Sound | Enabled / Disabled | Enabled |
| Character | Girl / Boy | Girl |

---

## 5. Non-Functional Requirements

| Requirement | Description |
|-------------|-------------|
| **Accessibility** | WCAG-inspired guidelines; minimum 48×48px touch targets |
| **Safety** | No ads, no external links, no data collection |
| **Performance** | Smooth animations at 60fps; instant response to touch |
| **Responsiveness** | Works on Desktop (>1024px), Tablet (768-1024px), Mobile (<480px) |
| **Usability** | Simple, predictable interactions; immediate visual feedback |

---

## 6. System Requirements

| Component | Requirement |
|-----------|-------------|
| **Browser** | Chrome, Firefox, Safari, Edge (latest versions) |
| **Device** | Desktop, Tablet, or Mobile with touch support |
| **Audio** | Speakers or headphones for Sound Therapy feature |
| **Internet** | Required for initial load; works offline after caching |

---

## 7. Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend Framework** | React.js 18.2.0 |
| **Styling** | CSS3 with Flexbox/Grid |
| **Audio** | Web Audio API |
| **Build Tool** | Create React App |
| **Deployment** | Static hosting (Netlify/Vercel/GitHub Pages) |

---

## 8. Scenario Walkthrough (Complete User Journey)

### Scenario: "Maya's Anxiety Attack at School"

**Context:** Maya (8 years old, autistic) feels anxious before a school presentation. Her teacher opens CalmSense on the classroom tablet.

**Step-by-Step Journey:**

1. **Opening the App**
   - Maya sees the friendly CalmSense home screen with colorful activity cards
   - The interface is clean and not overwhelming

2. **Identifying Emotion**
   - Maya clicks "How Do You Feel?"
   - She sees the 6 emotion characters and recognizes "Anxiety" (😰)
   - She clicks on the Anxiety character
   - The app validates her feeling: "Feeling worried? Let's breathe together."
   - Suggested activities appear: 4-2-6 Breathing, Rain Simulation, Sound Therapy

3. **Starting Breathing Exercise**
   - Maya clicks on "4-2-6 Breathing" suggestion
   - She sees a large calming circle and selects "Relax" pattern
   - She clicks "Start" and follows the visual guide:
     - Circle expands: "Breathe IN slowly..." (4 seconds)
     - Circle holds: "Hold gently..." (2 seconds)
     - Circle shrinks: "Breathe OUT slowly..." (6 seconds)
   - After 3 cycles, she sees a celebration: "Great job! 🎉"

4. **Adding Sound Therapy**
   - Feeling calmer, Maya wants background sounds
   - She navigates to Sound Therapy
   - She selects "Ocean Waves" and "Birds" sounds
   - She adjusts volumes to her preference
   - The layered nature sounds help her relax further

5. **Updating Settings**
   - Maya's teacher enables Dark Mode (less harsh on eyes)
   - Increases font size to 20px for better readability
   - The app immediately reflects these changes

6. **Returning to Home**
   - Maya clicks "Home" button
   - Her mood indicator now shows "😌" (calm)
   - She feels ready for her presentation

**Outcome:** Maya successfully used CalmSense to regulate her anxiety using breathing exercises and sound therapy. The accessible, child-friendly interface allowed her to navigate independently.

---

## 9. Use Case Summary Table

| UC ID | Use Case Name | Primary Actor | Priority |
|-------|---------------|---------------|----------|
| UC-01 | Perform Breathing Exercise | Child User | High |
| UC-02 | Use Calming Tools | Child User | High |
| UC-03 | Identify and Express Emotions | Child User | High |
| UC-04 | Play Sound Therapy | Child User | Medium |
| UC-05 | Configure Accessibility Settings | Parent/Caregiver | Medium |

---

## 10. Conclusion

CalmSense provides a comprehensive, accessible, and safe digital environment for autistic children to develop emotional self-regulation skills. The application combines evidence-based therapeutic techniques (breathing exercises, sensory tools, emotion recognition) with child-friendly design principles to create an effective wellness tool.

---

**Document Prepared By:** Leena Sri K (CB.SC.U4CSE23526)  
**Date:** February 2026  
**Version:** 1.0
