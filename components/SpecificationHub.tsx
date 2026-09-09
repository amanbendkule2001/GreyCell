'use client';

import { useState } from 'react';
import { 
  Zap, 
  Layers, 
  Cpu, 
  Leaf, 
  Flame, 
  Copy, 
  Check, 
  MessageSquare, 
  PhoneCall, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { siteConfig } from '../data/mock-data';

const categories = [
  {
    id: 'power-transformers',
    label: 'Power Transformers',
    icon: Zap,
    rating: '25 kVA – 2500 kVA · Up to 33 kV',
    standard: 'IS 2026 / IEC 60076 verified',
    badge: 'Hermetically Sealed / Free-Breathing',
    desc: 'Oil-immersed power and distribution transformers with corrugated fin tanks or detachable radiator banks.'
  },
  {
    id: 'compact-substations',
    label: 'Compact Substations',
    icon: Layers,
    rating: 'Up to 2500 kVA · 11 / 22 / 33 kV',
    standard: 'IEC 62271-202 Type Tested',
    badge: 'Siemens 8FB20 License Partner',
    desc: 'Factory-built package substations integrating MV ring main units, transformer and LV distribution switchboards.'
  },
  {
    id: 'mv-switchgear',
    label: 'MV Switchgear & VCB',
    icon: Cpu,
    rating: '11 kV & 33 kV · Up to 3150A',
    standard: '21kA / 3 Sec Internal Arc',
    badge: 'Siemens IPAN VCB Panels',
    desc: 'Air-insulated and gas-insulated indoor modular switchgear lineups engineered for high-fault utility networks.'
  },
  {
    id: 'natural-ester',
    label: 'Natural Ester Units',
    icon: Leaf,
    rating: 'Flash Point > 300°C · 100% Bio-degradable',
    standard: 'Class K Fire Safety Standard',
    badge: 'Eco-Green High Safety',
    desc: 'Vegetable seed-oil dielectric fluid transformers engineered for densely populated buildings, airports and clean parks.'
  },
  {
    id: 'dry-type',
    label: 'Dry-Type Cast Resin',
    icon: Flame,
    rating: 'Up to 3000 kVA · 33 kV Class',
    standard: 'Class F / H Fire Retardant',
    badge: 'Copper Foil Winding Coils',
    desc: 'Self-extinguishing cast resin transformers designed for moisture resistance and maximum safety indoors.'
  }
];

export function SpecificationHub() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const activeItem = categories[activeIdx];

  const handleOpenEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-enquiry'));
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(siteConfig.contact.salesEmail);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = siteConfig.contact.salesEmail;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Graycell Sales, I would like to request a technical quotation for ${activeItem.label} (${activeItem.rating}).`
  )}`;

  return (
    <section className="spec-hub-section" id="spec-hub">
      <div className="container">
        <div className="spec-hub-card">
          {/* Ambient Lighting Accents */}
          <div className="spec-hub-glow-cyan" />
          <div className="spec-hub-glow-blue" />
          
          <div className="spec-hub-header">
            <div className="spec-hub-title-group">
              <div className="spec-hub-eyebrow">
                <span className="spec-hub-live-dot" />
                DIRECT ENGINEERING INTAKE
              </div>
              <h2 className="spec-hub-heading">
                Have a specification?<br />
                <span>Configure your technical quotation.</span>
              </h2>
              <p className="spec-hub-lead">
                Select an equipment category below to inspect typical parameters, or initiate a live consultation directly with Graycell application engineers.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="spec-hub-status-badge">
              <Clock size={14} className="spec-hub-icon-clock" />
              <span>Engineering Turnaround: <strong>Within 24 Hours</strong></span>
            </div>
          </div>

          {/* Interactive Equipment Category Selector */}
          <div className="spec-hub-interactive-area">
            <div className="spec-hub-tabs-row" role="tablist" aria-label="Select equipment type">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`spec-hub-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveIdx(idx)}
                  >
                    <Icon size={16} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Split Layout */}
            <div className="spec-hub-grid">
              {/* Left Active Specification Card */}
              <div className="spec-hub-active-panel">
                <div className="spec-hub-panel-top">
                  <span className="spec-hub-tech-tag">{activeItem.badge}</span>
                  <span className="spec-hub-standard-tag">
                    <ShieldCheck size={13} />
                    {activeItem.standard}
                  </span>
                </div>

                <div className="spec-hub-active-content">
                  <div className="spec-hub-rating-callout">
                    <div className="spec-hub-rating-label">TYPICAL PARAMETERS & RATINGS</div>
                    <div className="spec-hub-rating-val">{activeItem.rating}</div>
                  </div>
                  <p className="spec-hub-active-desc">{activeItem.desc}</p>
                </div>

                <div className="spec-hub-actions-bar">
                  <button type="button" className="btn btn-primary spec-hub-main-cta" onClick={handleOpenEnquiry}>
                    Request Specification Quotation <ArrowRight size={16} />
                  </button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spec-hub-wa-link"
                    aria-label="Fast-track quote on WhatsApp"
                  >
                    <MessageSquare size={16} />
                    <span>Fast-Track WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Live Direct Contact Card */}
              <div className="spec-hub-contact-panel">
                <div className="spec-hub-contact-header">
                  <div className="spec-hub-contact-title">
                    <div className="spec-hub-beacon-pulse" />
                    <span>Graycell Engineering Directorate</span>
                  </div>
                  <span className="spec-hub-contact-sub">Pune Manufacturing Facility & Global Sales</span>
                </div>

                {/* Direct Channel 1: 1-Click Copy Email */}
                <div className="spec-hub-channel-item">
                  <div className="spec-hub-channel-info">
                    <span className="spec-hub-channel-label">TECHNICAL INQUIRY DESK</span>
                    <a href={`mailto:${siteConfig.contact.salesEmail}`} className="spec-hub-channel-val">
                      {siteConfig.contact.salesEmail}
                    </a>
                  </div>
                  <button 
                    type="button"
                    className={`spec-hub-copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Direct Channel 2: Telephone Hotline */}
                <div className="spec-hub-channel-item">
                  <div className="spec-hub-channel-info">
                    <span className="spec-hub-channel-label">ENGINEERING HOTLINE</span>
                    <a href="tel:+919930124365" className="spec-hub-channel-val">
                      +91 99301 24365 / +91 95612 26593
                    </a>
                  </div>
                  <a href="tel:+919930124365" className="spec-hub-phone-btn" title="Call Sales Director">
                    <PhoneCall size={14} />
                    <span>Call</span>
                  </a>
                </div>

                {/* Compliance & Certification Assurance Badges */}
                <div className="spec-hub-certifications">
                  <div className="spec-hub-cert-chip">
                    <CheckCircle2 size={12} />
                    <span>Siemens Approved Partner</span>
                  </div>
                  <div className="spec-hub-cert-chip">
                    <CheckCircle2 size={12} />
                    <span>MSEDCL Approved Range</span>
                  </div>
                  <div className="spec-hub-cert-chip">
                    <CheckCircle2 size={12} />
                    <span>CPRI / ERDA Type Tested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
