import { useState, useEffect } from 'react';

const PracticeScreen = () => {
    const [phase, setPhase] = useState(1);
    const [currentStory, setCurrentStory] = useState(null);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showStoriesModal, setShowStoriesModal] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const [ttsStatus, setTtsStatus] = useState({ enabled: false, message: '' });

    useEffect(() => {
        // Check if speech synthesis is supported
        if ('speechSynthesis' in window) {
            setSpeechSupported(true);
        } else {
            console.warn('Speech synthesis not supported in this browser');
        }
    }, []);

    useEffect(() => {
        fetch('/api/tts/status')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch TTS status');
                }
                return res.json();
            })
            .then(status => {
                setTtsStatus(status);
                if (!status.enabled) {
                    console.warn(status.message);
                }
            })
            .catch(error => {
                console.error('Failed to check TTS status:', error);
                setTtsStatus({
                    enabled: false,
                    message: 'Using browser TTS (Add OpenAI API key for enhanced quality)'
                });
            });
    }, []);

    const speak = async (text, lang = 'en-US') => {
        if (!speechSupported) {
            console.warn('Speech synthesis not supported');
            return;
        }

        try {
            // Only try OpenAI TTS if it's enabled
            if (ttsStatus.enabled) {
                console.log('Attempting OpenAI TTS...');
                const response = await fetch('/api/tts/synthesize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text, language: lang }),
                });

                // Check if the response is JSON (error) or audio (success)
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('audio/mpeg')) {
                    console.log('Using OpenAI TTS');
                    const audioBlob = await response.blob();
                    const audio = new Audio(URL.createObjectURL(audioBlob));
                    await audio.play();
                    return;
                }

                // If we got JSON, it means there was an error
                const data = await response.json();
                console.warn('OpenAI TTS message:', data.message);
            } else {
                console.log('OpenAI TTS not enabled, using browser TTS');
            }

            // Fallback to browser TTS
            console.log('Using browser TTS');
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Speech synthesis error:', error);
            // Fallback to browser TTS
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

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

    const handlePlayAudio = (index, isSpanish = false) => {
        if (!currentStory?.sentences?.[index]) {
            console.error('Invalid sentence index or no story loaded');
            return;
        }

        const sentence = currentStory.sentences[index];
        const text = isSpanish ? sentence.spanish : sentence.english;
        const lang = isSpanish ? 'es-ES' : 'en-US';
        speak(text, lang);
    };

    const handlePlayFullStory = () => {
        if (!currentStory?.sentences?.length) {
            console.error('No story loaded');
            return;
        }

        currentStory.sentences.forEach((sentence, index) => {
            setTimeout(() => {
                speak(sentence.english, 'en-US');
            }, index * 3000);
        });
    };

    const handleSaveStory = () => {
        console.log('Saving story...');
    };

    const renderWarningBanner = () => {
        if (!ttsStatus.enabled) {
            return (
                <div className="warning-banner">
                    Tu aplicación no tiene acceso a una llave de OpenAI para usar su servicio de lectura. 
                    Para mejorar la experiencia, te recomendamos que uses una.
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {renderWarningBanner()}
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
                                {!speechSupported && (
                                    <p className="warning">
                                        ⚠️ Speech synthesis is not supported in your browser.
                                        Audio playback will not be available.
                                    </p>
                                )}
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
                                                        disabled={!speechSupported}
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
                                                        onClick={() => handlePlayAudio(index, true)}
                                                        title="Play Spanish audio"
                                                        disabled={!speechSupported}
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
                                                disabled={!speechSupported}
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
        </>
    );
};

export default PracticeScreen; 