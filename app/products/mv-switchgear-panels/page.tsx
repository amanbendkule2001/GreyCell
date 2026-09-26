'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import ProductShowcaseSection from '../../../components/ProductShowcaseSection';
import { siteConfig } from '../../../data/mock-data';
import { buildProductWhatsAppMessage, getWhatsAppUrl } from '../../../lib/whatsapp';

export default function MvSwitchgearPanelsPage() {
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
    const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/mv-switchgear-panels#${sec.id}` : '';
    const displayName = `${sec.title} (${sec.subtitle})`;
    const msg = buildProductWhatsAppMessage({
      productName: displayName,
      category: 'Medium Voltage Switchgear Panels',
      subtitle: sec.subtitle,
      specs: sec.specs,
      url: currentUrl,
      customMessage: sec.summary.slice(0, 150) + '...',
    });
    const url = getWhatsAppUrl(siteConfig.contact.whatsappNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOnlineEnquiry = (sec: any) => {
    const displayName = `${sec.title} (${sec.subtitle})`;
    window.dispatchEvent(
      new CustomEvent('open-enquiry', {
        detail: {
          productName: displayName,
          type: 'MV System',
          capacityVoltage: sec.subtitle,
          message: `Technical enquiry regarding ${displayName}.`,
        },
      })
    );
  };

  const mvSections = [
    {
      id: 'mv-fully-tested',
      title: 'Fully Tested Panel',
      subtitle: 'IEC type tested switchgear assemblies',
      imageSrc: '/images/projects/project-mv-switchgear.jpg',
      summary:
        'Graycell manufactures fully type-tested Medium Voltage SwitchGear Panels engineered in compliance with international IEC 62271 standards. Integrating Siemens VCB and RMU technologies for maximum operating safety and short-circuit withstand performance.',
      specs: [
        { label: 'Testing Standard', value: 'IEC 62271-200 / IEC 62271-100' },
        { label: 'Internal Arc Rating', value: '21kA for 1 Second (AFLR)' },
        { label: 'Short Circuit Withstand', value: '21kA for 3 Seconds' },
        { label: 'Switchgear Tech', value: 'Siemens Vacuum Circuit Breaker (VCB) / RMU' },
      ],
      features: [
        'Complete type test certificate portfolio from NABL accredited test laboratories',
        'Metal-clad compartmentalized design with internal arc containment',
        'Safety interlocks preventing improper manual operation',
        'Built for rigorous continuous operation in industrial & utility environments',
      ],
      productId: 'foil-wound-transformers',
    },
    {
      id: 'mv-voltage-class',
      title: 'Voltage Ratio – 11kV / 22kV Class',
      subtitle: '11kV & 22kV medium voltage class',
      imageSrc: '/images/products/mv-switchgear-new.jpg',
      summary:
        'Custom Medium Voltage SwitchGear Panels designed specifically for 11kV, 22kV, and 33kV distribution networks. Built for seamless integration into municipal utilities, industrial plants, commercial towers, and renewable energy substations.',
      specs: [
        { label: 'Nominal System Voltage', value: '11 kV / 22 kV / 33 kV' },
        { label: 'Rated Frequency', value: '50 Hz / 60 Hz' },
        { label: 'Insulation Level (BIL)', value: '75kV BIL (11kV) / 125kV BIL (22kV)' },
        { label: 'Busbar Material', value: 'High Conductivity Electrolytic Copper / Aluminium' },
      ],
      features: [
        'Optimized dimensions for compact indoor electrical rooms',
        'Precise potential transformer (PT) & current transformer (CT) metering integration',
        'Compatible with numeric protection relays and SCADA protocols',
        'High dielectric withstand and low partial discharge levels',
      ],
      productId: 'foil-wound-transformers',
    },
    {
      id: 'mv-current-rating',
      title: 'Current Ratio up to 2500A',
      subtitle: 'Busbar ratings up to 2500A, 21kA',
      imageSrc: '/images/products/mv-switchgear-2500a.jpg',
      summary:
        'Heavy-duty Medium Voltage SwitchGear Panels with continuous current ratings up to 2500A and short-circuit ratings up to 21kA for 3 seconds. Engineered to handle large power transfers in heavy manufacturing, mining, data centers, and power utilities.',
      specs: [
        { label: 'Rated Normal Current', value: 'Up to 2500 Amperes (2500A)' },
        { label: 'Short Time Current', value: '21 kA for 3 Seconds' },
        { label: 'Peak Withstand Current', value: '52.5 kA Peak' },
        { label: 'Busbar Plating', value: 'Silver / Tin Plated Electrolytic Copper' },
      ],
      features: [
        'High thermal capacity busbars minimizing temperature rise under full load',
        'Robust copper busbar jointing with high mechanical clamp force',
        'Dedicated cable entry and termination compartment',
        'Engineered for maximum operational lifespan under continuous 2500A duty',
      ],
      productId: 'foil-wound-transformers',
    },
    {
      id: 'mv-installation',
      title: 'Installation – Indoor / Outdoor',
      subtitle: 'Weatherproof indoor and outdoor panels',
      imageSrc: '/images/products/mv-switchgear-outdoor.jpg',
      summary:
        'Flexible housing configurations available in IP4X indoor panels for substation control rooms, or heavy-duty weatherproof IP54 outdoor kiosks engineered for harsh tropical, coastal, or dusty industrial outdoor environments.',
      specs: [
        { label: 'Indoor Protection', value: 'IP4X / IP42 compartmentalized' },
        { label: 'Outdoor Protection', value: 'IP54 Weatherproof Kiosk' },
        { label: 'Sheet Steel Gauge', value: '2.0mm CRCA / GI Sheet Steel' },
        { label: 'Surface Finish', value: '7-Tank Powder Coated Polyurethane' },
      ],
      features: [
        'Rust, corrosion, and UV-resistant outdoor powder coating finish',
        'Anticondensation space heaters with thermostatic control',
        'Padlockable doors and ergonomic rack-in / rack-out VCB mechanism',
        'User-friendly design for safe inspection, testing, and routine maintenance',
      ],
      productId: 'foil-wound-transformers',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Graycell · Medium Voltage Solutions</div>
          <h1>
            MEDIUM VOLTAGE
            <br />
            SWITCHGEAR PANELS.
          </h1>
          <p>
            Precision engineered Medium Voltage SwitchGear Panels featuring 11kV / 22kV / 33kV ratings, continuous current ratings up to 2500A, 21kA short-circuit withstand, fully type-tested to IEC 62271, and available in indoor or weatherproof outdoor IP54 configurations.
          </p>

          {/* SECTION ANCHOR NAV */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
            {mvSections.map((sec) => (
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

      {/* SINGLE PAGE MEDIUM VOLTAGE SWITCHGEAR PANELS SECTIONS */}
      <section className="page-content">
        <div className="container" style={{ display: 'grid', gap: 60 }}>
          {mvSections.map((sec, idx) => (
            <div key={sec.id} id={sec.id} className="panel pad" style={{ scrollMarginTop: 100 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="eyebrow" style={{ color: 'var(--blue)' }}>0{idx + 1} / MEDIUM VOLTAGE SWITCHGEAR PANELS</span>
                <span className="tag" style={{ background: '#e0f2fe', color: 'var(--blue)' }}>2500A · 21kA</span>
              </div>

              <h2 style={{ fontSize: 32, marginBottom: 6 }}>{sec.title}</h2>
              <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 20 }}>{sec.subtitle}</div>

              {/* PRODUCT SHOWCASE (IMAGE GALLERY & 3D MODEL VIEWER TAB) */}
              <div style={{ marginBottom: 30 }}>
                <ProductShowcaseSection
                  productId={sec.productId}
                  productName={sec.title}
                  category="mv_switchgear"
                  imageSrc={sec.imageSrc}
                  imageAlt={sec.title}
                />
              </div>

              {/* OVERVIEW & SPECS GRID */}
              <div className="two-col" style={{ alignItems: 'start' }}>
                <div>
                  <h3 style={{ fontSize: 20, marginBottom: 12 }}>Overview & Panel Engineering</h3>
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
                    Technical Parameters
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
          ))}
        </div>
      </section>
    </>
  );
}
