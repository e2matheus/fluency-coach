import { useState } from 'react';

const PracticeScreen = () => {
    const [phase, setPhase] = useState(1);
    const [currentStory, setCurrentStory] = useState(null);

    const handleCreateStory = () => {
        const newStory = {
            title: "The Sun",
            sentences: [
                {
                    english: "The sun was setting over the village",
                    spanish: "El sol se estaba poniendo sobre el pequeño pueblo",
                    audioUrl: "" // We'll add audio later
                },
                {
                    english: "The sky turned orange and purple",
                    spanish: "El cielo se tornó naranja y púrpura",
                    audioUrl: "" // We'll add audio later
                }
            ]
        };
        setCurrentStory(newStory);
    };

    const handlePlayAudio = (index) => {
        // Audio playback functionality will be added later
        console.log(`Playing audio for sentence ${index + 1}`);
    };

    const handlePlayFullStory = () => {
        // Will play all sentences in sequence
        console.log('Playing full story in English');
    };

    return (
        <div className="practice-screen">
            <h1>Fluency Coach</h1>
            
            {!currentStory ? (
                <button onClick={handleCreateStory}>Create New Story</button>
            ) : (
                <div className="story-container">
                    <h2>{currentStory.title}</h2>
                    <div className="text-content">
                        {phase <= 2 && currentStory.sentences.map((sentence, index) => (
                            <div key={index} className="sentence-block">
                                {phase <= 2 && (
                                    <div className="english-text">
                                        <p>{sentence.english}</p>
                                        <button onClick={() => handlePlayAudio(index)}>
                                            Play Audio
                                        </button>
                                    </div>
                                )}
                                {phase === 1 && (
                                    <div className="spanish-text">
                                        <p>{sentence.spanish}</p>
                                        <button onClick={() => handlePlayAudio(index)}>
                                            Play Audio
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        {phase === 3 && (
                            <div className="audio-only">
                                <button onClick={handlePlayFullStory}>
                                    Play Full Story
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="controls">
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