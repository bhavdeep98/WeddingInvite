import React, { useState, useEffect, useRef } from 'react';
import SplatterEffect from './SplatterEffect';
import ScrollIndicator from './ScrollIndicator';

interface Section {
  id: string;
  element: HTMLElement;
  color: string;
}

interface SectionTransitionManagerProps {
  children: React.ReactNode;
}

const SectionTransitionManager: React.FC<SectionTransitionManagerProps> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [transitionColor, setTransitionColor] = useState('#FF6B6B');
  const sectionsRef = useRef<Section[]>([]);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<'up' | 'down'>('down');

  // Define section colors for the splatter effect
  const sectionColors = [
    '#FF6B6B', // Hero - Red
    '#4ECDC4', // Events Intro - Teal
    '#FFE66D', // Haldi - Yellow
    '#FF8E53', // Mehandi - Orange
    '#A8E6CF', // Wedding - Green
    '#FF6B9D', // Contact - Pink
  ];

  const sectionNames = [
    'Hero',
    'Events',
    'Haldi',
    'Mehandi',
    'Wedding',
    'Contact'
  ];

  useEffect(() => {
    // Find all sections
    const sectionElements = document.querySelectorAll('[data-section]');
    sectionsRef.current = Array.from(sectionElements).map((element, index) => ({
      id: element.getAttribute('data-section') || `section-${index}`,
      element: element as HTMLElement,
      color: sectionColors[index] || '#FF6B6B',
    }));

    // Set up scroll event listener with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          scrollDirectionRef.current = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
          lastScrollYRef.current = currentScrollY;
          
          if (!isTransitioning) {
            updateCurrentSection();
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTransitioning]);

  const updateCurrentSection = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.5; // Trigger at 50% of viewport height

    let newSectionIndex = 0;
    let minDistance = Infinity;
    
    // Find the section closest to the viewport center
    for (let i = 0; i < sectionsRef.current.length; i++) {
      const section = sectionsRef.current[i];
      const rect = section.element.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        newSectionIndex = i;
      }
    }

    if (newSectionIndex !== currentSectionIndex) {
      setCurrentSectionIndex(newSectionIndex);
    }
  };

  const handleSectionClick = (index: number) => {
    if (isTransitioning) return;
    
    // Only trigger splatter effect, no automatic scrolling
    setIsTransitioning(true);
    setTransitionColor(sectionColors[index]);
    setCurrentSectionIndex(index);
    
    // Smooth scroll to the clicked section
    const targetSection = sectionsRef.current[index];
    if (targetSection) {
      const rect = targetSection.element.getBoundingClientRect();
      const offset = window.innerHeight * 0.1; // 10% offset from top
      
      window.scrollTo({
        top: window.scrollY + rect.top - offset,
        behavior: 'smooth',
      });
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  return (
    <>
      {children}
      <SplatterEffect
        isActive={isTransitioning}
        color={transitionColor}
        onTransitionComplete={handleTransitionComplete}
      />
      <ScrollIndicator
        sections={sectionNames}
        currentSection={currentSectionIndex}
        onSectionClick={handleSectionClick}
      />
    </>
  );
};

export default SectionTransitionManager;
