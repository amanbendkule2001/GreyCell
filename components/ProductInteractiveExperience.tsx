'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Zap, 
  RotateCw, 
  Eye, 
  Layers, 
  Volume2, 
  VolumeX, 
  Flame, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  Maximize2, 
  Minimize2, 
  Activity, 
  Sliders, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2,
  Lock,
  DoorOpen,
  Focus,
  Crosshair
} from 'lucide-react';

interface ProductInteractiveProps {
  productId: string;
  productName: string;
  category: string;
  capacity?: string;
  voltage?: string;
}

export default function ProductInteractiveExperience({
  productId,
  productName,
  category,
  capacity = '1000 kVA',
  voltage = '33 kV / 433 V'
}: ProductInteractiveProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Simulation States
  const [isEnergized, setIsEnergized] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(75);
  const [tapPosition, setTapPosition] = useState(3); // 1 to 5 (3 is nominal)
  const [viewMode, setViewMode] = useState<'exterior' | 'xray' | 'exploded'>('exterior');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeScenario, setActiveScenario] = useState<'normal' | 'overload' | 'buchholz'>('normal');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverTooltip, setHoverTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  // Door states for CSS / Switchgear
  const [doorsOpen, setDoorsOpen] = useState({ mv: false, tr: false, lv: false, vcb: false });

  // Web Audio Context Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const humGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animatedPartsRef = useRef<any>({});
  const particlesRef = useRef<THREE.Points | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetCamLookRef = useRef<THREE.Vector3 | null>(null);

  // Determine Product Specific Type
  const isCSS = productId === 'compact-substations';
  const isSwitchgear = productId === 'foil-wound-transformers';
  const isDryType = productId === 'dry-type-distribution';
  const isNaturalEster = productId === 'natural-ester-transformers';
  const isOilFilled = productId === 'oil-filled-distribution';

  // Electrical Computations
  const tapRatio = useMemo(() => {
    switch(tapPosition) {
      case 1: return 1.05;   // +5.0%
      case 2: return 1.025;  // +2.5%
      case 3: return 1.0;    // Nominal
      case 4: return 0.975;  // -2.5%
      case 5: return 0.95;   // -5.0%
      default: return 1.0;
    }
  }, [tapPosition]);

  const ratedKVA = 1000;
  const currentKVA = isEnergized ? (ratedKVA * (loadPercentage / 100)) : 0;
  const nominalSecV = 433;
  const secVoltage = isEnergized ? Math.round(nominalSecV * tapRatio * (1 - 0.038 * (loadPercentage / 100))) : 0;
  const secCurrent = isEnergized && secVoltage > 0 ? Math.round((currentKVA * 1000) / (Math.sqrt(3) * secVoltage)) : 0;
  
  // Temperatures
  const ambientTemp = 32;
  const oilTemp = isEnergized 
    ? Math.round(ambientTemp + 45 * Math.pow(loadPercentage / 100, 1.55) + (activeScenario === 'overload' ? 22 : 0))
    : ambientTemp;
  const windingTemp = isEnergized
    ? Math.round(oilTemp + 14 * (loadPercentage / 100) + (activeScenario === 'overload' ? 15 : 0))
    : ambientTemp;

  // Efficiency %
  const efficiency = isEnergized && loadPercentage > 0
    ? (99.45 - (0.45 * Math.pow(loadPercentage / 100 - 0.65, 2)) - (activeScenario === 'overload' ? 0.8 : 0)).toFixed(2)
    : '0.00';

  // -------------------------------------------------------------
  // Web Audio Mechanical SFX & 50Hz Hum Synthesizer
  // -------------------------------------------------------------
  const playMechanicalSound = (type: 'tap' | 'breaker' | 'door') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      if (!audioCtxRef.current) audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'tap') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } else if (type === 'breaker') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'door') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  };

  useEffect(() => {
    if (!soundEnabled || !isEnergized) {
      if (humGainRef.current) {
        humGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current?.currentTime || 0, 0.05);
      }
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!humGainRef.current) {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        
        const lowPass = ctx.createBiquadFilter();
        lowPass.type = 'lowpass';
        lowPass.frequency.setValueAtTime(280, ctx.currentTime);

        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(50, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(100, ctx.currentTime);

        const osc2Gain = ctx.createGain();
        osc2Gain.gain.setValueAtTime(0.35, ctx.currentTime);

        osc1.connect(masterGain);
        osc2.connect(osc2Gain);
        osc2Gain.connect(masterGain);
        masterGain.connect(lowPass);
        lowPass.connect(ctx.destination);

        osc1.start();
        osc2.start();

        humGainRef.current = masterGain;
        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
      }

      const targetGain = 0.05 + 0.15 * (loadPercentage / 100);
      humGainRef.current.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.1);

      if (osc1Ref.current) {
        osc1Ref.current.frequency.setTargetAtTime(50 + (loadPercentage > 100 ? 1.5 : 0), ctx.currentTime, 0.1);
      }
    } catch (e) {
      console.warn('Web Audio hum init failed:', e);
    }
  }, [soundEnabled, isEnergized, loadPercentage]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // -------------------------------------------------------------
  // CAMERA FOCUS MAPPINGS (Point of View for each Component)
  // -------------------------------------------------------------
  const cameraFocusMap: Record<string, { pos: THREE.Vector3; look: THREE.Vector3 }> = useMemo(() => {
    return {
      buchholz: { pos: new THREE.Vector3(-1.8, 3.2, 1.8), look: new THREE.Vector3(-0.6, 2.58, 0) },
      conservator: { pos: new THREE.Vector3(1.4, 4.0, 2.2), look: new THREE.Vector3(0.3, 3.0, -0.1) },
      bushings: { pos: new THREE.Vector3(0, 4.2, 2.6), look: new THREE.Vector3(0, 2.6, 0.45) },
      core: { pos: new THREE.Vector3(0, 2.0, 3.2), look: new THREE.Vector3(0, 1.38, 0) },
      radiator: { pos: new THREE.Vector3(-3.8, 2.0, 1.8), look: new THREE.Vector3(-1.86, 1.38, 0) },
      tapchanger: { pos: new THREE.Vector3(-3.4, 1.8, 1.6), look: new THREE.Vector3(-1.58, 1.45, 0) },
      castresin: { pos: new THREE.Vector3(0, 2.2, 3.0), look: new THREE.Vector3(0, 1.55, 0) },
      busbars: { pos: new THREE.Vector3(0, 3.0, 2.4), look: new THREE.Vector3(0, 2.15, 0.55) },
      pt100: { pos: new THREE.Vector3(2.4, 1.2, 1.8), look: new THREE.Vector3(1.4, 0.55, 0.42) },
      enclosure: { pos: new THREE.Vector3(3.5, 3.0, 3.5), look: new THREE.Vector3(0, 1.5, 0) },
      esterfluid: { pos: new THREE.Vector3(0, 2.2, 3.0), look: new THREE.Vector3(0, 1.4, 0) },
      prd: { pos: new THREE.Vector3(2.2, 3.6, 1.8), look: new THREE.Vector3(0.85, 2.5, 0.4) },
      ecobadge: { pos: new THREE.Vector3(0, 1.8, 2.4), look: new THREE.Vector3(0, 1.5, 0.9) },
      gaskets: { pos: new THREE.Vector3(1.6, 2.8, 2.0), look: new THREE.Vector3(0, 2.4, 0) },
      vcb: { pos: new THREE.Vector3(0, 1.6, 2.6), look: new THREE.Vector3(0, 1.4, 0.2) },
      relay: { pos: new THREE.Vector3(0, 2.6, 2.4), look: new THREE.Vector3(0, 2.2, 0.9) },
      mimic: { pos: new THREE.Vector3(0, 2.4, 2.4), look: new THREE.Vector3(0, 2.0, 0.9) },
      arcvent: { pos: new THREE.Vector3(0, 4.4, 1.8), look: new THREE.Vector3(0, 3.2, 0) },
      mvrmu: { pos: new THREE.Vector3(-2.2, 1.8, 2.6), look: new THREE.Vector3(-1.55, 1.3, 0.3) },
      txbay: { pos: new THREE.Vector3(0, 1.8, 2.6), look: new THREE.Vector3(0, 1.2, 0.2) },
      lvdist: { pos: new THREE.Vector3(2.2, 1.8, 2.6), look: new THREE.Vector3(1.55, 1.3, 0.3) },
      roof: { pos: new THREE.Vector3(0, 4.2, 3.2), look: new THREE.Vector3(0, 2.7, 0) },
      doors: { pos: new THREE.Vector3(0, 2.0, 4.0), look: new THREE.Vector3(0, 1.3, 0.5) }
    };
  }, []);

  const focusComponent = (hotspotKey: string) => {
    setActiveHotspot(hotspotKey);
    const cfg = cameraFocusMap[hotspotKey];
    if (cfg) {
      targetCamPosRef.current = cfg.pos.clone();
      targetCamLookRef.current = cfg.look.clone();
    }
  };

  const resetCamera = () => {
    setActiveHotspot(null);
    targetCamPosRef.current = new THREE.Vector3(7.8, 5.2, 8.8);
    targetCamLookRef.current = new THREE.Vector3(0, 1.3, 0);
  };

  // -------------------------------------------------------------
  // THREE.JS 3D SCENE & PROCEDURAL MODEL BUILDER
  // -------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 540;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b131e');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(7.8, 5.2, 8.8);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 + 0.04;
    controls.minDistance = 2.0;
    controls.maxDistance = 18;
    controls.target.set(0, 1.3, 0);
    controlsRef.current = controls;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight('#a5b4fc', 0.85);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight('#ffffff', 2.4);
    mainSpot.position.set(8, 14, 7);
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 1024;
    mainSpot.shadow.mapSize.height = 1024;
    mainSpot.shadow.camera.near = 0.5;
    mainSpot.shadow.camera.far = 32;
    mainSpot.shadow.bias = -0.0005;
    scene.add(mainSpot);

    const fillLight = new THREE.DirectionalLight('#38bdf8', 0.95);
    fillLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#e0f2fe', 1.2);
    rimLight.position.set(0, 8, -10);
    scene.add(rimLight);

    // 5. Factory Studio Floor
    const gridHelper = new THREE.GridHelper(22, 22, '#1e3a5f', '#102235');
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(32, 32);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: '#081018', 
      roughness: 0.75, 
      metalness: 0.25 
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 6. Master Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Clickable Interactive Meshes List for Raycasting
    const interactiveMeshes: THREE.Object3D[] = [];

    // Materials Palette
    const steelTankMat = new THREE.MeshStandardMaterial({
      color: '#718292',
      roughness: 0.32,
      metalness: 0.7,
      transparent: true,
      opacity: 1.0
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: '#c86432',
      roughness: 0.22,
      metalness: 0.92,
      emissive: '#7a2808',
      emissiveIntensity: 0.15
    });

    const coreIronMat = new THREE.MeshStandardMaterial({
      color: '#242f38',
      roughness: 0.55,
      metalness: 0.8
    });

    const porcelainMat = new THREE.MeshStandardMaterial({
      color: '#451e14',
      roughness: 0.12,
      metalness: 0.15
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: '#d4af37',
      roughness: 0.28,
      metalness: 0.85
    });

    const parts: any = {
      tankMat: steelTankMat,
      copperMat,
      coreIronMat,
      doors: []
    };

    // =========================================================================
    // PRODUCT 1: COMPACT SUBSTATION (CSS / PACKAGE SUBSTATION)
    // =========================================================================
    if (isCSS) {
      const enclosureGeo = new THREE.BoxGeometry(4.8, 2.5, 2.4);
      const enclosureMat = new THREE.MeshStandardMaterial({ color: '#c8d3dc', roughness: 0.4, metalness: 0.45 });
      const enclosure = new THREE.Mesh(enclosureGeo, enclosureMat);
      enclosure.position.y = 1.35;
      enclosure.castShadow = true;
      enclosure.receiveShadow = true;
      modelGroup.add(enclosure);
      parts.enclosure = enclosure;

      const roofGeo = new THREE.BoxGeometry(5.2, 0.25, 2.8);
      const roofMat = new THREE.MeshStandardMaterial({ color: '#475569', roughness: 0.35, metalness: 0.6 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 2.72;
      roof.castShadow = true;
      roof.userData = { interactiveId: 'roof', label: 'Weatherproof Double Canopy Roof' };
      modelGroup.add(roof);
      parts.roof = roof;
      interactiveMeshes.push(roof);

      // Louvres
      const louvreMat = new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.6 });
      [-2.41, 2.41].forEach((xSide) => {
        const louvreBox = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.4, 1.2), louvreMat);
        louvreBox.position.set(xSide, 1.4, 0);
        modelGroup.add(louvreBox);
      });

      // Internal Chambers
      const rmuBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 1.4), new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.5 }));
      rmuBody.position.set(-1.55, 1.1, 0.3);
      rmuBody.userData = { interactiveId: 'mvrmu', label: 'Medium-Voltage Ring Main Unit (RMU)' };
      modelGroup.add(rmuBody);
      interactiveMeshes.push(rmuBody);

      const txCore = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.5, 1.2), new THREE.MeshStandardMaterial({ color: '#475569', roughness: 0.6 }));
      txCore.position.set(0, 1.05, 0.2);
      txCore.userData = { interactiveId: 'txbay', label: 'Step-Down Transformer Bay' };
      modelGroup.add(txCore);
      interactiveMeshes.push(txCore);

      const lvCabinet = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.7, 1.4), new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.4 }));
      lvCabinet.position.set(1.55, 1.15, 0.3);
      lvCabinet.userData = { interactiveId: 'lvdist', label: 'Low-Voltage Distribution Chamber' };
      modelGroup.add(lvCabinet);
      interactiveMeshes.push(lvCabinet);

      // 3 Interactive Front Doors (Click in 3D directly opens/closes them!)
      const doorWidth = 1.45;
      const doorHeight = 2.15;
      const doorGeo = new THREE.BoxGeometry(doorWidth, doorHeight, 0.08);
      const doorMat = new THREE.MeshStandardMaterial({ color: '#b9c7d4', roughness: 0.38, metalness: 0.5 });
      const doorNames = ['mv', 'tr', 'lv'];
      const doorPositions = [-1.55, 0, 1.55];
      const doorLabels = ['MV Switchgear Door (Click to Open/Close)', 'Transformer Bay Door (Click to Open/Close)', 'LV Panel Door (Click to Open/Close)'];

      doorNames.forEach((name, i) => {
        const doorPivot = new THREE.Group();
        doorPivot.position.set(doorPositions[i] - doorWidth / 2, 1.3, 1.22);

        const doorMesh = new THREE.Mesh(doorGeo, doorMat);
        doorMesh.position.x = doorWidth / 2;
        doorMesh.castShadow = true;
        doorMesh.userData = { interactiveId: `door_${name}`, label: doorLabels[i] };

        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 12), brassMat);
        handle.position.set(doorWidth - 0.15, 0, 0.08);
        doorMesh.add(handle);

        doorPivot.add(doorMesh);
        modelGroup.add(doorPivot);
        parts.doors.push({ name, pivot: doorPivot, angle: 0 });
        interactiveMeshes.push(doorMesh);
      });

      const base = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.22, 2.6), coreIronMat);
      base.position.y = 0.11;
      base.receiveShadow = true;
      modelGroup.add(base);

    // =========================================================================
    // PRODUCT 2: DRY-TYPE CAST RESIN DISTRIBUTION TRANSFORMERS
    // =========================================================================
    } else if (isDryType) {
      const clampMat = new THREE.MeshStandardMaterial({ color: '#1e3a5f', roughness: 0.35, metalness: 0.75 });

      const lowerClamp = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.38, 0.65), clampMat);
      lowerClamp.position.set(0, 0.55, 0);
      modelGroup.add(lowerClamp);
      parts.lowerClamp = lowerClamp;

      const upperClamp = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.38, 0.65), clampMat);
      upperClamp.position.set(0, 2.55, 0);
      modelGroup.add(upperClamp);
      parts.upperClamp = upperClamp;

      const limbPositions = [-1.18, 0, 1.18];
      const coilCylinders: THREE.Mesh[] = [];

      const castResinMat = new THREE.MeshStandardMaterial({
        color: '#b91c1c',
        roughness: 0.18,
        metalness: 0.25,
        emissive: '#5b0e0e',
        emissiveIntensity: 0.25
      });
      parts.castResinMat = castResinMat;

      limbPositions.forEach((xPos, idx) => {
        const coreLimb = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.7, 24), coreIronMat);
        coreLimb.position.set(xPos, 1.55, 0);
        coreLimb.userData = { interactiveId: 'core', label: 'CRGO 3-Limb Magnetic Core' };
        modelGroup.add(coreLimb);
        interactiveMeshes.push(coreLimb);

        const outerCoil = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.5, 32), castResinMat);
        outerCoil.position.set(xPos, 1.55, 0);
        outerCoil.castShadow = true;
        outerCoil.userData = { interactiveId: 'castresin', label: `Phase ${['U (R)', 'V (Y)', 'W (B)'][idx]} Cast Resin Encapsulated Coil (Click to Inspect)` };
        modelGroup.add(outerCoil);
        coilCylinders.push(outerCoil);
        interactiveMeshes.push(outerCoil);

        const stab = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.55, 0.32), copperMat);
        stab.position.set(xPos, 2.75, 0.35);
        modelGroup.add(stab);
      });
      parts.coils = coilCylinders;

      const busbarGroup = new THREE.Group();
      const bar1 = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.04, 0.08), copperMat);
      bar1.position.set(-0.6, 2.15, 0.55);
      bar1.rotation.z = -0.15;
      busbarGroup.add(bar1);

      const bar2 = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.04, 0.08), copperMat);
      bar2.position.set(0.6, 2.15, 0.55);
      bar2.rotation.z = 0.15;
      busbarGroup.add(bar2);
      busbarGroup.userData = { interactiveId: 'busbars', label: 'HV Delta Linking Copper Busbars (Click to Inspect)' };
      modelGroup.add(busbarGroup);
      parts.busbarGroup = busbarGroup;
      interactiveMeshes.push(bar1, bar2);

      const pt100Box = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.22, 0.25), new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.3 }));
      pt100Box.position.set(1.4, 0.55, 0.42);
      pt100Box.userData = { interactiveId: 'pt100', label: 'PT100 RTD Temperature Sensor Marshalling Box' };
      modelGroup.add(pt100Box);
      interactiveMeshes.push(pt100Box);

      const baseFrame = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.18, 1.5), coreIronMat);
      baseFrame.position.y = 0.18;
      modelGroup.add(baseFrame);

    // =========================================================================
    // PRODUCT 3: NATURAL ESTER OIL DISTRIBUTION TRANSFORMER
    // =========================================================================
    } else if (isNaturalEster) {
      const ecoGreenMat = new THREE.MeshStandardMaterial({
        color: '#245a40',
        roughness: 0.32,
        metalness: 0.68,
        transparent: true,
        opacity: 1.0
      });
      parts.tankMat = ecoGreenMat;

      const tank = new THREE.Mesh(new THREE.BoxGeometry(3.1, 2.05, 1.75), ecoGreenMat);
      tank.position.y = 1.38;
      tank.castShadow = true;
      modelGroup.add(tank);
      parts.tank = tank;

      const radiatorMat = new THREE.MeshStandardMaterial({
        color: '#1a4330',
        roughness: 0.38,
        metalness: 0.65,
        transparent: true,
        opacity: 1.0
      });
      parts.radiatorMat = radiatorMat;

      const leftRadiators = new THREE.Group();
      const rightRadiators = new THREE.Group();

      for (let i = 0; i < 8; i++) {
        const finGeo = new THREE.BoxGeometry(0.04, 1.75, 0.95);
        const zOffset = (i - 3.5) * 0.2;
        const finLeft = new THREE.Mesh(finGeo, radiatorMat);
        finLeft.position.set(-1.88, 1.38, zOffset);
        leftRadiators.add(finLeft);

        const finRight = new THREE.Mesh(finGeo, radiatorMat);
        finRight.position.set(1.88, 1.38, zOffset);
        rightRadiators.add(finRight);
      }
      modelGroup.add(leftRadiators);
      modelGroup.add(rightRadiators);
      parts.leftRadiators = leftRadiators;
      parts.rightRadiators = rightRadiators;

      // PRD Valve (Clickable)
      const prdGroup = new THREE.Group();
      prdGroup.position.set(0.85, 2.5, 0.4);
      const prdBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.18, 16), brassMat);
      prdGroup.add(prdBase);
      const tripFlag = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.18), new THREE.MeshStandardMaterial({ color: '#eab308' }));
      tripFlag.position.set(0, 0.22, 0);
      prdGroup.add(tripFlag);
      prdGroup.userData = { interactiveId: 'prd', label: 'Pressure Relief Device (PRD - Click to Trip/Inspect)' };
      modelGroup.add(prdGroup);
      parts.prdGroup = prdGroup;
      interactiveMeshes.push(prdBase, tripFlag);

      // Eco Emblem (Clickable)
      const ecoBadge = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.04, 32), new THREE.MeshStandardMaterial({ color: '#10b981', roughness: 0.2 }));
      ecoBadge.rotation.x = Math.PI / 2;
      ecoBadge.position.set(0, 1.5, 0.9);
      ecoBadge.userData = { interactiveId: 'ecobadge', label: 'Natural Ester Bio-Fluid Emblem (Click to Inspect)' };
      modelGroup.add(ecoBadge);
      interactiveMeshes.push(ecoBadge);

      // Bushings (Clickable)
      const bushingsGroup = new THREE.Group();
      bushingsGroup.position.y = 2.42;
      [-0.75, 0, 0.75].forEach((xOff) => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.8, 16), porcelainMat);
        cone.position.set(xOff, 0, -0.3);
        cone.userData = { interactiveId: 'bushings', label: '33 kV Porcelain Terminal Bushing (Click to Inspect)' };
        bushingsGroup.add(cone);
        interactiveMeshes.push(cone);
      });
      modelGroup.add(bushingsGroup);
      parts.bushingsGroup = bushingsGroup;

      // Internal Core
      const internalCoreGroup = new THREE.Group();
      internalCoreGroup.position.set(0, 1.38, 0);
      const internalCoils: THREE.Mesh[] = [];
      [-0.75, 0, 0.75].forEach((xPos) => {
        const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 1.15, 24), copperMat);
        coil.position.x = xPos;
        internalCoreGroup.add(coil);
        internalCoils.push(coil);
      });
      parts.internalCoils = internalCoils;
      modelGroup.add(internalCoreGroup);
      parts.internalCoreGroup = internalCoreGroup;

      const baseRoller = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.2, 1.85), coreIronMat);
      baseRoller.position.y = 0.1;
      modelGroup.add(baseRoller);

    // =========================================================================
    // PRODUCT 4: MV SWITCHGEAR & MODULAR SOLUTIONS (VCB PANELS)
    // =========================================================================
    } else if (isSwitchgear) {
      const panelMat = new THREE.MeshStandardMaterial({ color: '#263342', roughness: 0.35, metalness: 0.65 });
      parts.tankMat = panelMat;

      const cubicleWidth = 1.35;
      const cubicleHeight = 2.75;
      const cubicleDepth = 2.0;

      const semaLeds: THREE.Mesh[] = [];

      [-1.4, 0, 1.4].forEach((cx, idx) => {
        const cubicleGroup = new THREE.Group();
        cubicleGroup.position.set(cx, cubicleHeight / 2 + 0.12, 0);

        const body = new THREE.Mesh(new THREE.BoxGeometry(cubicleWidth - 0.05, cubicleHeight, cubicleDepth), panelMat);
        body.castShadow = true;
        cubicleGroup.add(body);

        const meterScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.22), new THREE.MeshBasicMaterial({ color: '#06b6d4' }));
        meterScreen.position.set(-0.25, 0.95, cubicleDepth / 2 + 0.05);
        meterScreen.userData = { interactiveId: 'relay', label: 'Multifunction Digital Protection Relay (Click to Inspect)' };
        cubicleGroup.add(meterScreen);
        interactiveMeshes.push(meterScreen);

        // Semaphore LED (Red/Green)
        const ledRedMat = new THREE.MeshStandardMaterial({ color: '#ef4444', emissive: '#ef4444', emissiveIntensity: 1.5 });
        const ledRed = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.02, 12), ledRedMat);
        ledRed.rotation.x = Math.PI / 2;
        ledRed.position.set(0.18, 1.0, cubicleDepth / 2 + 0.05);
        cubicleGroup.add(ledRed);
        semaLeds.push(ledRed);

        // Center VCB Door (Interactive 3D Clickable!)
        if (idx === 1) {
          const vcbPivot = new THREE.Group();
          vcbPivot.position.set(-cubicleWidth / 2 + 0.05, 0, cubicleDepth / 2 + 0.02);

          const vcbDoorMesh = new THREE.Mesh(new THREE.BoxGeometry(cubicleWidth - 0.1, 0.95, 0.04), new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.35 }));
          vcbDoorMesh.position.x = (cubicleWidth - 0.1) / 2;
          vcbDoorMesh.userData = { interactiveId: 'door_vcb', label: 'Center VCB Breaker Door (Click to Inspect Vacuum Bottles)' };

          const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.22), brassMat);
          handle.position.set(cubicleWidth - 0.2, 0, 0.06);
          vcbDoorMesh.add(handle);

          vcbPivot.add(vcbDoorMesh);
          cubicleGroup.add(vcbPivot);
          parts.doors.push({ name: 'vcb', pivot: vcbPivot, angle: 0 });
          interactiveMeshes.push(vcbDoorMesh);

          // Internal VCB Truck
          const vcbTruck = new THREE.Group();
          vcbTruck.position.set(0, 0, 0.2);
          [-0.3, 0, 0.3].forEach((bx) => {
            const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.45, 16), porcelainMat);
            bottle.position.set(bx, 0.05, 0);
            bottle.userData = { interactiveId: 'vcb', label: 'Vacuum Interrupter Bottle (Click to Inspect)' };
            vcbTruck.add(bottle);
            interactiveMeshes.push(bottle);
          });
          cubicleGroup.add(vcbTruck);
          parts.vcbTruck = vcbTruck;
        }

        modelGroup.add(cubicleGroup);
      });
      parts.semaLeds = semaLeds;

      const busDuct = new THREE.Mesh(new THREE.BoxGeometry(4.35, 0.32, 1.2), new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.3 }));
      busDuct.position.set(0, cubicleHeight + 0.28, -0.2);
      busDuct.userData = { interactiveId: 'busbars', label: 'Continuous Main Copper Busbars (Click to Inspect)' };
      modelGroup.add(busDuct);
      parts.busDuct = busDuct;
      interactiveMeshes.push(busDuct);

      const switchgearBase = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.24, 2.2), coreIronMat);
      switchgearBase.position.y = 0.12;
      modelGroup.add(switchgearBase);

    // =========================================================================
    // PRODUCT 5: OIL-FILLED DISTRIBUTION TRANSFORMER
    // =========================================================================
    } else {
      const tank = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.05, 1.7), steelTankMat);
      tank.position.y = 1.38;
      tank.castShadow = true;
      modelGroup.add(tank);
      parts.tank = tank;

      // Radiators
      const radiatorMat = new THREE.MeshStandardMaterial({ color: '#5c6f80', roughness: 0.38, metalness: 0.7, transparent: true, opacity: 1.0 });
      parts.radiatorMat = radiatorMat;
      const leftRadiators = new THREE.Group();
      const rightRadiators = new THREE.Group();
      for (let i = 0; i < 7; i++) {
        const finGeo = new THREE.BoxGeometry(0.04, 1.75, 0.88);
        const zOffset = (i - 3) * 0.22;
        const finLeft = new THREE.Mesh(finGeo, radiatorMat);
        finLeft.position.set(-1.86, 1.38, zOffset);
        leftRadiators.add(finLeft);
        const finRight = new THREE.Mesh(finGeo, radiatorMat);
        finRight.position.set(1.86, 1.38, zOffset);
        rightRadiators.add(finRight);
      }
      leftRadiators.userData = { interactiveId: 'radiator', label: 'Corrugated Radiator Cooling Fin Banks (Click to Inspect)' };
      modelGroup.add(leftRadiators);
      modelGroup.add(rightRadiators);
      parts.leftRadiators = leftRadiators;
      parts.rightRadiators = rightRadiators;
      interactiveMeshes.push(leftRadiators, rightRadiators);

      // Conservator & Buchholz & Breather
      const conservatorGroup = new THREE.Group();
      conservatorGroup.position.set(0.3, 3.0, -0.1);

      const conservator = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 2.6, 32), steelTankMat);
      conservator.rotation.z = Math.PI / 2;
      conservator.userData = { interactiveId: 'conservator', label: 'Conservator Tank & Oil Sight Gauge (Click to Inspect)' };
      conservatorGroup.add(conservator);
      interactiveMeshes.push(conservator);

      // Buchholz Relay (Directly Clickable)
      const buchholz = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.28, 16), brassMat);
      buchholz.position.set(-0.6, -0.42, 0);
      buchholz.userData = { interactiveId: 'buchholz', label: 'Buchholz Gas & Surge Relay (Click to Inspect & Trip)' };
      conservatorGroup.add(buchholz);
      interactiveMeshes.push(buchholz);

      modelGroup.add(conservatorGroup);
      parts.conservatorGroup = conservatorGroup;

      // Bushings (Directly Clickable)
      const bushingsGroup = new THREE.Group();
      bushingsGroup.position.y = 2.45;
      [-0.78, 0, 0.78].forEach((xOff) => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.8, 16), porcelainMat);
        cone.position.set(xOff, 0, 0.45);
        cone.userData = { interactiveId: 'bushings', label: '33 kV Porcelain Terminal Bushing (Click to Inspect)' };
        bushingsGroup.add(cone);
        interactiveMeshes.push(cone);
      });
      modelGroup.add(bushingsGroup);
      parts.bushingsGroup = bushingsGroup;

      // Tap Changer Rotary Handwheel (Directly Clickable on the 3D Model!)
      const octcWheel = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.035, 12, 24), brassMat);
      octcWheel.position.set(-1.58, 1.45, 0);
      octcWheel.rotation.y = Math.PI / 2;
      octcWheel.userData = { interactiveId: 'tapchanger', label: 'Tap Changer Handwheel (Click in 3D to Cycle Taps)' };
      modelGroup.add(octcWheel);
      parts.octcWheel = octcWheel;
      interactiveMeshes.push(octcWheel);

      // Internal Core
      const internalCoreGroup = new THREE.Group();
      internalCoreGroup.position.set(0, 1.38, 0);
      const internalCoils: THREE.Mesh[] = [];
      [-0.75, 0, 0.75].forEach((xPos) => {
        const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 1.15, 24), copperMat);
        coil.position.x = xPos;
        coil.userData = { interactiveId: 'core', label: 'CRGO Magnetic Core & Copper Windings' };
        internalCoreGroup.add(coil);
        internalCoils.push(coil);
        interactiveMeshes.push(coil);
      });
      parts.internalCoils = internalCoils;
      modelGroup.add(internalCoreGroup);
      parts.internalCoreGroup = internalCoreGroup;

      const baseRoller = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.2, 1.85), coreIronMat);
      baseRoller.position.y = 0.1;
      modelGroup.add(baseRoller);
    }

    animatedPartsRef.current = parts;

    // 7. Dielectric Fluid / Flux Particles
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 2.2;
      particlePositions[i * 3 + 1] = 0.4 + Math.random() * 1.8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
      particleSpeeds[i] = 0.008 + Math.random() * 0.015;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleColor = isNaturalEster ? '#10b981' : '#38bdf8';
    const particleMat = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.07,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // -------------------------------------------------------------
    // RAYCASTER FOR 3D CANVAS INTERACTION (Hover & Click)
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      if (!rendererRef.current) return;
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.interactiveId && obj.parent && obj !== modelGroup) {
          obj = obj.parent;
        }
        if (obj?.userData?.interactiveId) {
          rendererRef.current.domElement.style.cursor = 'pointer';
          setHoverTooltip({
            text: obj.userData.label || obj.userData.interactiveId,
            x: e.clientX - rect.left + 15,
            y: e.clientY - rect.top + 15
          });
          return;
        }
      }
      rendererRef.current.domElement.style.cursor = 'default';
      setHoverTooltip(null);
    };

    const handleCanvasClick = (e: MouseEvent) => {
      if (!rendererRef.current) return;
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.interactiveId && obj.parent && obj !== modelGroup) {
          obj = obj.parent;
        }

        if (obj?.userData?.interactiveId) {
          const actionId = obj.userData.interactiveId;

          // Direct physical interactions
          if (actionId === 'tapchanger') {
            setTapPosition(p => {
              const next = p >= 5 ? 1 : p + 1;
              playMechanicalSound('tap');
              return next;
            });
            focusComponent('tapchanger');
          } else if (actionId === 'door_mv') {
            setDoorsOpen(prev => ({ ...prev, mv: !prev.mv }));
            playMechanicalSound('door');
          } else if (actionId === 'door_tr') {
            setDoorsOpen(prev => ({ ...prev, tr: !prev.tr }));
            playMechanicalSound('door');
          } else if (actionId === 'door_lv') {
            setDoorsOpen(prev => ({ ...prev, lv: !prev.lv }));
            playMechanicalSound('door');
          } else if (actionId === 'door_vcb') {
            setDoorsOpen(prev => ({ ...prev, vcb: !prev.vcb }));
            playMechanicalSound('door');
          } else {
            // Focus camera on component and open engineering technical drawer
            focusComponent(actionId);
          }
        }
      }
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('pointermove', handlePointerMove);
    canvasDom.addEventListener('click', handleCanvasClick);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isUserDragging = false;

    controls.addEventListener('start', () => { 
      isUserDragging = true;
      targetCamPosRef.current = null;
      targetCamLookRef.current = null;
    });
    controls.addEventListener('end', () => { 
      isUserDragging = false; 
    });

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera glide to target component
      if (targetCamPosRef.current && targetCamLookRef.current && !isUserDragging) {
        camera.position.lerp(targetCamPosRef.current, 0.05);
        controls.target.lerp(targetCamLookRef.current, 0.05);
      } else if (!activeHotspot && !isUserDragging) {
        // Auto rotate only when in global overview
        modelGroup.rotation.y += 0.0012;
      }

      // Tap Changer Physical Rotation on 3D Model
      if (parts.octcWheel) {
        const targetWheelRotation = (tapPosition - 1) * (Math.PI / 2.5);
        parts.octcWheel.rotation.x = THREE.MathUtils.lerp(parts.octcWheel.rotation.x, targetWheelRotation, 0.12);
      }

      // Switchgear Breaker Semaphore Lights on 3D Panels
      if (parts.semaLeds && parts.semaLeds.length) {
        parts.semaLeds.forEach((led: THREE.Mesh) => {
          (led.material as THREE.MeshStandardMaterial).emissiveIntensity = isEnergized ? 1.6 : 0.05;
        });
      }

      // Dielectric Fluid Circulation Particles
      if (particlesRef.current && isEnergized) {
        const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const speedMultiplier = (loadPercentage / 100) * 1.5;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] += particleSpeeds[i] * speedMultiplier;
          if (pos[i * 3 + 1] > 2.4) pos[i * 3 + 1] = 0.5;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Door Rotations
      if (parts.doors && parts.doors.length) {
        parts.doors.forEach((d: any) => {
          const isOpen = doorsOpen[d.name as keyof typeof doorsOpen];
          const targetAngle = isOpen ? -Math.PI * 0.65 : 0;
          d.pivot.rotation.y = THREE.MathUtils.lerp(d.pivot.rotation.y, targetAngle, 0.1);
        });
      }

      // Exploded View Animations
      const isExploded = viewMode === 'exploded';

      if (parts.conservatorGroup && parts.bushingsGroup && parts.leftRadiators && parts.rightRadiators) {
        parts.conservatorGroup.position.y = THREE.MathUtils.lerp(parts.conservatorGroup.position.y, isExploded ? 4.3 : 3.0, 0.08);
        parts.bushingsGroup.position.y = THREE.MathUtils.lerp(parts.bushingsGroup.position.y, isExploded ? 3.5 : 2.45, 0.08);
        parts.leftRadiators.position.x = THREE.MathUtils.lerp(parts.leftRadiators.position.x, isExploded ? -2.7 : 0, 0.08);
        parts.rightRadiators.position.x = THREE.MathUtils.lerp(parts.rightRadiators.position.x, isExploded ? 2.7 : 0, 0.08);
      }

      if (parts.upperClamp && parts.busbarGroup && parts.coils) {
        parts.upperClamp.position.y = THREE.MathUtils.lerp(parts.upperClamp.position.y, isExploded ? 3.6 : 2.55, 0.08);
        parts.busbarGroup.position.y = THREE.MathUtils.lerp(parts.busbarGroup.position.y, isExploded ? 0.9 : 0, 0.08);
        const [c1, c2, c3] = parts.coils;
        if (c1 && c2 && c3) {
          c1.position.x = THREE.MathUtils.lerp(c1.position.x, isExploded ? -1.85 : -1.18, 0.08);
          c2.position.z = THREE.MathUtils.lerp(c2.position.z, isExploded ? 1.1 : 0, 0.08);
          c3.position.x = THREE.MathUtils.lerp(c3.position.x, isExploded ? 1.85 : 1.18, 0.08);
        }
      }

      if (parts.roof) {
        parts.roof.position.y = THREE.MathUtils.lerp(parts.roof.position.y, isExploded ? 4.2 : 2.72, 0.08);
      }

      if (parts.busDuct && parts.vcbTruck) {
        parts.busDuct.position.y = THREE.MathUtils.lerp(parts.busDuct.position.y, isExploded ? 4.1 : 3.03, 0.08);
        const targetTruckZ = isExploded ? 1.6 : (doorsOpen.vcb ? 0.9 : 0.2);
        parts.vcbTruck.position.z = THREE.MathUtils.lerp(parts.vcbTruck.position.z, targetTruckZ, 0.08);
      }

      // Copper Coil Thermal Glow
      if (parts.internalCoils) {
        const glow = isEnergized ? (0.15 + 0.35 * (loadPercentage / 100) * (0.8 + 0.2 * Math.sin(time * 8))) : 0.05;
        parts.copperMat.emissiveIntensity = glow;
      }

      // Thermal Overload Heat Glow on Cast Resin Coils
      if (parts.castResinMat) {
        if (activeScenario === 'overload') {
          parts.castResinMat.emissive.set('#dc2626');
          parts.castResinMat.emissiveIntensity = 0.55 + 0.25 * Math.sin(time * 6);
        } else {
          parts.castResinMat.emissive.set('#5b0e0e');
          parts.castResinMat.emissiveIntensity = isEnergized ? 0.25 : 0.05;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 540;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasDom.removeEventListener('pointermove', handlePointerMove);
      canvasDom.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [productId, isCSS, isDryType, isSwitchgear, isNaturalEster, cameraFocusMap]);

  // -------------------------------------------------------------
  // View Mode Updates (Exterior vs X-Ray vs Exploded)
  // -------------------------------------------------------------
  useEffect(() => {
    const parts = animatedPartsRef.current;
    if (!parts || !parts.tankMat) return;

    if (viewMode === 'xray') {
      parts.tankMat.opacity = 0.22;
      if (parts.tankMat.color) parts.tankMat.color.set(isNaturalEster ? '#1b4332' : '#5a7894');
      if (parts.radiatorMat) parts.radiatorMat.opacity = 0.28;
      if (particlesRef.current) (particlesRef.current.material as any).opacity = 0.85;
    } else if (viewMode === 'exploded') {
      parts.tankMat.opacity = 0.85;
      if (parts.tankMat.color) parts.tankMat.color.set(isNaturalEster ? '#245a40' : (isSwitchgear ? '#263342' : '#718292'));
      if (parts.radiatorMat) parts.radiatorMat.opacity = 0.85;
      if (particlesRef.current) (particlesRef.current.material as any).opacity = 0.45;
    } else {
      // Exterior
      parts.tankMat.opacity = 1.0;
      if (parts.tankMat.color) parts.tankMat.color.set(isNaturalEster ? '#245a40' : (isSwitchgear ? '#263342' : '#718292'));
      if (parts.radiatorMat) parts.radiatorMat.opacity = 1.0;
      if (particlesRef.current) (particlesRef.current.material as any).opacity = 0.0;
    }
  }, [viewMode, isNaturalEster, isSwitchgear]);

  // -------------------------------------------------------------
  // Scenario Triggers (Overload / Buchholz Gas Trip)
  // -------------------------------------------------------------
  const handleTriggerScenario = (scenario: 'normal' | 'overload' | 'buchholz') => {
    setActiveScenario(scenario);
    if (scenario === 'overload') {
      setLoadPercentage(120);
      setIsEnergized(true);
      playMechanicalSound('tap');
    } else if (scenario === 'buchholz') {
      setIsEnergized(false);
      setLoadPercentage(0);
      playMechanicalSound('breaker');
      focusComponent('buchholz');
    } else {
      setIsEnergized(true);
      setLoadPercentage(75);
      playMechanicalSound('breaker');
      resetCamera();
    }
  };

  // -------------------------------------------------------------
  // Dynamic Product Hotspot Definitions (Tailored per product)
  // -------------------------------------------------------------
  const hotspotDetails = useMemo(() => {
    let map: Record<string, { title: string; desc: string; spec: string }>;
    if (isDryType) {
      map = {
        castresin: {
          title: 'Cast Resin Encapsulation (Epoxy Vacuum Cast)',
          desc: 'High-grade Class F/H flame-retardant epoxy resin cast under deep vacuum to eliminate partial discharge and ensure non-hygroscopic operation.',
          spec: 'Class F (155°C) / H (180°C) · Partial Discharge < 10 pC'
        },
        busbars: {
          title: 'Solid Copper Delta Connecting Busbars',
          desc: 'High-conductivity electrolytically refined copper busbars connecting the HV phases with cycloaliphatic resin standoff support insulators.',
          spec: '99.9% Electrolytic Copper · IEC 60076-11 Compliant'
        },
        pt100: {
          title: 'Embedded PT100 RTD Thermal Sensors',
          desc: 'Precision platinum RTD temperature sensors embedded directly into the winding hot-spot channels for real-time monitoring and trip protection.',
          spec: '3x PT100 Sensors · Alarm at 140°C · Trip at 155°C'
        },
        core: {
          title: 'Step-Lap CRGO Magnetic Core',
          desc: 'Low-loss cold rolled grain oriented silicon steel laminations with 45° step-lap miter joints clamped by heavy structural steel channels.',
          spec: 'Prime Grade M3/M4 Core Steel · Low No-Load Losses'
        },
        enclosure: {
          title: 'Ventilated IP23 Enclosure with Louvres',
          desc: 'Perforated heavy sheet-steel enclosure designed for optimal natural air convection (AN) cooling while preventing accidental contact with energized parts.',
          spec: 'IP23 Protection · Electrostatic Powder Coat Finish'
        }
      };
    } else if (isNaturalEster) {
      map = {
        esterfluid: {
          title: 'K-Class Biodegradable Natural Ester Fluid (FR3)',
          desc: 'Vegetable-oil based dielectric liquid offering ultra-high fire safety, 100% non-toxic biodegradability, and extended insulation life.',
          spec: 'Fire Point: 360°C · Flash Point: 316°C · Readily Biodegradable'
        },
        prd: {
          title: 'High-Flow Pressure Relief Device (PRD)',
          desc: 'Spring-loaded rapid discharge valve with mechanical trip flag and auxiliary signal contacts for immediate transformer de-energization during overpressure.',
          spec: 'Opening Pressure: 50 kPa · Mechanical Indicator Flag'
        },
        ecobadge: {
          title: 'Eco-Friendly Environmental Certification',
          desc: 'Designated non-hazardous to water and soil. Safe for deployment in eco-sensitive zones, reservoirs, urban centers, and green building projects.',
          spec: 'OECD 301 Biodegradability (>99% in 28 days)'
        },
        gaskets: {
          title: 'High-Temperature Fluoroelastomer (Viton) Gaskets',
          desc: 'Specially engineered sealing gaskets impervious to high-temperature ester fluids, ensuring hermetic containment over decades of operation.',
          spec: 'Viton / Nitrile RC11 · -40°C to +150°C Rated'
        },
        bushings: {
          title: 'High-Creepage Porcelain Shed Bushings',
          desc: 'Glazed porcelain outdoor terminal bushings designed with extended creepage distance for severe environmental pollution zones.',
          spec: '33 kV Rated · 31 mm/kV Creepage · Copper Palm Terminals'
        }
      };
    } else if (isSwitchgear) {
      map = {
        vcb: {
          title: 'Withdrawable Vacuum Circuit Breaker (VCB Truck)',
          desc: 'Motorized or manual draw-out vacuum circuit breaker carriage featuring ceramic vacuum interrupters with long electrical endurance and maintenance-free contact tips.',
          spec: '12-36 kV · 630-2500 A · 25-31.5 kA / 3s Breaking'
        },
        relay: {
          title: 'Digital Numerical Protection & Metering Relay',
          desc: 'Microprocessor-based multi-function protection unit with overcurrent, earth fault, directional, and voltage monitoring, plus IEC 61850 protocol support.',
          spec: 'IEC 61850 / Modbus-RTU · Illuminated Cyan LCD Display'
        },
        mimic: {
          title: 'Mimic Bus & LED Semaphore Status Indicators',
          desc: 'Single-line mimic busbar diagram with bi-color LED semaphores showing instant breaker state, spring charge status, and isolator position.',
          spec: 'Circuit Closed: Red · Open: Green · Spring Charged: Yellow'
        },
        busbars: {
          title: 'High-Conductivity Copper Main Busbar System',
          desc: 'Fully insulated copper busbars enclosed in a segregated continuous top compartment with heat-shrinkable insulation sleeves.',
          spec: 'Electrolytic Copper · Up to 3150 A Continuous'
        },
        arcvent: {
          title: 'Arc-Fault Pressure Exhaust Relief Flaps',
          desc: 'Hinged relief dampers located on the roof that rapidly vent high-pressure gases upward away from operators in the event of an internal arc.',
          spec: 'Internal Arc Classification: IAC AFLR 25 kA / 1s'
        }
      };
    } else if (isCSS) {
      map = {
        mvrmu: {
          title: 'Medium Voltage Ring Main Unit (RMU)',
          desc: 'Gas or vacuum insulated compact switchgear with load break switches and circuit breaker for robust grid connection and feeder protection.',
          spec: '12-36 kV · 20-25 kA / 3s Short Circuit · SF6 / Solid Insulated'
        },
        txbay: {
          title: 'Integrated Transformer Bay with Safety Barrier',
          desc: 'Segregated bay housing the step-down distribution transformer with interlocking door switches and heavy protective safety mesh screen.',
          spec: 'Up to 2500 kVA Step-Down · IP54 Natural Ventilation'
        },
        lvdist: {
          title: 'Low Voltage Distribution Panel with ACB/MCCB',
          desc: 'Fully compartmentalized LV switchboard featuring microprocessor-trip air circuit breakers, multi-tier outgoing feeder MCCBs, and digital energy meters.',
          spec: '415 V · Busbar Rating up to 4000 A · Form 4b Segregation'
        },
        roof: {
          title: 'Double-Skinned Weatherproof Pitched Canopy',
          desc: 'Architectural peaked roof design with perimeter overhang and guttering, engineered to prevent solar heat absorption and water ingress.',
          spec: 'CRCA / Galvanized Steel · IP54 / IP55 Weatherproof'
        },
        doors: {
          title: 'Padlockable 3-Point Latch Compartment Doors',
          desc: 'Vandal-resistant doors with flush hinges, pneumatic hold-open struts, and concealed 3-point central locking mechanism for operator safety.',
          spec: 'IK10 Mechanical Impact Resistant · Padlock Compatible'
        }
      };
    } else {
      map = {
        buchholz: {
          title: 'Buchholz Gas & Surge Relay',
          desc: 'Protective safety device mounted on the inclined pipe between tank and conservator to detect slow gas accumulation (incipient faults) and oil surges (severe short circuits).',
          spec: 'Dual Stage: Alarm Contact (Gas) & Trip Contact (Surge)'
        },
        conservator: {
          title: 'Conservator Tank & Silica Gel Breather',
          desc: 'Elevated oil expansion chamber allowing dielectric fluid to expand with temperature without exposing the main tank to atmospheric moisture.',
          spec: 'Visual Oil Level Gauge · Color-Indicating Silica Gel Crystals'
        },
        bushings: {
          title: 'High-Voltage Porcelain Shed Bushings',
          desc: 'Heavy glazed ceramic insulating bushings with rain sheds designed to withstand high electric field stress and severe outdoor ambient pollution.',
          spec: '33 kV Class · High Creepage Distance · Pure Copper Terminals'
        },
        core: {
          title: 'Step-Lap CRGO Magnetic Core & Copper Windings',
          desc: 'Laminated core composed of cold-rolled grain-oriented silicon steel with 45° miter step-lap joints for minimum no-load losses and acoustic hum.',
          spec: 'Prime Grade M3/M4 Silicon Steel · Concentric Disc Windings'
        },
        radiator: {
          title: 'Corrugated Radiator Cooling Fin Banks',
          desc: 'Precision deep-fold steel fins providing massive surface area for natural thermosiphon oil cooling (ONAN) without auxiliary cooling fans.',
          spec: 'Deep Corrugation Folds · Electrostatic Powder Coat Finish'
        },
        tapchanger: {
          title: 'Off-Circuit Tap Changer (OCTC)',
          desc: 'Externally operable rotary tap selector mechanism allowing primary winding turns adjustment to compensate for regional grid voltage variations.',
          spec: '5 Tap Steps: +5%, +2.5%, Nominal, -2.5%, -5%'
        }
      };
    }
    return map;
  }, [isDryType, isNaturalEster, isSwitchgear, isCSS]);

  return (
    <div className={`digital-twin-wrapper ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      {/* HEADER CONTROL BAR */}
      <div className="digital-twin-topbar">
        <div className="twin-brand-badge">
          <span className="live-pulse"></span>
          <strong>GRAYCELL DIGITAL TWIN</strong>
          <span className="twin-version">
            {isCSS ? 'CSS WORKBENCH' : (isSwitchgear ? 'VCB SWITCHGEAR' : (isDryType ? 'CAST RESIN' : (isNaturalEster ? 'BIO-FLUID' : 'OIL TRANSFORMER')))}
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="twin-view-pills">
          <button 
            className={`twin-pill ${viewMode === 'exterior' ? 'active' : ''}`}
            onClick={() => setViewMode('exterior')}
            title="Solid industrial equipment exterior"
          >
            <Eye size={13} />
            Exterior Shell
          </button>
          <button 
            className={`twin-pill ${viewMode === 'xray' ? 'active' : ''}`}
            onClick={() => setViewMode('xray')}
            title="Inspect internal magnetic core, windings and compartments"
          >
            <Sparkles size={13} />
            X-Ray Cutaway
          </button>
          <button 
            className={`twin-pill ${viewMode === 'exploded' ? 'active' : ''}`}
            onClick={() => setViewMode('exploded')}
            title="Animate assembly layers apart in 3D"
          >
            <Layers size={13} />
            Exploded View
          </button>
        </div>

        {/* Camera Reset & Audio Controls */}
        <div className="twin-quick-actions">
          {activeHotspot && (
            <button 
              className="twin-pill active"
              onClick={resetCamera}
              title="Reset to 360° Factory View"
              style={{ padding: '4px 8px', fontSize: 11 }}
            >
              <RotateCw size={12} />
              Reset View
            </button>
          )}
          <button 
            className={`twin-icon-btn ${soundEnabled ? 'active-audio' : ''}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute 50Hz Operational Sound' : 'Play 50Hz Operational Sound'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button 
            className="twin-icon-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* MAIN 3D WORKBENCH VIEWPORT */}
      <div className="digital-twin-viewport-container">
        <div className="threejs-canvas-host" ref={mountRef}></div>

        {/* Floating 3D Hover Tooltip */}
        {hoverTooltip && (
          <div 
            style={{
              position: 'absolute',
              left: hoverTooltip.x,
              top: hoverTooltip.y,
              background: 'rgba(13, 21, 32, 0.92)',
              border: '1px solid #0878c9',
              color: '#38bdf8',
              padding: '5px 10px',
              borderRadius: 4,
              fontSize: 11,
              fontFamily: 'DM Mono, monospace',
              pointerEvents: 'none',
              zIndex: 30,
              boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
              whiteSpace: 'nowrap'
            }}
          >
            {hoverTooltip.text}
          </div>
        )}

        {/* ON-CANVAS HUD: STATUS & TELEMETRY */}
        <div className="twin-hud-overlay">
          
          {/* Top Left: Power State & Primary Specs */}
          <div className="twin-hud-card">
            <div className="hud-title-row">
              <span className="hud-label">POWER STATUS</span>
              <button 
                className={`master-breaker-btn ${isEnergized ? 'online' : 'tripped'}`}
                onClick={() => {
                  setIsEnergized(!isEnergized);
                  playMechanicalSound('breaker');
                }}
              >
                <Zap size={13} />
                {isEnergized ? 'ONLINE · ENERGIZED' : 'OFFLINE · TRIPPED'}
              </button>
            </div>
            <div className="hud-metric-row">
              <div className="hud-stat">
                <span className="lbl">{isSwitchgear ? 'Busbar Voltage' : 'Primary (HV)'}</span>
                <span className="val">{isEnergized ? '33.0 kV' : '0.0 kV'}</span>
              </div>
              <div className="hud-stat">
                <span className="lbl">{isSwitchgear ? 'Rated Current' : 'Secondary (LV)'}</span>
                <span className="val">{isSwitchgear ? (isEnergized ? '1250 A' : '0 A') : `${secVoltage} V`}</span>
              </div>
              <div className="hud-stat">
                <span className="lbl">Load Current</span>
                <span className="val">{secCurrent} A</span>
              </div>
            </div>
          </div>

          {/* Top Right: Thermal & Efficiency Gauges */}
          <div className="twin-hud-card thermal-card">
            <div className="hud-title-row">
              <span className="hud-label">TELEMETRY & GAUGES</span>
              <span className={`temp-status-pill ${oilTemp > 85 ? 'alert' : 'ok'}`}>
                {oilTemp > 85 ? 'HIGH TEMP' : 'OPTIMAL'}
              </span>
            </div>
            <div className="hud-metric-row">
              <div className="hud-stat">
                <span className="lbl">{isDryType ? 'Core Temp' : (isSwitchgear ? 'Busbar Temp' : (isNaturalEster ? 'Ester Temp' : 'Oil Temp'))}</span>
                <span className="val">{oilTemp}°C</span>
              </div>
              <div className="hud-stat">
                <span className="lbl">{isSwitchgear ? 'Contact Temp' : 'Winding (WTI)'}</span>
                <span className="val">{windingTemp}°C</span>
              </div>
              <div className="hud-stat">
                <span className="lbl">{isSwitchgear ? 'Duty Cycle' : 'Efficiency'}</span>
                <span className="val">{isSwitchgear ? (isEnergized ? '100%' : '0%') : `${efficiency}%`}</span>
              </div>
            </div>
          </div>

          {/* Interactive Door Toggles (for Compact Substations) */}
          {isCSS && (
            <div className="twin-doors-controller">
              <span className="doors-title">CSS Compartment Doors (or click directly on 3D model):</span>
              <div className="doors-btn-row">
                <button 
                  className={`door-toggle-btn ${doorsOpen.mv ? 'open' : ''}`}
                  onClick={() => {
                    setDoorsOpen(p => ({ ...p, mv: !p.mv }));
                    playMechanicalSound('door');
                  }}
                >
                  MV Switchgear {doorsOpen.mv ? '✓ Open' : 'Closed'}
                </button>
                <button 
                  className={`door-toggle-btn ${doorsOpen.tr ? 'open' : ''}`}
                  onClick={() => {
                    setDoorsOpen(p => ({ ...p, tr: !p.tr }));
                    playMechanicalSound('door');
                  }}
                >
                  Transformer {doorsOpen.tr ? '✓ Open' : 'Closed'}
                </button>
                <button 
                  className={`door-toggle-btn ${doorsOpen.lv ? 'open' : ''}`}
                  onClick={() => {
                    setDoorsOpen(p => ({ ...p, lv: !p.lv }));
                    playMechanicalSound('door');
                  }}
                >
                  LV Panel {doorsOpen.lv ? '✓ Open' : 'Closed'}
                </button>
              </div>
            </div>
          )}

          {/* Interactive Door Toggle (for MV Switchgear) */}
          {isSwitchgear && (
            <div className="twin-doors-controller">
              <span className="doors-title">Switchgear Inspection Door:</span>
              <div className="doors-btn-row">
                <button 
                  className={`door-toggle-btn ${doorsOpen.vcb ? 'open' : ''}`}
                  onClick={() => {
                    setDoorsOpen(p => ({ ...p, vcb: !p.vcb }));
                    playMechanicalSound('door');
                  }}
                >
                  <DoorOpen size={13} style={{ display: 'inline', marginRight: 4 }} />
                  Center VCB Breaker Door {doorsOpen.vcb ? '✓ Open (Inspect Bottles)' : 'Closed'}
                </button>
              </div>
            </div>
          )}

          {/* Active Hotspot Technical Inspection Card */}
          {activeHotspot && hotspotDetails[activeHotspot] && (
            <div className="twin-hotspot-card">
              <div className="hotspot-header">
                <h4>{hotspotDetails[activeHotspot].title}</h4>
                <button onClick={resetCamera}>✕ Close</button>
              </div>
              <p>{hotspotDetails[activeHotspot].desc}</p>
              <div className="hotspot-spec-pill">
                <CheckCircle2 size={11} />
                <span>{hotspotDetails[activeHotspot].spec}</span>
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <button 
                  onClick={resetCamera}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#cbd5e1',
                    fontSize: 11,
                    padding: '4px 8px',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  ↺ Reset to Overview
                </button>
                {activeHotspot === 'tapchanger' && (
                  <button 
                    onClick={() => {
                      setTapPosition(p => p >= 5 ? 1 : p + 1);
                      playMechanicalSound('tap');
                    }}
                    style={{
                      background: '#0878c9',
                      border: 'none',
                      color: '#fff',
                      fontSize: 11,
                      padding: '4px 8px',
                      borderRadius: 4,
                      cursor: 'pointer'
                    }}
                  >
                    ⚡ Cycle Tap Wheel
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 3D Navigation Watermark Hint */}
          <div className="twin-orbit-hint">
            <Crosshair size={12} color="#38bdf8" />
            <span>Click any 3D part to operate / inspect · Drag 360°</span>
          </div>

        </div>
      </div>

      {/* BOTTOM DASHBOARD: CONTROLS & TEST BENCH */}
      <div className="digital-twin-dashboard">
        
        {/* Variable Load Slider */}
        <div className="dash-control-group">
          <div className="control-label-row">
            <span className="ctrl-title">
              <Activity size={14} color="#0878c9" />
              Operational Load Demand
            </span>
            <span className={`ctrl-val ${loadPercentage > 100 ? 'text-warn' : ''}`}>
              {loadPercentage}% ({currentKVA.toFixed(0)} kVA)
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="125" 
            step="5"
            value={loadPercentage} 
            onChange={(e) => setLoadPercentage(Number(e.target.value))}
            className="twin-slider"
          />
          <div className="slider-ticks">
            <span>0% (No Load)</span>
            <span>50%</span>
            <span>75% (Nominal)</span>
            <span>100%</span>
            <span className="tick-warn">125% Overload</span>
          </div>
        </div>

        {/* 5-Step Tap Changer (OCTC) */}
        {!isSwitchgear && (
          <div className="dash-control-group">
            <div className="control-label-row">
              <span className="ctrl-title">
                <Sliders size={14} color="#0878c9" />
                Tap Changer (OCTC)
              </span>
              <span className="ctrl-val">Pos {tapPosition} ({(tapRatio * 100 - 100) > 0 ? `+${(tapRatio * 100 - 100).toFixed(1)}%` : `${(tapRatio * 100 - 100).toFixed(1)}%`})</span>
            </div>
            <div className="tap-selector-buttons">
              {[1, 2, 3, 4, 5].map((pos) => (
                <button
                  key={pos}
                  className={`tap-btn ${tapPosition === pos ? 'selected' : ''}`}
                  onClick={() => {
                    setTapPosition(pos);
                    playMechanicalSound('tap');
                    focusComponent('tapchanger');
                  }}
                  title={`Tap ${pos}: ${pos === 1 ? '+5.0%' : pos === 2 ? '+2.5%' : pos === 3 ? 'Nominal' : pos === 4 ? '-2.5%' : '-5.0%'}`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Component Inspector Hotspot Chips */}
        <div className="dash-control-group">
          <div className="control-label-row">
            <span className="ctrl-title">
              <Info size={14} color="#0878c9" />
              Focus & Inspect Part
            </span>
            <span className="ctrl-val" style={{ fontSize: 11, color: '#94a3b8' }}>Camera flies to part</span>
          </div>
          <div className="hotspots-btn-bar">
            {Object.keys(hotspotDetails).map((key) => (
              <button
                key={key}
                className={`inspect-chip ${activeHotspot === key ? 'active' : ''}`}
                onClick={() => {
                  if (activeHotspot === key) {
                    resetCamera();
                  } else {
                    focusComponent(key);
                  }
                }}
              >
                {hotspotDetails[key].title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Real-World Scenario Simulations */}
        <div className="dash-control-group">
          <div className="control-label-row">
            <span className="ctrl-title">
              <AlertTriangle size={14} color="#f59e0b" />
              Fault Simulation
            </span>
          </div>
          <div className="scenario-btn-row">
            <button 
              className={`scenario-btn ${activeScenario === 'normal' ? 'active' : ''}`}
              onClick={() => handleTriggerScenario('normal')}
            >
              <ShieldCheck size={13} />
              Rated Normal
            </button>
            <button 
              className={`scenario-btn warn ${activeScenario === 'overload' ? 'active' : ''}`}
              onClick={() => handleTriggerScenario('overload')}
            >
              <Flame size={13} />
              Thermal Overload
            </button>
            {!isDryType && !isSwitchgear && (
              <button 
                className={`scenario-btn trip ${activeScenario === 'buchholz' ? 'active' : ''}`}
                onClick={() => handleTriggerScenario('buchholz')}
              >
                <AlertTriangle size={13} />
                Buchholz Gas Trip
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
