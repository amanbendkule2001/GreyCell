'use client';
import { useState, useEffect, FormEvent } from 'react';
import { X, CheckCircle2, ArrowRight, Send, MessageSquare, Phone, Building, Mail, User } from 'lucide-react';
import { siteConfig } from '../data/mock-data';

export function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refId, setRefId] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirementType: 'Power Transformers',
    capacityVoltage: '',
    message: ''
  });

  useEffect(() => {
    const handleOpen = (e?: any) => {
      if (e?.detail?.type) {
        setForm(prev => ({ ...prev, requirementType: e.detail.type }));
      }
      setSubmitted(false);
      setIsOpen(true);
    };

    window.addEventListener('open-enquiry', handleOpen);
    return () => window.removeEventListener('open-enquiry', handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const generatedRef = 'GC-' + Math.floor(100000 + Math.random() * 900000);
      setRefId(generatedRef);
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppSend = () => {
    const phone = (siteConfig.contact.whatsappNumber || '+919876543210').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `*New Graycell Enquiry*\n\n` +
      `*Name:* ${form.name || 'N/A'}\n` +
      `*Company:* ${form.company || 'N/A'}\n` +
      `*Email:* ${form.email || 'N/A'}\n` +
      `*Phone:* ${form.phone || 'N/A'}\n` +
      `*Type:* ${form.requirementType}\n` +
      `*Capacity/Voltage:* ${form.capacityVoltage || 'N/A'}\n` +
      `*Requirement:* ${form.message || 'I would like to enquire about Graycell power solutions.'}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsOpen(false)} aria-label="Close enquiry modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="enquiry-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} color="#16834b" />
            </div>
            <div className="eyebrow" style={{ color: '#16834b', marginTop: 14 }}>ENQUIRY RECORDED</div>
            <h2>Technical Enquiry Submitted</h2>
            <p className="success-message">
              Thank you, <strong>{form.name}</strong>. Your enquiry for <strong>{form.requirementType}</strong> has been logged under Reference ID <strong>#{refId}</strong>.
            </p>
            <div className="success-details-card">
              <div className="ref-badge">REF: {refId}</div>
              <p>Our power engineering sales team will review your specifications and reach out via email or phone within 24 hours.</p>
            </div>
            <div className="success-actions">
              <button className="btn btn-whatsapp-direct" onClick={handleWhatsAppSend}>
                <MessageSquare size={16} /> Fast-track on WhatsApp
              </button>
              <button className="btn btn-outline" onClick={() => setIsOpen(false)}>
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="enquiry-form-wrapper">
            <div className="modal-header">
              <div className="eyebrow">DIRECT ENGINEERING INTAKE</div>
              <h2>Enquire with Graycell</h2>
              <p>Share your requirement details. We respond with structured technical and commercial information.</p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group-row">
                <div className="modal-field">
                  <label><User size={13} /> Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="modal-field">
                  <label><Building size={13} /> Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Torrent Power / Tata Projects"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="modal-field">
                  <label><Mail size={13} /> Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@company.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="modal-field">
                  <label><Phone size={13} /> Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="modal-field">
                  <label>Equipment / Solution Category *</label>
                  <select
                    value={form.requirementType}
                    onChange={e => setForm({ ...form, requirementType: e.target.value })}
                  >
                    <option value="Power Transformers">Power Transformers</option>
                    <option value="Distribution Transformers">Distribution Transformers</option>
                    <option value="Dry-Type Transformers">Dry-Type Distribution Transformers</option>
                    <option value="Compact Substations">Compact Package Substations (CSS)</option>
                    <option value="MV Switchgear & Solutions">MV Switchgear & Solutions</option>
                    <option value="Custom Engineering">Custom Technical Requirement</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label>Capacity & Voltage (if known)</label>
                  <input
                    type="text"
                    placeholder="e.g. 1000 kVA, 11 kV / 433 V"
                    value={form.capacityVoltage}
                    onChange={e => setForm({ ...form, capacityVoltage: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-field full">
                <label>Technical Specifications / Message</label>
                <textarea
                  rows={3}
                  placeholder="Outline installation context (indoor/outdoor), ambient conditions, or specific standards required..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <div className="modal-actions-row">
                <button
                  type="submit"
                  className="btn btn-primary modal-submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : (
                    <>Submit Enquiry <ArrowRight size={16} /></>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-whatsapp-secondary"
                  onClick={handleWhatsAppSend}
                  title="Send these details directly to WhatsApp chat"
                >
                  <MessageSquare size={16} /> Send via WhatsApp
                </button>
              </div>

              <div className="modal-privacy-note">
                Your requirement is handled directly by Graycell engineering sales. No spam.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
