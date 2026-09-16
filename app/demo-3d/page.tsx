'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Link from 'next/link';
import { 
  createOilFilledTransformerModel, 
  createLookDevLighting 
} from '../../components/3d/createOilFilledTransformerModel';
import { 
  RotateCw, 
  Layers, 
  Sliders, 
  Sun, 
  Maximize2, 
  Info, 
  CheckCircle2, 
  Eye, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowLeft
} from 'lucide-react';

export default function Img2ThreeJsDemoPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingMode, setLightingMode] = useState<'studio' | 'reference' | 'dramatic'>('studio');
  const [explodedOffset, setExplodedOffset] = useState(0);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'spec' | 'architecture'>('preview');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  // Initialize and update Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f1d);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(4.5, 3.2, 5.0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 2.0;
    controls.maxDistance = 15.0;
    controls.target.set(0, 0.2, 0);
    controlsRef.current = controls;

    // Studio Grid & Floor
    const grid = new THREE.GridHelper(10, 20, 0x3b82f6, 0x1e293b);
    grid.position.y = -1.06;
    scene.add(grid);

    const shadowPlaneGeo = new THREE.PlaneGeometry(12, 12);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.05;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Add Lights
    let currentLights = createLookDevLighting(lightingMode);
    scene.add(currentLights);

    // Build Initial Procedural Model
    const { group: transformerModel } = createOilFilledTransformerModel({
      wireframe,
      explodedOffset,
    });
    modelRef.current = transformerModel;
    scene.add(transformerModel);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = 1.2;
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  // Update model when interactive controls change
  useEffect(() => {
    if (!sceneRef.current || !modelRef.current) return;

    sceneRef.current.remove(modelRef.current);
    const { group: newModel } = createOilFilledTransformerModel({
      wireframe,
      explodedOffset,
    });
    modelRef.current = newModel;
    sceneRef.current.add(newModel);
  }, [wireframe, explodedOffset]);

  // Update lighting when lighting mode changes
  useEffect(() => {
    if (!sceneRef.current) return;

    const existingLights = sceneRef.current.getObjectByName('LookDevLighting');
    if (existingLights) {
      sceneRef.current.remove(existingLights);
    }
    const newLights = createLookDevLighting(lightingMode);
    sceneRef.current.add(newLights);
  }, [lightingMode]);

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d1527]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                img2threejs Demo
              </span>
              <h1 className="text-sm md:text-base font-semibold text-white">
                Procedural 3D Reconstruction: Oil-Filled Transformer
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-white/50 hidden md:block">
              Built with pure procedural Three.js (Zero external meshes)
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Control Tabs */}
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              Live 3D & Reference Comparison
            </button>
            <button
              onClick={() => setActiveTab('spec')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'spec'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              Generated Spec & Components
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'architecture'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              Evaluation & Decision Guide
            </button>
          </div>

          <div className="text-xs text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            WebGL 2.0 / PBR Active
          </div>
        </div>

        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 3D Canvas Host (7 cols) */}
            <div className="lg:col-span-8 bg-[#0c1427] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
              {/* Overlay Controls */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 backdrop-blur-md transition ${
                    autoRotate
                      ? 'bg-blue-500/80 text-white'
                      : 'bg-black/60 text-white/70 hover:bg-black/80'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  {autoRotate ? 'Rotating' : 'Paused'}
                </button>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 backdrop-blur-md transition ${
                    wireframe
                      ? 'bg-amber-500/80 text-white'
                      : 'bg-black/60 text-white/70 hover:bg-black/80'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Wireframe
                </button>
                <div className="flex bg-black/60 backdrop-blur-md rounded-md p-0.5 text-xs text-white/70">
                  <button
                    onClick={() => setLightingMode('studio')}
                    className={`px-2 py-0.5 rounded ${lightingMode === 'studio' ? 'bg-blue-600 text-white' : 'hover:text-white'}`}
                  >
                    Studio
                  </button>
                  <button
                    onClick={() => setLightingMode('reference')}
                    className={`px-2 py-0.5 rounded ${lightingMode === 'reference' ? 'bg-blue-600 text-white' : 'hover:text-white'}`}
                  >
                    Daylight
                  </button>
                  <button
                    onClick={() => setLightingMode('dramatic')}
                    className={`px-2 py-0.5 rounded ${lightingMode === 'dramatic' ? 'bg-blue-600 text-white' : 'hover:text-white'}`}
                  >
                    Grazing
                  </button>
                </div>
              </div>

              {/* Exploded View Slider Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-4">
                <div className="text-xs font-medium text-white/80 whitespace-nowrap flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  Exploded Assembly:
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={explodedOffset}
                  onChange={(e) => setExplodedOffset(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <span className="text-xs font-mono text-blue-400 min-w-[3rem] text-right">
                  {Math.round(explodedOffset * 100)}%
                </span>
              </div>

              {/* Three.js Canvas Container */}
              <div
                ref={mountRef}
                className="w-full h-[540px] cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Reference Image & Feature Breakdown (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Reference Image Card */}
              <div className="bg-[#0c1427] border border-white/10 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-400" /> Reference Source
                  </h3>
                  <span className="text-[10px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded">
                    public/images/products/...
                  </span>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/40">
                  <img
                    src="/images/products/oil-filled-transformer.png"
                    alt="Reference Oil-Filled Transformer"
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white/70">
                    Input Photo
                  </div>
                </div>
                <p className="text-[11px] text-white/50 mt-2">
                  Reconstructed procedurally: Main tank, corrugated radiator cooling banks, overhead conservator cylinder with oil gauge, Buchholz relay, 3 HT porcelain bushings with sheds, 4 LT bushings, explosion vent, and chassis rollers.
                </p>
              </div>

              {/* Sub-Assemblies List */}
              <div className="bg-[#0c1427] border border-white/10 rounded-2xl p-4 shadow-xl flex-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" /> Procedural Hierarchy
                </h3>
                <div className="space-y-2 text-xs">
                  {[
                    { name: 'Main Tank & Cover Flange', desc: 'PBR painted steel RAL 7031 with bolt ring', status: 'Macro' },
                    { name: 'Radiator Fin Banks (x28 fins)', desc: 'Top & bottom manifold header pipes', status: 'Meso' },
                    { name: 'Conservator Oil Tank', desc: 'Dished ends, mounting brackets, oil sight glass', status: 'Meso' },
                    { name: 'Buchholz Protection Relay', desc: 'In-line relay on connecting pipe', status: 'Micro' },
                    { name: 'HT Bushings (R, Y, B phases)', desc: '6 glazed porcelain petticoats + brass terminals', status: 'Micro' },
                    { name: 'LT Bushings (4 terminals)', desc: 'Porcelain insulators for low voltage output', status: 'Micro' },
                    { name: 'Explosion Vent & Cowl', desc: 'Curved relief pipe with diaphragm head', status: 'Micro' },
                    { name: 'Marshalling Box & Sight Window', desc: 'Mounted control terminal on tank side', status: 'Micro' },
                  ].map((part, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-white/90 text-[11px]">{part.name}</div>
                        <div className="text-[10px] text-white/50">{part.desc}</div>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        {part.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spec' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0c1427] border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                How img2threejs Generates Code
              </h3>
              <p className="text-xs text-white/70 mb-4 leading-relaxed">
                Rather than relying on heavy photogrammetry or 30MB+ GLB binary files, <code>img2threejs</code> analyzes the photo, decomposes it into geometric primitives (boxes, cylinders, tubes, extruded contours, CSG), and emits clean TypeScript code that executes directly in Three.js in under 100KB.
              </p>
              
              <div className="space-y-3">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs font-semibold text-blue-400">1. Intake & Assessment (forge/stage1_intake)</div>
                  <div className="text-[11px] text-white/60">Inspects aspect ratio, dimensions, lighting cues, and creates a complexity contract (macro/meso/micro).</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs font-semibold text-blue-400">2. Structured Sculpt Spec (forge/stage2_spec)</div>
                  <div className="text-[11px] text-white/60">Defines exact component hierarchy, pivots, sockets, colliders, and PBR material definitions.</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs font-semibold text-blue-400">3. Pass-by-Pass Build (forge/stage3_build)</div>
                  <div className="text-[11px] text-white/60">Builds blockout → structure → form → materials → look-dev lights → animation hooks.</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs font-semibold text-blue-400">4. TypeScript Factory Output</div>
                  <div className="text-[11px] text-white/60">Produces <code>createOilFilledTransformerModel()</code> that runs with zero bundle overhead.</div>
                </div>
              </div>
            </div>

            <div className="bg-[#0c1427] border border-white/10 rounded-2xl p-6 shadow-xl font-mono text-xs">
              <div className="flex items-center justify-between mb-2 text-white/60 pb-2 border-b border-white/10">
                <span>ObjectSculptSpec Metadata</span>
                <span className="text-emerald-400">Validated</span>
              </div>
              <pre className="text-[11px] text-blue-300/90 overflow-x-auto p-3 bg-black/40 rounded-xl leading-relaxed">
{`{
  "targetName": "OilFilledTransformer",
  "sourceImage": "public/images/products/oil-filled-transformer.png",
  "objectClass": {
    "primaryDomain": "object",
    "structureKind": ["hard-surface", "industrial-electrical"],
    "materialFamilies": ["coated-steel", "glazed-porcelain", "brass", "glass"]
  },
  "runtime": {
    "target": "Three.js r186 (Next.js)",
    "bundleType": "code-only procedural",
    "exportFunction": "createOilFilledTransformerModel()",
    "file": "components/3d/createOilFilledTransformerModel.ts"
  },
  "subsystems": [
    "SkidBase", "MainTank", "RadiatorBanks",
    "ConservatorAssembly", "BuchholzRelay",
    "HT_Bushings", "LT_Bushings", "ExplosionVent"
  ]
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="bg-[#0c1427] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-2">
                Pros & Cons: Should You Keep <code>img2threejs</code> in this Project?
              </h3>
              <p className="text-xs text-white/70">
                Here is an objective comparison between keeping <code>img2threejs</code> vs using conventional 3D workflows (Blender .glb/.gltf models).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Why KEEP it
                </h4>
                <ul className="text-xs text-white/80 space-y-2 list-disc list-inside">
                  <li><strong>Zero Heavy Downloads:</strong> Standard 3D CAD/GLB files for industrial equipment are 10MB to 50MB each. Procedural code is ~20KB, loading instantly on mobile and slow connections.</li>
                  <li><strong>Direct Code Interactivity:</strong> Every component (doors, valves, bushing pins, tank lid) is a named JavaScript object in the DOM, making exploded views, load animations, and X-ray effects trivial to code.</li>
                  <li><strong>Zero Asset Pipeline Overhead:</strong> You do not need a 3D artist in Blender to export, bake UVs, optimize textures, and manage GLB CDN hosting.</li>
                  <li><strong>Tailored to Graycell:</strong> Since Graycell is an engineering & transformer brand, generating procedural digital twins from catalog photos is a strong fit.</li>
                </ul>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> When NOT to use it
                </h4>
                <ul className="text-xs text-white/80 space-y-2 list-disc list-inside">
                  <li><strong>Exact Millimeter CAD Tolerances:</strong> If clients require exact STEP/SolidWorks bolt-level accuracy with real stress analysis, procedural Three.js is an interactive visual representation, not a CAD replacer.</li>
                  <li><strong>Organic Photorealism:</strong> For photorealistic human scans or complex organic sculpts, pre-baked photogrammetry GLBs are more detailed than pure procedural code.</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">Summary Recommendation</div>
                <div className="text-xs text-white/60">
                  Keep <code>img2threejs</code> as a core agent skill for fast procedural 3D model generation whenever new product equipment or interactive showcases are needed in Graycell!
                </div>
              </div>
              <Link
                href="/demo-3d"
                onClick={() => setActiveTab('preview')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-600/30 whitespace-nowrap"
              >
                Inspect Live 3D Model
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
