'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import ProductShowcaseSection from '../../../components/ProductShowcaseSection';
import { siteConfig } from '../../../data/mock-data';
import { buildProductWhatsAppMessage, getWhatsAppUrl } from '../../../lib/whatsapp';

export default function DryTypeTransformerPage() {
  const sec = {
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
          <div className="eyebrow">Graycell Power Solutions · Product Range</div>
          <h1>{sec.title}</h1>
          <p>{sec.summary}</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="panel pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span className="eyebrow" style={{ color: 'var(--blue)' }}>TRANSFORMER CATEGORY</span>
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

                  <h4 style={{ fontSize: 16, marginBottom: 12, color: 'var(--ink)' }}>Key Features</h4>
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
