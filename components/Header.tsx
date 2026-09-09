'use client';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavChild { href: string; label: string; desc?: string; }
interface NavItem { href: string; label: string; children?: NavChild[]; }

const navItems: NavItem[] = [
  { href: '/about', label: 'About Us', children: [
    { href: '/about', label: 'Company Overview', desc: 'Our story, mission & values' },
    { href: '/group', label: 'Group & Leadership', desc: 'Management & corporate structure' },
    { href: '/manufacturing', label: 'Manufacturing', desc: 'State-of-the-art facilities' },
  ]},
  { href: '/products', label: 'Products', children: [
    { href: '/products/oil-filled-distribution-transformers', label: 'Oil-Filled Transformers', desc: '25 kVA – 2500 kVA, up to 33 kV' },
    { href: '/products/dry-type-distribution-transformers', label: 'Dry-Type Transformers', desc: 'Cast resin & VPI insulation' },
    { href: '/products/compact-substations', label: 'Compact Substations', desc: 'Plug-and-play MV/LV packages' },
    { href: '/products/foil-wound-transformers', label: 'MV Switchgear Panels', desc: 'MV VCB & RMU panels' },
    { href: '/products/natural-ester-transformers', label: 'Natural Ester Transformers', desc: 'Eco-fluid, fire-safe solutions' },
  ]},
  { href: '/solutions', label: 'Solutions', children: [
    { href: '/solutions/renewable-energy', label: 'Renewable Energy', desc: 'Solar & wind power applications' },
    { href: '/solutions/industrial', label: 'Industrial', desc: 'Manufacturing & process plants' },
    { href: '/solutions/commercial-infrastructure', label: 'Commercial & Infrastructure', desc: 'Buildings, transit & utilities' },
  ]},
  { href: '/technology', label: 'Technology', children: [
    { href: '/technology/foil-winding', label: 'Foil Winding Technology', desc: 'Precision winding for efficiency' },
    { href: '/technology/natural-ester', label: 'Natural Ester Fluid', desc: 'Sustainable, biodegradable dielectric' },
    { href: '/technology/smart-monitoring', label: 'Smart Monitoring', desc: 'IoT-enabled transformer health' },
  ]},
  { href: '/engineering', label: 'Engineering' },
  { href: '/manufacturing', label: 'Manufacturing' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources', children: [
    { href: '/resources/graycell-product-catalogue', label: 'Product Catalogue', desc: 'Full product specification PDF' },
    { href: '/resources', label: 'Technical Resources', desc: 'Whitepapers & case studies' },
  ]},
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  const handleEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent('open-enquiry'));
  };

  return (
    <header className="site-header">
      <div className="container header-inner">

        {/* LOGO – one color, no ® */}
        <Link href="/" className="brand-lockup" onClick={() => setMobileOpen(false)}>
          <span className="brand-word">GRAY<span>CELL</span></span>
          <span className="brand-tagline">ENGINEERED FOR A BRIGHTER TOMORROW</span>
        </Link>

        {/* DESKTOP NAV with hover dropdowns */}
        <nav className="desktop-nav" aria-label="Primary">
          <Link className={active('/') ? 'active' : ''} href="/">Home</Link>
          {navItems.map((item) =>
            item.children ? (
              <div className="nav-item-wrap" key={item.label}>
                <Link
                  className={`nav-top-link${active(item.href) ? ' active' : ''}`}
                  href={item.href}
                >
                  {item.label}
                  <ChevronDown size={11} className="nav-chevron" />
                </Link>
                <div className="nav-dropdown">
                  <div className="nav-dropdown-inner">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="nav-dropdown-link">
                        <span className="nav-dropdown-label">{child.label}</span>
                        {child.desc && <span className="nav-dropdown-desc">{child.desc}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                className={active(item.href) ? 'active' : ''}
                href={item.href}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Header actions */}
        <div className="header-actions">
          <button className="header-cta" onClick={handleEnquiry}>Enquire Now <span>→</span></button>
          <button
            className="mobile-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="mobile-nav">
          <div className="container">
            <div className="mobile-nav-group">
              <Link
                href="/"
                className={`mobile-nav-link${active('/') ? ' active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </div>
            {navItems.map((item) => (
              <div key={item.label} className="mobile-nav-group">
                {item.children ? (
                  <>
                    <button
                      className={`mobile-nav-parent${active(item.href) ? ' active' : ''}`}
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="mobile-nav-children">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={active(child.href) ? 'active' : ''}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`mobile-nav-link${active(item.href) ? ' active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <button className="btn btn-primary mobile-drawer-cta" onClick={handleEnquiry}>Enquire Now →</button>
          </div>
        </div>
      )}
    </header>
  );
}
