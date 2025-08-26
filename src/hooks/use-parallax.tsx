import { useEffect, useRef, useState } from 'react';

interface UseParallaxOptions {
  intensity?: number;
  enabled?: boolean;
}

export const useParallax = ({ intensity = 0.1, enabled = true }: UseParallaxOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const deltaX = (mouseX - centerX) * intensity;
      const deltaY = (mouseY - centerY) * intensity;
      
      setTransform({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, enabled]);

  return {
    elementRef,
    style: {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
      transition: 'transform 0.1s ease-out',
    },
  };
};
