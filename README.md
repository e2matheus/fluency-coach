# Fluency Coach

An application that generates stories, in both the native and the target language, and helps users to practice and improve their pronunciation and intonation.

## Running the Application Locally

1. Clone the repository and install dependencies:
    ```bash
    # Clone repository
    git clone [your-repo-url]
    cd fluency-coach

    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

2. Start the servers:
    ```bash
    # Terminal 1: Start backend server
    cd server
    npm run dev

    # Terminal 2: Start frontend server
    cd client
    npm run dev
    ```

3. Access the application:
    - Open `http://localhost:5173` in your browser
    - Ensure your browser supports speech synthesis

## Using the Application

### Step-by-Step Practice Guide

1. Initial Setup:
    - Click "Create New Story" to generate a practice story
    - Stories contain English and Spanish versions of the same text

2. Practice Phases:
    - **Phase 1**:
        - Read and listen to both languages
        - Compare English and Spanish texts
        - Use play buttons to hear proper pronunciation

    - **Phase 2**:
        - Focus on English text only
        - Practice pronunciation without Spanish reference

    - **Phase 3**:
        - Listen to full story in English
        - Practice speaking without reading

3. Best Practices:
    - Start with short sentences
    - Repeat each phase multiple times
    - Record yourself for comparison
    - Practice daily for best results

## Application Flow

```mermaid
graph TD
    A[Start App] --> B{Story Exists?}
    B -->|No| C[Show Welcome Screen]
    C --> D[Create New Story]
    B -->|Yes| E[Show Practice Screen]
    E --> F{Select Phase}
    F -->|Phase 1| G[Show Both Languages]
    F -->|Phase 2| H[Show English Only]
    F -->|Phase 3| I[Audio Only Mode]
    G --> J[Play Individual Sentences]
    H --> J
    I --> K[Play Full Story]
```

## Technical Implementation

### Core Components

1. Frontend (React + Vite):
    - `PracticeScreen.jsx`: Main practice interface
    - `App.jsx`: Root component
    - `App.css`: Styling and layout

2. Backend (Express):
    - `index.js`: Server setup and API endpoints
    - Story management and persistence

### Key Features

1. Speech Synthesis:
    ```javascript
    const speak = (text, lang = 'en-US') => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };
    ```

2. Phase Management:
    - State-based UI rendering
    - Conditional content display
    - Progressive learning approach

### Algorithm Concepts

1. Story Structure:
    ```javascript
    {
        title: string,
        sentences: [
            {
                english: string,
                spanish: string,
                audioUrl: string
            }
        ]
    }
    ```

2. Phase Logic:
    - Phase 1: Display index % 2 === 0
    - Phase 2: Display index === 0
    - Phase 3: Audio only

## Future Enhancements

1. Language Support:
    - Add Japanese support
    - Implement language selection
    - Support multiple writing systems

2. Audio Features:
    - Custom voice selection
    - Speed control
    - Pitch adjustment
    - Record user's voice

3. Learning Features:
    - Progress tracking
    - Pronunciation scoring
    - Vocabulary lists
    - Practice reminders

4. UI Improvements:
    - Mobile responsiveness
    - Dark/light themes
    - Customizable layouts
    - Animation effects

## Current Limitations

1. Speech Synthesis:
    - Robotic voice quality
    - Limited language support
    - Browser dependency

2. Story Management:
    - Fixed story content
    - No persistence
    - Limited editing

## Contributing

Guidelines for contributing:
1. Fork the repository
2. Create feature branch
3. Submit pull request
4. Follow code style

## License

MIT License - See LICENSE file for details
