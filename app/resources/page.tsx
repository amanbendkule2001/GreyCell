import Link from 'next/link';
import { resources } from '../../data/mock-data';
import { Download, ArrowRight } from 'lucide-react';

const resourceCovers: { [key: string]: string } = {
  'graycell-product-catalogue': '/images/brand/catalogue-page-1.jpg',
  'graycell-transformer-brochure': '/images/brand/transformer-brochure-cover.jpg',
};

export default function Resources() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Resources / Technical library</div>
          <h1>
            THE ENGINEERING
            <br />
            LIBRARY.
          </h1>
          <p>
            Catalogues and technical resources should be easy to discover, understand and download.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="feature-grid">
            {resources.map((r) => (
              <Link className="feature-card" href={`/resources/${r.slug}`} key={r.id}>
                <img
                  src={resourceCovers[r.slug] || '/images/brand/catalogue-page-1.jpg'}
                  alt={`${r.title} cover`}
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
                <div className="inner">
                  <div className="eyebrow">CATALOGUE</div>
                  <h3>{r.title}</h3>
                  <p>{r.seo.description}</p>
                  <span className="product-link">
                    Open resource <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="notice" style={{ marginTop: 28 }}>
            The current resource library contains the supplied Graycell Product Catalogue and Oil & Dry Type Transformers Brochure. Additional datasheets and approved technical documents can be added through the CMS/API layer later.
          </div>
        </div>
      </section>
    </>
  );
}

