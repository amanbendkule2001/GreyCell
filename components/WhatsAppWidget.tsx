'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowUp, Mail, Check } from 'lucide-react';
import { siteConfig } from '../data/mock-data';

export function WhatsAppWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const phone = (siteConfig.contact.whatsappNumber || '+919876543210').replace(/[^0-9]/g, '');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEnquiry = () => {
    window.dispatchEvent(new CustomEvent('open-enquiry'));
  };

  const startChat = (customText?: string) => {
    const textToSend = customText || message || 'Hello Graycell team, I would like to enquire about your power solutions.';
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setChatOpen(false);
  };

  const quickPrompts = [
    { label: '⚡ Transformer Enquiry', text: 'Hello Graycell team, I would like to enquire about your Power & Distribution Transformers.' },
    { label: '📦 Compact Substation (CSS)', text: 'Hello Graycell team, I need technical specifications and quote for Compact Substations.' },
    { label: '🔌 MV Switchgear', text: 'Hello Graycell team, I would like to request details for MV Switchgear & panels.' },
    { label: '📋 Technical Consultation', text: 'Hello Graycell team, I have a custom engineering specification to discuss.' },
  ];

  return (
    <>
      {/* SIDE DOCK (Mockup 2 style) */}
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

      {/* FLOATING WHATSAPP BUTTON (Mockup 1 style) */}
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

        {/* CHAT POPUP WINDOW */}
        {chatOpen && (
          <div className="whatsapp-chat-popup">
            <div className="wa-popup-header">
              <div className="wa-header-avatar">
                <span className="wa-avatar-text">GC</span>
                <span className="wa-online-indicator" />
              </div>
              <div className="wa-header-info">
                <strong>Graycell Technical Sales</strong>
                <span>Online · Engineering Support</span>
              </div>
              <button
                className="wa-close-btn"
                onClick={() => setChatOpen(false)}
                aria-label="Close WhatsApp chat popup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="wa-popup-body">
              <div className="wa-bubble">
                <p>Hello! 👋 Welcome to <strong>Graycell</strong>.</p>
                <p>How can our engineering team assist with your power transformer, compact substation, or MV switchgear requirement today?</p>
                <span className="wa-time">Just now</span>
              </div>

              <div className="wa-quick-options">
                <span className="wa-quick-label">Tap a topic to start:</span>
                {quickPrompts.map(p => (
                  <button
                    key={p.label}
                    className="wa-chip"
                    onClick={() => startChat(p.text)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="wa-popup-footer">
              <input
                type="text"
                className="wa-input"
                placeholder="Type your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') startChat();
                }}
              />
              <button
                className="wa-send-btn"
                onClick={() => startChat()}
                aria-label="Send WhatsApp message"
                title="Send on WhatsApp"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
