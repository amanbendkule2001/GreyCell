import { siteConfig } from '../data/mock-data';

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface ProductContextInfo {
  productName: string;
  category?: string;
  subtitle?: string;
  specs?: ProductSpecItem[];
}

export function cleanPhone(phone?: string): string {
  const defaultNumber = siteConfig.contact.whatsappNumber || '+917559132800';
  const target = phone || defaultNumber;
  return target.replace(/[^0-9]/g, '');
}

export function getWhatsAppUrl(phone: string | undefined, message: string): string {
  const cleaned = cleanPhone(phone);
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

export function buildProductWhatsAppMessage(info: {
  productName: string;
  category?: string;
  subtitle?: string;
  specs?: ProductSpecItem[];
  url?: string;
  customMessage?: string;
}): string {
  const parts: string[] = [
    `⚡ *GRAYCELL POWER SOLUTIONS — PRODUCT ENQUIRY* ⚡`,
    ``,
    `Hello Graycell Sales & Engineering Team,`,
    ``,
    `I am interested in receiving technical specifications and a commercial quote for:`,
    `• *Product:* ${info.productName}`,
  ];

  if (info.category) {
    parts.push(`• *Category:* ${info.category}`);
  }

  if (info.subtitle) {
    parts.push(`• *Rating / Class:* ${info.subtitle}`);
  }

  if (info.specs && info.specs.length > 0) {
    parts.push(``);
    parts.push(`*Technical Details:*`);
    info.specs.slice(0, 5).forEach((s) => {
      parts.push(`  - ${s.label}: ${s.value}`);
    });
  }

  if (info.url) {
    parts.push(``);
    parts.push(`*Website Reference:* ${info.url}`);
  }

  if (info.customMessage) {
    parts.push(``);
    parts.push(`*Requirement Details:* ${info.customMessage}`);
  }

  parts.push(``);
  parts.push(`Please share the technical catalog, manufacturing lead time, and quotation.`);

  return parts.join('\n');
}

export function buildModalWhatsAppMessage(data: {
  refId?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  requirementType?: string;
  productName?: string;
  capacityVoltage?: string;
  message?: string;
  url?: string;
}): string {
  const parts: string[] = [
    `⚡ *GRAYCELL POWER SOLUTIONS — TECHNICAL ENQUIRY* ⚡`,
    ``,
  ];

  if (data.refId) {
    parts.push(`📋 *Reference ID:* #${data.refId}`);
  }

  const prod = data.productName || data.requirementType || 'Power Equipment';
  parts.push(`📌 *Product / Requirement:* ${prod}`);

  if (data.capacityVoltage) {
    parts.push(`⚡ *Capacity / Voltage Class:* ${data.capacityVoltage}`);
  }

  parts.push(``);
  parts.push(`*Contact Details:*`);
  parts.push(`• *Name:* ${data.name || 'N/A'}`);
  parts.push(`• *Company:* ${data.company || 'N/A'}`);
  parts.push(`• *Email:* ${data.email || 'N/A'}`);
  parts.push(`• *Phone:* ${data.phone || 'N/A'}`);

  if (data.message) {
    parts.push(``);
    parts.push(`*Specific Requirements:*`);
    parts.push(data.message);
  }

  if (data.url) {
    parts.push(``);
    parts.push(`*Page Reference:* ${data.url}`);
  }

  parts.push(``);
  parts.push(`Please review these requirements and connect with a technical and commercial proposal.`);

  return parts.join('\n');
}

export function buildBuilderWhatsAppMessage(data: {
  refId?: string;
  requirementType?: string;
  segment?: string;
  capacity?: string;
  voltageRatio?: string;
  installation?: string;
  email?: string;
  mobile?: string;
  specifications?: string;
}): string {
  const parts: string[] = [
    `⚡ *GRAYCELL POWER SOLUTIONS — REQUIREMENT INTAKE* ⚡`,
    ``,
  ];

  if (data.refId) {
    parts.push(`📋 *Reference ID:* #${data.refId}`);
  }

  parts.push(`📌 *Equipment Type:* ${data.requirementType || 'Power Equipment'}`);
  if (data.segment) parts.push(`🏭 *Industry Segment:* ${data.segment}`);
  if (data.capacity) parts.push(`⚡ *Capacity Rating:* ${data.capacity}`);
  if (data.voltageRatio) parts.push(`🔌 *Voltage Ratio:* ${data.voltageRatio}`);
  if (data.installation) parts.push(`🏗️ *Installation:* ${data.installation}`);

  parts.push(``);
  parts.push(`*Contact Details:*`);
  if (data.email) parts.push(`• *Email:* ${data.email}`);
  if (data.mobile) parts.push(`• *Mobile / Phone:* ${data.mobile}`);

  if (data.specifications) {
    parts.push(``);
    parts.push(`*Notes / Specs:* ${data.specifications}`);
  }

  parts.push(``);
  parts.push(`Please assess this requirement and provide engineering feasibility and quotation.`);

  return parts.join('\n');
}

// Product map for contextual inference from URL / hash
const PRODUCT_CONTEXT_MAP: Record<string, ProductContextInfo> = {
  // Transformers
  'oil-filled': {
    productName: 'Oil-Filled Distribution Transformers',
    category: 'Transformers',
    subtitle: '25 kVA – 2500 kVA, up to 33 kV Class',
    specs: [
      { label: 'Rating Range', value: '25 kVA – 2500 kVA' },
      { label: 'Voltage Class', value: 'Up to 33 kV' },
      { label: 'Cooling', value: 'ONAN / ONAF' },
      { label: 'Compliance', value: 'IS 1180 / IEC 60076' },
    ],
  },
  'aluminium-foil': {
    productName: 'Aluminium Foil Wound Transformers',
    category: 'Transformers',
    subtitle: 'Precision Automated Foil Winding Technology',
    specs: [
      { label: 'Technology', value: 'Automated LV Foil Winding' },
      { label: 'Cost Savings', value: '15-20% lower cost vs copper' },
      { label: 'Efficiency', value: 'Equivalent energy efficiency & losses' },
    ],
  },
  'copper-foil': {
    productName: 'Copper Foil Wound Transformers',
    category: 'Transformers',
    subtitle: 'High Efficiency Electrolytic Copper Winding',
    specs: [
      { label: 'Conductor', value: 'Electrolytic Grade Copper Foil' },
      { label: 'Voltage Range', value: 'Up to 33 kV class' },
      { label: 'Efficiency', value: 'Ultra-High Efficiency Tier' },
    ],
  },
  'dry-type': {
    productName: 'Dry Type Distribution Transformers',
    category: 'Transformers',
    subtitle: 'Cast Resin & VPI Dry Type (Indoor & Flame Retardant)',
    specs: [
      { label: 'Insulation', value: 'Class F / Class H' },
      { label: 'Enclosure', value: 'IP21 / IP23 / IP33' },
      { label: 'Fire Rating', value: 'F1 Flame Retardant' },
    ],
  },
  'ester-oil': {
    productName: 'Natural Ester Transformers',
    category: 'Transformers',
    subtitle: 'Bio-Degradable Fluid & High Fire-Safety Design',
    specs: [
      { label: 'Dielectric Fluid', value: 'Natural Ester Fluid (K-Class)' },
      { label: 'Fire Point', value: '> 300°C (High Fire Point)' },
      { label: 'Eco Feature', value: '100% Biodegradable & Non-Toxic' },
    ],
  },
  'hermetically-sealed': {
    productName: 'Hermetically Sealed Transformers',
    category: 'Transformers',
    subtitle: 'Corrugated Tank Sealed Maintenance-Free Design',
    specs: [
      { label: 'Design Type', value: 'Hermetically Sealed Corrugated Tank' },
      { label: 'Maintenance', value: 'Virtually Maintenance-Free' },
      { label: 'Environmental', value: 'Prevents Oil Oxidation & Moisture Ingress' },
    ],
  },

  // Compact Substations
  'compact-substation-3mva': {
    productName: 'Compact Substation (Up to 3MVA, 33kV Class)',
    category: 'Compact Substations',
    subtitle: 'Siemens Approved Partner (TYPE 8FB20)',
    specs: [
      { label: 'Capacity', value: 'Up to 3000 kVA (3 MVA)' },
      { label: 'Voltage', value: '12kV / 22kV / 33kV' },
      { label: 'RMU', value: 'Siemens RMU 12kV-33kV, 630A, 21kA' },
      { label: 'Standard', value: 'IEC 62271-202' },
    ],
  },
  'compact-substation-oil-dry': {
    productName: 'CSS with Oil / Dry Type Transformer up to 33kV',
    category: 'Compact Substations',
    subtitle: 'Oil, Cast Resin, VPI & Green Ester Oil Options',
    specs: [
      { label: 'Transformer', value: 'Oil-Filled, Cast Resin (Dry), VPI, Ester Oil' },
      { label: 'Protection', value: 'IP54 MV/LV, IP23 Transformer' },
    ],
  },
  'compact-substation-oltc': {
    productName: 'CSS with Transformer having OLTC up to 33kV',
    category: 'Compact Substations',
    subtitle: 'On-Load Tap Changer Integrated Package',
    specs: [
      { label: 'Tap Changer', value: 'On-Load Tap Changer (OLTC) integrated' },
      { label: 'Control', value: 'Automatic / Remote Voltage Regulation' },
      { label: 'SCADA', value: 'Smart IoT & SCADA Ready' },
    ],
  },
  'compact-substation-msedcl': {
    productName: 'MSEDCL Approved Compact Substation',
    category: 'Compact Substations',
    subtitle: 'Utility Compliant Compact Substation Packages',
    specs: [
      { label: 'Utility', value: 'MSEDCL Compliant Specification' },
      { label: 'RMU Switchgear', value: 'Siemens 8FB20 RMU (12kV-33kV, 630A, 21kA)' },
    ],
  },
  'compact-substation-pad-mounted': {
    productName: 'PAD Mounted Compact Substation',
    category: 'Compact Substations',
    subtitle: 'Low Profile Outdoor Pad-Mounted Substation',
    specs: [
      { label: 'Mounting', value: 'Outdoor Concrete Pad Surface' },
      { label: 'Security', value: 'Tamper-Proof Dead-Front Compartment' },
    ],
  },
  'compact-substation-e-house': {
    productName: 'E-House (Walkable Container Substation)',
    category: 'Compact Substations',
    subtitle: 'Modular Walk-in Power Distribution Center',
    specs: [
      { label: 'Structure', value: 'Pre-Fabricated ISO Shipping Container' },
      { label: 'Environment', value: 'Climate Controlled HVAC & Pressurized' },
    ],
  },

  // MV Switchgear
  'mv-fully-tested': {
    productName: 'Fully Tested MV Switchgear Panel',
    category: 'Medium Voltage Switchgear',
    subtitle: 'Type Tested per IEC 62271 Standards',
    specs: [
      { label: 'Circuit Breaker', value: 'Siemens Vacuum Circuit Breaker (VCB)' },
      { label: 'Arc Test', value: 'Internal Arc Classification (IAC AFLR)' },
    ],
  },
  'mv-voltage-class': {
    productName: 'MV Switchgear Panels (11kV / 22kV Class)',
    category: 'Medium Voltage Switchgear',
    subtitle: 'Rated Voltage 11kV & 22kV Distribution Panels',
    specs: [
      { label: 'Voltage Class', value: '11kV / 22kV (Up to 33kV available)' },
      { label: 'Insulation Level', value: 'Power Frequency & Impulse Withstand per IEC' },
    ],
  },
  'mv-current-rating': {
    productName: 'MV Switchgear Panel up to 2500A (21kA)',
    category: 'Medium Voltage Switchgear',
    subtitle: 'High Current Busbar & Short-Circuit Capability',
    specs: [
      { label: 'Rated Current', value: 'Up to 2500A continuous' },
      { label: 'Fault Withstand', value: '21kA for 3 Seconds' },
    ],
  },
  'mv-installation': {
    productName: 'Indoor / Outdoor MV Switchgear Panels',
    category: 'Medium Voltage Switchgear',
    subtitle: 'Rugged Enclosure Protection (IP4X / IP54)',
    specs: [
      { label: 'Ingress Rating', value: 'IP4X Indoor / IP54 Outdoor Roof Canopy' },
      { label: 'Finish', value: 'Powder-Coated Sheet Steel' },
    ],
  },
};

export function detectCurrentProductContext(
  pathname: string,
  hash: string
): ProductContextInfo | null {
  const cleanHash = (hash || '').replace('#', '').trim();

  // 1. Direct match on hash anchor
  if (cleanHash && PRODUCT_CONTEXT_MAP[cleanHash]) {
    return PRODUCT_CONTEXT_MAP[cleanHash];
  }

  // 2. Route level matches
  if (pathname.includes('/products/transformer')) {
    return {
      productName: 'Distribution & Power Transformers',
      category: 'Transformers',
      subtitle: '25 kVA – 2500 kVA, up to 33 kV Class',
      specs: [
        { label: 'Types', value: 'Oil-Filled, Dry-Type, Foil Wound, Ester Oil' },
        { label: 'Voltage Class', value: 'Up to 33 kV' },
        { label: 'Facility', value: 'Pune Manufacturing Works' },
      ],
    };
  }

  if (pathname.includes('/products/compact-substation')) {
    return {
      productName: 'Compact Substations (CSS)',
      category: 'Compact Substations',
      subtitle: 'Siemens Approved Partner (Up to 3MVA, 33kV)',
      specs: [
        { label: 'Capacity', value: 'Up to 3000 kVA' },
        { label: 'Partner', value: 'Siemens RMU TYPE 8FB20' },
      ],
    };
  }

  if (pathname.includes('/products/mv-switchgear-panels')) {
    return {
      productName: 'Medium Voltage SwitchGear Panels',
      category: 'Medium Voltage Switchgear',
      subtitle: '11kV / 22kV / 33kV · Up to 2500A (21kA)',
      specs: [
        { label: 'Ratings', value: 'Up to 2500A, 21kA short circuit' },
        { label: 'Standard', value: 'IEC 62271 Compliant' },
      ],
    };
  }

  if (pathname.includes('/technology')) {
    return {
      productName: 'Graycell G-SenSe Smart Monitoring',
      category: 'Digital Technologies',
      subtitle: 'IoT Condition Monitoring for Transformers & CSS',
    };
  }

  if (pathname.includes('/products')) {
    return {
      productName: 'Graycell Power Engineering Solutions',
      category: 'Power Portfolio',
      subtitle: 'Transformers, Compact Substations & MV Panels',
    };
  }

  return null;
}
