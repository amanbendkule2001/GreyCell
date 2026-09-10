'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/mock-data';

export function Footer() {
  const handleEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-enquiry'));
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <div className="eyebrow light">TALK TO GRAYCELL</div>
            <h2>Have a power requirement?</h2>
            <p>Share your technical or commercial requirement with the Graycell team.</p>
          </div>
          <button
            type="button"
            className="footer-cta-button"
            onClick={handleEnquiry}
            aria-label="Start an enquiry"
          >
            Start an enquiry <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="footer-grid">
          <div>
            <div className="footer-brand">GRAYCELL</div>
            <p>Power engineering for transformers, compact substations and electrical infrastructure.</p>
          </div>

          <div>
            <div className="footer-title">Explore</div>
            <Link href="/products">Products</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/engineering">Engineering</Link>
            <Link href="/technology">Technology</Link>
          </div>

          <div>
            <div className="footer-title">Company</div>
            <Link href="/projects">Projects</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/group">Graycell Group</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div>
            <div className="footer-title">Sales & Locations</div>
            <a href={`mailto:${siteConfig.contact.salesEmail}`} style={{ display: 'block', marginBottom: 4 }}>
              {siteConfig.contact.salesEmail}
            </a>
            <a href="tel:+918459947816" style={{ display: 'block', marginBottom: 8, color: 'inherit' }}>
              +91 84599 47816
            </a>
            <span style={{ display: 'block', fontSize: 11.5, color: '#8ba0b5', lineHeight: 1.4, marginBottom: 4 }}>
              <strong style={{ color: '#c4d7ea' }}>Office:</strong> 325, Platinum 9, Baner, Pune – 411045
            </span>
            <span style={{ display: 'block', fontSize: 11.5, color: '#8ba0b5', lineHeight: 1.4 }}>
              <strong style={{ color: '#c4d7ea' }}>Factory:</strong> Gat 311, Khed Shivapur, MH – 412205
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>GRAYCELL GROUP OF COMPANIES</span>
          <span>Graycell Power Solutions Pvt. Ltd. · Graycell Energy LLP</span>
          <span>© 2026 Graycell</span>
        </div>
      </div>
    </footer>
  );
}
