'use client';

import React, { useState, useEffect } from 'react';

const NEW_HERO_SLIDES = [
  {
    image: '/images/hero/hero-new-3.jpg',
    caption: 'Oil-Filled Distribution Transformers',
  },
  {
    image: '/images/hero/dry-type-transformer.jpg',
    caption: 'Dry-Type Transformers',
  },
  {
    image: '/images/hero/css-new-hero.jpg',
    caption: 'Compact Sub Station (CSS)',
  },
  {
    image: '/images/hero/switchgear-panels.jpg',
    caption: 'Low/Medium Voltage Switchgear Panels',
  },
  {
    image: '/images/hero/ehouse-new-hero.jpg',
    caption: 'E-House Container Sub Station',
  }
];

export default function HeroSlider() {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  
  const onMouseLeave = () => setIsDown(false);
  const onMouseUp = () => setIsDown(false);
  
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      className="hero-slider-container" 
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      style={{ 
        position: 'absolute', inset: 0, zIndex: 2, 
        display: 'flex', overflowX: 'auto', 
        scrollSnapType: isDown ? 'none' : 'x mandatory',
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        cursor: isDown ? 'grabbing' : 'grab'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .hero-slider-container::-webkit-scrollbar { display: none; }
      `}} />
      {NEW_HERO_SLIDES.map((slide, idx) => (
        <div key={idx} style={{ flex: '0 0 100%', width: '100%', height: '100%', scrollSnapAlign: 'start', position: 'relative' }}>
          <img src={slide.image} alt={slide.caption} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center right', pointerEvents: 'none' }} />
          <div className="slide-caption" style={{ position: 'absolute', bottom: '90px', left: '28px', background: 'rgba(8, 120, 201, 0.85)', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '3px', zIndex: 5, backdropFilter: 'blur(6px)' }}>{slide.caption}</div>
        </div>
      ))}
    </div>
  );
}
