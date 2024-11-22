import { useState } from 'react';

const PracticeScreen = () => {
    const [phase, setPhase] = useState(1);
    const [currentStory, setCurrentStory] = useState(null);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showStoriesModal, setShowStoriesModal] = useState(false);

    const handleCreateStory = () => {
        const newStory = {
            title: "The Sun",
            sentences: [
                {
                    english: "The sun was setting over the village",
                    spanish: "El sol se estaba poniendo sobre el pequeño pueblo",
                    audioUrl: ""
                },
                {
                    english: "The sky turned orange and purple",
                    spanish: "El cielo se tornó naranja y púrpura",
                    audioUrl: ""
                }
            ]
        };
        setCurrentStory(newStory);
    };

    const handlePlayAudio = (index) => {
        console.log(`Playing audio for sentence ${index + 1}`);
    };

    const handlePlayFullStory = () => {
        console.log('Playing full story in English');
    };

    const handleSaveStory = () => {
        console.log('Saving story...');
    };

    return (
        <div className="app-container">
            <div className="practice-container">
                <div className="top-controls">
                    {currentStory && (
                        <>
                            <button
                                onClick={handleCreateStory}
                                title="Create new story"
                            >
                                <span role="img" aria-label="create">✏️</span>
                            </button>
                            <button
                                onClick={handleSaveStory}
                                title="Save current story"
                            >
                                <span role="img" aria-label="save">💾</span>
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => setShowStoriesModal(true)}
                        title="View saved stories"
                    >
                        <span role="img" aria-label="stories">📚</span>
                    </button>
                    <button
                        onClick={() => setShowHelpModal(true)}
                        title="Show help"
                    >
                        <span role="img" aria-label="help">❓</span>
                    </button>
                </div>

                <div className="content">
                    {!currentStory ? (
                        <div className="empty-state">
                            <p>Welcome to Fluency Coach!</p>
                            <p>Would you like to create a new story to practice?</p>
                            <button onClick={handleCreateStory} className="create-story-btn">
                                Create New Story
                            </button>
                        </div>
                    ) : (
                        <div className="story-container">
                            <h2>{currentStory.title}</h2>
                            <div className="text-content">
                                {phase <= 2 && currentStory.sentences.map((sentence, index) => (
                                    <div key={index} className="sentence-row">
                                        {phase <= 2 && (
                                            <div className="english-text">
                                                <p>{sentence.english}</p>
                                                <button
                                                    className="play-button"
                                                    onClick={() => handlePlayAudio(index)}
                                                    title="Play English audio"
                                                >
                                                    <span role="img" aria-label="play">▶️</span>
                                                </button>
                                            </div>
                                        )}
                                        {phase === 1 && (
                                            <div className="spanish-text">
                                                <p>{sentence.spanish}</p>
                                                <button
                                                    className="play-button"
                                                    onClick={() => handlePlayAudio(index)}
                                                    title="Play Spanish audio"
                                                >
                                                    <span role="img" aria-label="play">▶️</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {phase === 3 && (
                                    <div className="audio-only">
                                        <button
                                            onClick={handlePlayFullStory}
                                            title="Play full story in English"
                                        >
                                            <span role="img" aria-label="play-all">🔊</span>
                                            Play Full Story
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {currentStory && (
                    <div className="phase-controls">
                        <button onClick={() => setPhase(1)}>Phase 1</button>
                        <button onClick={() => setPhase(2)}>Phase 2</button>
                        <button onClick={() => setPhase(3)}>Phase 3</button>
                    </div>
                )}

                {showHelpModal && (
                    <div className="modal">
                        <h3>How to Use Fluency Coach</h3>
                        {/* Help content here */}
                        <button onClick={() => setShowHelpModal(false)}>Close</button>
                    </div>
                )}

                {showStoriesModal && (
                    <div className="modal">
                        <h3>Saved Stories</h3>
                        {/* Stories list here */}
                        <button onClick={() => setShowStoriesModal(false)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticeScreen; 