'use client';
import Link from 'next/link';
import { Menu, Search, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const items = [
  { href:'/about', label:'About Us', children:true },
  { href:'/products', label:'Products', children:true },
  { href:'/solutions', label:'Solutions', children:true },
  { href:'/technology', label:'Technology', children:true },
  { href:'/manufacturing', label:'Manufacturing', children:true },
  { href:'/projects', label:'Projects' },
  { href:'/resources', label:'Resources', children:true },
  { href:'/group', label:'Group' },
  { href:'/contact', label:'Contact' },
];

export function Header(){
 const [open,setOpen]=useState(false); const pathname=usePathname();
 const active=(href:string)=>href==='/'?pathname==='/':pathname.startsWith(href);

 const handleEnquiry = (e: React.MouseEvent) => {
   e.preventDefault();
   setOpen(false);
   window.dispatchEvent(new CustomEvent('open-enquiry'));
 };

 return <header className="site-header">
   <div className="container header-inner">
     <Link href="/" className="brand-lockup" onClick={()=>setOpen(false)}>
       <span className="brand-word">GRAY<span>CELL</span><sup>®</sup></span>
       <span className="brand-tagline">ENGINEERED FOR A BRIGHTER TOMORROW</span>
     </Link>
     <nav className="desktop-nav" aria-label="Primary">
       <Link className={active('/')?'active':''} href="/">Home</Link>
       {items.map((item)=><Link className={active(item.href)?'active':''} key={item.label+item.href} href={item.href}>{item.label}{item.children&&<ChevronDown size={11}/>}</Link>)}
     </nav>
     <div className="header-actions">
       <button className="icon-button" aria-label="Search"><Search size={17}/></button>
       <span className="lang">EN <ChevronDown size={11}/></span>
       <button className="header-cta" onClick={handleEnquiry}>Enquire Now <span>→</span></button>
       <button className="mobile-toggle" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(v=>!v)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
     </div>
   </div>
   {open&&<div className="mobile-nav"><div className="container"><Link href="/" onClick={()=>setOpen(false)}>Home</Link>{items.map(item=><Link key={item.label+item.href+'m'} href={item.href} onClick={()=>setOpen(false)}>{item.label}</Link>)}<button className="btn btn-primary mobile-drawer-cta" onClick={handleEnquiry}>Enquire Now →</button></div></div>}
 </header>
}
