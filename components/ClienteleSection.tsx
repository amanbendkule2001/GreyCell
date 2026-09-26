'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export type ClientCategory =
  | 'commercial-residential'
  | 'infrastructure'
  | 'utilities'
  | 'ev-renewables'
  | 'industry'
  | 'datacenter-it'
  | 'electrical-contractors';

export interface ClientItem {
  id: string;
  name: string;
  category: ClientCategory | ClientCategory[];
  file: string;
}

export const clientLogos: ClientItem[] = [
  // 1. Commercial & Residential
  { id: 'abil', name: 'ABIL Group', category: 'commercial-residential', file: '/images/clients/abil.png' },
  { id: 'malpani', name: 'Malpani Group', category: 'commercial-residential', file: '/images/clients/malpani.png' },
  { id: 'panchshil', name: 'Panchshil Realty', category: 'commercial-residential', file: '/images/clients/panchshil.png' },
  { id: 'kohinoor', name: 'Kohinoor Group (Builders)', category: 'commercial-residential', file: '/images/clients/kohinoor.png' },
  { id: 'kohinoor-mall', name: 'Kohinoor Mall', category: 'commercial-residential', file: '/images/clients/kohinoor-mall.png' },
  { id: 'hiranandani', name: 'Hiranandani Builders', category: 'commercial-residential', file: '/images/clients/hiranandani.svg' },
  { id: 'rohan-builders', name: 'Rohan Builders', category: 'commercial-residential', file: '/images/clients/rohan-builders.png' },
  { id: 'kirloskar', name: 'Kirloskar', category: 'commercial-residential', file: '/images/clients/kirloskar.svg' },
  { id: 'novotel', name: 'Novotel Hotels & Resorts', category: 'commercial-residential', file: '/images/clients/novotel.png' },
  { id: 'marriott', name: 'Courtyard by Marriott', category: 'commercial-residential', file: '/images/clients/marriott.svg' },
  { id: 'rmz', name: 'RMZ Corp', category: 'commercial-residential', file: '/images/clients/rmz.svg' },
  { id: 'lokmanya', name: 'Lokmanya Hospital', category: 'commercial-residential', file: '/images/clients/lokmanya-hospital.svg' },
  { id: 'solitaire', name: 'Solitaire Group', category: 'commercial-residential', file: '/images/clients/solitaire.svg' },
  { id: 'nyati', name: 'Nyati Builders (Nyati Group)', category: 'commercial-residential', file: '/images/clients/nyati-builders.svg' },
  { id: 'naiknavare', name: 'Naiknavare Developers', category: 'commercial-residential', file: '/images/clients/naiknavare.png' },
  { id: 'suma-shilp', name: 'Suma Shilp Ltd.', category: 'commercial-residential', file: '/images/clients/suma-shilp.png' },
  { id: 'basil-group', name: 'Basil Group', category: 'commercial-residential', file: '/images/clients/basil-group.png' },
  { id: 'sagar-k', name: 'Sagar K Enterprises', category: 'commercial-residential', file: '/images/clients/sagar-k.png' },

  // 2. Infrastructure
  { id: 'bharat-electronics', name: 'Bharat Electronics (BEL)', category: 'infrastructure', file: '/images/clients/bharat-electronics.png' },
  { id: 'jnpt-port', name: 'Jawaharlal Nehru Port Trust (JNPT)', category: 'infrastructure', file: '/images/clients/jnpt-port.png' },
  { id: 'nagpur-metro', name: 'Nagpur Metro (Maha Metro)', category: 'infrastructure', file: '/images/clients/nagpur-metro.png' },
  { id: 'mrvc', name: 'Mumbai Railway Vikas Corporation (MRVC)', category: 'infrastructure', file: '/images/clients/mrvc.png' },
  { id: 'western-railway', name: 'Western Railway', category: 'infrastructure', file: '/images/clients/railway-seal.png' },
  { id: 'central-railway', name: 'Central Railway', category: 'infrastructure', file: '/images/clients/central-railway.png' },
  { id: 'meda', name: 'MEDA (Maharashtra Energy Development Agency)', category: ['infrastructure', 'ev-renewables'], file: '/images/clients/meda.png' },
  { id: 'pwd', name: 'Public Works Department (PWD)', category: 'infrastructure', file: '/images/clients/pwd.png' },
  { id: 'pwd-seal', name: 'Maharashtra PWD', category: 'infrastructure', file: '/images/clients/pwd-seal.png' },
  { id: 'cpwd', name: 'Central Public Works Department (CPWD)', category: 'infrastructure', file: '/images/clients/cpwd.svg' },
  { id: 'aai', name: 'Airports Authority of India (AAI)', category: 'infrastructure', file: '/images/clients/aai.svg' },
  { id: 'mes-military', name: 'Military Engineer Services (MES)', category: 'infrastructure', file: '/images/clients/mes-military.png' },
  { id: 'drdo-defence', name: 'Ministry of Defence / DRDO', category: 'infrastructure', file: '/images/clients/drdo-defence.png' },
  { id: 'cidco', name: 'CIDCO', category: 'infrastructure', file: '/images/clients/cidco.svg' },
  { id: 'pcmc', name: 'PCMC (Pimpri Chinchwad)', category: 'infrastructure', file: '/images/clients/pcmc.svg' },
  { id: 'mahanagar-gas', name: 'Mahanagar Gas Ltd. (MGL)', category: 'infrastructure', file: '/images/clients/mahanagar-gas.png' },
  { id: 'ntpc', name: 'NTPC Limited', category: 'infrastructure', file: '/images/clients/ntpc.svg' },
  { id: 'jkumar', name: 'J. Kumar Infraprojects', category: 'electrical-contractors', file: '/images/clients/jkumar.png' },
  { id: 'harsh-constructions', name: 'Harsh Constructions', category: 'electrical-contractors', file: '/images/clients/harsh-constructions.png' },
  { id: 'police-seal', name: 'Police Department Infrastructure', category: 'infrastructure', file: '/images/clients/police-seal.png' },
  { id: 'amrit-mahotsav', name: 'Azadi Ka Amrit Mahotsav', category: 'infrastructure', file: '/images/clients/amrit-mahotsav.png' },
  { id: 'iucaa', name: 'IUCAA Pune', category: 'infrastructure', file: '/images/clients/iucaa.png' },

  // 3. Utilities
  { id: 'mahavitaran', name: 'MSEDCL (Mahavitaran)', category: 'utilities', file: '/images/clients/mahavitaran.png' },
  { id: 'torrent-power', name: 'Torrent Power', category: 'utilities', file: '/images/clients/torrent-power.png' },
  { id: 'adani', name: 'Adani Electricity / Adani', category: 'utilities', file: '/images/clients/adani.svg' },
  { id: 'goa-electricity', name: 'Electricity Dept, Govt of Goa', category: 'utilities', file: '/images/clients/goa-electricity.png' },
  { id: 'goa-gov', name: 'Government of Goa', category: 'utilities', file: '/images/clients/goa-gov.png' },

  // 4. EV & Renewables
  { id: 'jbm', name: 'JBM Group (EV Division)', category: 'ev-renewables', file: '/images/clients/jbm.png' },
  { id: 'siemens', name: 'Siemens', category: 'ev-renewables', file: '/images/clients/siemens.png' },
  { id: 'jsw', name: 'JSW Energy', category: 'ev-renewables', file: '/images/clients/jsw.svg' },
  { id: 'eka-mobility', name: 'EKA Mobility', category: 'ev-renewables', file: '/images/clients/eka-mobility.svg' },

  // 5. Industry
  { id: 'mahindra', name: 'Mahindra & Mahindra', category: 'industry', file: '/images/clients/mahindra.png' },
  { id: 'thermax', name: 'Thermax Ltd.', category: 'industry', file: '/images/clients/thermax.png' },
  { id: 'sahyadri-farms', name: 'Sahyadri Farms', category: 'industry', file: '/images/clients/sahyadri-farms.png' },
  { id: 'feintool', name: 'Feintool', category: 'industry', file: '/images/clients/feintool.svg' },
  { id: 'silicat', name: 'Silicat (Industrial Minerals)', category: 'industry', file: '/images/clients/silicat.svg' },
  { id: 'neuman-esser', name: 'Neuman & Esser Group', category: 'industry', file: '/images/clients/neuman-esser.svg' },
  { id: 'araymond', name: 'ARaymond', category: 'industry', file: '/images/clients/araymond.svg' },
  { id: 'shera', name: 'Shera Building Solutions', category: 'industry', file: '/images/clients/shera.png' },
  { id: 'coastal-marine', name: 'Coastal Marine Sales & Services', category: 'electrical-contractors', file: '/images/clients/coastal-marine.png' },

  // 6. Data Center & IT
  { id: 'bse', name: 'BSE (Bombay Stock Exchange)', category: 'datacenter-it', file: '/images/clients/bse.png' },
  { id: 'esds', name: 'ESDS Data Center', category: 'datacenter-it', file: '/images/clients/esds.svg' },
  { id: 'aurus', name: 'Aurus', category: 'datacenter-it', file: '/images/clients/aurus.png' },
  { id: 'hdfc-bank', name: 'HDFC Bank', category: 'datacenter-it', file: '/images/clients/hdfc-bank.svg' },
  { id: 'vertiv', name: 'Vertiv Infrastructure', category: 'datacenter-it', file: '/images/clients/vertiv.png' },

  // 7. Electrical Contractors
  { id: 'aecom', name: 'AECOM', category: 'electrical-contractors', file: '/images/clients/aecom.png' },
  { id: 'archivista', name: 'Archivista AEPPL', category: 'electrical-contractors', file: '/images/clients/archivista.png' },
  { id: 'colossus', name: 'Colossus Infra Projects', category: 'electrical-contractors', file: '/images/clients/colossus.png' },
  { id: 'sm-joshi', name: 'SN Joshi Consultants', category: 'electrical-contractors', file: '/images/clients/sn-joshi.png' },
  { id: 'ubtech', name: 'ubTECH Engineering', category: 'electrical-contractors', file: '/images/clients/ubtech.png' },
  { id: 'unicorn', name: 'Unicorn Consulting Engineers Ltd.', category: 'electrical-contractors', file: '/images/clients/unicorn.png' },
  { id: 'safal-engineers', name: 'Safal Engineers', category: 'electrical-contractors', file: '/images/clients/safal-engineers.svg' },
  { id: 'abhiyanta-consulting', name: 'Abhiyanta Consulting Engineers', category: 'electrical-contractors', file: '/images/clients/abhiyanta.png' },
  { id: 'fdg', name: 'FDG Infrastructure', category: 'electrical-contractors', file: '/images/clients/fdg.png' },
  { id: 'vlie', name: 'Vijay Limaye Consulting LLP (VL Engineers)', category: 'electrical-contractors', file: '/images/clients/vlie.png' },
  { id: 'arkk', name: 'ARKK Consulting Pvt. Ltd.', category: 'electrical-contractors', file: '/images/clients/arkk.png' },
  { id: 'zopate-electrical', name: 'Zopate Electrical Consultants', category: 'electrical-contractors', file: '/images/clients/zopate-electrical.svg' },
  { id: 'planedge', name: 'Planedge Consultants', category: 'electrical-contractors', file: '/images/clients/planedge.png' },
  { id: 'architectural-energy-solutions', name: 'Architectural Energy Solutions', category: 'electrical-contractors', file: '/images/clients/architectural-energy-solutions.svg' },
  { id: 'dorsch-consult', name: 'Dorsch Consult India', category: 'electrical-contractors', file: '/images/clients/dorsch-consult.svg' },
  { id: 'eskayem', name: 'Eskayem Consultants', category: 'electrical-contractors', file: '/images/clients/eskayem.png' },
  { id: 'mep-engineering', name: 'MEP Engineering Consultants', category: 'electrical-contractors', file: '/images/clients/mep-engineering.png' }
];

const categories = [
  { id: 'all', label: ` Featured  Clients ` },
  { id: 'commercial-residential', label: 'Commercial & Residential' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'utilities', label: 'Utilities' },
  { id: 'ev-renewables', label: 'EV & Renewables' },
  { id: 'industry', label: 'Industry' },
  { id: 'datacenter-it', label: 'Data Center & IT' },
  { id: 'electrical-contractors', label: 'Electrical Consultant & Contractors' }
];

export function ClienteleSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filtered = activeCategory === 'all'
    ? clientLogos
    : clientLogos.filter((c) =>
      Array.isArray(c.category)
        ? c.category.includes(activeCategory as ClientCategory)
        : c.category === activeCategory
    );

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
            <div className="eyebrow">OUR CLIENTELE & TRUSTED CLIENTS</div>
            <h2>
              POWERING LEADERS IN INDUSTRY,<br />
              INFRASTRUCTURE & UTILITIES.
            </h2>
          </div>
          <p>
            From state power utilities and rapid transit networks to Fortune 500 industrial conglomerates,
            over 80+ leading enterprises specify and trust Graycell transformer and substation engineering.
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
                  Show Featured Clients <ChevronUp size={15} />
                </>
              ) : (
                <>
                  View All {clientLogos.length} Approved Clients <ChevronDown size={15} />
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
