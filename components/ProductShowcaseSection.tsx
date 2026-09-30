'use client';

import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

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
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <div className="product-showcase-container">
      {/* SHOWCASE HEADER */}
      <div className="product-showcase-switcher">
        <div className="showcase-tab-pills">
          <button className="showcase-tab-btn active" style={{ cursor: 'default' }}>
            <Camera size={14} color="#0878c9" />
            Studio Photograph
          </button>
        </div>

        <div className="showcase-badge-pill">
          <Sparkles size={11} />
          STUDIO SPECIFICATION PHOTOGRAPH
        </div>
      </div>

      {/* ACTIVE DISPLAY: 2D PHOTO */}
      <div className="panel">
        <div className="product-image-box" style={{ height: 500 }}>
          <img src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </div>
  );
}
