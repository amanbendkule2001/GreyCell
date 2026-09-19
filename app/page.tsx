import Link from 'next/link';
import { ArrowRight, CirclePlay, Leaf, ShieldCheck, Cog, Users, Factory, Gauge, CheckCircle2 } from 'lucide-react';
import { products, solutions, siteConfig } from '../data/mock-data';
import { SpecificationHub } from '../components/SpecificationHub';
import { ClienteleSection } from '../components/ClienteleSection';

const productImage: { [key: string]: string } = {
  'oil-filled-distribution': '/images/products/power-transformer.png',
  'dry-type-distribution': '/images/products/dry-type-transformer.png',
  'compact-substations': '/images/products/compact-substation.png',
  'foil-wound-transformers': '/images/products/mv-switchgear.png',
  'aluminium-foil-wound-transformers': '/images/products/aluminium_foil_wound.jpg',
  'copper-foil-wound-transformers': '/images/products/copper_foil_wound.jpg',
  'hermetically-sealed-transformers': '/images/products/hermetically_sealed.jpg',
  'g-sense-monitoring': '/images/products/gsense_monitoring.jpg',
};
const industries=[
  {name:'Commercial & Residential',img:'/images/industries/commercial-residential.jpg'},
  {name:'Infrastructure',img:'/images/industries/infrastructure-smart-cities.jpg'},
  {name:'Utilities',img:'/images/industries/utilities-power-distribution.jpg'},
  {name:'EV & Renewables',img:'/images/industries/renewable-energy.jpg'},
  {name:'Industry',img:'/images/industries/industries-manufacturing.jpg'},
  {name:'Data Center & IT',img:'/images/industries/data-centers.jpg'},
  {name:'Electrical Contractors',img:'/images/industries/electrical-contractors.jpg'}
];
const proof=[
 {title:'Sustainable Solutions',text:'Lower-impact options for a cleaner tomorrow.',icon:Leaf},
 {title:'Built for Reliability',text:'Engineered to perform in demanding environments.',icon:ShieldCheck},
 {title:'Advanced Technology',text:'Technical solutions for smarter power systems.',icon:Cog},
 {title:'A Trusted Partner',text:'Long-term value through engineering support.',icon:Users}
];

export default function Home(){
 const canonicalIds = ['oil-filled-distribution', 'dry-type-distribution', 'compact-substations', 'foil-wound-transformers'];
 const featured = canonicalIds.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;
 return <main>
   <section className="hero">
     <div className="hero-copy container">
       <div className="eyebrow">ENGINEERED FOR A BRIGHTER TOMORROW</div>
       <h1 className="hero-title">POWERING<br/>A MORE<br/><span className="blue">SUSTAINABLE WORLD</span></h1>
       <p>{siteConfig.supportingText}</p>
       <div className="hero-buttons">
         <Link className="btn btn-primary" href="/products">Explore Our Products <ArrowRight size={16}/></Link>
         <Link className="btn btn-outline" href="/engineering"><CirclePlay size={17}/> Watch Our Story</Link>
       </div>
     </div>
     <div className="hero-visual">
       {/* CSS Auto-Slider */}
       <div className="hero-slider">
         <div className="hero-slide hero-slide-1">
           <img src="/images/brand/hero-transformer.jpg" alt="Graycell oil-filled distribution transformer"/>
           <div className="slide-caption">Oil-Filled Distribution Transformer</div>
         </div>
         <div className="hero-slide hero-slide-2">
           <img src="/images/products/compact-substation.jpg" alt="Graycell compact substation"/>
           <div className="slide-caption">Compact Substations (CSS)</div>
         </div>
         <div className="hero-slide hero-slide-3">
           <img src="/images/products/mv-switchgear.jpg" alt="Graycell Medium Voltage SwitchGear Panels"/>
           <div className="slide-caption">Medium Voltage SwitchGear Panels</div>
         </div>
         <div className="hero-slide hero-slide-4">
           <img src="/images/products/hero-gsense.jpg" alt="Graycell G-SenSe IoT smart monitoring"/>
           <div className="slide-caption">Graycell G-SenSe Smart Monitoring</div>
         </div>
         <div className="hero-slide hero-slide-5">
           <img src="/images/products/hero-foil-wound.jpg" alt="Graycell foil wound transformer"/>
           <div className="slide-caption">Foil Wound Transformers</div>
         </div>
         <div className="hero-slide hero-slide-6">
           <img src="/images/products/hero-hermetic.jpg" alt="Graycell hermetically sealed transformer"/>
           <div className="slide-caption">Hermetically Sealed Transformers</div>
         </div>
         <div className="hero-slide hero-slide-7">
           <img src="/images/products/hero-dry-type.jpg" alt="Graycell dry-type transformer"/>
           <div className="slide-caption">Cast Resin Dry-Type Transformers</div>
         </div>
       </div>
       {/* Slide dots indicator */}
       <div className="hero-slider-dots">
         <span className="dot dot-1"></span>
         <span className="dot dot-2"></span>
         <span className="dot dot-3"></span>
         <span className="dot dot-4"></span>
         <span className="dot dot-5"></span>
         <span className="dot dot-6"></span>
         <span className="dot dot-7"></span>
       </div>
       <div className="hero-badge"><strong>Power engineering solutions</strong><p>Transformers · Compact substations · MV systems</p></div>
     </div>
   </section>

   <section className="proof-strip">
     {proof.map(({title,text,icon:Icon})=><div className="proof-item" key={title}><div className="proof-icon"><Icon size={19}/></div><div><h4>{title}</h4><p>{text}</p></div></div>)}
   </section>

    <section className="section">
      <div className="container">
        <div className="requirements">
          <div className="req-copy"><div className="eyebrow">START WITH YOUR REQUIREMENT</div><h2>THE RIGHT SOLUTION<br/>STARTS WITH THE RIGHT QUESTIONS.</h2><p>Define the segment, capacity, voltage ratio and installation context. The guided intake is a preliminary enquiry tool for the Graycell engineering conversation.</p><Link className="btn btn-primary" href="/build-your-requirement">Build Your Requirement <ArrowRight size={16}/></Link></div>
          <div className="req-list">{['Requirement type','Segment','Capacity','Voltage ratio','Installation','Contact information'].map((x,i)=><div className="row" key={x}><span className="num">0{i+1}</span><div><strong>{x}</strong></div><ArrowRight size={16} color="#0878c9"/></div>)}</div>
        </div>
      </div>
    </section>

   <ClienteleSection />

   <section className="section soft">
     <div className="container">
       <div className="section-heading"><div><div className="eyebrow">OUR PRODUCTS</div><h2>Built for Today.<br/>Ready for Tomorrow.</h2><p>From distribution transformers to compact substations, Graycell presents a focused portfolio for power infrastructure.</p></div><Link className="text-link" href="/products">View all products <span>→</span></Link></div>
       <div className="product-grid">
         {featured.map(p=><Link className="product-card" href={`/products/${p.slug}`} key={p.id}><div className="product-image-box"><span className="product-label">{p.category.replace('_',' ')}</span><img src={productImage[p.id]??p.imageSrc??'/images/products/oil-filled-transformer.jpg'} alt={p.imageAlt??p.name}/></div><div className="product-body"><h3>{p.name}</h3><p>{p.summary}</p><span className="product-link">Explore <span>→</span></span></div></Link>)}
       </div>
     </div>
   </section>

   <section className="section">
     <div className="container industry-layout">
       <div className="industry-intro"><div className="eyebrow">INDUSTRIES WE SERVE</div><h2>Enabling a More Connected, Sustainable World</h2><p>Graycell provides power distribution solutions for industries, businesses, renewable energy projects, and utility services.
</p><Link className="text-link" href="/solutions">Explore all industries <span>→</span></Link></div>
       <div className="industry-grid">{industries.map(i=><div className="industry-tile" key={i.name}><img src={i.img} alt=""/><div className="caption">{i.name} <span>→</span></div></div>)}</div>
     </div>
   </section>

    <section className="section soft">
      <div className="container">
        <div className="section-heading"><div><div className="eyebrow">ABOUT GRAYCELL</div><h2>Engineering Progress<br/>for a Better Tomorrow</h2></div><Link className="text-link" href="/group">Learn more <span>→</span></Link></div>
        
        <div className="panel pad" style={{ background: '#fff', borderRadius: 4, border: '1px solid var(--line)', padding: 32, marginBottom: 24 }}>
          <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8, fontSize: 11 }}>ABOUT US</div>
          <h3 style={{ fontSize: 22, marginBottom: 16, color: 'var(--ink)' }}>Graycell Power Solutions and Graycell Energy LLP</h3>
          <p style={{ color: '#526475', lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
            We manufacture high-quality distribution transformers and are founded by promoters with over 25 years of experience in the power industry. Our transformers are designed to meet international quality standards and compete with leading manufacturers in the Indian power sector. We operate a state-of-the-art manufacturing facility equipped with modern machinery, advanced testing systems, and strict quality control processes. A skilled team of engineers and technicians ensures precision at every stage, from design and manufacturing to testing and delivery. We aim to manufacture reliable power solutions built with precision, efficiency and sustainability.
          </p>
          <p style={{ color: '#526475', lineHeight: 1.8, fontSize: 14, margin: 0 }}>
            As a Siemens approved partner, we manufacture compact substations under this license partnership integrating SIEMENS ring main unit (RMU) of rating 12KV to 33KV, 630A, 21KA. The compact sub-station is fully type tested as per latest 62271-202 and manufactured under high quality standards. We have a full-fledged manufacturing set up at Khed - Shivapur, Pune and have installed capacity to manufacture more than 100 CSS per annum.
          </p>
        </div>

        {/* <div className="capability-row"><div><h3>Power Engineering</h3><p>Transformer and power-solution capabilities represented through the supplied Graycell material.</p></div><div><h3>Technical Range</h3><p>Distribution transformers from 25 kVA to 2500 kVA and voltage references up to 33 kV in the supplied catalogue.</p></div><div><h3>Manufacturing & Testing</h3><p>State-of-the-art manufacturing and testing capability is described in the supplied company material.</p></div></div>
        <div className="metrics" style={{marginTop:18}}><div className="metric"><div className="value">25–2500</div><div className="label">kVA reference range</div></div><div className="metric"><div className="value">33 kV</div><div className="label">voltage class reference</div></div><div className="metric"><div className="value">OIL + DRY</div><div className="label">distribution transformer families</div></div></div> */}
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">CORE CAPABILITIES</div>
            <h2>Strength and Advantages</h2>
          </div>
        </div>

        <div className="panel pad" style={{ background: '#fff', borderRadius: 4, border: '1px solid var(--line)', padding: '32px 36px', marginBottom: 32 }}>
          <p style={{ fontSize: 17, color: 'var(--ink)', fontWeight: 600, lineHeight: 1.5, margin: '0 0 20px' }}>
            At Graycell, our strength lies in engineering excellence and modern manufacturing practices.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <CheckCircle2 size={18} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 14, color: '#526475', lineHeight: 1.5 }}>
                Optimized transformer design for efficiency and performance
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <CheckCircle2 size={18} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 14, color: '#526475', lineHeight: 1.5 }}>
                High quality raw materials and certified components
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <CheckCircle2 size={18} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 14, color: '#526475', lineHeight: 1.5 }}>
                Fully automatic LV foil winding machines
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <CheckCircle2 size={18} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 14, color: '#526475', lineHeight: 1.5 }}>
                Advanced monitoring of temperature, pressure and performance
              </span>
            </div>
          </div>

          <p style={{ color: '#0878c9', fontSize: 14, fontWeight: 600, margin: 0, borderTop: '1px solid var(--line)', paddingTop: 16 }}>
            These processes ensure consistent quality, durability and long service life.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24 }}>
          <div className="panel" style={{ background: '#fff', borderRadius: 4, border: '1px solid var(--line)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 'clamp(200px, 24vw, 260px)', overflow: 'hidden', position: 'relative' }}>
              <img src="/images/technology/automatic-lv-foil-winding-machine.jpg" alt="Automatic LV Foil Winding Machine" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
            <div style={{ padding: 'clamp(20px, 2.5vw, 28px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8, fontSize: 11 }}>TECHNOLOGY</div>
              <h3 style={{ fontSize: 20, marginBottom: 12, color: 'var(--ink)' }}>Foil Winding Technology</h3>
              <p style={{ color: '#526475', lineHeight: 1.7, fontSize: 14, margin: '0 0 20px', flex: 1 }}>
                Automated LV foil winding replaces conventional round wire with continuous metal foil strips across the coil width. This ensures uniform current distribution, superior mechanical strength against short-circuit forces, and minimizes hot spots for enhanced transformer reliability.
              </p>
              <Link className="text-link" href="/technology#foil-winding" style={{ alignSelf: 'flex-start' }}>
                Learn more <span>→</span>
              </Link>
            </div>
          </div>

          <div className="panel" style={{ background: '#fff', borderRadius: 4, border: '1px solid var(--line)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 'clamp(200px, 24vw, 260px)', overflow: 'hidden', position: 'relative' }}>
              <img src="/images/technology/natural-ester-see-through.jpg" alt="Natural Ester Dielectric Fluid Transformer" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
            <div style={{ padding: 'clamp(20px, 2.5vw, 28px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8, fontSize: 11 }}>TECHNOLOGY</div>
              <h3 style={{ fontSize: 20, marginBottom: 12, color: 'var(--ink)' }}>Natural Ester Fluid</h3>
              <p style={{ color: '#526475', lineHeight: 1.7, fontSize: 14, margin: '0 0 20px', flex: 1 }}>
                A 100% biodegradable vegetable dielectric fluid derived from renewable seed oils as an eco-friendly mineral oil alternative. With a high fire point exceeding 300°C (K-Class), it eliminates fire hazard, enhances safety, and extends insulation life by absorbing moisture.
              </p>
              <Link className="text-link" href="/technology#natural-ester" style={{ alignSelf: 'flex-start' }}>
                Learn more <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SpecificationHub />
  </main>
}
