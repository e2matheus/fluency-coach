const express = require('express');
const router = express.Router();

let openai = null;
let openaiEnabled = false;

// Try to initialize OpenAI if API key is available
try {
    const OpenAI = require('openai');
    if (process.env.OPENAI_API_KEY) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        openaiEnabled = process.env.ENABLE_OPENAI_TTS === 'true';
        console.log('OpenAI TTS initialized successfully');
    } else {
        console.warn('OpenAI API key not found. Enhanced TTS features will be disabled.');
    }
} catch (error) {
    console.warn('Failed to initialize OpenAI:', error.message);
}

router.get('/status', (req, res) => {
    console.log('TTS Status Check - Enabled:', openaiEnabled);
    try {
        res.json({
            enabled: openaiEnabled,
            message: openaiEnabled 
                ? 'OpenAI TTS is enabled and ready'
                : 'Enhanced TTS features are disabled. Add an OpenAI API key to enable better voice quality.'
        });
    } catch (error) {
        console.error('Error sending TTS status:', error);
        res.status(500).json({
            enabled: false,
            message: 'Error checking TTS status'
        });
    }
});

router.post('/synthesize', async (req, res) => {
    console.log('Synthesize request received:', {
        openaiEnabled,
        openaiExists: !!openai,
        text: req.body.text,
        language: req.body.language
    });

    if (!openaiEnabled || !openai) {
        console.log('OpenAI TTS disabled or not initialized');
        return res.status(400).json({ 
            error: 'OpenAI TTS is disabled',
            message: 'Enhanced TTS features are disabled. Add an OpenAI API key to enable better voice quality.',
            fallback: true
        });
    }

    try {
        const { text, language } = req.body;
        const voice = language === 'es-ES' ? 'alloy' : 'nova';
        console.log('Attempting OpenAI TTS with voice:', voice);

        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: voice,
            input: text,
        });

        console.log('OpenAI TTS successful');
        const buffer = Buffer.from(await mp3.arrayBuffer());
        res.set('Content-Type', 'audio/mpeg');
        res.send(buffer);
    } catch (error) {
        console.error('OpenAI TTS error:', error);
        res.status(500).json({ 
            error: 'Failed to generate speech',
            message: 'Enhanced TTS temporarily unavailable. Using browser TTS as fallback.',
            fallback: true
        });
    }
});

module.exports = router; 