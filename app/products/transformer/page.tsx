'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Cpu } from 'lucide-react';
import ProductShowcaseSection from '../../../components/ProductShowcaseSection';

export default function TransformerProductPage() {
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

  const transformerSections = [
    {
      id: 'oil-filled',
      title: 'Transformers',
      subtitle: '25 kVA – 2500 kVA, up to 33 kV Class',
      imageSrc: '/images/products/power-transformer.png',
      summary:
        'Graycell Power Solutions Pvt. Ltd. manufactures high-quality oil-filled distribution transformers designed to meet international standards and compete with leading Indian manufacturers. Operating a state-of-the-art facility in Pune with promoters holding 25+ years of experience.',
      specs: [
        { label: 'Rating Range', value: '25 kVA – 2500 kVA' },
        { label: 'Voltage Class', value: 'Up to 33 kV' },
        { label: 'Cooling Method', value: 'ONAN / ONAF' },
        { label: 'Winding Material', value: 'High Conductivity Electrolytic Copper / Aluminium' },
        { label: 'Standard Compliance', value: 'IS 1180 / IEC 60076' },
      ],
      features: [
        'Robust mechanical strength designed to withstand short-circuit forces',
        'Vacuum drying & automated oil impregnation for high dielectric reliability',
        'Optimized core design for minimal no-load and load losses',
        'Strict routine testing at every stage of manufacturing',
      ],
      productId: 'oil-filled-distribution',
    },
    {
      id: 'aluminium-foil',
      title: 'Transformers',
      subtitle: 'Precision Automated Foil Winding Technology',
      imageSrc: '/images/products/aluminium_foil_wound.jpg',
      summary:
        'Aluminium foil-wound transformers are increasingly preferred in distribution applications. Since aluminium is readily available in India, its use reduces dependence on imported copper and minimizes foreign exchange outflow.',
      specs: [
        { label: 'Cost Savings', value: '15-20% lower cost vs copper' },
        { label: 'Energy Efficiency', value: 'Equivalent energy efficiency and losses' },
        { label: 'Physical Dimensions', value: 'Similar overall transformer footprint' },
        { label: 'Winding Process', value: 'Fully automated LV foil winding' },
      ],
      features: [
        'Uniform current distribution throughout the winding',
        'High mechanical strength against axial short-circuit forces',
        'Reduced hot spots & improved thermal performance',
        'Eliminates human error through automated precision winding',
      ],
      productId: 'aluminium-foil-wound-transformers',
    },
    {
      id: 'copper-foil',
      title: 'Transformers',
      subtitle: 'High Efficiency Electrolytic Copper Winding',
      imageSrc: '/images/products/copper_foil_wound.jpg',
      summary:
        'Engineered for maximum thermal conductivity, compact dimensional requirements, and demanding industrial applications requiring premium high-efficiency copper conductors.',
      specs: [
        { label: 'Conductor Material', value: 'Electrolytic Grade Copper Foil' },
        { label: 'Efficiency Class', value: 'Ultra-High Efficiency Tier' },
        { label: 'Overload Capability', value: 'Enhanced thermal reserve' },
        { label: 'Voltage Range', value: 'Up to 33 kV class' },
      ],
      features: [
        'Superior thermal conductivity and lower electrical resistance',
        'Ideal for high-density commercial and industrial installations',
        'Compatible with natural ester biodegradable dielectric fluids',
        'Comprehensive routine and type testing backed by 25+ years promoter expertise',
      ],
      productId: 'copper-foil-wound-transformers',
    },
    {
      id: 'dry-type',
      title: 'Dry Type Distribution Transformers',
      subtitle: 'Cast Resin & VPI Dry Type (Indoor & Flame Retardant)',
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
    },
    {
      id: 'ester-oil',
      title: 'Natural Ester Transformers',
      subtitle: 'Bio-Degradable & Fire-Safe Ester Fluid Transformers',
      imageSrc: '/images/products/natural-ester-see-through.jpg',
      summary:
        'Utilizing natural ester vegetable-based dielectric fluids with high flash points (>300°C), providing exceptional fire safety, extended insulation life, and 100% biodegradability.',
      specs: [
        { label: 'Fire Point', value: '> 300°C (K-Class Fluid)' },
        { label: 'Environmental Impact', value: '100% Biodegradable & Non-Toxic' },
        { label: 'Insulation Life', value: 'Up to 33% extended paper insulation life' },
        { label: 'Applications', value: 'Dense urban, eco-sensitive & renewable projects' },
      ],
      features: [
        'K-class high fire point significantly reduces fire risk',
        'Rapidly biodegradable in soil and water',
        'Higher moisture tolerance extends paper insulation longevity',
        'Compatible with standard distribution transformer designs',
      ],
      productId: 'natural-ester-transformers',
    },
    {
      id: 'hermetically-sealed',
      title: 'Hermetically Sealed & Corrugated Tank Transformers',
      subtitle: 'Corrugated Tank Maintenance-Free Sealed Units',
      imageSrc: '/images/products/hermetically_sealed.jpg',
      summary:
        'Hermetically sealed transformers without conservators, utilizing flexible corrugated tank fins to absorb oil expansion. Completely isolates dielectric oil from ambient atmosphere and humidity.',
      specs: [
        { label: 'Tank Design', value: 'Corrugated Elastic Fin Expansion' },
        { label: 'Maintenance', value: 'Completely Sealed & Maintenance-Free' },
        { label: 'Atmospheric Exposure', value: 'Zero moisture or oxygen contact' },
        { label: 'Installation', value: 'Indoor & Compact Outdoor' },
      ],
      features: [
        'Eliminates need for conservator tank and silica gel breathers',
        'Prevents oil oxidation and dielectric degradation over decades',
        'Compact overall height for space-constrained substations',
        'Factory tested and sealed for lifetime operational integrity',
      ],
      productId: 'hermetically-sealed-transformers',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Graycell Power Solutions · Product Range</div>
          <h1>
            DISTRIBUTION & POWER
            <br />
            TRANSFORMERS.
          </h1>
          <p>
            Manufactured by Graycell Power Solutions Pvt. Ltd. in Pune under international quality standards. Featuring oil-filled, dry-type, aluminium foil wound, copper foil wound, natural ester, and hermetically sealed corrugated designs up to 33 kV class.
          </p>

          {/* SECTION ANCHOR NAV */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
            {transformerSections.map((sec) => (
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

      {/* SINGLE PAGE TRANSFORMER SECTIONS */}
      <section className="page-content">
        <div className="container" style={{ display: 'grid', gap: 60 }}>
          {transformerSections.map((sec, idx) => (
            <div key={sec.id} id={sec.id} className="panel pad" style={{ scrollMarginTop: 100 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="eyebrow" style={{ color: 'var(--blue)' }}>0{idx + 1} / TRANSFORMER CATEGORY</span>
                <span className="tag" style={{ background: '#e0f2fe', color: 'var(--blue)' }}>33 kV CLASS</span>
              </div>
              
              <h2 style={{ fontSize: 32, marginBottom: 6 }}>{sec.title}</h2>
              <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 20 }}>{sec.subtitle}</div>

              {/* PRODUCT SHOWCASE (IMAGE GALLERY & 3D MODEL VIEWER TAB) */}
              <div style={{ marginBottom: 30 }}>
                <ProductShowcaseSection
                  productId={sec.productId}
                  productName={sec.title}
                  category="transformer"
                  imageSrc={sec.imageSrc}
                  imageAlt={sec.title}
                />
              </div>

              {/* OVERVIEW & SPECS GRID */}
              <div className="two-col" style={{ alignItems: 'start' }}>
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

                  <Link href="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: 20 }}>
                    Enquire for {sec.title} <ArrowRight size={15} />
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
