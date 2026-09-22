'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// Current policy version — bump when your cookie/privacy policy changes
const POLICY_VERSION = 'v1.0.0-2026';
const STORAGE_KEY = 'dpdp_cookie_consent';
const LANG_KEY = 'dpdp_cookie_lang';

type Language = 'en' | 'hi';

interface ConsentPreferences {
  strictly_necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface ConsentRecord {
  consentId: string;
  timestamp: string;
  version: string;
  language: Language;
  preferences: ConsentPreferences;
}

// Multilingual Dictionary (DPDP Act Section 5 Requirement)
const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    badgeText: 'Cookie Settings',
    bannerTitle: 'Your Privacy & Cookie Choices',
    bannerDescription:
      'Under the Digital Personal Data Protection (DPDP) Act, 2023, we require your explicit consent before processing your personal data and storing non-essential cookies. We use cookies to enhance website navigation, analyze technical traffic, and serve tailored information.',
    preferencesTitle: 'Manage Category Preferences',
    catNecessaryTitle: 'Strictly Necessary',
    badgeRequired: 'Always Active',
    catNecessaryDesc:
      'Required for core security, user sessions, CSRF protection, and recording your privacy preferences. Cannot be disabled.',
    catAnalyticsTitle: 'Performance & Analytics',
    catAnalyticsDesc:
      'Allows us to count visits and traffic sources to measure and improve our site performance. No tracking scripts run until you choose to opt in.',
    catMarketingTitle: 'Marketing & Advertising',
    catMarketingDesc:
      'Used to provide relevant promotional updates and evaluate campaign outreach. Active only with your affirmative consent.',
    btnRejectAll: 'Reject All',
    btnManagePreferences: 'Manage Preferences',
    btnSavePreferences: 'Save Preferences',
    btnAcceptAll: 'Accept All',
    linkPrivacyPolicy: 'Privacy Notice',
    tagCompliance: 'Complies with DPDP Act, 2023',
  },
  hi: {
    badgeText: 'कुकी सेटिंग्स',
    bannerTitle: 'आपकी गोपनीयता और कुकी विकल्प',
    bannerDescription:
      'डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम, 2023 के अंतर्गत, आपके व्यक्तिगत डेटा को प्रोसेस करने तथा गैर-आवश्यक कुकीज़ संग्रहीत करने से पूर्व आपकी स्पष्ट सहमति आवश्यक है। हम वेबसाइट संचालन, तकनीकी विश्लेषण और प्रासंगिक जानकारी प्रदान करने के लिए कुकीज़ का उपयोग करते हैं।',
    preferencesTitle: 'श्रेणी प्राथमिकताएं प्रबंधित करें',
    catNecessaryTitle: 'अत्यंत आवश्यक (Strictly Necessary)',
    badgeRequired: 'सदैव सक्रिय',
    catNecessaryDesc:
      'वेबसाइट की मूल सुरक्षा, सत्र अखंडता और आपकी गोपनीयता पसंद को सहेजने के लिए अनिवार्य है। इसे बंद नहीं किया जा सकता।',
    catAnalyticsTitle: 'प्रदर्शन और विश्लेषण (Analytics)',
    catAnalyticsDesc:
      'वेबसाइट के उपयोग और प्रदर्शन को समझने में सहायता करता है। आपकी सहमति के बिना कोई एनालिटिक्स कोड लोड नहीं होगा।',
    catMarketingTitle: 'विपणन और विज्ञापन (Marketing)',
    catMarketingDesc:
      'प्रासंगिक व्यावसायिक जानकारी और अभियानों की प्रभावशीलता मापने के लिए उपयोग किया जाता है। केवल आपकी स्पष्ट सहमति से सक्रिय।',
    btnRejectAll: 'सभी अस्वीकार करें',
    btnManagePreferences: 'प्राथमिकताएं प्रबंधित करें',
    btnSavePreferences: 'प्राथमिकताएं सहेजें',
    btnAcceptAll: 'सभी स्वीकार करें',
    linkPrivacyPolicy: 'गोपनीयता सूचना',
    tagCompliance: 'DPDP अधिनियम, 2023 के अनुरूप',
  },
};

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Clean cookies when a user rejects/revokes specific categories
 */
function removeCookiesByCategory(category: 'analytics' | 'marketing') {
  if (typeof document === 'undefined') return;
  const knownCookies: Record<string, string[]> = {
    analytics: ['_ga', '_gid', '_gat', '_ga_'],
    marketing: ['_fbp', '_fbc', 'fr'],
  };
  const list = knownCookies[category] || [];
  list.forEach((prefix) => {
    document.cookie
      .split(';')
      .map((c) => c.trim().split('=')[0])
      .filter((name) => name.startsWith(prefix))
      .forEach((name) => {
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      });
  });
}

/**
 * Dynamically load Google Analytics 4 only upon affirmative consent
 */
function loadAnalyticsScripts() {
  if (typeof window === 'undefined') return;
  const win = window as any;
  if (win.__dpdp_analytics_loaded) return;
  win.__dpdp_analytics_loaded = true;

  console.info('[DPDP Consent] Explicit consent granted for Analytics. Loading GA4 telemetry...');
  /*
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(script);

  win.dataLayer = win.dataLayer || [];
  function gtag(...args: any[]) { win.dataLayer.push(args); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
  */
}

/**
 * Dynamically load Marketing Scripts only upon affirmative consent
 */
function loadMarketingScripts() {
  if (typeof window === 'undefined') return;
  const win = window as any;
  if (win.__dpdp_marketing_loaded) return;
  win.__dpdp_marketing_loaded = true;

  console.info('[DPDP Consent] Explicit consent granted for Marketing. Loading advertising pixels...');
}

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  // Explicit opt-in states (Unchecked by default as mandated by DPDP Act)
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const rejectBtnRef = useRef<HTMLButtonElement>(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  /**
   * Statutory Audit Logging Hook: streams consent record to compliance backend
   */
  const logConsentToDatabase = useCallback((consentData: ConsentRecord) => {
    if (typeof window === 'undefined') return;

    const payload = JSON.stringify({
      consentId: consentData.consentId,
      policyVersion: consentData.version,
      timestamp: consentData.timestamp,
      language: consentData.language,
      preferences: consentData.preferences,
      userAgent: navigator.userAgent,
    });

    const endpoint = '/api/privacy/consent-log';

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(endpoint, blob);
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch((err) => {
        console.warn('Unable to stream DPDP consent log to compliance endpoint:', err);
      });
    }
  }, []);

  /**
   * Apply consent logic & dynamically trigger allowed telemetry
   */
  const applyConsent = useCallback((preferences: ConsentPreferences, isUserAction: boolean) => {
    if (preferences.analytics) {
      loadAnalyticsScripts();
    } else if (isUserAction) {
      removeCookiesByCategory('analytics');
    }

    if (preferences.marketing) {
      loadMarketingScripts();
    } else if (isUserAction) {
      removeCookiesByCategory('marketing');
    }
  }, []);

  /**
   * Save choices and close modal
   */
  const saveConsent = useCallback(
    (preferences: { analytics: boolean; marketing: boolean }) => {
      const record: ConsentRecord = {
        consentId: generateUUID(),
        timestamp: new Date().toISOString(),
        version: POLICY_VERSION,
        language: lang,
        preferences: {
          strictly_necessary: true,
          analytics: preferences.analytics,
          marketing: preferences.marketing,
        },
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      } catch (e) {
        console.error('Failed to store cookie consent:', e);
      }

      logConsentToDatabase(record);
      applyConsent(record.preferences, true);
      setIsOpen(false);
      setIsPreferencesOpen(false);
    },
    [lang, logConsentToDatabase, applyConsent]
  );

  // Initialize on mount: check existing consent
  useEffect(() => {
    setMounted(true);

    try {
      const savedLang = (localStorage.getItem(LANG_KEY) as Language) || 'en';
      if (savedLang === 'en' || savedLang === 'hi') {
        setLang(savedLang);
      }

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: ConsentRecord = JSON.parse(raw);
        if (parsed && parsed.version === POLICY_VERSION) {
          setAnalyticsConsent(Boolean(parsed.preferences?.analytics));
          setMarketingConsent(Boolean(parsed.preferences?.marketing));
          applyConsent(parsed.preferences, false);
          return;
        }
      }
      // If no valid consent exists, show banner
      setIsOpen(true);
    } catch (e) {
      setIsOpen(true);
    }
  }, [applyConsent]);

  // Global listener to re-open settings from footer or other links
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsPreferencesOpen(true);
    };

    window.addEventListener('open-cookie-settings', handleOpen);
    return () => window.removeEventListener('open-cookie-settings', handleOpen);
  }, []);

  // Keyboard accessibility: Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        // If user closes with Escape without choosing, default to Reject non-essential
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          saveConsent({ analytics: false, marketing: false });
        } else {
          setIsOpen(false);
          setIsPreferencesOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, saveConsent]);

  // Focus trap / initial focus on banner open
  useEffect(() => {
    if (isOpen && rejectBtnRef.current) {
      rejectBtnRef.current.focus();
    }
  }, [isOpen]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem(LANG_KEY, newLang);
    } catch (e) {}
  };

  if (!mounted) return null;

  return (
    <>
      {/* PERSISTENT FLOATING GEAR / BADGE TRIGGER (Consent Revocation Mechanism) */}
      <button
        id="dpdp-cookie-trigger"
        className="dpdp-floating-badge"
        onClick={() => {
          setIsOpen(true);
          setIsPreferencesOpen(true);
        }}
        aria-label={t.badgeText}
        aria-haspopup="dialog"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
          <path d="M8.5 8.5v.01"></path>
          <path d="M16 15.5v.01"></path>
          <path d="M12 12v.01"></path>
          <path d="M11 17v.01"></path>
          <path d="M7 13v.01"></path>
        </svg>
        <span>{t.badgeText}</span>
      </button>

      {/* MODAL / BOTTOM BANNER DIALOG */}
      {isOpen && (
        <div
          id="dpdp-cookie-banner"
          className="dpdp-banner-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dpdp-banner-title"
          aria-describedby="dpdp-banner-desc"
          ref={bannerRef}
        >
          <div className="dpdp-banner-container">
            {/* BANNER HEADER */}
            <header className="dpdp-banner-header">
              <div className="dpdp-brand-area">
                <span className="dpdp-shield-icon" aria-hidden="true">
                  🛡️
                </span>
                <h2 id="dpdp-banner-title" className="dpdp-title">
                  {t.bannerTitle}
                </h2>
              </div>

              {/* MULTILINGUAL SELECTOR (DPDP Section 5) */}
              <div className="dpdp-lang-wrapper">
                <label htmlFor="dpdp-lang-select" className="sr-only">
                  Choose Language
                </label>
                <select
                  id="dpdp-lang-select"
                  className="dpdp-lang-select"
                  value={lang}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  aria-label="Select Notice Language"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                </select>
              </div>
            </header>

            {/* BANNER DESCRIPTION */}
            <div className="dpdp-banner-body">
              <p id="dpdp-banner-desc" className="dpdp-description">
                {t.bannerDescription}
              </p>

              {/* PREFERENCES ACCORDION DRAWER */}
              {isPreferencesOpen && (
                <div id="dpdp-preferences-drawer" className="dpdp-preferences-drawer">
                  <h3 className="dpdp-preferences-title">{t.preferencesTitle}</h3>

                  {/* Strictly Necessary */}
                  <div className="dpdp-category-card">
                    <div className="dpdp-category-header">
                      <div className="dpdp-category-info">
                        <span className="dpdp-category-name">{t.catNecessaryTitle}</span>
                        <span className="dpdp-badge-required">{t.badgeRequired}</span>
                      </div>
                      <label className="dpdp-switch">
                        <input
                          type="checkbox"
                          checked
                          disabled
                          aria-label={t.catNecessaryTitle}
                        />
                        <span className="dpdp-slider"></span>
                      </label>
                    </div>
                    <p className="dpdp-category-desc">{t.catNecessaryDesc}</p>
                  </div>

                  {/* Performance & Analytics */}
                  <div className="dpdp-category-card">
                    <div className="dpdp-category-header">
                      <div className="dpdp-category-info">
                        <span className="dpdp-category-name">{t.catAnalyticsTitle}</span>
                      </div>
                      <label className="dpdp-switch">
                        <input
                          type="checkbox"
                          checked={analyticsConsent}
                          onChange={(e) => setAnalyticsConsent(e.target.checked)}
                          aria-label={t.catAnalyticsTitle}
                        />
                        <span className="dpdp-slider"></span>
                      </label>
                    </div>
                    <p className="dpdp-category-desc">{t.catAnalyticsDesc}</p>
                  </div>

                  {/* Marketing & Targeting */}
                  <div className="dpdp-category-card">
                    <div className="dpdp-category-header">
                      <div className="dpdp-category-info">
                        <span className="dpdp-category-name">{t.catMarketingTitle}</span>
                      </div>
                      <label className="dpdp-switch">
                        <input
                          type="checkbox"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          aria-label={t.catMarketingTitle}
                        />
                        <span className="dpdp-slider"></span>
                      </label>
                    </div>
                    <p className="dpdp-category-desc">{t.catMarketingDesc}</p>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS (Equal prominence for Reject All & Accept All) */}
            <footer className="dpdp-banner-footer">
              <div className="dpdp-button-group">
                <button
                  id="dpdp-btn-reject"
                  ref={rejectBtnRef}
                  className="dpdp-btn dpdp-btn-secondary"
                  onClick={() => saveConsent({ analytics: false, marketing: false })}
                >
                  {t.btnRejectAll}
                </button>

                <button
                  id="dpdp-btn-preferences"
                  className="dpdp-btn dpdp-btn-tertiary"
                  aria-expanded={isPreferencesOpen}
                  aria-controls="dpdp-preferences-drawer"
                  onClick={() => setIsPreferencesOpen((prev) => !prev)}
                >
                  {t.btnManagePreferences}
                </button>

                {isPreferencesOpen ? (
                  <button
                    id="dpdp-btn-save"
                    className="dpdp-btn dpdp-btn-primary"
                    onClick={() =>
                      saveConsent({
                        analytics: analyticsConsent,
                        marketing: marketingConsent,
                      })
                    }
                  >
                    {t.btnSavePreferences}
                  </button>
                ) : (
                  <button
                    id="dpdp-btn-accept"
                    className="dpdp-btn dpdp-btn-primary"
                    onClick={() => saveConsent({ analytics: true, marketing: true })}
                  >
                    {t.btnAcceptAll}
                  </button>
                )}
              </div>

              <div className="dpdp-footer-meta">
                <a href="/contact" className="dpdp-policy-link">
                  {t.linkPrivacyPolicy}
                </a>
                <span aria-hidden="true">·</span>
                <span className="dpdp-compliance-tag">{t.tagCompliance}</span>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
