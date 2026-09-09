import Link from 'next/link';
import { notFound } from 'next/navigation';
import { technologies, products } from '../../../data/mock-data';

const techImages: Record<string, string> = {
  'foil-winding': '/images/technology/foil-winding.jpg',
  'natural-ester': '/images/technology/natural-ester.jpg',
  'smart-monitoring': '/images/technology/smart-monitoring.jpg'
};

export function generateStaticParams() {
  return technologies.map((t) => ({ slug: t.slug }));
}

export default async function TechnologyDetail({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = technologies.find((x) => x.slug === slug);
  if (!t) return notFound();
  const related = products.filter((p) => t.productIds.includes(p.id));
  const imageSrc = techImages[t.slug] || '/images/technology/foil-winding.jpg';

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Technology / Technical profile</div>
          <h1>{t.name}</h1>
          <p>{t.summary}</p>
        </div>
      </section>
      <section className="page-content">
        <div className="container two-col">
          <div className="panel pad">
            <div className="eyebrow">BENEFITS</div>
            <h2>Technical themes for informed specification.</h2>
            <div style={{ display: 'grid', gap: 14, marginTop: 22 }}>
              {t.benefits.map((b) => (
                <div
                  key={b}
                  style={{
                    borderBottom: '1px solid var(--line)',
                    paddingBottom: 14,
                    color: '#64778a',
                    fontSize: 13
                  }}
                >
                  • {b}
                </div>
              ))}
            </div>
          </div>
          <div className="panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafd' }}>
            <img
              src={imageSrc}
              alt={t.name}
              style={{
                width: '100%',
                height: 430,
                objectFit: 'contain',
                padding: 20
              }}
            />
          </div>
        </div>
        <div className="container" style={{ marginTop: 44 }}>
          <div className="section-heading">
            <div>
              <div className="eyebrow">RELATED PRODUCTS</div>
              <h2>Products using this technology.</h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <Link className="product-card" href={`/products/${p.slug}`} key={p.id}>
                <div className="product-image-box">
                  <img
                    src={p.imageSrc ?? '/images/products/oil-filled-transformer.jpg'}
                    alt={p.imageAlt ?? p.name}
                  />
                </div>
                <div className="product-body">
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
