import Link from 'next/link';
import { ArrowRight, CirclePlay, Leaf, ShieldCheck, Cog, Users, Factory, Gauge } from 'lucide-react';
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
 {name:'Renewable Energy',img:'/images/industries/renewable-energy.jpg'},
 {name:'Utilities & Power Distribution',img:'/images/industries/utilities-power-distribution.jpg'},
 {name:'Industries & Manufacturing',img:'/images/industries/industries-manufacturing.jpg'},
 {name:'Infrastructure & Smart Cities',img:'/images/industries/infrastructure-smart-cities.jpg'},
//  {name:'Oil & Gas',img:'/images/industries/oil-gas.jpg'},
 {name:'Data Centers',img:'/images/industries/data-centers.jpg'}
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
          <div className="req-list">{['Requirement type','Segment','Capacity','Voltage ratio','Installation','Contact information'].map((x,i)=><div className="row" key={x}><span className="num">0{i+1}</span><div><strong>{x}</strong><span>Structured intake field</span></div><ArrowRight size={16} color="#0878c9"/></div>)}</div>
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
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 24 }}>
          <div className="panel pad" style={{ background: '#fff', borderRadius: 4, border: '1px solid var(--line)', padding: 30 }}>
            <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8, fontSize: 11 }}>ABOUT US</div>
            <h3 style={{ fontSize: 20, marginBottom: 12, color: 'var(--ink)' }}>Graycell Power Solutions Pvt. Ltd.</h3>
            <p style={{ color: '#526475', lineHeight: 1.75, fontSize: 14, margin: 0 }}>
              Graycell Power Solutions Pvt. Ltd. manufactures high-quality distribution transformers and is founded by promoters with over 25 years of experience in the power industry. Our transformers are designed to meet international quality standards and compete with leading manufacturers in the Indian power sector. We operate a state-of-the-art manufacturing facility equipped with modern machinery, advanced testing systems, and strict quality control processes. A skilled team of engineers and technicians ensures precision at every stage, from design and manufacturing to testing and delivery. We aim to manufacture reliable power solutions built with precision, efficiency and sustainability.
            </p>
          </div>

          <div className="panel pad" style={{ background: '#fff', borderRadius: 4, border: '1px solid var(--line)', padding: 30 }}>
            <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8, fontSize: 11 }}>COMPACT SUB STATION</div>
            <h3 style={{ fontSize: 20, marginBottom: 12, color: 'var(--ink)' }}>Siemens Approved Partner (CSS - TYPE 8FB20)</h3>
            <p style={{ color: '#526475', lineHeight: 1.75, fontSize: 14, margin: 0 }}>
              Graycell Energy LLP is approved partner of Siemens to manufacture compact sub station (CSS - TYPE 8FB20). Under this license partnership Graycell Energy integrates SIEMENS ring main unit (RMU) of rating 12KV to 33KV, 630A, 21KA in 8FB20 compact sub-station. The compact sub-station is fully type tested as per latest 62271-202 and manufactured under high quality standards. Graycell Energy LLP has a full-fledged manufacturing set up at Khed - Shivapur, Pune and has installed capacity to manufacture more than 100 css per annum.
            </p>
          </div>
        </div>

        {/* <div className="capability-row"><div><h3>Power Engineering</h3><p>Transformer and power-solution capabilities represented through the supplied Graycell material.</p></div><div><h3>Technical Range</h3><p>Distribution transformers from 25 kVA to 2500 kVA and voltage references up to 33 kV in the supplied catalogue.</p></div><div><h3>Manufacturing & Testing</h3><p>State-of-the-art manufacturing and testing capability is described in the supplied company material.</p></div></div>
        <div className="metrics" style={{marginTop:18}}><div className="metric"><div className="value">25–2500</div><div className="label">kVA reference range</div></div><div className="metric"><div className="value">33 kV</div><div className="label">voltage class reference</div></div><div className="metric"><div className="value">OIL + DRY</div><div className="label">distribution transformer families</div></div></div> */}
      </div>
    </section>

   {/* <section className="section">
     <div className="container">
       <div className="section-heading"><div><div className="eyebrow">ENGINEERING JOURNEY</div><h2>FROM REQUIREMENT<br/>TO REAL POWER.</h2></div><Link className="text-link" href="/engineering">Discover engineering <span>→</span></Link></div>
       <div className="timeline">{['Requirement','Engineering','Manufacturing','Testing','Quality','Delivery'].map((x,i)=><div className="timeline-item" key={x}><div className="num">0{i+1}</div><h3>{x}</h3><p>Structured process step for the engineering story.</p></div>)}</div>
     </div>
   </section> */}

    <SpecificationHub />
  </main>
}
