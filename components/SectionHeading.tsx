import Link from 'next/link';
export function SectionHeading({eyebrow,title,description,href,label='View all'}:{eyebrow:string;title:string;description?:string;href?:string;label?:string}){
 return <div className="section-heading">
   <div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{description&&<p>{description}</p>}</div>
   {href&&<Link className="text-link" href={href}>{label} <span>→</span></Link>}
 </div>
}
