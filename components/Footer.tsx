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
            <div className="footer-brand">
              <img
                src="/images/brand/graycell-logo.png"
                alt="Graycell"
                className="footer-brand-logo"
              />
            </div>
            <p>Power engineering for transformers, compact substations and electrical infrastructure.</p>
          </div>

          <div>
            <div className="footer-title">Explore</div>
            <Link href="/products">Products</Link>
            <Link href="/technology">Technology</Link>
            <Link href="/build-your-requirement">Build Your Requirement</Link>
          </div>

          <div>
            <div className="footer-title">Company</div>
            <Link href="/about">About Us</Link>
            <Link href="/group">Graycell Group</Link>
            <Link href="/contact">Contact</Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 0',
                font: 'inherit',
                color: 'inherit',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'block',
              }}
            >
              Cookie Settings
            </button>
          </div>

          <div>
            <div className="footer-title">Sales & Locations</div>
            <a href={`mailto:${siteConfig.contact.salesEmail}`} style={{ display: 'block', marginBottom: 12 }}>
              {siteConfig.contact.salesEmail}
            </a>
            <span style={{ display: 'block', fontSize: 12, color: '#c4d7ea', marginBottom: 2 }}>
              <strong>Pune:</strong>
            </span>
            <a href="tel:+918459947816" style={{ display: 'block', marginBottom: 2, color: 'inherit' }}>
              +91 84599 47816 / +91 75591 32800
            </a>
            <a href="tel:+919518345584" style={{ display: 'block', marginBottom: 10, color: 'inherit' }}>
              +91 95183 45584 / +91 86000 18957
            </a>
            <span style={{ display: 'block', fontSize: 12, color: '#c4d7ea', marginBottom: 2 }}>
              <strong>Mumbai:</strong>
            </span>
            <a href="tel:+918104178072" style={{ display: 'block', marginBottom: 2, color: 'inherit' }}>
              +91 81041 78072
            </a>
            <span style={{ display: 'block', fontSize: 11.5, color: '#8ba0b5', lineHeight: 1.4, marginTop: 10 }}>
              <strong style={{ color: '#c4d7ea' }}>Office:</strong> 325, Platinum 9, Pashan- Sus Road, Baner, Pune – 411045, Maharashtra, India
            </span>
            <span style={{ display: 'block', fontSize: 11.5, color: '#8ba0b5', lineHeight: 1.4, marginTop: 6 }}>
              <strong style={{ color: '#c4d7ea' }}>Factory:</strong> Gat No. 311, Plot No. 7, 8, Gauddara Road, nr. Chate College, Khed Shivapur, Maharashtra – 412205, India
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>GRAYCELL GROUP OF COMPANIES</span>
          <span>Graycell Power Solutions Pvt. Ltd. · Graycell Energy LLP</span>
          <span>© 2026 Graycell</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              fontSize: '11px',
              color: '#8ba0b5',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            DPDP Privacy & Cookies
          </button>
        </div>
      </div>
    </footer>
  );
}
