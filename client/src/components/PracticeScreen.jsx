import React, { useState } from 'react';

const PracticeScreen = () => {
    const [phase, setPhase] = useState(1);
    const [currentStory, setCurrentStory] = useState(null);

    const handleCreateStory = () => {
        // For MVP, let's create a simple hardcoded story
        const newStory = {
            englishText: "Hello, how are you today?",
            spanishText: "Hola, ¿cómo estás hoy?",
            audioUrl: "", // We'll add audio functionality later
        };
        setCurrentStory(newStory);
    };

    return (
        <div className="practice-screen">
            <h1>Fluency Coach</h1>
            
            {!currentStory ? (
                <button onClick={handleCreateStory}>Create New Story</button>
            ) : (
                <div className="story-container">
                    <div className="text-content">
                        {phase <= 2 && <p className="english">{currentStory.englishText}</p>}
                        {phase === 1 && <p className="spanish">{currentStory.spanishText}</p>}
                    </div>
                    <div className="controls">
                        <button>Play Audio</button>
                        <button onClick={() => setPhase(1)}>Phase 1</button>
                        <button onClick={() => setPhase(2)}>Phase 2</button>
                        <button onClick={() => setPhase(3)}>Phase 3</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PracticeScreen; 