'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Cpu, MessageCircle } from 'lucide-react';
import ProductShowcaseSection from '../../../components/ProductShowcaseSection';
import { siteConfig } from '../../../data/mock-data';
import { buildProductWhatsAppMessage, getWhatsAppUrl } from '../../../lib/whatsapp';

export default function TransformerProductPage() {
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

  const handleWhatsAppEnquiry = (sec: any) => {
    const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/transformer#${sec.id}` : '';
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

  const handleOnlineEnquiry = (sec: any) => {
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

  const transformerSections = [
    {
      id: 'oil-filled',
      title: 'Oil-Filled Distribution Transformers',
      subtitle: '25 kVA – 2500 kVA, up to 33 kV',
      imageSrc: '/images/products/power-transformer.png',
      summary:
        'Graycell Power Solutions Pvt. Ltd. manufactures high-quality oil-filled distribution transformers designed to meet international standards and compete with leading Indian manufacturers. Operating a state-of-the-art facility in Pune with promoters holding 25+ years of experience.',
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
    },

    {
      id: 'dry-type',
      title: 'Dry Type Distribution Transformers',
      subtitle: 'Cast resin & VPI insulation',
      imageSrc: '/images/products/dry-type-transformer.png',
      summary:
        'Ideal for high-rise commercial buildings, hospitals, airports, underground transit, and industrial plants requiring high fire safety and low environmental risk.',
      specs: [
        { label: 'Insulation Class', value: 'Class F / Class H' },
        { label: 'Enclosure Rating', value: 'IP21 / IP23 / IP33' },
        { label: 'Fire Rating', value: 'F1 Flame Retardant' },
        { label: 'Maintenance', value: 'Near zero maintenance' },
      ],
      features: [
        'Non-hygroscopic cast resin insulation eliminating moisture ingress',
        'Self-extinguishing with zero toxic gas emission',
        'High short-circuit withstand capability',
        'Suitable for indoor installation close to load centers',
      ],
      productId: 'dry-type-distribution',
    },

  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Graycell Power Solutions · Product Range</div>
          <h1>
            DISTRIBUTION & POWER
            <br />
            TRANSFORMERS.
          </h1>
          <p>
            Manufactured by Graycell Power Solutions Pvt. Ltd. in Pune under international quality standards. Featuring oil-filled, dry-type, aluminium foil wound, copper foil wound, natural ester, and hermetically sealed corrugated designs up to 33 kV class.
          </p>

          {/* SECTION ANCHOR NAV */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
            {transformerSections.map((sec) => (
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

      {/* SINGLE PAGE TRANSFORMER SECTIONS */}
      <section className="page-content">
        <div className="container" style={{ display: 'grid', gap: 60 }}>
          {transformerSections.map((sec, idx) => (
            <div key={sec.id} id={sec.id} className="panel pad" style={{ scrollMarginTop: 100 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="eyebrow" style={{ color: 'var(--blue)' }}>0{idx + 1} / TRANSFORMER CATEGORY</span>
                <span className="tag" style={{ background: '#e0f2fe', color: 'var(--blue)' }}>33 kV CLASS</span>
              </div>

              <h2 style={{ fontSize: 32, marginBottom: 6 }}>{sec.title}</h2>
              <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 20 }}>{sec.subtitle}</div>

              <div className="two-col" style={{ alignItems: 'start', gap: '40px' }}>
                <div style={{ marginBottom: 30 }}>
                  <ProductShowcaseSection
                    productId={sec.productId}
                    productName={sec.title}
                    category="transformer"
                    imageSrc={sec.imageSrc}
                    imageAlt={sec.title}
                  />
                </div>

                <div style={{ display: 'grid', gap: '30px' }}>
                  <div>
                    <h3 style={{ fontSize: 20, marginBottom: 12 }}>Overview & Applications</h3>
                    <p style={{ color: '#475569', lineHeight: 1.75, fontSize: 14, marginBottom: 20 }}>{sec.summary}</p>

                    <h4 style={{ fontSize: 16, marginBottom: 12, color: 'var(--ink)' }}>{sec.id === 'oil-filled' ? 'Accessories' : 'Key Features'}</h4>
                    <div style={{ display: 'grid', gap: 10 }}>
                      {sec.features.map((f, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#334155' }}>
                          <CheckCircle2 size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: 24, borderRadius: 6, border: '1px solid #cbd5e1' }}>
                    <h4 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0', color: 'var(--blue)' }}>
                      Technical Profile
                    </h4>
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

                    <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
                      <button
                        type="button"
                        className="btn btn-whatsapp-direct"
                        onClick={() => handleWhatsAppEnquiry(sec)}
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
                        onClick={() => handleOnlineEnquiry(sec)}
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
          ))}
        </div>
      </section>
    </>
  );
}
