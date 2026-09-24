'use client';

import React, { useState, useEffect } from 'react';

const NEW_HERO_SLIDES = [
  {
    image: '/images/hero/hero-new-3.jpg',
    caption: 'Oil-Filled Distribution Transformers',
  },
  {
    image: '/images/hero/dry-type-transformer.jpg',
    caption: 'Cast Resin Dry-Type Transformers',
  },
  {
    image: '/images/hero/hero-new-1.jpg',
    caption: 'Compact Substations (CSS)',
  },
  {
    image: '/images/hero/hero-new-2.jpg',
    caption: 'Medium Voltage SwitchGear Panels',
  },
  {
    image: '/images/hero/switchgear-panels.jpg',
    caption: 'Low/Medium Voltage Switchgear Panels',
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % NEW_HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {NEW_HERO_SLIDES.map((slide, idx) => {
        let stateClass = 'hero-slide-inactive';
        if (idx === currentSlide) {
          stateClass = 'hero-slide-active';
        }
        return (
          <div key={idx} className={`hero-slide ${stateClass}`}>
            <img src={slide.image} alt={slide.caption} />
            <div className="slide-caption">{slide.caption}</div>
          </div>
        );
      })}

      <div className="hero-slider-dots">
        {NEW_HERO_SLIDES.map((_, idx) => (
          <span 
            key={idx} 
            className={`dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            style={{ 
              cursor: 'pointer',
              opacity: idx === currentSlide ? 1 : 0.4,
              background: '#fff'
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
