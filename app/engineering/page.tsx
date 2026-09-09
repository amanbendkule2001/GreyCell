'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Wrench, 
  Layers, 
  Gauge, 
  FileCheck, 
  Award,
  Sparkles,
  Zap
} from 'lucide-react';

const stages = [
  ['01', 'Requirement', 'Define the application and technical context.'],
  ['02', 'Engineering', 'Structure the solution around the requirement.'],
  ['03', 'Manufacturing', 'Translate the engineered design into production.'],
  ['04', 'Testing', 'Testing capability is described in the supplied material.'],
  ['05', 'Quality', 'Verification and quality activities support delivery.'],
  ['06', 'Delivery', 'Prepare the solution for project handover.']
];

interface StageGate {
  id: string;
  gateNum: string;
  title: string;
  tagline: string;
  discipline: string;
  desc: string;
  equipment: string;
  image: string;
  imageAlt: string;
  checklist: string[];
  metrics: { label: string; value: string; pass: boolean }[];
  standards: string[];
}

const stageGates: StageGate[] = [
  {
    id: 'gate-01',
    gateNum: 'STAGE GATE 01',
    title: 'Electromagnetic Design & FEA Simulation',
    tagline: 'PRE-PRODUCTION VERIFICATION',
    discipline: 'Computer-Aided Electromagnetic & Thermal Optimization',
    desc: 'Before cutting silicon steel or drawing copper, every transformer design undergoes rigorous 3D Finite Element Analysis (FEA) to map magnetic flux distribution, leakage reactance, and electrodynamic short-circuit forces. This prevents hot-spots and ensures acoustic hum compliance.',
    equipment: '3D Electromagnetic FEA Modeling Engine · Flux Leakage Solvers · Thermal Fluid Simulation',
    image: '/images/manufacturing/stage-1-plant.jpg',
    imageAlt: 'Graycell engineering and simulation planning',
    checklist: [
      'Peak core flux density restricted to ≤ 1.70 Tesla to avoid saturation under +10% overvoltage',
      'Dynamic short-circuit axial and radial mechanical forces calculated to IEC 60076-5',
      'Thermal dissipation and natural thermosiphon oil velocity verified across radiators'
    ],
    metrics: [
      { label: 'Max Flux Density', value: '< 1.70 Tesla', pass: true },
      { label: 'Loss Guarantee Tolerance', value: '±0.5% Guaranteed', pass: true },
      { label: 'Short-Circuit Withstand', value: '100% Calculated', pass: true }
    ],
    standards: ['IS 2026-1', 'IEC 60076-1', 'IEEE C57.12']
  },
  {
    id: 'gate-02',
    gateNum: 'STAGE GATE 02',
    title: 'CRGO Core Stacking & Precision Winding',
    tagline: 'MAGNETIC & ELECTRICAL ASSEMBLY',
    discipline: 'Step-Lap Core Miter Assembly & High-Conductivity Winding',
    desc: 'Cold-Rolled Grain-Oriented (CRGO) prime silicon steel laminations are cut and assembled with 45° step-lap miter joints on hydraulic tilting tables. Coils are wound using high-purity electrolytic copper foil and strip with uniform inter-layer dielectric tension to eliminate winding loose-spots.',
    equipment: 'Hydraulic Core Stacking Tilt Tables · Automated Variable-Speed Foil Winding Machines · Laser Alignment',
    image: '/images/manufacturing/stage-2-winding.jpg',
    imageAlt: 'High precision coil winding and core assembly bay',
    checklist: [
      'Burr-free 45° step-lap miter joints minimize no-load losses and acoustic vibrations',
      'Electrolytic copper strip conductivity verified > 101% IACS with calibrated Kelvin bridge',
      'Radial and axial oil cooling ducts placed precisely between LV and HV winding discs'
    ],
    metrics: [
      { label: 'Core Lamination Grade', value: 'Prime M3 / M4 CRGO', pass: true },
      { label: 'Copper Purity', value: '99.9% Electrolytic', pass: true },
      { label: 'Acoustic Hum Damping', value: '< 52 dB(A) Tested', pass: true }
    ],
    standards: ['IS 3024', 'IEC 60076-11', 'DIN 46400']
  },
  {
    id: 'gate-03',
    gateNum: 'STAGE GATE 03',
    title: 'Vacuum Dehydration & Hermetic Tanking',
    tagline: 'DIELECTRIC FLUID IMPREGNATION',
    discipline: 'Deep Thermal Moisture Evacuation & Controlled Impregnation',
    desc: 'The completed core-and-coil assembly is baked in high-vacuum heating ovens under 0.01 mbar vacuum to thoroughly extract moisture from the solid insulation. Dielectric mineral oil or biodegradable natural ester bio-fluid is then vacuum-impregnated to prevent any air void formation.',
    equipment: 'High-Vacuum Thermal Drying Ovens · De-aeration & 3-Stage Filtration Plant (0.05 mbar) · Automated Tank Seam Welder',
    image: '/images/technology/foil-winding.jpg',
    imageAlt: 'Vacuum drying and core tanking process',
    checklist: [
      'Solid cellulose insulation moisture content verified < 0.5% by Karl Fischer titration',
      'Dielectric breakdown voltage (BDV) of filtered oil tested > 65 kV across 2.5 mm gap',
      '12-hour hydrostatic pressure leak check performed on corrugated fin tank at 50 kPa'
    ],
    metrics: [
      { label: 'Oven Vacuum Level', value: '< 0.01 mbar', pass: true },
      { label: 'Oil Dielectric BDV', value: '> 65 kV / 2.5 mm', pass: true },
      { label: 'Tank Pressure Hold', value: '50 kPa (12 Hours)', pass: true }
    ],
    standards: ['IS 1866', 'IEC 60296', 'ASTM D877']
  },
  {
    id: 'gate-04',
    gateNum: 'STAGE GATE 04',
    title: 'High-Voltage Routine & Type Testing',
    tagline: 'CALIBRATED LABORATORY VERIFICATION',
    discipline: 'Routine & Witnessed Factory Acceptance Testing (FAT)',
    desc: 'Every single unit undergoes rigorous testing in Graycell’s calibrated high-voltage laboratory before release. Tests include measurement of winding resistance on all taps, voltage ratio, phase displacement, impedance voltage, load losses, no-load losses, and separate source AC overvoltage withstand.',
    equipment: 'Calibrated Precision Power Analyzer · 100 kV Separate Source AC Test Transformer · Micro-Ohmmeter · Turn-Ratio Bridge',
    image: '/images/manufacturing/stage-3-testing.jpg',
    imageAlt: 'Calibrated high voltage electrical testing laboratory',
    checklist: [
      'Winding resistance balanced across all phases and tap changer steps within ±0.5%',
      'Separate source power frequency AC high-voltage withstand test applied for 60 seconds',
      'Induced overvoltage withstand test (DVDF) at double rated voltage and 100 Hz frequency'
    ],
    metrics: [
      { label: 'Separate Source Withstand', value: '70 kV AC / 60s', pass: true },
      { label: 'Induced Overvoltage (DVDF)', value: '2x Vrated @ 100Hz', pass: true },
      { label: 'Ratio Accuracy Error', value: '< 0.20% Nominal', pass: true }
    ],
    standards: ['IS 2026-3', 'IEC 60076-3', 'CPRI / ERDA Verified']
  },
  {
    id: 'gate-05',
    gateNum: 'STAGE GATE 05',
    title: 'Stage-Gate QA Audit & Dispatch Handover',
    tagline: 'CUSTOMER ACCEPTANCE & COMPLIANCE',
    discipline: 'Comprehensive Quality Dossier & Customer Witness Sign-off',
    desc: 'The final gate requires verified sign-off of all material test certificates (MTC), calibrated routine test certificates, paint dry-film thickness (DFT) checks, and protection interlock checks. Units are dispatched with complete technical documentation ready for site installation.',
    equipment: 'Digital Coating Thickness Gauge (Elcometer) · Megger Insulation Tester · Customer Witness Test Bay',
    image: '/images/manufacturing/stage-4-quality.jpg',
    imageAlt: 'Final inspection, quality sign-off and dispatch handover',
    checklist: [
      'Electrostatic powder coat dry-film thickness (DFT) verified > 85 microns on all surfaces',
      'Bushing terminals, marshaling box, and protection trip wiring verified point-to-point',
      'Comprehensive Quality Dossier compiled with certified test reports, GA drawings & manuals'
    ],
    metrics: [
      { label: 'Paint DFT Thickness', value: '> 85 µm Powder Coat', pass: true },
      { label: 'Material Traceability', value: '100% Certified MTCs', pass: true },
      { label: 'Inspection Clearance', value: 'FAT Signed Off', pass: true }
    ],
    standards: ['ISO 9001:2015', 'Siemens Quality Standards']
  }
];

const clientReferences = [
  { name: 'Siemens', role: 'Technology Partner' },
  { name: 'AECOM', role: 'Global Infrastructure' },
  { name: 'Mahindra', role: 'Automotive & Industrial' },
  { name: 'Novotel', role: 'Hospitality Infrastructure' },
  { name: 'Thermax', role: 'Energy & Environment' },
  { name: 'BSE', role: 'Financial Infrastructure' },
  { name: 'MEDA', role: 'Renewable Energy Agency' },
  { name: 'Kohinoor', role: 'Commercial Projects' }
];

export default function Engineering() {
  const [activeGateIndex, setActiveGateIndex] = useState(0);
  const activeGate = stageGates[activeGateIndex];

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Engineering / Manufacturing</div>
          <h1>FROM REQUIREMENT<br/>TO REAL POWER.</h1>
          <p>A rigorous, stage-gate engineering methodology governing design, material integrity, precision fabrication, calibrated testing, and certified quality handover.</p>
        </div>
      </section>

      {/* TIMELINE OVERVIEW */}
      <section className="page-content">
        <div className="container">
          <div className="timeline">
            {stages.map((s) => (
              <div className="timeline-item" key={s[0]}>
                <div className="num">{s[0]}</div>
                <h3>{s[1]}</h3>
                <p>{s[2]}</p>
              </div>
            ))}
          </div>

          {/* INTERACTIVE STAGE-GATE QUALITY INSPECTOR */}
          <div style={{ marginTop: 52 }}>
            <div className="section-heading" style={{ marginBottom: 24 }}>
              <div>
                <div className="eyebrow">QUALITY ASSURANCE WORKFLOW</div>
                <h2 style={{ fontSize: 26, margin: '6px 0 0' }}>Interactive Stage-Gate Engineering Inspector</h2>
                <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: 13.5, maxWidth: 680 }}>
                  Explore how every Graycell transformer and compact substation progresses through five mandatory verification gates before leaving the manufacturing facility.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#0878c9', fontWeight: 600, background: 'rgba(8, 120, 201, 0.08)', padding: '5px 10px', borderRadius: 4 }}>
                  STAGE {activeGateIndex + 1} OF {stageGates.length}
                </span>
              </div>
            </div>

            {/* STAGE GATE SELECTOR TABS */}
            <div className="stagegate-tab-track">
              {stageGates.map((gate, idx) => (
                <button
                  key={gate.id}
                  onClick={() => setActiveGateIndex(idx)}
                  className={`stagegate-step-btn ${activeGateIndex === idx ? 'active' : ''}`}
                >
                  <span className="step-num">{gate.gateNum.replace('STAGE GATE ', 'GATE ')}</span>
                  <strong className="step-title">{gate.title.split(' ')[0]} {gate.title.split(' ')[1]}</strong>
                </button>
              ))}
            </div>

            {/* ACTIVE STAGE GATE DISPLAY CARD */}
            <div className="stagegate-display-card">
              <div className="stagegate-grid">
                
                {/* LEFT: TECHNICAL SPECIFICATIONS & CHECKLIST */}
                <div className="stagegate-details-col">
                  <div className="stagegate-tag-row">
                    <span className="stagegate-tag-pill">
                      <Sparkles size={12} />
                      {activeGate.tagline}
                    </span>
                    <span className="stagegate-standards-pill">
                      {activeGate.standards.join(' · ')}
                    </span>
                  </div>

                  <h3 className="stagegate-title">{activeGate.title}</h3>
                  <div className="stagegate-discipline">{activeGate.discipline}</div>
                  
                  <p className="stagegate-desc">{activeGate.desc}</p>

                  {/* EQUIPMENT UTILIZED */}
                  <div className="stagegate-equipment-box">
                    <div className="eq-label">
                      <Wrench size={13} color="#0878c9" />
                      CALIBRATED EQUIPMENT & MACHINERY USED
                    </div>
                    <div className="eq-text">{activeGate.equipment}</div>
                  </div>

                  {/* VERIFICATION CHECKLIST */}
                  <div className="stagegate-checklist">
                    <div className="chk-label">
                      <CheckCircle2 size={13} color="#10b981" />
                      MANDATORY QUALITY VERIFICATION STEPS:
                    </div>
                    {activeGate.checklist.map((item, i) => (
                      <div className="stagegate-check-item" key={i}>
                        <div className="chk-bullet">
                          <CheckCircle2 size={15} color="#10b981" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* NEXT GATE NAVIGATION */}
                  <div className="stagegate-actions-row">
                    {activeGateIndex < stageGates.length - 1 ? (
                      <button
                        className="btn btn-secondary"
                        onClick={() => setActiveGateIndex(activeGateIndex + 1)}
                        style={{ fontSize: 12.5 }}
                      >
                        Advance to {stageGates[activeGateIndex + 1].gateNum} <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={() => setActiveGateIndex(0)}
                        style={{ fontSize: 12.5 }}
                      >
                        Restart Quality Inspection (Gate 01)
                      </button>
                    )}

                    <Link className="btn btn-primary" href="/contact" style={{ fontSize: 12.5 }}>
                      Request FAT Witness Procedure <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* RIGHT: HIGH-RES PHOTOGRAPHY & LIVE QUALITY TELEMETRY */}
                <div className="stagegate-visual-col">
                  {/* Photo Frame */}
                  <div className="stagegate-image-frame">
                    <img src={activeGate.image} alt={activeGate.imageAlt} />
                    <div className="stagegate-image-badge">
                      <ShieldCheck size={13} />
                      STAGE-GATE AUDIT VERIFIED
                    </div>
                  </div>

                  {/* Live Quality Telemetry Card */}
                  <div className="stagegate-telemetry-box">
                    <div className="telemetry-header">
                      <div className="tel-title">
                        <Activity size={13} color="#38bdf8" />
                        CERTIFIED QUALITY TOLERANCES
                      </div>
                      <span className="tel-status">
                        <span className="live-pulse" style={{ width: 6, height: 6 }}></span>
                        100% PASS CRITERIA
                      </span>
                    </div>

                    <div className="telemetry-metrics-grid">
                      {activeGate.metrics.map((m, idx) => (
                        <div className="tel-metric-card" key={idx}>
                          <span className="metric-lbl">{m.label}</span>
                          <div className="metric-val-row">
                            <strong className="metric-val">{m.value}</strong>
                            <span className="metric-pass-pill">✓ PASS</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* TRUSTED CLIENTS & TECHNOLOGY ECOSYSTEM STRIP */}
            <div className="stagegate-client-strip">
              <div className="client-strip-header">
                <Award size={14} color="#0878c9" />
                <span>TRUSTED BY INDUSTRIAL, UTILITY & COMMERCIAL INFRASTRUCTURE LEADERS:</span>
              </div>
              <div className="client-badges-grid">
                {clientReferences.map((c) => (
                  <div className="client-badge-card" key={c.name}>
                    <strong>{c.name}</strong>
                    <span>{c.role}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COMPLIANCE NOTICE & CONTACT CTA */}
          <div className="notice" style={{ marginTop: 32 }}>
            All manufacturing stage gates, test certificates, and quality dossier records are archived for complete unit traceability. Official certified routine and type-test reports are provided with equipment delivery.
          </div>

          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <Link className="btn btn-primary" href="/contact">
              Talk to an Engineer <ArrowRight size={15} />
            </Link>
            <Link className="btn btn-secondary" href="/manufacturing">
              Explore Factory Infrastructure <ChevronRight size={15} />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
