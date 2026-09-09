import Link from 'next/link';
import { technologies } from '../../data/mock-data';

const techImages: Record<string, { src: string; alt: string }> = {
  'foil-winding': {
    src: '/images/technology/foil-winding.jpg',
    alt: 'Graycell precision foil winding technology with copper conductors'
  },
  'natural-ester': {
    src: '/images/technology/natural-ester.jpg',
    alt: 'Graycell eco-friendly natural ester dielectric oil transformer'
  },
  'smart-monitoring': {
    src: '/images/technology/smart-monitoring.jpg',
    alt: 'Graycell smart IoT monitoring and digital diagnostics switchgear'
  }
};

export default function Technology() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Technology / Engineering intelligence</div>
          <h1>TECHNOLOGY<br />THAT MATTERS.</h1>
          <p>Technical themes drawn from the supplied Graycell catalogues: foil winding, natural ester oil and smart monitoring.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="feature-grid">
            {technologies.map((t, i) => {
              const img = techImages[t.slug] || {
                src: '/images/technology/foil-winding.jpg',
                alt: t.name
              };
              return (
                <Link className="feature-card" href={`/technology/${t.slug}`} key={t.id}>
                  <div className="feature-card-media">
                    <img src={img.src} alt={img.alt} />
                    <span className="feature-card-badge">TECH / 0{i + 1}</span>
                  </div>
                  <div className="inner">
                    <div className="eyebrow">TECH / 0{i + 1}</div>
                    <h3>{t.name}</h3>
                    <p>{t.summary}</p>
                    <div className="tag-row" style={{ marginTop: 14 }}>
                      {t.benefits.slice(0, 3).map((b) => (
                        <span className="tag" key={b}>{b}</span>
                      ))}
                    </div>
                    <span className="feature-card-cta">
                      Explore Technical Profile <span>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
