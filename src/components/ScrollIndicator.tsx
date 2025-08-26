import React, { useState, useEffect } from 'react';

interface ScrollIndicatorProps {
  sections: string[];
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  sections,
  currentSection,
  onSectionClick,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(true), 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      className={`scroll-indicator transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {sections.map((section, index) => (
        <div
          key={section}
          className={`scroll-dot ${currentSection === index ? 'active' : ''}`}
          onClick={() => onSectionClick(index)}
          title={section}
        />
      ))}
    </div>
  );
};

export default ScrollIndicator;
