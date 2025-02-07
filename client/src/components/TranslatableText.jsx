import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HoverableWord from './HoverableWord';

const Container = styled.div`
  display: inline;
`;

const TranslatableText = ({ text, translations, isEnglish = false }) => {
  const [isAltMode, setIsAltMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only activate if Alt/Command is pressed alone (no other keys)
      if ((e.key === 'Alt' || e.key === 'Meta') && 
          !e.shiftKey && 
          !e.ctrlKey) {
        setIsAltMode(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Alt' || e.key === 'Meta') {
        setIsAltMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const words = text.split(/(\s+)/);

  return (
    <Container>
      {words.map((word, index) => {
        if (word.trim() === '') {
          return word; // Return spaces and other whitespace as-is
        }
        return (
          <HoverableWord
            key={index}
            word={word}
            translation={translations[word.toLowerCase()] || word}
            isAltMode={isAltMode}
            isEnglish={isEnglish}
          />
        );
      })}
    </Container>
  );
};

export default TranslatableText; 