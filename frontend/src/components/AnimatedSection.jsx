// frontend/src/components/AnimatedSection.jsx
import React from 'react';
import useOnScreen from '../hooks/useOnScreen';

const AnimatedSection = ({ children, className = '' }) => {
  const [ref, isVisible] = useOnScreen({ 
    threshold: 0.1,
    triggerOnce: true // Ensures the animation only happens once
  });

  return (
    <div ref={ref} className={`animated-section ${className} ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

export default AnimatedSection;