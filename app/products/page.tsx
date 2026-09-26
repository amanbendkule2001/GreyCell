'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../data/mock-data';
import { buildProductWhatsAppMessage, getWhatsAppUrl } from '../../lib/whatsapp';

export default function ProductsHubPage() {
  const [showTransformerOptions, setShowTransformerOptions] = useState(false);
  const handleWhatsAppCategory = (cat: any) => {
    const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}${cat.href}` : '';
    const msg = buildProductWhatsAppMessage({
      productName: cat.title,
      category: 'Power Engineering Equipment',
      subtitle: cat.subtitle,
      url: currentUrl,
      customMessage: cat.summary,
    });
    const url = getWhatsAppUrl(siteConfig.contact.whatsappNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const categories = [
    {
      title: 'Transformer',
      subtitle: '25 kVA – 2500 kVA, up to 33 kV Class',
      href: '/products/transformer',
      img: '/images/products/conventional_transformer_new.jpg',
      summary:
        'Oil-filled, dry-type cast resin, aluminium foil wound, copper foil wound, natural ester fluid, and hermetically sealed corrugated tank distribution transformers.',
      sublinks: [
        { label: 'Oil-Filled Distribution Transformers', href: '/products/oil-filled-distribution' },
        { label: 'Dry Type Distribution Transformers', href: '/products/dry-type-distribution' },
      ],
    },
    {
      title: 'Compact Sub-Station',
      subtitle: 'Siemens Approved Partner',
      href: '/products/compact-substation',
      img: '/images/hero/img17.png',
      summary:
        'Turnkey compact substations integrating Siemens RMU (12kV to 33kV, 630A, 21kA), oil/dry transformers, OLTC, MSEDCL approved, pad mounted, and walkable E-House container solutions.',
      sublinks: [

        { label: 'CSS with Oil / Dry Type Transformer up to 33kV', href: '/products/compact-substation#compact-substation-oil-dry' },
        { label: 'CSS with Transformer having OLTC up to 33kV', href: '/products/compact-substation#compact-substation-oltc' },
        { label: 'MSEDCL Approved CSS', href: '/products/compact-substation#compact-substation-msedcl' },
        { label: 'PAD Mounted CSS', href: '/products/compact-substation#compact-substation-pad-mounted' },
        { label: 'E-House (Walkable Container Rich Substation)', href: '/products/compact-substation#compact-substation-e-house' },
      ],
    },
    {
      title: 'Medium Voltage SwitchGear Panels',
      subtitle: '11kV / 22kV / 33kV · Up to 2500A (21kA)',
      href: '/products/mv-switchgear-panels',
      img: '/images/products/mv-switchgear-new.jpg',
      summary:
        'Type-tested Medium Voltage SwitchGear Panels complying with IEC 62271. Featuring Siemens VCB, busbar ratings up to 2500A, 21kA short circuit withstand, and IP4X indoor / IP54 outdoor housings.',
      sublinks: [
        { label: 'Fully Tested Panel', href: '/products/mv-switchgear-panels#mv-fully-tested' },
        { label: 'Voltage Ratio – 11kV / 22kV Class', href: '/products/mv-switchgear-panels#mv-voltage-class' },
        { label: 'Current Ratio up to 2500A', href: '/products/mv-switchgear-panels#mv-current-rating' },
        { label: 'Installation – Indoor / Outdoor', href: '/products/mv-switchgear-panels#mv-installation' },
      ],
    },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Products / Power Portfolio</div>
          <h1>
            ENGINEERED
            <br />
            POWER SOLUTIONS.
          </h1>
          <p>
            Explore Graycell product categories. Each major category contains all related technical specifications, single-page sections, image galleries, and interactive 3D model viewers.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container" style={{ display: 'grid', gap: 36 }}>
          {categories.map((cat) => (
            <div key={cat.title} className="panel pad" style={{ display: 'flex', flexWrap: 'wrap', gap: 30 }}>
              <div className="product-image-box" style={{ flex: '1 1 300px', maxWidth: '100%', height: 260, borderRadius: 6, overflow: 'hidden' }}>
                <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <div style={{ flex: '3 1 320px' }}>
                <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 4 }}>PRODUCT CATEGORY</div>
                <h2 style={{ fontSize: 28, margin: '0 0 6px' }}>{cat.title}</h2>
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 500, marginBottom: 12 }}>{cat.subtitle}</div>
                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: 14, marginBottom: 18 }}>{cat.summary}</p>

                <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)', marginBottom: 10 }}>
                  Sections on this page:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 8, marginBottom: 20 }}>
                  {cat.sublinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      style={{
                        fontSize: 13,
                        color: 'var(--blue)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: '#f1f5f9',
                        padding: '6px 12px',
                        borderRadius: 4,
                      }}
                    >
                      <span>→</span> {sub.label}
                    </Link>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  {cat.title === 'Transformer' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => setShowTransformerOptions(!showTransformerOptions)}
                      >
                        Open Category Page <ArrowRight size={15} />
                      </button>
                      {showTransformerOptions && (
                        <div style={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden'
                        }}>
                          <Link 
                            href="/products/oil-filled-distribution" 
                            style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: '13.5px', fontWeight: 600, color: '#334155' }}
                          >
                            Oil-Filled Distribution Transformers
                          </Link>
                          <Link 
                            href="/products/dry-type-distribution" 
                            style={{ padding: '12px 16px', fontSize: '13.5px', fontWeight: 600, color: '#334155' }}
                          >
                            Dry Type Distribution Transformers
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link className="btn btn-primary" href={cat.href}>
                      Open Category Page <ArrowRight size={15} />
                    </Link>
                  )}
                  <button
                    type="button"
                    className="btn btn-whatsapp-direct"
                    onClick={() => handleWhatsAppCategory(cat)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <MessageCircle size={16} /> Fast-track on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

