import React, { Component } from 'react';
import './MoodJournal.css';

// STATELESS COMPONENT - No state, only receives props and displays data
const EntryCard = ({ entry, index }) => {
  return (
    <div className="entry-card">
      <p><strong>{entry.childName}</strong> - {entry.date}</p>
      <p>Feeling: {entry.emotion} (Intensity: {entry.intensity}/10)</p>
      <p>{entry.description}</p>
    </div>
  );
};

// STATELESS COMPONENT - Simple display component with no state
const SuccessMessage = () => {
  return (
    <div className="success-message">
      ✅ Entry saved successfully!
    </div>
  );
};

// CLASS COMPONENT - Uses this.state and this.setState for state management
class MoodJournal extends Component {
  // Constructor for initializing state
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        childName: '',
        date: '',
        emotion: '',
        description: '',
        intensity: 5
      },
      entries: [],
      submitted: false
    };

    // Binding event handlers to this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // EVENT HANDLER - for input changes
  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }

  // EVENT HANDLER - for form submission
  handleSubmit(e) {
    e.preventDefault();
    
    // STATE MANAGEMENT - updating state with setState
    this.setState(prevState => ({
      entries: [...prevState.entries, prevState.formData],
      submitted: true,
      formData: {
        childName: '',
        date: '',
        emotion: '',
        description: '',
        intensity: 5
      }
    }));

    // Hide success message after 3 seconds
    setTimeout(() => {
      this.setState({ submitted: false });
    }, 3000);
  }

  // Render method - required in class components
  render() {
    const { formData, entries, submitted } = this.state;

    return (
      <div className="mood-journal">
        <h2>📔 Mood Journal</h2>
        <p>Write about how you're feeling today</p>

        {/* FORM - with controlled inputs */}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              name="childName"
              value={formData.childName}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>How do you feel?</label>
            <select
              name="emotion"
              value={formData.emotion}
              onChange={this.handleChange}
              required
            >
              <option value="">Select emotion...</option>
              <option value="joy">😊 Joy</option>
              <option value="sadness">😔 Sadness</option>
              <option value="anger">😠 Anger</option>
              <option value="fear">😨 Fear</option>
              <option value="anxiety">😰 Anxiety</option>
              <option value="calm">😌 Calm</option>
            </select>
          </div>

          <div className="form-group">
            <label>What happened?</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={this.handleChange}
              rows="4"
              placeholder="Tell us about your day..."
            />
          </div>

          <div className="form-group">
            <label>Intensity (1-10): {formData.intensity}</label>
            <input
              type="range"
              name="intensity"
              min="1"
              max="10"
              value={formData.intensity}
              onChange={this.handleChange}
            />
          </div>

          {/* EVENT - onClick/onSubmit */}
          <button type="submit" className="submit-btn">
            Save Entry 📝
          </button>
        </form>

        {/* STATELESS COMPONENT usage */}
        {submitted && <SuccessMessage />}

        {entries.length > 0 && (
          <div className="entries-list">
            <h3>Past Entries</h3>
            {/* STATELESS COMPONENT with props */}
            {entries.map((entry, index) => (
              <EntryCard key={index} entry={entry} index={index} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MoodJournal;