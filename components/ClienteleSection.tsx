'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export interface ClientItem {
  id: string;
  name: string;
  category: 'utilities' | 'industry' | 'infrastructure' | 'consulting' | 'technology';
  file: string;
}

export const clientLogos: ClientItem[] = [
  // Utilities & Public Sector
  { id: 'siemens', name: 'Siemens', category: 'technology', file: '/images/clients/siemens.png' },
  { id: 'mahavitaran', name: 'MSEDCL (Mahavitaran)', category: 'utilities', file: '/images/clients/mahavitaran.png' },
  { id: 'torrent-power', name: 'Torrent Power', category: 'utilities', file: '/images/clients/torrent-power.png' },
  { id: 'meda', name: 'MEDA (Maharashtra Energy)', category: 'utilities', file: '/images/clients/meda.png' },
  { id: 'central-railway', name: 'Central Railway', category: 'utilities', file: '/images/clients/central-railway.png' },
  { id: 'nagpur-metro', name: 'Nagpur Metro (Maha Metro)', category: 'infrastructure', file: '/images/clients/nagpur-metro.png' },
  { id: 'bharat-electronics', name: 'Bharat Electronics (BEL)', category: 'technology', file: '/images/clients/bharat-electronics.png' },
  { id: 'drdo-defence', name: 'Ministry of Defence / DRDO', category: 'utilities', file: '/images/clients/drdo-defence.png' },
  { id: 'mes-military', name: 'Military Engineer Services (MES)', category: 'utilities', file: '/images/clients/mes-military.png' },
  { id: 'jnpt-port', name: 'Jawaharlal Nehru Port Trust (JNPT)', category: 'infrastructure', file: '/images/clients/jnpt-port.png' },
  { id: 'goa-electricity', name: 'Electricity Dept, Govt of Goa', category: 'utilities', file: '/images/clients/goa-electricity.png' },
  { id: 'goa-gov', name: 'Government of Goa', category: 'utilities', file: '/images/clients/goa-gov.png' },
  { id: 'railway-seal', name: 'North Eastern Railway', category: 'utilities', file: '/images/clients/railway-seal.png' },
  { id: 'rvnl-railways', name: 'RVNL (Rail Vikas Nigam)', category: 'utilities', file: '/images/clients/rvnl-railways.png' },
  { id: 'pwd', name: 'Public Works Department (PWD)', category: 'utilities', file: '/images/clients/pwd.png' },
  { id: 'pwd-seal', name: 'Maharashtra PWD', category: 'utilities', file: '/images/clients/pwd-seal.png' },
  { id: 'police-seal', name: 'Police Department Infrastructure', category: 'utilities', file: '/images/clients/police-seal.png' },
  { id: 'amrit-mahotsav', name: 'Azadi Ka Amrit Mahotsav', category: 'utilities', file: '/images/clients/amrit-mahotsav.png' },

  // Heavy Industry & Energy
  { id: 'mahindra', name: 'Mahindra & Mahindra', category: 'industry', file: '/images/clients/mahindra.png' },
  { id: 'thermax', name: 'Thermax Ltd.', category: 'industry', file: '/images/clients/thermax.png' },
  { id: 'vertiv', name: 'Vertiv Infrastructure', category: 'technology', file: '/images/clients/vertiv.png' },
  { id: 'bse', name: 'BSE (Bombay Stock Exchange)', category: 'technology', file: '/images/clients/bse.png' },
  { id: 'mahanagar-gas', name: 'Mahanagar Gas Ltd. (MGL)', category: 'industry', file: '/images/clients/mahanagar-gas.png' },
  { id: 'shera', name: 'Shera Building Solutions', category: 'industry', file: '/images/clients/shera.png' },
  { id: 'jbm', name: 'JBM Group', category: 'industry', file: '/images/clients/jbm.png' },
  { id: 'sahyadri-farms', name: 'Sahyadri Farms', category: 'industry', file: '/images/clients/sahyadri-farms.png' },
  { id: 'coastal-marine', name: 'Coastal Marine Sales & Services', category: 'industry', file: '/images/clients/coastal-marine.png' },
  { id: 'ubtech', name: 'ubTECH Engineering', category: 'technology', file: '/images/clients/ubtech.png' },

  // Real Estate, Commercial & Infrastructure
  { id: 'aecom', name: 'AECOM', category: 'consulting', file: '/images/clients/aecom.png' },
  { id: 'novotel', name: 'Novotel Hotels & Resorts', category: 'infrastructure', file: '/images/clients/novotel.png' },
  { id: 'panchshil', name: 'Panchshil Realty', category: 'infrastructure', file: '/images/clients/panchshil.png' },
  { id: 'kohinoor', name: 'Kohinoor Group', category: 'infrastructure', file: '/images/clients/kohinoor.png' },
  { id: 'kohinoor-mall', name: 'Kohinoor Mall', category: 'infrastructure', file: '/images/clients/kohinoor-mall.png' },
  { id: 'rohan-builders', name: 'Rohan Builders', category: 'infrastructure', file: '/images/clients/rohan-builders.png' },
  { id: 'abil', name: 'ABIL Group', category: 'infrastructure', file: '/images/clients/abil.png' },
  { id: 'jkumar', name: 'J. Kumar Infraprojects', category: 'infrastructure', file: '/images/clients/jkumar.png' },
  { id: 'naiknavare', name: 'Naiknavare Developers', category: 'infrastructure', file: '/images/clients/naiknavare.png' },
  { id: 'malpani', name: 'Malpani Group', category: 'infrastructure', file: '/images/clients/malpani.png' },
  { id: 'harsh-constructions', name: 'Harsh Constructions', category: 'infrastructure', file: '/images/clients/harsh-constructions.png' },
  { id: 'colossus', name: 'Colossus Infra Projects', category: 'infrastructure', file: '/images/clients/colossus.png' },
  { id: 'suma-shilp', name: 'Suma Shilp Ltd.', category: 'infrastructure', file: '/images/clients/suma-shilp.png' },
  { id: 'basil-group', name: 'Basil Group', category: 'infrastructure', file: '/images/clients/basil-group.png' },
  { id: 'sagar-k', name: 'Sagar K Enterprises', category: 'infrastructure', file: '/images/clients/sagar-k.png' },

  // Engineering & Consultants
  { id: 'eskayem', name: 'Eskayem Consultants', category: 'consulting', file: '/images/clients/eskayem.png' },
  { id: 'archivista', name: 'Archivista AEPPL', category: 'consulting', file: '/images/clients/archivista.png' },
  { id: 'arkk', name: 'ARKK Consulting', category: 'consulting', file: '/images/clients/arkk.png' },
  { id: 'mep-engineering', name: 'MEP Engineering Consultants', category: 'consulting', file: '/images/clients/mep-engineering.png' },
  { id: 'vlie', name: 'VL Engineers & Consultants', category: 'consulting', file: '/images/clients/vlie.png' },
  { id: 'unicorn', name: 'Unicorn Consulting Engineers', category: 'consulting', file: '/images/clients/unicorn.png' },
  { id: 'planedge', name: 'Planedge Consultants', category: 'consulting', file: '/images/clients/planedge.png' },
  { id: 'taurus', name: 'Taurus Engineering', category: 'consulting', file: '/images/clients/taurus.png' },
  { id: 'fdg', name: 'FDG Infrastructure', category: 'consulting', file: '/images/clients/fdg.png' },
  { id: 'iucaa', name: 'IUCAA Pune', category: 'consulting', file: '/images/clients/iucaa.png' }
];

const categories = [
  { id: 'all', label: 'All Partners (53)' },
  { id: 'utilities', label: 'Utilities & Govt' },
  { id: 'industry', label: 'Industry & Energy' },
  { id: 'infrastructure', label: 'Infrastructure & Real Estate' },
  { id: 'consulting', label: 'EPC & Consultants' },
  { id: 'technology', label: 'Technology' }
];

export function ClienteleSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filtered = activeCategory === 'all'
    ? clientLogos
    : clientLogos.filter((c) => c.category === activeCategory);

  // By default show top 24 on 'all' view, or all if showAll is true or filtered by category
  const displayed = (activeCategory === 'all' && !showAll)
    ? filtered.slice(0, 24)
    : filtered;

  return (
    <section className="clientele-section">
      <div className="container">
        
        {/* SECTION HEADER */}
        <div className="clientele-header">
          <div>
            <div className="eyebrow">OUR CLIENTELE & TRUSTED PARTNERS</div>
            <h2>
              POWERING LEADERS IN INDUSTRY,<br />
              INFRASTRUCTURE & UTILITIES.
            </h2>
          </div>
          <p>
            From state power utilities and rapid transit networks to Fortune 500 industrial conglomerates, 
            over 50+ leading enterprises specify and trust Graycell transformer and substation engineering.
          </p>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="clientele-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`clientele-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id);
                if (cat.id !== 'all') setShowAll(true);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* LOGOS GRID WITH GREYSCALE TO VIVID COLOR HOVER EFFECT */}
        <div className="clientele-grid">
          {displayed.map((client) => (
            <div className="client-logo-card" key={client.id} title={client.name}>
              <img
                src={client.file}
                alt={`${client.name} logo`}
                loading="lazy"
              />
              <span className="client-tooltip">{client.name}</span>
            </div>
          ))}
        </div>

        {/* VIEW ALL TOGGLE ROW */}
        {activeCategory === 'all' && (
          <div className="clientele-toggle-row">
            <button
              className="btn btn-outline"
              onClick={() => setShowAll(!showAll)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              {showAll ? (
                <>
                  Show Featured Partners <ChevronUp size={15} />
                </>
              ) : (
                <>
                  View All 53 Approved Clients & Partners <ChevronDown size={15} />
                </>
              )}
            </button>
            <Link className="btn btn-primary" href="/contact">
              Partner With Graycell <ArrowRight size={15} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
