import { useState } from 'react';
import styled from 'styled-components';

const WordContainer = styled.span`
  position: relative;
  text-decoration: ${props => props.isAltMode ? 'dashed underline' : 'none'};
  text-underline-offset: 3px;
  cursor: ${props => props.isAltMode ? 'help' : 'inherit'};
`;

const TranslationPopup = styled.div`
  position: fixed;
  left: ${props => props.position.x}px;
  top: ${props => props.position.y}px;
  transform: translateY(-100%) translateX(-50%);
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  white-space: normal;
  max-width: 250px;
  z-index: 9999;
  
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin-bottom: 8px;
    text-transform: lowercase;
  }

  .translation {
    color: #ffd700;
    margin-bottom: 4px;
  }

  .explanation {
    font-size: 13px;
    line-height: 1.4;
    color: #cccccc;
  }
`;

const HoverableWord = ({ word, translation, isAltMode, isEnglish }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    if (!isAltMode || !isEnglish) return;
    
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: rect.left + (rect.width / 2),
      y: rect.top - 10
    });
    setShowTranslation(true);
  };

  return (
    <WordContainer 
      isAltMode={isAltMode && isEnglish}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTranslation(false)}
    >
      {word}
      {showTranslation && (
        <TranslationPopup position={position}>
          <div className="title">{word}</div>
          <div className="translation">{translation.word}</div>
          <div className="explanation">{translation.explanation}</div>
        </TranslationPopup>
      )}
    </WordContainer>
  );
};

export default HoverableWord; 