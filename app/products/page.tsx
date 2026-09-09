'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data/mock-data';
const imgs:any={
 'oil-filled-distribution':'/images/products/power-transformer.png',
 'dry-type-distribution':'/images/products/dry-type-transformer.png',
 'natural-ester-transformers':'/images/products/power-transformer.png',
 'foil-wound-transformers':'/images/products/mv-switchgear.png',
 'compact-substations':'/images/products/compact-substation.png'
};
export default function Products(){const [filter,setFilter]=useState('All');const cats=['All','Transformers','Compact Substations'];const list=useMemo(()=>products.filter(p=>filter==='All'||(filter==='Transformers'&&p.category==='transformer')||(filter==='Compact Substations'&&p.category==='compact_substation')),[filter]);return <><section className="page-hero"><div className="container"><div className="eyebrow">Products / Power portfolio</div><h1>ENGINEERED<br/>POWER SOLUTIONS.</h1><p>Explore Graycell product families and solution references, with technical details structured for engineering and procurement discovery.</p></div></section><section className="page-content"><div className="container"><div className="filterbar">{cats.map(c=><button className={filter===c?'active':''} onClick={()=>setFilter(c)} key={c}>{c}</button>)}</div><div className="product-grid">{list.map(p=><Link className="product-card" key={p.id} href={`/products/${p.slug}`}><div className="product-image-box"><span className="product-label">{p.category.replace('_',' ')}</span><img src={imgs[p.id]??'/images/products/oil-filled-transformer.jpg'} alt={p.imageAlt??p.name}/></div><div className="product-body"><div className="eyebrow">{p.capacity?.label??'TECHNICAL PROFILE'}</div><h3>{p.name}</h3><p>{p.summary}</p><span className="product-link">View technical profile <ArrowRight size={15}/></span></div></Link>)}</div></div></section></>}
