'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Factory, Award } from 'lucide-react';
import ProductShowcaseSection from '../../../components/ProductShowcaseSection';

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

  const cssSections = [
    {
      id: 'compact-substation-3mva',
      title: 'Compact Substation',
      subtitle: 'High Capacity Compact Substation Package',
      imageSrc: '/images/products/compact-substation.png',
      summary:
        'Graycell Energy LLP is an approved partner of Siemens to manufacture compact substations (CSS - TYPE 8FB20). High capacity design engineered up to 3MVA rating and 33kV voltage class for major industrial & infrastructure projects.',
      specs: [
        { label: 'Capacity Rating', value: 'Up to 3000 kVA (3 MVA)' },
        { label: 'Voltage Class', value: '12kV / 22kV / 33kV' },
        { label: 'Siemens Partnership', value: 'CSS TYPE 8FB20 Approved Partner' },
        { label: 'RMU Rating', value: 'Siemens RMU 12kV to 33kV, 630A, 21kA' },
        { label: 'Type Test Standard', value: 'IEC 62271-202' },
      ],
      features: [
        'Internal arc tested for 21kA-1Sec, Short time withstand 21kA-3Sec',
        'Enclosure degree of protection IP54 for MV-LV Section, IP23 for Transformer',
        'Enclosure Class K10 with Natural & AF ventilation system',
        'Saves up to 40% premium footprint space over conventional substation design',
      ],
      productId: 'compact-substations',
    },
    {
      id: 'compact-substation-oil-dry',
      title: 'Compact Substation',
      subtitle: 'Oil, Cast Resin, VPI & Green Ester Oil Transformer Options',
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
        'Customized options in 6.6kV / 11kV / 22kV / 33kV up to 2500 kVA',
        'Plug & Play factory assembled unit ready for immediate site energization',
        'Suitable for SF6 insulated Ring Main Unit / VCB / GIS options',
        'Rust, corrosion & weatherproof enclosure for harsh outdoor environments',
      ],
      productId: 'compact-substations',
    },
    {
      id: 'compact-substation-oltc',
      title: 'Compact Substation',
      subtitle: 'On-Load Tap Changer Integrated Compact Substation',
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
        'SCADA compatible with Smart IoT Enabled CSS & transformer health monitoring system',
        'Seamless automatic tap operation under full load conditions',
        'Extremely user-friendly design for operation and routine maintenance',
        'Factory integrated control circuitry and protective relaying',
      ],
      productId: 'compact-substations',
    },
    {
      id: 'compact-substation-msedcl',
      title: 'Compact Substation',
      subtitle: 'Utility Compliant Compact Substation Packages',
      imageSrc: '/images/products/css-msedcl.jpg',
      summary:
        'Specifically engineered and certified to meet Maharashtra State Electricity Distribution Company Limited (MSEDCL) technical standards and utility grid inter-connection guidelines.',
      specs: [
        { label: 'Utility Approval', value: 'MSEDCL Compliant Specification' },
        { label: 'Metering Bay', value: 'Dedicated MV/LV Tariff Metering' },
        { label: 'RMU Switchgear', value: 'Siemens 8FB20 RMU (12kV to 33kV, 630A, 21kA)' },
        { label: 'Testing Standard', value: 'Type Tested IEC 62271-202' },
      ],
      features: [
        'Pre-approved utility layouts ensuring rapid approval and commissioning',
        'Tamper-evident metering compartments complying with DISCOM norms',
        'Robust lockable doors and anti-vandalism outdoor housing',
        'Full factory routine test reports provided prior to dispatch',
      ],
      productId: 'compact-substations',
    },
    {
      id: 'compact-substation-pad-mounted',
      title: 'Compact Substation',
      subtitle: 'Skid & Pad Mounted Compact Substation Solutions',
      imageSrc: '/images/products/css-pad-mounted.jpg',
      summary:
        'Low-profile pad and skid-mounted compact substations tailored for non-standard site requirements, renewable energy sites, mining, and temporary infrastructure deployments.',
      specs: [
        { label: 'Mounting Style', value: 'Pad / Skid Mounted Base Frame' },
        { label: 'Profile Height', value: 'Low profile compact enclosure' },
        { label: 'Mobility Option', value: 'Skid mounted for relocation capability' },
        { label: 'Enclosure Protection', value: 'IP54 Outdoor Weatherproof' },
      ],
      features: [
        'Ideal for renewable solar/wind farms and mining sites',
        'Skid mounted options for non-standard or temporary site deployment',
        'Factory wired and tested — no site assembly required',
        'Weatherproof heavy-gauge enclosure with K10 enclosure class',
      ],
      productId: 'compact-substations',
    },
    {
      id: 'compact-substation-e-house',
      title: 'Compact Substation',
      subtitle: 'Heavy-Duty Walkable Modular Power Equipment Container',
      imageSrc: '/images/products/css-ehouse.jpg',
      summary:
        'Walkable E-House containerized substations integrating Medium Voltage SwitchGear Panels, power distribution transformers, LV switchboards, HVAC, fire suppression, and SCADA automation into one prefabricated Walkable container unit.',
      specs: [
        { label: 'Construction', value: 'Walkable Prefabricated Container (E-House)' },
        { label: 'Dimensions', value: 'Custom containerized sizing (e.g. 8FB 3350 x 2068 x 2300 mm)' },
        { label: 'Climate Control', value: 'HVAC & AF Forced Ventilation' },
        { label: 'Equipment Integration', value: 'Medium Voltage SwitchGear Panels, Transformer, LV Panel, SCADA' },
      ],
      features: [
        'Full internal walkthrough corridor for operator convenience and maintenance',
        'Factory integrated HVAC, lighting, auxiliary power, and fire detection',
        'Drastically reduces civil construction time and on-site labor costs',
        'Fully tested and ready for immediate plug-and-play installation',
      ],
      productId: 'compact-substations',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Graycell Energy LLP · Siemens Approved Partner</div>
          <h1>
            COMPACT SUB-STATIONS
          </h1>
          <p>
            Graycell Energy LLP is an approved partner of Siemens to manufacture compact substations (CSS - TYPE 8FB20). Integrating Siemens RMU (12kV to 33kV, 630A, 21kA), fully type tested to IEC 62271-202 at our Pune Khed-Shivapur facility with 100+ annual unit capacity.
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
          {cssSections.map((sec, idx) => (
            <div key={sec.id} id={sec.id} className="panel pad" style={{ scrollMarginTop: 100 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="eyebrow" style={{ color: 'var(--blue)' }}>0{idx + 1} / COMPACT SUB-STATION</span>
                <span className="tag" style={{ background: '#e0f2fe', color: 'var(--blue)' }}>SIEMENS 8FB20 PARTNER</span>
              </div>

              <h2 style={{ fontSize: 32, marginBottom: 6 }}>{sec.title}</h2>
              <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 20 }}>{sec.subtitle}</div>

              {/* PRODUCT SHOWCASE (IMAGE GALLERY & 3D MODEL VIEWER TAB) */}
              <div style={{ marginBottom: 30 }}>
                <ProductShowcaseSection
                  productId={sec.productId}
                  productName={sec.title}
                  category="compact_substation"
                  imageSrc={sec.imageSrc}
                  imageAlt={sec.title}
                />
              </div>

              {/* OVERVIEW & SPECS GRID */}
              <div className="two-col" style={{ alignItems: 'start' }}>
                <div>
                  <h3 style={{ fontSize: 20, marginBottom: 12 }}>Overview & Technical Highlights</h3>
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
                    Specification Profile
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

                  <Link
                    href="/contact"
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      minHeight: 48,
                      height: 'auto',
                      padding: '12px 16px',
                      marginTop: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      textAlign: 'center',
                      lineHeight: 1.35,
                      fontSize: 'clamp(11px, 2.5vw, 12px)',
                      wordBreak: 'break-word',
                      boxSizing: 'border-box',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ flex: '1 1 auto', textAlign: 'center' }}>
                      Enquire for {sec.title}
                    </span>
                    <ArrowRight size={15} style={{ flexShrink: 0 }} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
