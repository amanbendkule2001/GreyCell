'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Factory, Award, MessageCircle } from 'lucide-react';
import ProductShowcaseSection from '../../../components/ProductShowcaseSection';
import { siteConfig } from '../../../data/mock-data';
import { buildProductWhatsAppMessage, getWhatsAppUrl } from '../../../lib/whatsapp';

export default function CompactSubstationPage() {
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
    const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/compact-substation#${sec.id}` : '';
    const displayName = `Compact Substation - ${sec.title}`;
    const msg = buildProductWhatsAppMessage({
      productName: displayName,
      category: 'Compact Substations (CSS)',
      subtitle: sec.subtitle,
      specs: sec.specs,
      url: currentUrl,
      customMessage: sec.summary.slice(0, 150) + '...',
    });
    const url = getWhatsAppUrl(siteConfig.contact.whatsappNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOnlineEnquiry = (sec: any) => {
    const displayName = `Compact Substation - ${sec.title}`;
    window.dispatchEvent(
      new CustomEvent('open-enquiry', {
        detail: {
          productName: displayName,
          type: 'Compact Substation',
          capacityVoltage: sec.subtitle,
          message: `Technical enquiry regarding ${displayName}.`,
        },
      })
    );
  };

  const cssSections = [

    {
      id: 'compact-substation-oil-dry',
      title: 'CSS with Oil / Dry Type Transformer up to 33kV',
      subtitle: 'Oil or cast resin transformer integrations',
      imageSrc: '/images/products/css-oil-dry.jpg',
      summary:
        'Customizable compact substations accommodating either oil-immersed, cast resin dry-type, VPI, or eco-friendly green ester oil transformers based on site environmental and safety specifications.',
      specs: [
        { label: 'Transformer Types', value: 'Oil-Filled, Cast Resin (Dry), VPI, Ester Oil' },
        { label: 'Secondary Voltage', value: '415V up to 800V options' },
        { label: 'Enclosure Protection', value: 'IP54 MV/LV · IP23 Transformer' },
        { label: 'Manufacturing Site', value: 'Khed-Shivapur, Pune (100+ per annum)' },
      ],
      features: [
        'Fully type tested to IEC62271-202',
        'Internal arc test design for 21KA-1Sec, Short time withstand 21KA-3Sec.',
        'Fully Type tested & customized options in 6.6kV/11kV/22kV/33kV upto 2500 KVA with secondary voltage options from 415V upto 800Volts.',
        'Enclosure Degree Of Protection - IP54 for MV-LV Section, IP23 for Transformer',
        'Enclosure Class-K10 . Natural & AF Ventilation System',
        'Designed, Built & Tested CSS to suit every project be it Indoor or Outdoor type',
        'Rust, corrosion & weatherproof design suitable for outdoor application.',
        'Extremely user-friendly design for operation & routine maintenance'
      ],
      productId: 'compact-substations',
    },
    {
      id: 'compact-substation-oltc',
      title: 'CSS with Transformer having OLTC up to 33kV',
      subtitle: 'On-Load Tap Changer integrations',
      imageSrc: '/images/products/css-oltc.jpg',
      summary:
        'Engineered with On-Load Tap Changers (OLTC) for active voltage regulation in dynamic grid environments, renewable energy injection, and commercial installations with fluctuating primary supply.',
      specs: [
        { label: 'Tap Changer', value: 'On-Load Tap Changer (OLTC) integrated' },
        { label: 'Voltage Control', value: 'Automatic / Remote Voltage Regulation' },
        { label: 'SCADA Compatibility', value: 'Smart IoT & SCADA ready' },
        { label: 'Footprint Reduction', value: '40% footprint savings' },
      ],
      features: [
        'Customized design of CSS as per requirement',
        'Separate door for OLTC operation',
        'Compact type transformer with OLTC to accommodate in CSS',
        'HT/LT placement on one side of CSS to save space',
        'Inbuilt RTCC panel for OLTC',
        'Special lifting arrangement for heavy, large CSS',
      ],
      productId: 'compact-substations',
    },
    {
      id: 'compact-substation-msedcl',
      title: 'MSEDCL Approved CSS',
      subtitle: 'Utility compliant distribution packages',
      imageSrc: '/images/products/css-msedcl.png',
      summary:
        'Specifically engineered and certified to meet Maharashtra State Electricity Distribution Company Limited (MSEDCL) technical standards and utility grid inter-connection guidelines.',
      specs: [
        { label: 'Utility Approval', value: 'MSEDCL Compliant Specification' },
        { label: 'Metering Bay', value: 'Dedicated MV/LV Tariff Metering' },
        { label: 'RMU Switchgear', value: 'Siemens 8FB20 RMU (12kV to 33kV, 630A, 21kA)' },
        { label: 'Testing Standard', value: 'Type Tested IEC 62271-202' },
      ],
      features: [
        'Specially designed CSS as per MSEDCL requirements.',
        'Fully type-tested design up to 1000kVA, 22/0.433kV CSS.',
        'Approved by MSEDCL.',
        'HT side MSEDCL approved SCADA RMU.',
        'Transformer compartment suitable to accommodate any standard MSEDCL transformer.',
        'Interchangeability of transformer at site location easily possible.',
        'LT side MSEDCL approved feeder pillar is provided.',
        'All CSS are fully tested by MSEDCL authority.',
        'Suitable for all LT consumers.'
      ],
      productId: 'compact-substations',
    },
    {
      id: 'compact-substation-pad-mounted',
      title: 'PAD Mounted CSS',
      subtitle: 'Compact skid / pad mounted solutions',
      imageSrc: '/images/products/css-pad-mounted.png',
      summary:
        'Low-profile pad and skid-mounted compact substations tailored for non-standard site requirements, renewable energy sites, mining, and temporary infrastructure deployments.',
      specs: [
        { label: 'Mounting Style', value: 'Pad / Skid Mounted Base Frame' },
        { label: 'Profile Height', value: 'Low profile compact enclosure' },
        { label: 'Mobility Option', value: 'Skid mounted for relocation capability' },
        { label: 'Enclosure Protection', value: 'IP54 Outdoor Weatherproof' },
      ],
      features: [
        'PAD skid-mounted CSS for non-standard site requirements in the entire range.',
        'Compact in design.',
        'HT Transformer and LT Panel are mounted on a common skid and connected with each other by cables/busbars.',
        'Safety fencing is provided for the transformer.',
        'High IP degree of protection.',
        'Suitable for all types of indoor and outdoor installations.',
        'Easy to operate and maintain.'
      ],
      productId: 'compact-substations',
    },
    {
      id: 'compact-substation-e-house',
      title: 'E-House (Walkable Container Rich Substation)',
      subtitle: 'Heavy-duty walkable container substations',
      imageSrc: '/images/products/e-house-new.jpg',
      summary:
        'Walkable E-House containerized substations integrating Medium Voltage SwitchGear Panels, power distribution transformers, LV switchboards, HVAC, fire suppression, and SCADA automation into one prefabricated Walkable container unit.',
      specs: [
        { label: 'Construction', value: 'Walkable Prefabricated Container (E-House)' },
        { label: 'Dimensions', value: 'Custom containerized sizing (e.g. 8FB 3350 x 2068 x 2300 mm)' },
        { label: 'Climate Control', value: 'HVAC & AF Forced Ventilation' },
        { label: 'Equipment Integration', value: 'Medium Voltage SwitchGear Panels, Transformer, LV Panel, SCADA' },
      ],
      features: [
        'E-House is a modern concept in which all substation switchgear panels and AUX panels are installed in one container, which is walkable and convenient to operate.',
        'E-House is a plug-and-play solution which is pre-assembled at the factory and delivered to the site ready to use.',
        'Reduces site work and installation time.',
        'E-House is completely enclosed, hence suitable for the oil and gas, steel, and cement industries where the outside environment is hazardous.',
        'E-House is equipped with a fire and gas suppression system.',
        'E-House features fire-retardant walls to protect inside switchgear panels from external fires for up to 60/90/100 minutes.'
      ],
      productId: 'compact-substations',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Graycell · Siemens Approved Partner</div>
          <h1>
            COMPACT SUB-STATIONS
          </h1>
          <p>
            Graycell is an approved partner of Siemens to manufacture compact substations (CSS - TYPE 8FB20). Integrating Siemens RMU (12kV to 33kV, 630A, 21kA), fully type tested to IEC 62271-202 at our Pune Khed-Shivapur facility with 100+ annual unit capacity.
          </p>

          {/* SECTION ANCHOR NAV */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
            {cssSections.map((sec) => (
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

      {/* SINGLE PAGE COMPACT SUB-STATION SECTIONS */}
      <section className="page-content">
        <div className="container" style={{ display: 'grid', gap: 60 }}>
          {cssSections.map((sec, idx) => {
            const isThreeColLayout = sec.id === 'compact-substation-oil-dry' || sec.id === 'compact-substation-oltc';
            const showFeaturesInSpecBox = sec.id === 'compact-substation-msedcl' || sec.id === 'compact-substation-pad-mounted' || sec.id === 'compact-substation-e-house';

            return (
              <div key={sec.id} id={sec.id} className="panel pad" style={{ scrollMarginTop: 100 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span className="eyebrow" style={{ color: 'var(--blue)' }}>0{idx + 1} / COMPACT SUB-STATION</span>
                  <span className="tag" style={{ background: '#e0f2fe', color: 'var(--blue)' }}>SIEMENS 8FB20 PARTNER</span>
                </div>

                <h2 style={{ fontSize: 32, marginBottom: 6 }}>{sec.title}</h2>
                <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 20 }}>{sec.subtitle}</div>

                {!isThreeColLayout ? (
                  <div className="two-col" style={{ alignItems: 'start', gap: '40px' }}>
                    <div style={{ width: '100%', minWidth: 0 }}>
                      <ProductShowcaseSection
                        productId={sec.productId}
                        productName={sec.title}
                        category="compact_substation"
                        imageSrc={sec.imageSrc}
                        imageAlt={sec.title}
                      />
                    </div>

                    <div style={{ width: '100%', minWidth: 0 }}>
                      <div style={{ background: '#f8fafc', padding: 24, borderRadius: 6, border: '1px solid #cbd5e1', marginBottom: 24 }}>
                        <h4 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0', color: 'var(--blue)' }}>
                          {showFeaturesInSpecBox ? 'Key Features' : 'Specification Profile'}
                        </h4>

                        {showFeaturesInSpecBox ? (
                          <div style={{ display: 'grid', gap: 10 }}>
                            {sec.features.map((f, i) => (
                              <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#334155' }}>
                                <CheckCircle2 size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ overflowX: 'auto', width: '100%' }}>
                            <table className="spec-table" style={{ minWidth: 350 }}>
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
                        )}

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

                      {!showFeaturesInSpecBox && (
                        <>
                          <h4 style={{ fontSize: 16, marginBottom: 12, color: 'var(--ink)' }}>Key Features</h4>
                          <div style={{ display: 'grid', gap: 10 }}>
                            {sec.features.map((f, i) => (
                              <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#334155' }}>
                                <CheckCircle2 size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'start' }}>
                      <div style={{ background: '#f8fafc', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1' }}>
                        <img src="/images/products/oil-type-transformer-new.jpg" alt="Oil Type Transformer" style={{ width: '100%', objectFit: 'contain' }} />
                        <h4 style={{ fontSize: 18, margin: '16px 0 0 0', color: 'var(--ink)', textAlign: 'center' }}>Oil Type</h4>
                      </div>

                      <div style={{ background: '#f8fafc', padding: 24, borderRadius: 6, border: '1px solid #cbd5e1' }}>
                        <h4 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0', color: 'var(--blue)' }}>
                          Key Features
                        </h4>
                        <div style={{ display: 'grid', gap: 10 }}>
                          {sec.features.map((f, i) => (
                            <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#334155', alignItems: 'flex-start' }}>
                              <CheckCircle2 size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                              <span style={{ lineHeight: 1.4 }}>{f}</span>
                            </div>
                          ))}
                        </div>

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

                      <div style={{ background: '#f8fafc', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1' }}>
                        <img src="/images/products/dry-type-transformer-new.jpg" alt="Dry Type Transformer" style={{ width: '100%', objectFit: 'contain' }} />
                        <h4 style={{ fontSize: 18, margin: '16px 0 0 0', color: 'var(--ink)', textAlign: 'center' }}>Dry Type</h4>
                      </div>
                    </div>


                  </React.Fragment>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
