'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductShowcaseSection from '../../../components/ProductShowcaseSection';
import { siteConfig } from '../../../data/mock-data';
import { buildProductWhatsAppMessage, getWhatsAppUrl } from '../../../lib/whatsapp';

export default function OilFilledTransformerPage() {
  const SLIDER_IMAGES = [
    { src: '/images/products/conventional_transformer_new.jpg', caption: 'Conventional Transformer' },
    { src: '/images/products/hermetically_sealed.jpg', caption: 'Hermetically Sealed and Corrugated' },
    { src: '/images/products/copper_foil_wound.jpg', caption: 'Aluminium / Copper Foil Wound Transformer' },
    { src: '/images/products/natural-ester-see-through.jpg', caption: 'Ester Oil Transformer' },
    { src: '/images/products/gsense_monitoring.jpg', caption: 'Smart Monitoring Transformer with Digital Diagnosis' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? SLIDER_IMAGES.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === SLIDER_IMAGES.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === SLIDER_IMAGES.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const sec = {
    id: 'oil-filled',
    title: 'Oil-Filled Distribution Transformers',
    subtitle: '25 kVA – 2500 kVA, up to 33 kV',
    imageSrc: '/images/products/power-transformer.png',
    summary:
      'Graycell manufactures high-quality oil-filled distribution transformers designed to meet international standards and compete with leading Indian manufacturers. Operating a state-of-the-art facility in Pune with promoters holding 25+ years of experience.',
    specs: [
      { label: 'Rating', value: '25 kVA to 2500 kVA' },
      { label: 'HT Voltage', value: 'Up to 33 kV' },
      { label: 'LV Side Voltage', value: 'Up to 800 V' },
      { label: 'Cooling Method', value: 'ONAN / ONAF' },
      { label: 'Installation', value: 'Indoor / Outdoor' },
      { label: 'Losses', value: 'As per IS 1180, Level 1, Level 2, Level 3' },
      { label: 'Radiator', value: '1. Conventional Detachable Radiator, 2. Corrugated Tank' },
      { label: 'Type of Cooling', value: '1. Gas/Air Cushioned, 2. Non-Gas Type' },
      { label: 'Type of Tank', value: '1. Bolted Type, 2. Hermetically Sealed' },
      { label: 'Type of Insulation', value: 'Class A' },
    ],
    features: [
      'Marshalling Box with OTI & WTI',
      'PRV (Pressure Relief Valve)',
      'MOG (Magnetic Oil Gauge)',
      'Buchholz Relay',
      'Conservator Tank with Prismatic Oil Level Gauge',
      'Type of Oil: Mineral Oil / Natural Oil / Ester Oil / Synthetic Ester Oil',
      'Winding Type: Aluminium / Copper',
      'HV Bushing: Epoxy / Porcelain',
      'LV Bushing: Epoxy',
    ],
    productId: 'oil-filled-distribution',
  };

  const handleWhatsAppEnquiry = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const msg = buildProductWhatsAppMessage({
      productName: sec.title,
      category: 'Distribution & Power Transformers',
      subtitle: sec.subtitle,
      specs: sec.specs,
      url: currentUrl,
      customMessage: sec.summary.slice(0, 150) + '...',
    });
    const url = getWhatsAppUrl(siteConfig.contact.whatsappNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOnlineEnquiry = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry', {
        detail: {
          productName: sec.title,
          type: 'Transformer',
          capacityVoltage: sec.subtitle,
          message: `Technical enquiry regarding ${sec.title}. Subtitle: ${sec.subtitle}.`,
        },
      })
    );
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Graycell · Product Range</div>
          <h1>{sec.title}</h1>
          <p>{sec.summary}</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="panel pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: '8px' }}>
              <span className="eyebrow" style={{ color: 'var(--blue)' }}>TRANSFORMER CATEGORY</span>
              <span className="tag" style={{ background: '#e0f2fe', color: 'var(--blue)' }}>33 kV CLASS</span>
            </div>

            <h2 style={{ fontSize: 32, marginBottom: 6 }}>{sec.title}</h2>
            <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 20 }}>{sec.subtitle}</div>

            <div className="two-col" style={{ alignItems: 'start', gap: '40px' }}>
              <div style={{ width: '100%', minWidth: 0 }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8, border: '1px solid #cbd5e1' }}>
                  <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
                    <img
                      src={SLIDER_IMAGES[currentImageIndex].src}
                      alt={SLIDER_IMAGES[currentImageIndex].caption}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#f8fafc' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '12px 16px', fontSize: 14, fontWeight: 500 }}>
                      {SLIDER_IMAGES[currentImageIndex].caption}
                    </div>
                  </div>

                  <button
                    onClick={handlePrev}
                    style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                  >
                    <ChevronLeft size={20} color="#333" />
                  </button>
                  <button
                    onClick={handleNext}
                    style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                  >
                    <ChevronRight size={20} color="#333" />
                  </button>
                </div>

                <div style={{ marginTop: 20 }}>
                  <h4 style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 600, marginBottom: 12 }}>
                    Types of Oil-Filled Distribution Transformers
                  </h4>
                  <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'thin' }}>
                    {SLIDER_IMAGES.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        title={img.caption}
                        style={{
                          flex: '0 0 calc(20% - 9.6px)',
                          minWidth: 80,
                          aspectRatio: '4/3',
                          borderRadius: 6,
                          border: currentImageIndex === idx ? '2px solid var(--blue)' : '1px solid #cbd5e1',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          opacity: currentImageIndex === idx ? 1 : 0.6,
                          transition: 'all 0.2s ease-in-out',
                          background: '#f8fafc'
                        }}
                      >
                        <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '30px', minWidth: 0 }}>


                <div style={{ background: '#f8fafc', padding: 24, borderRadius: 6, border: '1px solid #cbd5e1' }}>
                  <h4 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0', color: 'var(--blue)' }}>
                    Technical Profile
                  </h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="spec-table">
                      <tbody>
                        {sec.specs.map((sp, i) => (
                          <tr key={i}>
                            <th>{sp.label}</th>
                            <td>{sp.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginTop: 30 }}>
                    <h4 style={{ fontSize: 16, marginBottom: 12, color: 'var(--ink)' }}>Accessories</h4>
                    <div style={{ display: 'grid', gap: 10 }}>
                      {sec.features.map((f, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#334155' }}>
                          <CheckCircle2 size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
                    <button
                      type="button"
                      className="btn btn-whatsapp-direct"
                      onClick={handleWhatsAppEnquiry}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontWeight: 600,
                        padding: '12px 16px',
                        cursor: 'pointer',
                      }}
                    >
                      <MessageCircle size={16} /> Fast-track on WhatsApp
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleOnlineEnquiry}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        cursor: 'pointer',
                      }}
                    >
                      Online Technical Enquiry <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
