'use client';

import React, { useState, useEffect } from 'react';

const NEW_HERO_SLIDES = [
  {
    image: '/images/hero/hero-new-3.jpg',
    caption: 'Oil-Filled Distribution Transformers',
  },
  {
    image: '/images/hero/img5.png',
    caption: 'Transformer With OLTC',
  },
  {
    image: '/images/products/dry-type-transformer-white.png',
    caption: 'Dry-Type Transformers',
  },
  {
    image: '/images/hero/img17.png',
    caption: 'Compact Substation',
    objectPosition: 'left',
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

const SLIDES_WITH_CLONE = [...NEW_HERO_SLIDES, NEW_HERO_SLIDES[0]];

export default function HeroSlider() {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  React.useEffect(() => {
    if (isDown) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        
        if (slider.scrollLeft >= maxScrollLeft - 10) {
          slider.scrollTo({ left: 0, behavior: 'auto' });
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
            }
          }, 50);
        } else {
          slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isDown]);

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
      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-slider-container::-webkit-scrollbar { display: none; }
      `}} />
      {SLIDES_WITH_CLONE.map((slide, idx) => (
        <div key={idx} style={{ flex: '0 0 100%', width: '100%', height: '100%', scrollSnapAlign: 'start', position: 'relative' }}>
          <img src={slide.image} alt={slide.caption} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: (slide as any).objectPosition || 'center right', pointerEvents: 'none' }} />
          <div className="slide-caption" style={{ position: 'absolute', bottom: '90px', left: '28px', background: 'rgba(8, 120, 201, 0.85)', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '3px', zIndex: 5, backdropFilter: 'blur(6px)' }}>{slide.caption}</div>
        </div>
      ))}
    </div>
  );
}
