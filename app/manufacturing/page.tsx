'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Factory, 
  Gauge, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const mfgStages = [
  {
    num: '01',
    title: 'Manufacturing Setup',
    tag: 'PLANT INFRASTRUCTURE',
    image: '/images/brand/hero-transformer.jpg',
    desc: 'State-of-the-art manufacturing plant equipped with core stacking tables, vacuum ovens, and dedicated overhead cranes for heavy distribution transformer assembly.',
    chips: ['Khed-Shivapur Plant', '100+ CSS Units/Yr']
  },
  {
    num: '02',
    title: 'Winding & Assembly',
    tag: 'CORE & COIL WINDING',
    image: '/images/technology/foil-winding.jpg',
    desc: 'High-conductivity electrolytic copper strip and foil windings with step-lap core joints engineered for minimal excitation losses across oil and dry-type families.',
    chips: ['Electrolytic Copper', 'Cast-Resin & Oil']
  },
  {
    num: '03',
    title: 'Testing & Diagnostics',
    tag: 'HIGH-VOLTAGE BAY',
    image: '/images/products/power-transformer.png',
    desc: 'Calibrated testing laboratory covering insulation resistance, impedance, turns ratio, dielectric oil breakdown, and high-voltage impulse performance to IS & IEC standards.',
    chips: ['IS 2026 / IEC 60076', 'Up to 33 kV Class']
  },
  {
    num: '04',
    title: 'Quality & Approvals',
    tag: 'STANDARDS & SAFETY',
    image: '/images/products/compact-substation.png',
    desc: 'Rigorous stage-gate inspection from raw lamination to final tanking. Certified under Siemens 8FB20 technology partnership and CPRI / ERDA type testing.',
    chips: ['Siemens 8FB20 Partner', 'CPRI / ERDA Tested']
  }
];

const capabilities = [
  {
    icon: Factory,
    title: 'Manufacturing Setup',
    detail: 'Advanced corrugated tank fabrication, vacuum pressure impregnation, and heavy assembly bays.',
    tag: 'Production Bay'
  },
  {
    icon: Gauge,
    title: 'Testing Facility',
    detail: 'Calibrated routine and type test bays verifying no-load loss, temperature rise, and impulse tolerance.',
    tag: '33 kV Lab'
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    detail: 'Manufactured to strict IS 2026, IEC 62271-202 and Siemens quality control directives.',
    tag: 'Type Tested'
  }
];

const clientReferences = [
  'Siemens',
  'Mahindra',
  'MEDA',
  'Novotel',
  'Thermax',
  'BSE',
  'Kohinoor',
  'Panchshil',
  'Mahanagar Gas'
];

export default function Manufacturing() {
  const [activeTab, setActiveTab] = useState<'facility' | 'catalogue'>('facility');

  const handleOpenEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry'));
    }
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Manufacturing / Capability</div>
          <h1>
            MADE WITH<br />
            ENGINEERING DISCIPLINE.
          </h1>
          <p>
            State-of-the-art transformer production, precision copper winding, and high-voltage testing facility 
            engineered to IS 2026 and IEC 60076 standards.
          </p>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <section className="page-content">
        <div className="container mfg-page-wrap">
          
          {/* TWO COLUMN CAPABILITY & PLANT SHOWCASE */}
          <div className="two-col">
            
            {/* Left Column: Capability Story */}
            <div className="panel pad">
              <div className="eyebrow">MANUFACTURING CAPABILITY</div>
              <h2>From electrical design thinking to production.</h2>
              <p>
                The supplied catalogue positions Graycell around distribution-class oil and dry-type transformers, 
                compact substations, and medium-voltage solutions. Operating from a specialized facility at 
                Khed-Shivapur, Pune, all units follow disciplined manufacturing, precision assembly, and multi-stage testing.
              </p>

              {/* 3 Interactive Minimal Capability Cards */}
              <div className="mfg-cap-grid">
                {capabilities.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div className="mfg-cap-item" key={c.title}>
                      <div className="mfg-cap-item-header">
                        <Icon size={20} color="var(--blue)" />
                        <span className="mfg-cap-tag">{c.tag}</span>
                      </div>
                      <h4>{c.title}</h4>
                      <p>{c.detail}</p>
                    </div>
                  );
                })}
              </div>

              {/* Plant Technical Metrics */}
              <div className="mfg-stats-strip">
                <div className="mfg-stat-box">
                  <div className="val">25–2500</div>
                  <div className="lbl">kVA Reference Range</div>
                </div>
                <div className="mfg-stat-box">
                  <div className="val">33 kV</div>
                  <div className="lbl">Voltage Class Range</div>
                </div>
                <div className="mfg-stat-box">
                  <div className="val">100+</div>
                  <div className="lbl">Annual CSS Capacity</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Plant Showcase with Visual & Official Catalogue Tabs */}
            <div className="mfg-plant-card">
              <div className="mfg-plant-card-tabs">
                <button 
                  className={`mfg-tab-btn ${activeTab === 'facility' ? 'active' : ''}`}
                  onClick={() => setActiveTab('facility')}
                >
                  <Factory size={14} />
                  Facility View
                </button>
                <button 
                  className={`mfg-tab-btn ${activeTab === 'catalogue' ? 'active' : ''}`}
                  onClick={() => setActiveTab('catalogue')}
                >
                  <FileText size={14} />
                  Official Catalogue & Clientele
                </button>
              </div>

              {activeTab === 'facility' ? (
                <div className="mfg-plant-img-box">
                  <img 
                    src="/images/brand/hero-transformer.jpg" 
                    alt="Graycell modern manufacturing plant and testing facility" 
                  />
                  <div className="mfg-plant-badge-top">
                    <MapPin size={12} color="#0878c9" />
                    Khed-Shivapur Plant · Pune Facility
                  </div>
                  <div className="mfg-plant-badge-bottom">
                    <span>Siemens Approved Technology Partner · 8FB20 CSS</span>
                    <span style={{ fontFamily: 'DM Mono', fontSize: 10.5 }}>IS 2026 / IEC 60076</span>
                  </div>
                </div>
              ) : (
                <div className="mfg-plant-img-box contain-mode">
                  <img 
                    src="/images/brand/catalogue-page-4.jpg" 
                    alt="Graycell official catalogue sheet, manufacturing range and clientele" 
                  />
                  <div className="mfg-plant-badge-top">
                    <CheckCircle2 size={12} color="#16834b" />
                    Official Catalogue Source Document
                  </div>
                  <div className="mfg-plant-badge-bottom">
                    <span>Graycell Energy LLP · Pune</span>
                    <Link 
                      href="/resources/graycell-product-catalogue" 
                      style={{ color: '#fff', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: 3 }}
                    >
                      Open PDF <ExternalLink size={11} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* FOUR DISCIPLINED PROCESS STAGES */}
          <div>
            <div className="section-heading">
              <div>
                <div className="eyebrow">PROCESS & INFRASTRUCTURE</div>
                <h2>Four Disciplined Stages of Manufacturing.</h2>
              </div>
              <p style={{ margin: 0, color: '#64748b', fontSize: 13, maxWidth: 460 }}>
                Every transformer and compact substation follows a rigorous 4-step engineering discipline 
                from raw materials to final test bench dispatch.
              </p>
            </div>

            {/* 4 Cards Grid - Perfectly Balanced (No empty gaps) */}
            <div className="mfg-stages-grid">
              {mfgStages.map((s) => (
                <div className="mfg-stage-card" key={s.num}>
                  <div className="mfg-stage-media">
                    <img src={s.image} alt={`${s.title} visual`} />
                    <span className="mfg-stage-num">{s.num}</span>
                    <span className="mfg-stage-tag">{s.tag}</span>
                  </div>
                  <div className="mfg-stage-body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="mfg-stage-chips">
                      {s.chips.map((c) => (
                        <span className="mfg-chip" key={c}>
                          <CheckCircle2 size={10} color="var(--blue)" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CLIENTELE & VERIFICATION TRUST BAR */}
          <div className="mfg-trust-bar">
            <div className="mfg-trust-left">
              <h4>Approved & Trusted Across Utilities and Private Sector</h4>
              <p>Certified references and major clientele listed in the supplied Graycell technical documentation.</p>
            </div>
            <div className="mfg-client-pills">
              {clientReferences.map((name) => (
                <span className="mfg-client-pill" key={name}>
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* ACTIONS ROW */}
          <div className="mfg-actions-row">
            <button className="btn btn-primary" onClick={handleOpenEnquiry}>
              Discuss your requirement <ArrowRight size={15} />
            </button>
            <Link className="btn btn-outline" href="/build-your-requirement">
              Build your requirement <ChevronRight size={15} />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
