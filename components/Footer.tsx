import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/mock-data';

export function Footer(){
 return <footer className="site-footer">
   <div className="container">
     <div className="footer-cta">
       <div><div className="eyebrow light">TALK TO GRAYCELL</div><h2>Have a power requirement?</h2><p>Share your technical or commercial requirement with the Graycell team.</p></div>
       <Link className="footer-cta-button" href="/contact">Start an enquiry <ArrowUpRight size={16}/></Link>
     </div>
     <div className="footer-grid">
       <div><div className="footer-brand">GRAYCELL</div><p>Power engineering for transformers, compact substations and electrical infrastructure.</p></div>
       <div><div className="footer-title">Explore</div><Link href="/products">Products</Link><Link href="/solutions">Solutions</Link><Link href="/engineering">Engineering</Link><Link href="/technology">Technology</Link></div>
       <div><div className="footer-title">Company</div><Link href="/projects">Projects</Link><Link href="/resources">Resources</Link><Link href="/group">Graycell Group</Link><Link href="/contact">Contact</Link></div>
       <div><div className="footer-title">Sales</div><a href={`mailto:${siteConfig.contact.salesEmail}`}>{siteConfig.contact.salesEmail}</a><span>Technical & commercial enquiries</span></div>
     </div>
     <div className="footer-bottom"><span>GRAYCELL GROUP OF COMPANIES</span><span>Graycell Power Solutions Pvt. Ltd. · Graycell Energy LLP</span><span>© 2026 Graycell</span></div>
   </div>
 </footer>
}
