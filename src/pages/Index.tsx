import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import EventsIntro from '@/components/EventsIntro';
import HaldiSection from '@/components/HaldiSection';
import MehandiSection from '@/components/MehandiSection';
import WeddingSection from '@/components/WeddingSection';
import PhotoGallery from '@/components/PhotoGallery';
import RSVPSection from '@/components/RSVPSection';
import SectionTransitionManager from '@/components/SectionTransitionManager';

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <SectionTransitionManager>
      <div className="min-h-screen bg-background">
        <div data-section="hero" className="section-container">
          <HeroSection />
        </div>
        <div data-section="events-intro" className="section-container">
          <EventsIntro />
        </div>
        <div data-section="haldi" className="section-container">
          <HaldiSection />
        </div>
        <div data-section="mehandi" className="section-container">
          <MehandiSection />
        </div>
        <div data-section="wedding" className="section-container">
          <WeddingSection />
        </div>
        <div data-section="gallery" className="section-container">
          <PhotoGallery />
        </div>
        <div data-section="rsvp" className="section-container">
          <RSVPSection />
        </div>
      </div>
    </SectionTransitionManager>
  );
};

export default Index;