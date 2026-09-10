'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Camera, Zap, Sparkles } from 'lucide-react';

// Dynamic import for 3D simulator to avoid any SSR canvas issues
const ProductInteractiveExperience = dynamic(
  () => import('./ProductInteractiveExperience'),
  { 
    ssr: false,
    loading: () => (
      <div style={{
        height: 520,
        background: '#0d1520',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        gap: 12
      }}>
        <div className="live-pulse" style={{ width: 14, height: 14 }}></div>
        <span style={{ fontFamily: 'DM Mono', fontSize: 13, letterSpacing: '0.05em' }}>
          INITIALIZING 3D DIGITAL TWIN WORKBENCH...
        </span>
      </div>
    )
  }
);

interface Props {
  productId: string;
  productName: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  capacity?: string;
  voltage?: string;
}

export default function ProductShowcaseSection({
  productId,
  productName,
  category,
  imageSrc,
  imageAlt,
  capacity,
  voltage
}: Props) {
  const [activeMode, setActiveMode] = useState<'3d' | '2d'>('2d');

  return (
    <div className="product-showcase-container">
      {/* SHOWCASE MODE SWITCHER */}
      <div className="product-showcase-switcher">
        <div className="showcase-tab-pills">
          <button
            className={`showcase-tab-btn ${activeMode === '2d' ? 'active' : ''}`}
            onClick={() => setActiveMode('2d')}
          >
            <Camera size={14} color={activeMode === '2d' ? '#0878c9' : '#64748b'} />
            Studio Photograph
          </button>
          <button
            className={`showcase-tab-btn ${activeMode === '3d' ? 'active' : ''}`}
            onClick={() => setActiveMode('3d')}
          >
            <Zap size={14} color={activeMode === '3d' ? '#0878c9' : '#64748b'} />
            3D Digital Twin & Simulator
          </button>
        </div>

        <div className="showcase-badge-pill">
          <Sparkles size={11} />
          {activeMode === '3d' ? 'INTERACTIVE 360° · REAL-TIME TELEMETRY' : 'STUDIO SPECIFICATION PHOTOGRAPH'}
        </div>
      </div>

      {/* ACTIVE DISPLAY: 3D DIGITAL TWIN OR 2D PHOTO */}
      {activeMode === '3d' ? (
        <ProductInteractiveExperience
          productId={productId}
          productName={productName}
          category={category}
          capacity={capacity}
          voltage={voltage}
        />
      ) : (
        <div className="panel">
          <div className="product-image-box" style={{ height: 500 }}>
            <img src={imageSrc} alt={imageAlt} />
          </div>
        </div>
      )}
    </div>
  );
}
