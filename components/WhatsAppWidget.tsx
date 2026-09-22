'use client';
import { useState, useEffect, useCallback } from 'react';
import { MessageCircle, X, ArrowUp, Mail, Phone, ExternalLink, Sparkles } from 'lucide-react';
import {
  detectCurrentProductContext,
  buildProductWhatsAppMessage,
  getWhatsAppUrl,
  ProductContextInfo,
} from '../lib/whatsapp';

export function WhatsAppWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [productContext, setProductContext] = useState<ProductContextInfo | null>(null);

  const contacts = [
    { label: 'Technical & Sales Support 1', phone: '7559132800', display: '+91 7559132800' },
    { label: 'Technical & Sales Support 2', phone: '9518345584', display: '+91 9518345584' },
    { label: 'Technical & Sales Support 3', phone: '8600018957', display: '+91 8600018957' },
  ];

  const updateContext = useCallback(() => {
    if (typeof window === 'undefined') return;
    const ctx = detectCurrentProductContext(window.location.pathname, window.location.hash);
    setProductContext(ctx);
  }, []);

  useEffect(() => {
    updateContext();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    const handleHashChange = () => {
      updateContext();
    };

    const handleCustomContext = (e: any) => {
      if (e?.detail) {
        setProductContext(e.detail);
        if (e.detail.openChat) {
          setChatOpen(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    window.addEventListener('set-whatsapp-product', handleCustomContext);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
      window.removeEventListener('set-whatsapp-product', handleCustomContext);
    };
  }, [updateContext]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEnquiry = () => {
    if (productContext) {
      window.dispatchEvent(
        new CustomEvent('open-enquiry', {
          detail: {
            type: productContext.category || productContext.productName,
            productName: productContext.productName,
            capacityVoltage: productContext.subtitle,
          },
        })
      );
    } else {
      window.dispatchEvent(new CustomEvent('open-enquiry'));
    }
  };

  const openWhatsApp = (num: string) => {
    let msg: string;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (productContext) {
      msg = buildProductWhatsAppMessage({
        productName: productContext.productName,
        category: productContext.category,
        subtitle: productContext.subtitle,
        specs: productContext.specs,
        url: currentUrl,
      });
    } else {
      msg = [
        `⚡ *GRAYCELL POWER SOLUTIONS — GENERAL ENQUIRY* ⚡`,
        ``,
        `Hello Graycell Sales & Engineering Team,`,
        ``,
        `I would like to enquire about Graycell power engineering solutions, distribution transformers, compact substations, and medium-voltage switchgear panels.`,
        ``,
        currentUrl ? `*Page Reference:* ${currentUrl}` : '',
        ``,
        `Please share relevant product catalogues and technical information.`,
      ]
        .filter(Boolean)
        .join('\n');
    }

    const url = getWhatsAppUrl(num, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setChatOpen(false);
  };

  return (
    <>
      {/* SIDE DOCK */}
      <aside className="side-quick-dock" aria-label="Quick Actions">
        <button
          className="dock-item"
          onClick={openEnquiry}
          title="Open Engineering Enquiry Form"
          aria-label="Enquiry Form"
        >
          <Mail size={18} />
          <span>Enquiry</span>
        </button>

        <button
          className="dock-item dock-whatsapp"
          onClick={() => setChatOpen(prev => !prev)}
          title="Chat with Graycell on WhatsApp"
          aria-label="WhatsApp Chat"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </button>

        {showScrollTop && (
          <button
            className="dock-item dock-top"
            onClick={scrollToTop}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
            <span>Top</span>
          </button>
        )}
      </aside>

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="floating-whatsapp-wrap">
        {!chatOpen && (
          <button
            className="floating-whatsapp-btn"
            onClick={() => setChatOpen(true)}
            aria-label="Chat with Graycell on WhatsApp"
            title="Chat with Graycell on WhatsApp"
          >
            <svg
              className="wa-icon"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="currentColor"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
            </svg>
            <span className="wa-pulse-dot" />
          </button>
        )}

        {/* CHAT / CONTACT SELECTOR POPUP */}
        {chatOpen && (
          <div className="whatsapp-chat-popup">
            <div className="wa-popup-header">
              <div className="wa-header-avatar">
                <span className="wa-avatar-text">GC</span>
                <span className="wa-online-indicator" />
              </div>
              <div className="wa-header-info">
                <strong>Graycell WhatsApp Support</strong>
                <span>Select a contact to start chat</span>
              </div>
              <button
                className="wa-close-btn"
                onClick={() => setChatOpen(false)}
                aria-label="Close WhatsApp popup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="wa-popup-body" style={{ padding: 16, display: 'grid', gap: 10 }}>
              {productContext && (
                <div
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: 6,
                    padding: '8px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: '#166534',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Sparkles size={11} color="#16a34a" /> Inquiring About
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#14532d', lineHeight: 1.3 }}>
                    {productContext.productName}
                  </div>
                  {productContext.subtitle && (
                    <div style={{ fontSize: 11, color: '#4b5563', lineHeight: 1.2 }}>
                      {productContext.subtitle}
                    </div>
                  )}
                </div>
              )}

              <p style={{ fontSize: 13, color: '#475569', margin: '0 0 2px' }}>
                Connect directly with our engineering & sales team on WhatsApp:
              </p>
              {contacts.map((c, i) => (
                <button
                  key={i}
                  className="wa-chip"
                  onClick={() => openWhatsApp(c.phone)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 6,
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    textAlign: 'left',
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: '#0f172a',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Phone size={15} color="#16834b" />
                    <div>
                      <div>{c.label}</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>{c.display}</div>
                    </div>
                  </div>
                  <ExternalLink size={14} color="#16834b" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

