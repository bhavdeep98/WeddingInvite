import React, { useEffect, useState, useRef } from 'react';

interface SplatterEffectProps {
  onTransitionComplete?: () => void;
  isActive: boolean;
  color?: string;
}

const SplatterEffect: React.FC<SplatterEffectProps> = ({
  onTransitionComplete,
  isActive,
  color = '#FF6B6B'
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    // Generate random particles
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Percentage from left
      y: Math.random() * 100, // Percentage from top
      size: Math.random() * 8 + 4, // Size in pixels
      delay: Math.random() * 0.5, // Delay in seconds
      duration: Math.random() * 1 + 1, // Duration in seconds
    }));

    setParticles(newParticles);

    // Trigger completion after animation
    const timeout = setTimeout(() => {
      if (onTransitionComplete) {
        onTransitionComplete();
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isActive, onTransitionComplete]);

  if (!isActive) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Background overlay */}
      <div
        className="splatter-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
        }}
      />
      
      {/* Splatter particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="splatter-particle"
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: color,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            '--duration': `${particle.duration}s`,
            '--delay': `${particle.delay}s`,
          } as React.CSSProperties & { '--duration': string; '--delay': string }}
        />
      ))}
    </div>
  );
};

export default SplatterEffect;
