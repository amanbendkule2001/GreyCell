'use client';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function ProductsHubPage() {
  const categories = [
    {
      title: 'Transformer',
      subtitle: '25 kVA – 2500 kVA, up to 33 kV Class',
      href: '/products/transformer',
      img: '/images/products/power-transformer.png',
      summary:
        'Oil-filled, dry-type cast resin, aluminium foil wound, copper foil wound, natural ester fluid, and hermetically sealed corrugated tank distribution transformers.',
      sublinks: [
        { label: 'Oil-Filled Distribution Transformers', href: '/products/transformer#oil-filled' },
        { label: 'Aluminium Foil Wound Transformers', href: '/products/transformer#aluminium-foil' },
        { label: 'Copper Foil Wound Transformers', href: '/products/transformer#copper-foil' },
        { label: 'Dry Type Distribution Transformers', href: '/products/transformer#dry-type' },
        { label: 'Natural Ester Transformers', href: '/products/transformer#ester-oil' },
        { label: 'Hermetically Sealed Transformers', href: '/products/transformer#hermetically-sealed' },
      ],
    },
    {
      title: 'Compact Sub-Station',
      subtitle: 'Siemens Approved Partner (CSS - TYPE 8FB20)',
      href: '/products/compact-substation',
      img: '/images/products/compact-substation.png',
      summary:
        'Turnkey compact substations integrating Siemens RMU (12kV to 33kV, 630A, 21kA), oil/dry transformers, OLTC, MSEDCL approved, pad mounted, and walkable E-House container solutions.',
      sublinks: [
        { label: 'Up to 3MVA, 33kV Class', href: '/products/compact-substation#compact-substation-3mva' },
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
      img: '/images/products/mv-switchgear.png',
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
            <div key={cat.title} className="panel pad" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 30 }}>
              <div className="product-image-box" style={{ height: 260, borderRadius: 6, overflow: 'hidden' }}>
                <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <div>
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

                <Link className="btn btn-primary" href={cat.href}>
                  Open Category Page <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

