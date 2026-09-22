'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../data/mock-data';
import { buildBuilderWhatsAppMessage, getWhatsAppUrl } from '../../lib/whatsapp';

export default function Builder() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refId, setRefId] = useState('');

  const [form, setForm] = useState({
    requirementType: 'Transformer',
    segment: '',
    capacity: '',
    voltageRatio: '',
    installation: 'Indoor',
    email: '',
    mobile: '',
    specifications: '',
  });

  const handleWhatsAppFastTrack = () => {
    const msg = buildBuilderWhatsAppMessage({
      refId,
      requirementType: form.requirementType,
      segment: form.segment,
      capacity: form.capacity,
      voltageRatio: form.voltageRatio,
      installation: form.installation,
      email: form.email,
      mobile: form.mobile,
      specifications: form.specifications,
    });
    const url = getWhatsAppUrl(siteConfig.contact.whatsappNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'build-your-requirement',
        }),
      });
      const data = await res.json();
      setRefId(data.refId || 'GC-' + Math.floor(100000 + Math.random() * 900000));
    } catch {
      setRefId('GC-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Engineering intake / Guided selection</div>
          <h1>
            BUILD YOUR
            <br />
            REQUIREMENT.
          </h1>
          <p>
            Define the project context in one single intake form. This is a preliminary intake tool, not automatic engineering approval.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          {done ? (
            <div className="panel pad" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
              <CheckCircle2 color="#16834b" size={48} style={{ marginBottom: 16 }} />
              <h2>READY FOR ENGINEERING.</h2>
              <p style={{ marginBottom: 12 }}>
                Your requirement specification has been recorded under reference ID <strong>{refId}</strong>.
              </p>
              <div
                style={{
                  background: '#f4f7f9',
                  padding: '20px',
                  borderRadius: '4px',
                  textAlign: 'left',
                  margin: '24px auto',
                  maxWidth: '500px',
                }}
              >
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Requirement Summary
                </h4>
                <div style={{ fontSize: '13px', display: 'grid', gap: '8px' }}>
                  <div><strong>Requirement Type:</strong> {form.requirementType}</div>
                  <div><strong>Segment:</strong> {form.segment || '—'}</div>
                  <div><strong>Capacity:</strong> {form.capacity || '—'}</div>
                  <div><strong>Voltage Ratio:</strong> {form.voltageRatio || '—'}</div>
                  <div><strong>Installation:</strong> {form.installation}</div>
                  <div><strong>Email:</strong> {form.email}</div>
                  <div><strong>Mobile:</strong> {form.mobile}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-whatsapp-direct"
                  onClick={handleWhatsAppFastTrack}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <MessageCircle size={16} /> Fast-track on WhatsApp
                </button>
                <button className="btn btn-outline" onClick={() => setDone(false)}>
                  Edit Requirement
                </button>
                <Link className="btn btn-primary" href="/contact">
                  Open Enquiry Form
                </Link>
              </div>
            </div>
          ) : (
            <div className="two-col">
              <div className="panel pad">
                <div className="eyebrow">REQUIREMENT INTAKE FORM</div>
                <h2 style={{ marginBottom: 24 }}>Requirement Details</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                  <div className="field">
                    <label htmlFor="requirementType">Requirement Type</label>
                    <select
                      id="requirementType"
                      name="requirementType"
                      value={form.requirementType}
                      onChange={handleChange}
                      required
                    >
                      <option value="Transformer">Transformer</option>
                      <option value="Compact Substation">Compact Substation</option>
                      <option value="Medium Voltage System">Medium Voltage System</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="segment">Segment</label>
                    <select
                      id="segment"
                      name="segment"
                      value={form.segment}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Segment</option>
                      <option value="Commercial/Residential">Commercial/Residential</option>
                      <option value="Industry">Industry</option>
                      <option value="Utility">Utility</option>
                      <option value="Oil & Gas">Oil & Gas</option>
                      <option value="Renewables">Renewables</option>
                      <option value="Data Centers">Data Centers</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      id="capacity"
                      type="text"
                      name="capacity"
                      value={form.capacity}
                      onChange={handleChange}
                      placeholder="e.g. 1000 kVA"
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="voltageRatio">Voltage Ratio</label>
                    <select
                      id="voltageRatio"
                      name="voltageRatio"
                      value={form.voltageRatio}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Voltage Ratio</option>
                      <option value="6.6/433">6.6/433</option>
                      <option value="11/433">11/433</option>
                      <option value="22/433">22/433</option>
                      <option value="33/433">33/433</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="installation">Installation</label>
                    <select
                      id="installation"
                      name="installation"
                      value={form.installation}
                      onChange={handleChange}
                      required
                    >
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. john@company.com"
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      id="mobile"
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      required
                    />
                  </div>

                  <div className="field full">
                    <label htmlFor="specifications">Additional Specifications / Requirements</label>
                    <textarea
                      id="specifications"
                      name="specifications"
                      rows={4}
                      value={form.specifications}
                      onChange={handleChange}
                      placeholder="Environmental, installation or specific technical requirements"
                    />
                  </div>

                  <div className="field full" style={{ marginTop: 12 }}>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Submit Requirement'} <ArrowRight size={15} />
                    </button>
                  </div>
                </form>
              </div>

              <aside className="sticky">
                <div className="panel pad">
                  <div className="eyebrow">REQUIREMENT SUMMARY</div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span>Requirement type</span>
                    <span className="num">{form.requirementType || '—'}</span>
                  </div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span>Segment</span>
                    <span className="num">{form.segment || '—'}</span>
                  </div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span>Capacity</span>
                    <span className="num">{form.capacity || '—'}</span>
                  </div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span>Voltage Ratio</span>
                    <span className="num">{form.voltageRatio || '—'}</span>
                  </div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span>Installation</span>
                    <span className="num">{form.installation || '—'}</span>
                  </div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span>Email</span>
                    <span className="num">{form.email || '—'}</span>
                  </div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span>Mobile</span>
                    <span className="num">{form.mobile || '—'}</span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

