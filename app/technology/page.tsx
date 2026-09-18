'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function TechnologyPage() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, []);

  const techSections = [
    {
      id: 'foil-winding',
      title: 'Foil Winding Technology',
      subtitle: 'Automated Foil Winding for Uniform Current & High Short-Circuit Strength',
      img: '/images/technology/foil-winding.jpg',
      summary:
        'Graycell utilizes state-of-the-art automated LV foil-winding machines. By replacing conventional round/rectangular wire with continuous metal foil strip across the full width of the coil, uniform current distribution and high short-circuit withstand capability are achieved.',
      benefits: [
        'Uniform current distribution throughout the winding length',
        'High mechanical strength against axial short-circuit electromagnetic forces',
        'Significant reduction of hot spots & superior thermal dissipation',
        'Precision automated winding process eliminating human error',
        'Improved long-term transformer reliability & extended service life',
      ],
    },
    {
      id: 'natural-ester',
      title: 'Natural Ester Fluid',
      subtitle: 'Sustainable, Fire-Safe & Biodegradable Vegetable Dielectric Fluid',
      img: '/images/technology/natural-ester.jpg',
      summary:
        'Natural ester dielectric fluid derived from renewable seed oils provides an eco-friendly alternative to mineral oil. Featuring a high fire point (>300°C), natural ester fluid eliminates fire hazards, extends paper insulation life, and is 100% biodegradable.',
      benefits: [
        'High fire point (>300°C, K-Class rating) for maximum fire safety',
        '100% biodegradable within 28 days in soil and water',
        'Superior moisture absorption capability extending paper insulation life up to 33%',
        'Non-toxic to aquatic and terrestrial ecosystems',
        'Allows transformer placement in environmentally sensitive urban or water-table areas',
      ],
    },
    {
      id: 'g-sense',
      title: 'Graycell G-Sense',
      subtitle: 'IoT Smart Monitoring & Digital Health Diagnostics for Transformers & CSS',
      img: '/images/products/gsense_monitoring.jpg',
      summary:
        'Graycell G-Sense is an integrated IoT-enabled smart monitoring system that provides real-time telemetry, health analytics, predictive maintenance alerts, and SCADA integration for distribution transformers and compact substations.',
      benefits: [
        'Continuous monitoring of oil temperature, winding temperature, and oil level',
        'Real-time tracking of voltage, current, load profile, harmonics, and power factor',
        'SCADA & Cloud Dashboard integration for remote asset management',
        'Automated threshold alerts via SMS/Email for early fault detection',
        'Substantially reduces operational downtime and extends asset lifecycle',
      ],
    },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Technology / Engineering Intelligence</div>
          <h1>
            TECHNOLOGY
            <br />
            THAT MATTERS.
          </h1>
          <p>
            Graycell engineering innovation: automated foil winding, natural ester biodegradable dielectric fluid, and Graycell G-Sense IoT smart asset monitoring.
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
            {techSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="btn btn-secondary"
                style={{ fontSize: 12, padding: '8px 14px' }}
              >
                {sec.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container" style={{ display: 'grid', gap: 48 }}>
          {techSections.map((sec, idx) => (
            <div key={sec.id} id={sec.id} className="panel pad" style={{ scrollMarginTop: 100 }}>
              <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8 }}>
                0{idx + 1} / ADVANCED TECHNOLOGY
              </div>
              <h2 style={{ fontSize: 30, marginBottom: 6 }}>{sec.title}</h2>
              <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 20 }}>{sec.subtitle}</div>

              <div className="two-col" style={{ alignItems: 'start' }}>
                <div>
                  <p style={{ color: '#475569', lineHeight: 1.75, fontSize: 14.5, marginBottom: 20 }}>{sec.summary}</p>
                  <h4 style={{ fontSize: 16, marginBottom: 12, color: 'var(--ink)' }}>Key Benefits & Capabilities</h4>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {sec.benefits.map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#334155' }}>
                        <CheckCircle2 size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="product-image-box" style={{ height: 280, borderRadius: 6, overflow: 'hidden' }}>
                    <img src={sec.img} alt={sec.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <Link href="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: 20 }}>
                    Consult Technical Experts <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

