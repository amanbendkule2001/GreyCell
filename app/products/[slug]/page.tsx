import { redirect, notFound } from 'next/navigation';
import { products } from '../../../data/mock-data';

const slugRedirectMap: Record<string, string> = {
  'compact-substations': '/products/compact-substation',
  'oil-filled-distribution-transformers': '/products/transformer#oil-filled',
  'aluminium-foil-wound-transformers': '/products/transformer#aluminium-foil',
  'copper-foil-wound-transformers': '/products/transformer#copper-foil',
  'dry-type-distribution-transformers': '/products/transformer#dry-type',
  'natural-ester-transformers': '/products/transformer#ester-oil',
  'hermetically-sealed-transformers': '/products/transformer#hermetically-sealed',
  'foil-wound-transformers': '/products/mv-switchgear-panels',
  'g-sense-monitoring': '/technology#g-sense',
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
  if (slugRedirectMap[slug]) {
    redirect(slugRedirectMap[slug]);
  }
  const p = products.find((x) => x.slug === slug);
  if (!p) return notFound();
  redirect('/products');
}


