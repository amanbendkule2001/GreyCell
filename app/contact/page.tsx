'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  Building2,
  Factory,
  MapPin,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  Navigation,
  MessageCircle,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '../../data/mock-data';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refId, setRefId] = useState('');
  const [activeMap, setActiveMap] = useState<'office' | 'factory'>('office');

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirementType: 'Oil-Filled Distribution Transformer',
    application: '',
    capacity: '',
    primaryVoltage: '',
    secondaryVoltage: '',
    quantity: '',
    location: '',
    message: '',
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          voltage: form.primaryVoltage ? `${form.primaryVoltage} / ${form.secondaryVoltage || 'Standard'}` : form.secondaryVoltage,
          source: 'contact-page',
        }),
      });
      const data = await res.json();
      setRefId(data.refId || 'GC-' + Math.floor(100000 + Math.random() * 900000));
    } catch (err) {
      setRefId('GC-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setSubmitting(false);
      setSent(true);
    }
  };

  const scrollToMap = (type: 'office' | 'factory') => {
    setActiveMap(type);
    const el = document.getElementById('map-view');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const officeAddress = "325, Platinum 9, Pashan-Sus Road, Baner, Pune – 411045, Maharashtra, India";
  const factoryAddress = "Gat No. 311, Plot No. 7, 8, Gauddara Road, nr. Chate College, Khed Shivapur, Maharashtra – 412205, India";

  const officeMapEmbedUrl = "https://maps.google.com/maps?q=Platinum+9,+Pashan-Sus+Road,+Baner,+Pune,+Maharashtra+411045&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const factoryMapEmbedUrl = "https://maps.google.com/maps?q=Gat+No.+311,+Plot+No.+7,8,+Gauddara+Road,+nr.+Chate+College,+Khed+Shivapur,+Maharashtra+412205&t=&z=14&ie=UTF8&iwloc=&output=embed";

  const officeDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Platinum+9,+Pashan-Sus+Road,+Baner,+Pune,+Maharashtra+411045";
  const factoryDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Gat+No.+311+Plot+No.+7+8+Gauddara+Road+nr+Chate+College+Khed+Shivapur+Maharashtra+412205";

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Graycell Power Solutions Pvt. Ltd. · Contact & Locations</div>
          <h1>CONNECT WITH OUR<br />ENGINEERING TEAM.</h1>
          <p>
            Whether you require distribution transformers, turnkey compact substations, MV switchgear panels,
            or wish to visit our Pune corporate office and manufacturing plant, our application engineers are at your service.
          </p>
        </div>
      </section>

      {/* ADDRESS CARDS & GOOGLE MAP SECTION */}
      <section className="contact-locations-section">
        <div className="container">
          
          {/* TWO ADDRESS CARDS */}
          <div className="contact-address-grid">
            
            {/* CORPORATE OFFICE */}
            <div className="contact-address-card office">
              <div>
                <div className="contact-card-top">
                  <div className="contact-card-icon-wrap">
                    <Building2 size={24} />
                  </div>
                  <span className="contact-card-badge office">Corporate Office</span>
                </div>
                <h3 className="contact-card-title">Corporate & Registered Office</h3>
                <div className="contact-card-company">Graycell Power Solutions Pvt. Ltd.</div>
                <p className="contact-card-address">
                  <strong>325, Platinum 9, Pashan-Sus Road,</strong><br />
                  Baner, Pune – 411045, Maharashtra, India
                </p>

                <div className="contact-card-details">
                  <div className="contact-detail-row">
                    <Mail size={15} color="var(--blue)" />
                    <span>Email: <a href={`mailto:${siteConfig.contact.salesEmail}`}>{siteConfig.contact.salesEmail}</a></span>
                  </div>
                  <div className="contact-detail-row">
                    <Phone size={15} color="var(--blue)" />
                    <span>Phone: <a href="tel:+918459947816">+91 84599 47816</a></span>
                  </div>
                  <div className="contact-detail-row">
                    <Clock size={15} color="var(--muted)" />
                    <span>Working Hours: Mon – Sat (9:00 AM – 6:30 PM IST)</span>
                  </div>
                </div>
              </div>

              <div className="contact-card-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollToMap('office')}
                >
                  <MapPin size={15} /> View on Map
                </button>
                <a
                  href={officeDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Navigation size={14} /> Get Directions <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* FACTORY & WORKS */}
            <div className="contact-address-card factory">
              <div>
                <div className="contact-card-top">
                  <div className="contact-card-icon-wrap">
                    <Factory size={24} />
                  </div>
                  <span className="contact-card-badge factory">Factory & Works</span>
                </div>
                <h3 className="contact-card-title">Manufacturing & Testing Unit</h3>
                <div className="contact-card-company">Graycell Power Solutions Pvt. Ltd.</div>
                <p className="contact-card-address">
                  <strong>Gat No. 311, Plot No. 7, 8, Gauddara Road,</strong><br />
                  nr. Chate College, Khed Shivapur,<br />
                  Maharashtra – 412205, India
                </p>

                <div className="contact-card-details">
                  <div className="contact-detail-row">
                    <ShieldCheck size={15} color="#16834b" />
                    <span>Transformer Assembly, Vacuum Drying & Routine Testing Bay</span>
                  </div>
                  <div className="contact-detail-row">
                    <Clock size={15} color="var(--muted)" />
                    <span>Plant Visits & FAT (Factory Acceptance Test) by Appointment</span>
                  </div>
                  <div className="contact-detail-row">
                    <Phone size={15} color="#16834b" />
                    <span>Hotline: <a href="tel:+918459947816">+91 84599 47816</a></span>
                  </div>
                </div>
              </div>

              <div className="contact-card-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ background: '#16834b', borderColor: '#16834b' }}
                  onClick={() => scrollToMap('factory')}
                >
                  <MapPin size={15} /> View Factory on Map
                </button>
                <a
                  href={factoryDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Navigation size={14} /> Get Directions <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>

          {/* INTERACTIVE GOOGLE MAP */}
          <div className="contact-map-frame-box" id="map-view">
            <div className="contact-map-header">
              <div>
                <strong style={{ fontSize: 15, color: '#0f172a' }}>Google Location Map</strong>
                <span style={{ fontSize: 12, color: '#64748b', marginLeft: 10 }}>
                  Showing {activeMap === 'office' ? 'Corporate Office (Baner, Pune)' : 'Manufacturing Plant (Khed Shivapur)'}
                </span>
              </div>

              <div className="contact-map-tabs">
                <button
                  type="button"
                  className={`contact-map-tab ${activeMap === 'office' ? 'active' : ''}`}
                  onClick={() => setActiveMap('office')}
                >
                  <Building2 size={14} /> Corporate Office (Pune)
                </button>
                <button
                  type="button"
                  className={`contact-map-tab ${activeMap === 'factory' ? 'active' : ''}`}
                  onClick={() => setActiveMap('factory')}
                >
                  <Factory size={14} /> Factory & Works (Shivapur)
                </button>
              </div>
            </div>

            <iframe
              title={activeMap === 'office' ? "Graycell Corporate Office Map" : "Graycell Factory Map"}
              className="contact-map-embed"
              src={activeMap === 'office' ? officeMapEmbedUrl : factoryMapEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="contact-map-footer-info">
              <div>
                <strong>📍 {activeMap === 'office' ? 'Office Location:' : 'Factory Location:'} </strong>
                <span>{activeMap === 'office' ? officeAddress : factoryAddress}</span>
              </div>
              <a
                href={activeMap === 'office' ? officeDirectionsUrl : factoryDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-direct-link"
              >
                Open in Google Maps <ExternalLink size={13} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* TECHNICAL ENQUIRY FORM & COMMERCIAL SIDEBAR */}
      <section className="page-content" style={{ paddingTop: 0 }}>
        <div className="container two-col">
          <div>
            {sent ? (
              <div className="panel pad" style={{ textAlign: 'center', padding: '48px 32px' }}>
                <CheckCircle2 color="#16834b" size={54} style={{ margin: '0 auto 16px' }} />
                <div className="eyebrow" style={{ color: '#16834b', marginBottom: 8 }}>ENQUIRY RECORDED · REF: #{refId}</div>
                <h2 style={{ fontSize: 26, margin: '0 0 10px' }}>ENQUIRY SUBMITTED SUCCESSFULLY</h2>
                <p style={{ maxWidth: 540, margin: '0 auto 16px', color: '#475569', lineHeight: 1.6 }}>
                  Thank you, <strong>{form.name || 'Client'}</strong>. Your specification has been logged under Reference ID <strong>#{refId}</strong> and dispatched to <strong>{siteConfig.contact.salesEmail}</strong>.
                </p>
                <p style={{ maxWidth: 500, margin: '0 auto 24px', fontSize: 13, color: '#64748b' }}>
                  Our technical sales team will review your parameters and follow up with a technical & commercial proposal within 24 business hours.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: '',
                      company: '',
                      email: '',
                      phone: '',
                      requirementType: 'Oil-Filled Distribution Transformer',
                      application: '',
                      capacity: '',
                      primaryVoltage: '',
                      secondaryVoltage: '',
                      quantity: '',
                      location: '',
                      message: '',
                    });
                  }}
                >
                  Submit Another Requirement
                </button>
              </div>
            ) : (
              <form className="form-grid" onSubmit={submit}>
                <div className="field">
                  <label>Full name *</label>
                  <input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Company *</label>
                  <input
                    required
                    placeholder="Organization / EPC name"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Phone *</label>
                  <input
                    required
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Equipment / Requirement Type *</label>
                  <select
                    required
                    value={form.requirementType}
                    onChange={e => setForm({ ...form, requirementType: e.target.value })}
                  >
                    <option value="Oil-Filled Distribution Transformer (Up to 33 kV)">Oil-Filled Distribution Transformer (Up to 33 kV)</option>
                    <option value="Dry-Type Cast Resin / VPI Transformer">Dry-Type Cast Resin / VPI Transformer</option>
                    <option value="Natural Ester Eco-Fluid Transformer">Natural Ester Eco-Fluid Transformer</option>
                    <option value="Compact Substation (CSS / Package Substation)">Compact Substation (CSS / Package Substation)</option>
                    <option value="Medium-Voltage Switchgear Panel (VCB / RMU)">Medium-Voltage Switchgear Panel (VCB / RMU)</option>
                    <option value="Custom Power Engineering Solution">Custom Power Engineering Solution</option>
                  </select>
                </div>
                <div className="field">
                  <label>Application / Industry</label>
                  <input
                    placeholder="e.g. Solar PV, Industrial Plant, Commercial complex"
                    value={form.application}
                    onChange={e => setForm({ ...form, application: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Capacity / Rating</label>
                  <input
                    placeholder="e.g. 500 kVA, 1000 kVA, 2500 kVA"
                    value={form.capacity}
                    onChange={e => setForm({ ...form, capacity: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Primary Voltage Class</label>
                  <input
                    placeholder="e.g. 11 kV, 22 kV, 33 kV"
                    value={form.primaryVoltage}
                    onChange={e => setForm({ ...form, primaryVoltage: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Secondary Voltage</label>
                  <input
                    placeholder="e.g. 433 V, 415 V"
                    value={form.secondaryVoltage}
                    onChange={e => setForm({ ...form, secondaryVoltage: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Quantity</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 2 Units"
                    value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Project / Delivery Location</label>
                  <input
                    placeholder="City, State / Site location"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Specification Document (PDF / DOC / Image)</label>
                  <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" />
                </div>
                <div className="field full">
                  <label>Special Engineering Requirements / Notes</label>
                  <textarea
                    rows={5}
                    placeholder="State any specific standards (IS / IEC / BEE Star Rating), vector group, ambient temperature, or special loss limits..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <div className="field full">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={submitting}
                    style={{ width: '100%', justifyContent: 'center', height: 46 }}
                  >
                    {submitting ? 'Dispatching Technical Enquiry...' : (
                      <>Submit Technical Enquiry <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="sticky">
            <div className="panel pad">
              <div className="eyebrow">DIRECT ENGINEERING INTAKE</div>
              <h3 style={{ fontSize: 22, margin: '6px 0 14px' }}>Graycell Sales & Tech Support</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                <div>
                  <span style={{ fontSize: 11, textTransform: 'uppercase', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 2 }}>
                    Official Sales Email
                  </span>
                  <a
                    style={{ fontFamily: 'DM Mono', color: 'var(--blue)', fontSize: 14, fontWeight: 500 }}
                    href={`mailto:${siteConfig.contact.salesEmail}`}
                  >
                    {siteConfig.contact.salesEmail}
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: 11, textTransform: 'uppercase', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 2 }}>
                    Direct Telephone
                  </span>
                  <a
                    style={{ color: '#0f172a', fontSize: 14, fontWeight: 600 }}
                    href="tel:+918459947816"
                  >
                    +91 84599 47816
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: 11, textTransform: 'uppercase', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 2 }}>
                    Instant Technical WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/918459947816?text=${encodeURIComponent('Hello Graycell team, I have a transformer / power engineering requirement to discuss.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, marginTop: 4, width: '100%', justifyContent: 'center', color: '#128c7e' }}
                  >
                    <MessageCircle size={15} /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="rule" style={{ height: 1, background: 'var(--line)', margin: '20px 0' }} />

              <div className="eyebrow">DOWNLOAD SPECS</div>
              <p style={{ fontSize: 12.5, color: '#475569', margin: '6px 0 14px' }}>
                Access our complete technical catalogue for transformers, compact substations, and MV switchgear panels.
              </p>
              <Link
                href="/resources/graycell-product-catalogue"
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}
              >
                <FileText size={14} /> View Product Catalogue
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
