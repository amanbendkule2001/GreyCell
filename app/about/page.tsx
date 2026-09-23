import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Factory,
  Award,
  Cpu,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { groupCompanies } from '../../data/mock-data';

export default function About() {
  const cssFeatures = [
    'Fully type tested to IEC 62271-202',
    'Internal arc test designed for 21KA-1Sec, Short time withstand 21KA-3Sec.',
    'Fully Type tested & customized options in 6.6KV/11KV/22KV/33KV upto 2500 KVA with secondary voltage options from 415V upto 800Volts.',
    'Enclosure Degree of Protection - IP54 for MV-LV Section, IP23 for Transformer',
    'Enclosure Class - K10. Natural & AF Ventilation System',
    'Designed, Built & Tested CSS to suit every project be it Indoor or Outdoor type',
    '"Plug & Play" Ready to use at site. No site assemblies required.',
    'CSS available with Oil, Cast Resin, VPI & Green (Ester Oil) Transformer including OLTC options.',
    'Pad/skid Mounted CSS for non-standard site requirement in entire range',
    'CSS suitable for SF6 insulated Ring Main Unit / VCB/GIS options with Metering for MV Networking',
    'SCADA Compatible with Smart IoT Enabled CSS & Transformer Health Monitoring System',
    'Rust, corrosion & weatherproof design suitable for outdoor application.',
    'Extremely user-friendly design for operation & routine maintenance',
    'Saves upto 40% premium footprint space over conventional substation design.',
    'Typical CSS dimensions (mm) - 8FB(123) - (2MVA)-L=3350 - W=2068, H=2300. 8FB (Cooling Design) (1250kva) L=3000 x W=2400 x H=2300. (For Customization or Higher rating CSS - Please contact us)',
  ];

  const strengths = [
    {
      title: 'Engineering Excellence',
      desc: 'Our strength comes from strong engineering expertise and modern manufacturing practices focused on precision, reliability and performance.',
      icon: Zap,
    },
    {
      title: 'Modern Manufacturing Facility',
      desc: 'Graycell operates a state-of-the-art manufacturing facility equipped with modern machinery and advanced testing systems.',
      icon: Factory,
    },
    {
      title: 'Experienced Technical Team',
      desc: 'A skilled team of engineers and technicians manages every stage of the process, from design and manufacturing to testing and delivery.',
      icon: Award,
    },
    {
      title: 'Advanced Manufacturing Technology',
      desc: 'Automated LV foil-winding machines and automated winding processes help achieve precision, uniform current distribution and consistent manufacturing quality.',
      icon: Cpu,
    },
    {
      title: 'Quality & Testing',
      desc: 'Graycell uses advanced testing systems, strict quality-control processes, high-quality raw materials and certified components to maintain consistent product quality.',
      icon: ShieldCheck,
    },
    {
      title: 'Reliable Transformer Performance',
      desc: 'The manufacturing approach is focused on efficiency, performance, durability and long service life.',
      icon: TrendingUp,
    },
  ];

  const keyAdvantages = [
    'Optimized transformer design for efficiency and performance',
    'High quality raw materials and certified components',
    'Fully automatic LV foil winding machines',
    'Advanced monitoring of temperature, pressure and performance',
  ];

  const cuttingTech = [
    'Uniform current distribution throughout the winding',
    'High mechanical strength against short-circuit forces',
    'Reduce hot spots and improved thermal performance',
    'Precision manufacturing through automated winding process',
    'Improved reliability and longer transformer life',
    'Eliminates human error',
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">About Graycell</div>
          <h1>
            ENGINEERING
            <br />
            POWER FOR TOMORROW.
          </h1>
          <p>
            Graycell delivers high-quality distribution transformers, compact substations (Siemens Approved Partner), and medium-voltage power solutions built for precision, efficiency, and sustainability.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container" style={{ display: 'grid', gap: 40 }}>
          {/* 1. About Us Section */}
          <div className="panel pad" style={{ background: '#fff', borderRadius: 4, border: '1px solid var(--line)', padding: 32 }}>
            <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8 }}>01 / ABOUT US</div>
            <h2 style={{ marginBottom: 16 }}>Graycell</h2>
            <div style={{ color: '#4a5568', lineHeight: 1.7, fontSize: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ margin: 0 }}>
                Founded by promoters with over 25 years of experience in the power industry, Graycell manufactures high-quality distribution transformers, compact substations, and medium voltage panels. We possess unique expertise to design and manufacture any type of standard and customized compact substation solutions, fully type-tested and tailored to precise client requirements.
              </p>
              <p style={{ margin: 0 }}>
                Graycell is an approved partner of Siemens for HT Panels and CSS, and we are associated with Lucy Electric for manufacturing various types of compact substations. We operate a state-of-the-art manufacturing setup at <strong>Khed - Shivapur, Pune</strong>, equipped with modern machinery, advanced testing systems, and strict quality control processes. With an installed capacity of over 100 CSS per annum, our skilled team of engineers and technicians ensures precision at every stage—from design and manufacturing to testing and delivery.
              </p>
            </div>
          </div>

          {/* 2. Our Strengths */}
          <div>
            <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8 }}>02 / OUR STRENGTHS</div>
            <h2 style={{ marginBottom: 20 }}>Core Engineering Capabilities</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 20,
              }}
            >
              {strengths.map((s, idx) => {
                const IconComponent = s.icon;
                return (
                  <div
                    key={idx}
                    className="panel pad"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      background: '#fff',
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 6,
                        background: '#e0f2fe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--blue)',
                      }}
                    >
                      <IconComponent size={22} />
                    </div>
                    <h3 style={{ fontSize: 18, margin: 0, color: 'var(--ink)' }}>{s.title}</h3>
                    <p style={{ margin: 0, color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Key Advantages & 5. Cutting Manufacturing Technology */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 24,
            }}
          >
            {/* Key Advantages */}
            <div className="panel pad" style={{ background: '#fff' }}>
              <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8 }}>03 / KEY ADVANTAGES</div>
              <h2 style={{ marginBottom: 16, fontSize: 24 }}>Strategic Value</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'grid', gap: 12 }}>
                {keyAdvantages.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#334155', lineHeight: 1.5 }}>
                    <CheckCircle2 size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{ color: '#64748b', fontSize: 13.5, fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12, margin: 0 }}>
                These processes ensure consistent quality, durability and long service life.
              </p>
            </div>

            {/* Cutting Manufacturing Technology */}
            <div className="panel pad" style={{ background: '#fff' }}>
              <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8 }}>04 / CUTTING MANUFACTURING TECHNOLOGY</div>
              <h2 style={{ marginBottom: 16, fontSize: 24 }}>Automated Precision</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'grid', gap: 10 }}>
                {cuttingTech.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#334155', lineHeight: 1.5 }}>
                    <Sparkles size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ background: '#f1f5f9', padding: 18, borderRadius: 6, borderLeft: '4px solid var(--blue)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: 15, color: 'var(--ink)' }}>
                  Aluminium Foil Wound Transformers
                </h4>
                <p style={{ margin: '0 0 10px 0', fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                  Aluminium foil-wound transformers are becoming increasingly preferred in distribution applications. Since aluminium is readily available in India, its use reduces dependence on imported copper and minimizes foreign exchange outflow.
                </p>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
                  Advantages compared to copper-wound transformers:
                </div>
                <div style={{ display: 'grid', gap: 4, fontSize: 13, color: '#334155' }}>
                  <div>• 15-20% lower cost</div>
                  <div>• Equivalent energy efficiency and losses</div>
                  <div>• Similar overall transformer dimensions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Images */}
          <div style={{ marginTop: 40 }}>
            <div className="eyebrow">OUR FACILITIES</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 20,
                marginTop: 14,
              }}
            >
              {[
                { src: '/images/projects/project-factory-transformers.jpg', title: 'Graycell Plant' },
                { src: '/images/manufacturing/stage-1-plant.jpg', title: 'Manufacturing Hub' }
              ].map((img, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 8,
                    height: 480,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  className="bento-hover-card"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '20px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      pointerEvents: 'none',
                    }}
                  >
                    {img.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

