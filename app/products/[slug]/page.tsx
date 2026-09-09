import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { products } from '../../../data/mock-data';
import ProductShowcaseSection from '../../../components/ProductShowcaseSection';

const imgs: any = {
  'oil-filled-distribution': '/images/products/power-transformer.png',
  'dry-type-distribution': '/images/products/dry-type-transformer.png',
  'natural-ester-transformers': '/images/products/natural-ester-transformer.png',
  'foil-wound-transformers': '/images/products/mv-switchgear.png',
  'compact-substations': '/images/products/compact-substation.png',
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Products / {p.category.replace('_', ' ')}</div>
          <h1>{p.name}</h1>
          <p>{p.summary}</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <div>
            <ProductShowcaseSection
              productId={p.id}
              productName={p.name}
              category={p.category}
              imageSrc={imgs[p.id] ?? '/images/products/oil-filled-transformer.jpg'}
              imageAlt={p.imageAlt ?? p.name}
              capacity={p.capacity?.label}
              voltage={p.voltage?.label}
            />

            <div className="panel pad" style={{ marginTop: 18 }}>
              <h2>Overview</h2>
              <p>{p.summary}</p>
              <div className="tag-row" style={{ marginTop: 18 }}>
                {p.applications.map((x) => (
                  <span className="tag" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="sticky">
            <div className="panel pad">
              <div className="eyebrow">TECHNICAL PROFILE</div>
              <table className="spec-table" style={{ marginTop: 14 }}>
                <tbody>
                  {p.specifications.length ? (
                    p.specifications.map((s) => (
                      <tr key={s.key}>
                        <th>{s.label}</th>
                        <td>
                          {s.value}
                          {s.unit ? ` ${s.unit}` : ''}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2}>Application-specific values available through enquiry.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="rule" style={{ height: 1, background: 'var(--line)', margin: '26px 0' }} />

              <div className="eyebrow">TECHNOLOGY</div>
              <div className="tag-row" style={{ marginTop: 12 }}>
                {p.technologies.map((x) => (
                  <span className="tag" key={x}>
                    {x}
                  </span>
                ))}
              </div>

              <Link className="btn btn-primary" style={{ width: '100%', marginTop: 26 }} href="/contact">
                Enquire about this solution <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>

        <div className="container" style={{ marginTop: 20 }}>
          <div className="panel pad">
            <div className="eyebrow">FEATURES</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 18 }}>
              {p.features.length ? (
                p.features.map((f) => (
                  <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#617487' }}>
                    <Check size={17} color="#0878c9" />
                    <span>{f}</span>
                  </div>
                ))
              ) : (
                <div style={{ color: '#617487' }}>Project-specific features are confirmed during engineering and enquiry.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

