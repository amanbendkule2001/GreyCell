// Graycell Website — temporary frontend-first mock data.
// Replace repository implementation with CMS/API later.
// Unverified values must not be treated as production claims.

export type ContentStatus = "draft" | "review" | "approved" | "published" | "archived";
export type ProductOwnership = "graycell_manufactured" | "graycell_solution" | "partner_offering" | "associated_offering" | "requires_confirmation";

export interface SEOData { title: string; description: string; canonical?: string; ogImage?: string; noIndex?: boolean; }
export interface MediaReference { id: string; type: "image" | "video" | "diagram"; src: string; alt: string; caption?: string; isRealGraycellAsset: boolean; }
export interface DocumentReference { id: string; title: string; type: "catalogue" | "datasheet" | "certificate" | "technical_document" | "application_note" | "article" | "faq"; url: string; version?: string; access: "public" | "restricted" | "internal"; sourceStatus: "verified" | "requires_confirmation"; }
export interface TechnicalSpecification { key: string; label: string; value: string; unit?: string; group?: string; sourceStatus: "verified" | "requires_confirmation"; }

export interface Product {
  id: string; slug: string; name: string; shortName?: string;
  category: "transformer" | "compact_substation" | "mv_system" | "other";
  status: ContentStatus; ownership: ProductOwnership; summary: string;
  capacity?: { min?: number; max?: number; unit: "kVA" | "MVA"; label?: string };
  voltage?: { values?: string[]; min?: string; max?: string; label?: string };
  applications: string[]; technologies: string[]; features: string[];
  specifications: TechnicalSpecification[]; media: MediaReference[];
  documents: DocumentReference[]; relatedProductIds: string[];
  imageSrc?: string; imageAlt?: string;
  enquiryEnabled: boolean; seo: SEOData;
}

export interface Solution { id: string; slug: string; name: string; summary: string; applications: string[]; productIds: string[]; technologyIds: string[]; media: MediaReference[]; status: ContentStatus; seo: SEOData; }
export interface Technology { id: string; slug: string; name: string; summary: string; benefits: string[]; productIds: string[]; media: MediaReference[]; status: ContentStatus; seo: SEOData; }
export interface Project { id: string; slug: string; title: string; status: ContentStatus; application?: string; industry?: string; location?: string; solution?: string; equipment?: string[]; capacity?: string; voltage?: string; challenge?: string; solutionDescription?: string; result?: string; media: MediaReference[]; relatedProductIds: string[]; isCaseStudy: boolean; seo: SEOData; }
export interface Resource { id: string; slug: string; title: string; type: DocumentReference["type"]; productIds: string[]; file?: DocumentReference; status: ContentStatus; seo: SEOData; }
export interface GroupCompany { id: string; name: string; summary: string; capabilities: string[]; status: ContentStatus; }
export interface ContactConfig { salesEmail: string; whatsappNumber?: string; phoneNumbers?: string[]; officeAddress?: string; factoryAddress?: string; }

export const siteConfig = {
  brand: "Graycell",
  descriptor: "Power Engineering Group",
  headline: "ENGINEERED POWER. BUILT TO PERFORM.",
  supportingText: "Manufacturer of Oil and Dry type Transformers,Compact Substations,Medium Voltage SwitchGear Panels.",
  contact: {
    salesEmail: "sales@graycellpower.com",
    whatsappNumber: "+91 7559132800",
    phoneNumbers: ["+91 7559132800", "+91 9518345584", "+91 8600018957"],
    factoryAddress: "Gat No. 311, Plot No. 7, 8, Gauddara Road, nr. Chate College, Khed Shivapur, Maharashtra – 412205, India",
  },
};

export const groupCompanies: GroupCompany[] = [
  { id: "graycell-power-solutions", name: "Graycell Power Solutions Pvt. Ltd.", summary: "Dedicated to the design, precision manufacturing, and rigorous testing of oil-filled, cast resin dry-type, and natural ester distribution transformers up to 33 kV class.", capabilities: ["Transformer solutions", "Power engineering", "Manufacturing"], status: "approved" },
  { id: "graycell-energy", name: "Graycell Energy LLP", summary: "Engineered power systems delivering turnkey compact substations (CSS), Medium Voltage SwitchGear Panels, and custom power distribution solutions under Siemens technology partnership.", capabilities: ["Compact substations", "Medium-voltage systems", "Power distribution solutions"], status: "approved" },
];

export const products: Product[] = [
  {
    id: "oil-filled-distribution", slug: "oil-filled-distribution-transformers", name: "Oil-Filled Distribution Transformers", shortName: "Oil-Filled Distribution Transformers", category: "transformer", status: "approved", ownership: "graycell_manufactured",
    summary: "Distribution-class oil-filled transformer solutions presented in the supplied Graycell catalogues.",
    capacity: { min: 25, max: 2500, unit: "kVA", label: "25–2500 kVA" }, voltage: { max: "33 kV", label: "Up to 33 kV class" },
    applications: ["Industrial", "Commercial", "Renewable Energy", "Utility Distribution"], technologies: ["Oil Filled", "Hermetically Sealed", "Non-Sealed"],
    features: ["Distribution-class transformer range", "Application-specific configurations", "Hermetically sealed and non-sealed references"],
    specifications: [
      { key: "capacity", label: "Capacity", value: "25–2500", unit: "kVA", sourceStatus: "verified" },
      { key: "voltage", label: "Voltage Class", value: "Up to 33", unit: "kV", sourceStatus: "verified" },
    ], media: [], documents: [], relatedProductIds: ["dry-type-distribution", "natural-ester-transformers"], enquiryEnabled: true, imageSrc: "/images/products/power-transformer.png", imageAlt: "Graycell high-performance power transformer",
    seo: { title: "Oil-Filled Distribution Transformers | Graycell", description: "Explore Graycell oil-filled distribution transformer solutions and technical information." },
  },
  {
    id: "dry-type-distribution", slug: "dry-type-distribution-transformers", name: "Dry-Type Distribution Transformers", shortName: "Dry-Type Transformers", category: "transformer", status: "approved", ownership: "graycell_manufactured",
    summary: "Dry-type distribution transformer solutions referenced in the supplied Graycell catalogues.", capacity: { max: 3000, unit: "kVA", label: "Up to 3000 kVA reference" }, voltage: { max: "33 kV", label: "33 kV class reference" },
    applications: ["Industrial", "Commercial", "Infrastructure"], technologies: ["Dry Type"], features: [],
    specifications: [
      { key: "capacity", label: "Capacity", value: "Up to 3000", unit: "kVA", sourceStatus: "requires_confirmation" },
      { key: "voltage", label: "Voltage Class", value: "33", unit: "kV", sourceStatus: "requires_confirmation" },
    ], media: [], documents: [], relatedProductIds: ["oil-filled-distribution", "natural-ester-transformers"], enquiryEnabled: true, imageSrc: "/images/products/dry-type-transformer.png", imageAlt: "Graycell cast resin dry-type transformer",
    seo: { title: "Dry-Type Distribution Transformers | Graycell", description: "Explore Graycell dry-type distribution transformer solutions." },
  },
  {
    id: "natural-ester-transformers", slug: "natural-ester-transformers", name: "Natural Ester Oil Transformers", shortName: "Natural Ester Transformers", category: "transformer", status: "approved", ownership: "graycell_manufactured",
    summary: "Natural ester oil transformer technology presented by Graycell as an environmental and fire-performance-oriented option.", applications: ["Renewable Energy", "Industrial", "Commercial"], technologies: ["Natural Ester Oil"],
    features: ["Biodegradable fluid reference", "High fire point reference", "Moisture-tolerance reference"], specifications: [
      { key: "fire-point", label: "Fire Point", value: "300–360", unit: "°C", sourceStatus: "requires_confirmation" },
    ], media: [], documents: [], relatedProductIds: ["oil-filled-distribution", "dry-type-distribution"], enquiryEnabled: true, imageSrc: "/images/products/natural-ester-transformer.png", imageAlt: "Graycell natural ester oil transformer",
    seo: { title: "Natural Ester Oil Transformers | Graycell", description: "Explore Graycell natural ester oil transformer technology and applications." },
  },
  {
    id: "foil-wound-transformers", slug: "foil-wound-transformers", name: "Medium Voltage SwitchGear Panels", shortName: "Medium Voltage SwitchGear Panels", category: "mv_system", status: "approved", ownership: "graycell_manufactured",
    summary: "Medium Voltage SwitchGear Panels and modular solutions engineered for robust power distribution.", applications: ["Industrial", "Commercial", "Utility"], technologies: ["Medium Voltage SwitchGear Panels", "Vacuum Circuit Breakers"],
    features: ["Indoor modular switchgear lineup", "Arc-fault safety protection", "Advanced metering and monitoring", "Scalable multi-panel design"], specifications: [], media: [], documents: [], relatedProductIds: ["oil-filled-distribution", "compact-substations"], enquiryEnabled: true, imageSrc: "/images/products/mv-switchgear.png", imageAlt: "Graycell Medium Voltage SwitchGear Panels lineup",
    seo: { title: "Medium Voltage SwitchGear Panels | Graycell", description: "Explore Graycell Medium Voltage SwitchGear Panels and power distribution solutions." },
  },
  {
    id: "compact-substations", slug: "compact-substations", name: "Compact Substations", shortName: "Compact Substations", category: "compact_substation", status: "review", ownership: "graycell_solution",
    summary: "Compact substation solutions referenced in the supplied Graycell Energy material, including MV/LV integration and project-specific configurations.", applications: ["Industrial", "Commercial", "Infrastructure", "Utility"], technologies: ["Medium Voltage SwitchGear Panels", "Transformer Integration", "Smart Monitoring"],
    features: ["Indoor/outdoor configuration references", "Project-specific customization references", "Monitoring/SCADA compatibility references"], specifications: [], media: [], documents: [], relatedProductIds: [], enquiryEnabled: true, imageSrc: "/images/products/compact-substation.png", imageAlt: "Graycell compact substation package unit",
    seo: { title: "Compact Substations | Graycell", description: "Explore Graycell compact substation solutions and MV/LV power distribution capabilities." },
  },
  {
    id: "aluminium-foil-wound-transformers", slug: "aluminium-foil-wound-transformers", name: "Aluminium Foil Wound Transformers", shortName: "Aluminium Foil Wound", category: "transformer", status: "approved", ownership: "graycell_manufactured",
    summary: "Precision engineered aluminium foil wound transformers offering uniform current distribution and enhanced mechanical strength.",
    applications: ["Industrial", "Commercial", "Utility"], technologies: ["Foil Winding"],
    features: ["Uniform current distribution", "High mechanical strength", "Reduced hot-spots"],
    specifications: [], media: [], documents: [], relatedProductIds: [], enquiryEnabled: true, imageSrc: "/images/products/aluminium_foil_wound.jpg", imageAlt: "Aluminium Foil Wound Transformer",
    seo: { title: "Aluminium Foil Wound Transformers | Graycell", description: "Explore Graycell aluminium foil wound transformer solutions." },
  },
  {
    id: "copper-foil-wound-transformers", slug: "copper-foil-wound-transformers", name: "Copper Foil Wound Transformers", shortName: "Copper Foil Wound", category: "transformer", status: "approved", ownership: "graycell_manufactured",
    summary: "High-efficiency copper foil wound transformers for superior electrical performance and low losses.",
    applications: ["Industrial", "Commercial", "Data Centers"], technologies: ["Foil Winding"],
    features: ["Superior electrical conductivity", "Low electrical losses", "Compact design capabilities"],
    specifications: [], media: [], documents: [], relatedProductIds: [], enquiryEnabled: true, imageSrc: "/images/products/copper_foil_wound.jpg", imageAlt: "Copper Foil Wound Transformer",
    seo: { title: "Copper Foil Wound Transformers | Graycell", description: "Explore Graycell copper foil wound transformer solutions." },
  },
  {
    id: "hermetically-sealed-transformers", slug: "hermetically-sealed-transformers", name: "Hermetically Sealed and Corrugated Tank Transformers", shortName: "Hermetically Sealed", category: "transformer", status: "approved", ownership: "graycell_manufactured",
    summary: "Maintenance-free hermetically sealed transformers with corrugated tanks for efficient cooling.",
    applications: ["Utility", "Industrial", "Infrastructure"], technologies: ["Hermetically Sealed", "Corrugated Cooling"],
    features: ["Maintenance-free operation", "No oil degradation from air/moisture", "Efficient heat dissipation"],
    specifications: [], media: [], documents: [], relatedProductIds: [], enquiryEnabled: true, imageSrc: "/images/products/hermetically_sealed.jpg", imageAlt: "Hermetically Sealed Transformer",
    seo: { title: "Hermetically Sealed Transformers | Graycell", description: "Explore Graycell hermetically sealed and corrugated tank transformers." },
  },
  {
    id: "g-sense-monitoring", slug: "g-sense-smart-monitoring", name: "Graycell G-SenSe Smart Monitoring", shortName: "G-SenSe Monitoring", category: "other", status: "approved", ownership: "graycell_solution",
    summary: "Digital condition monitoring system for compact substations & transformers offering 24/7 visibility, predictive maintenance, and retrofit-ready deployment.",
    applications: ["Condition Monitoring", "Transformer Health", "Substation Management"], technologies: ["Smart Monitoring", "IoT", "Cloud Analytics"],
    features: ["24/7 Continuous visibility", "Predictive condition-based maintenance", "Retrofit-ready architecture", "Cloud platform with mobile access", "Monitoring of physical, electrical, and protection parameters"],
    specifications: [
      { key: "parameters", label: "Parameters Monitored", value: "Physical, Electrical, Protection", sourceStatus: "verified" },
      { key: "connectivity", label: "Connectivity", value: "SIM / Wi-Fi / Ethernet", sourceStatus: "verified" }
    ], media: [], documents: [], relatedProductIds: ["compact-substations", "oil-filled-distribution"], enquiryEnabled: true, imageSrc: "/images/products/gsense_monitoring.jpg", imageAlt: "Graycell G-SenSe IoT Monitoring System",
    seo: { title: "Graycell G-SenSe Smart Monitoring | Graycell", description: "Explore the G-SenSe digital condition monitoring platform for transformers and compact substations." },
  }
];

export const technologies: Technology[] = [
  { id: "foil-winding", slug: "foil-winding", name: "Foil Winding", summary: "Foil winding technology referenced in the supplied Graycell catalogue for aluminium and copper winding applications.", benefits: ["Uniform current distribution reference", "Mechanical strength reference", "Reduced hot-spot reference", "Precision manufacturing reference"], productIds: ["foil-wound-transformers"], media: [], status: "approved", seo: { title: "Foil Winding Technology | Graycell", description: "Learn about Graycell foil-winding technology for transformer applications." } },
  { id: "natural-ester", slug: "natural-ester", name: "Natural Ester Oil", summary: "Natural ester transformer technology presented in the supplied catalogue as an environmental and fire-performance-oriented solution.", benefits: ["Biodegradability reference", "High fire-point reference", "Moisture-tolerance reference", "Lower environmental-impact reference"], productIds: ["natural-ester-transformers"], media: [], status: "approved", seo: { title: "Natural Ester Oil Technology | Graycell", description: "Explore Graycell natural ester oil transformer technology." } },
  { id: "smart-monitoring", slug: "smart-monitoring", name: "Smart Monitoring & Digital Diagnostics", summary: "Smart monitoring and digital diagnostic capabilities are referenced in the supplied Graycell catalogues.", benefits: ["Digital monitoring reference", "Transformer-health monitoring reference", "SCADA/IoT compatibility reference"], productIds: ["compact-substations"], media: [], status: "review", seo: { title: "Smart Monitoring & Digital Diagnostics | Graycell", description: "Explore Graycell's smart monitoring and digital diagnostics positioning." } },
];

export const solutions: Solution[] = [
  { id: "renewable-energy", slug: "renewable-energy", name: "Renewable Energy", summary: "Power distribution solutions for renewable-energy applications referenced in Graycell's supplied material.", applications: ["Renewable Energy"], productIds: ["oil-filled-distribution", "natural-ester-transformers", "compact-substations"], technologyIds: ["natural-ester", "smart-monitoring"], media: [], status: "approved", seo: { title: "Renewable Energy Power Solutions | Graycell", description: "Explore Graycell power distribution solutions for renewable-energy applications." } },
  { id: "industrial", slug: "industrial", name: "Industrial Power Infrastructure", summary: "Transformer and power-distribution solutions for industrial applications referenced in Graycell's material.", applications: ["Industrial"], productIds: ["oil-filled-distribution", "dry-type-distribution", "compact-substations"], technologyIds: ["foil-winding", "smart-monitoring"], media: [], status: "approved", seo: { title: "Industrial Power Solutions | Graycell", description: "Explore Graycell industrial power-distribution solutions." } },
  { id: "commercial-infrastructure", slug: "commercial-infrastructure", name: "Commercial Infrastructure", summary: "Power distribution solutions for commercial applications referenced in the supplied Graycell material.", applications: ["Commercial"], productIds: ["oil-filled-distribution", "dry-type-distribution", "compact-substations"], technologyIds: ["smart-monitoring"], media: [], status: "approved", seo: { title: "Commercial Power Infrastructure | Graycell", description: "Explore Graycell commercial power infrastructure solutions." } },
];

export const projects: Project[] = [
  { id: "compact-substation-showcase", slug: "compact-substation-application-showcase", title: "Power Infrastructure & Substation Application Showcase", status: "review", application: "Power Distribution & Substations", solution: "Substations, Switchgear & Transformers", equipment: ["Outdoor Substation", "Power Transformers", "Medium Voltage SwitchGear Panels", "Cast Resin Dry-Type Transformer"], media: [], relatedProductIds: ["compact-substations", "oil-filled-distribution", "foil-wound-transformers", "dry-type-distribution"], isCaseStudy: false, seo: { title: "Power Infrastructure & Substation Applications | Graycell", description: "Explore outdoor substations, power transformers, Medium Voltage SwitchGear Panels, and cast resin transformers from Graycell engineering." } },
];

export const resources: Resource[] = [
  { id: "graycell-product-catalogue", slug: "graycell-product-catalogue", title: "Graycell Product Catalogue", type: "catalogue", productIds: ["oil-filled-distribution", "dry-type-distribution", "natural-ester-transformers", "foil-wound-transformers", "compact-substations"], file: { id: "graycell-product-catalogue-pdf", title: "Graycell Product Catalogue", type: "catalogue", url: "/documents/graycell-product-catalogue.pdf", access: "public", sourceStatus: "verified" }, status: "approved", seo: { title: "Graycell Product Catalogue", description: "Supplied Graycell product catalogue covering transformers, compact substations and MV systems." } },
];
