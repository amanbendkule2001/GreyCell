import { notFound } from 'next/navigation';
import { resources } from '../../../data/mock-data';
import Link from 'next/link';
import { Download, ArrowRight, FileText } from 'lucide-react';

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

const resourceCovers: { [key: string]: string } = {
  'graycell-product-catalogue': '/images/brand/catalogue-page-1.jpg',
  'graycell-transformer-brochure': '/images/brand/transformer-brochure-cover.jpg',
};

const brochurePages: { [key: string]: string[] } = {
  'graycell-transformer-brochure': [
    '/images/brand/transformer-brochure-page-1.jpg',
    '/images/brand/transformer-brochure-page-2.jpg',
    '/images/brand/transformer-brochure-page-3.jpg',
    '/images/brand/transformer-brochure-page-4.jpg',
  ],
};

export default async function ResourceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = resources.find((x) => x.slug === slug);
  if (!r) return notFound();

  const coverSrc = resourceCovers[r.slug] || '/images/brand/catalogue-page-1.jpg';
  const pages = brochurePages[r.slug] || [];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Resources / Catalogue</div>
          <h1>{r.title}</h1>
          <p>{r.seo.description}</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <div className="panel" style={{ overflow: 'hidden', borderRadius: 6, border: '1px solid var(--line)' }}>
            <img
              src={coverSrc}
              alt={r.title}
              style={{
                width: '100%',
                maxHeight: 620,
                objectFit: 'contain',
                background: '#f8fafc',
                display: 'block',
              }}
            />
          </div>

          <div className="panel pad" style={{ background: '#fff', borderRadius: 6, border: '1px solid var(--line)' }}>
            <div className="eyebrow" style={{ color: 'var(--blue)', marginBottom: 8 }}>
              OFFICIAL PUBLICATION
            </div>
            <h2>{r.title}</h2>
            <p style={{ color: '#526475', lineHeight: 1.75, fontSize: 15, margin: '14px 0 20px' }}>
              {r.seo.description} The PDF document is available directly for offline reading, technical review, and commercial specifications.
            </p>

            {r.file && (
              <a
                className="btn btn-primary"
                href={r.file.url}
                target="_blank"
                rel="noreferrer"
                download
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}
              >
                <Download size={16} /> Download Official PDF
              </a>
            )}

            <div className="notice" style={{ marginTop: 16 }}>
              Source-verified engineering publication from Graycell Power Solutions Pvt. Ltd. and Graycell Energy LLP.
            </div>

            <Link
              className="text-link"
              style={{ display: 'inline-flex', marginTop: 24 }}
              href="/contact"
            >
              Enquire about this technical publication <span>→</span>
            </Link>
          </div>
        </div>

        {pages.length > 0 && (
          <div className="container" style={{ marginTop: 48 }}>
            <div className="section-heading" style={{ marginBottom: 24 }}>
              <div>
                <div className="eyebrow">DOCUMENT PREVIEW</div>
                <h2>Brochure Pages Overview</h2>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {pages.map((pageSrc, idx) => (
                <div
                  key={idx}
                  className="panel"
                  style={{
                    overflow: 'hidden',
                    borderRadius: 6,
                    border: '1px solid var(--line)',
                    background: '#f8fafc',
                  }}
                >
                  <img
                    src={pageSrc}
                    alt={`Page ${idx + 1}`}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <div style={{ padding: '10px 14px', fontSize: 12, fontWeight: 600, color: '#64748b' }}>
                    Page {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

