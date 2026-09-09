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
  CheckCircle2
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

  // Door states for CSS / Switchgear
  const [doorsOpen, setDoorsOpen] = useState({ mv: false, tr: false, lv: false });

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

  // Determine Product Family
  const isCSS = productId === 'compact-substations';
  const isSwitchgear = productId === 'foil-wound-transformers';
  const isDryType = productId === 'dry-type-distribution';
  const isTransformer = !isCSS && !isSwitchgear && !isDryType;

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
  // Voltage drop under load: V2 = Vnom * tapRatio * (1 - 0.04 * (load/100))
  const secVoltage = isEnergized ? Math.round(nominalSecV * tapRatio * (1 - 0.038 * (loadPercentage / 100))) : 0;
  // Current I = kVA * 1000 / (sqrt(3) * V)
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
  // Web Audio 50Hz Transformer Hum Synthesizer
  // -------------------------------------------------------------
  useEffect(() => {
    if (!soundEnabled || !isEnergized) {
      if (humGainRef.current && audioCtxRef.current) {
        humGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.08);
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
        // Master Hum Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        
        // Low pass filter to simulate thick tank steel dampening
        const lowPass = ctx.createBiquadFilter();
        lowPass.type = 'lowpass';
        lowPass.frequency.setValueAtTime(280, ctx.currentTime);

        // 50Hz fundamental
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(50, ctx.currentTime);

        // 100Hz magnetostriction harmonic
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

      // Volume & intensity dynamically scale with load
      const targetGain = 0.05 + 0.15 * (loadPercentage / 100);
      humGainRef.current.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.1);

      // Pitch subtle shift with load saturation
      if (osc1Ref.current) {
        osc1Ref.current.frequency.setTargetAtTime(50 + (loadPercentage > 100 ? 1.5 : 0), ctx.currentTime, 0.1);
      }
    } catch (e) {
      console.warn('Web Audio hum init failed:', e);
    }
  }, [soundEnabled, isEnergized, loadPercentage]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // -------------------------------------------------------------
  // Three.js 3D Scene Initialization
  // -------------------------------------------------------------
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 540;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0d1520');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(7.5, 4.8, 8.5);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // don't go below floor
    controls.minDistance = 3.5;
    controls.maxDistance = 16;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight('#9cb0c4', 0.85);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight('#ffffff', 2.2);
    mainSpot.position.set(8, 12, 6);
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 1024;
    mainSpot.shadow.mapSize.height = 1024;
    mainSpot.shadow.camera.near = 0.5;
    mainSpot.shadow.camera.far = 30;
    mainSpot.shadow.bias = -0.0005;
    scene.add(mainSpot);

    const fillLight = new THREE.DirectionalLight('#4a8bc2', 0.9);
    fillLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#e0f2fe', 1.1);
    rimLight.position.set(0, 8, -10);
    scene.add(rimLight);

    // 5. Factory Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, '#1e3852', '#142538');
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: '#091017', 
      roughness: 0.7, 
      metalness: 0.3 
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 6. Assemble the 3D Product Geometry
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Materials Palette
    const steelTankMat = new THREE.MeshStandardMaterial({
      color: '#8495a5',
      roughness: 0.35,
      metalness: 0.7,
      transparent: true,
      opacity: 1.0
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: '#c86432',
      roughness: 0.25,
      metalness: 0.9,
      emissive: '#7a2808',
      emissiveIntensity: 0.15
    });

    const coreIronMat = new THREE.MeshStandardMaterial({
      color: '#2a343d',
      roughness: 0.6,
      metalness: 0.8
    });

    const porcelainMat = new THREE.MeshStandardMaterial({
      color: '#52291b',
      roughness: 0.15,
      metalness: 0.2
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: '#e0a538',
      roughness: 0.3,
      metalness: 0.85
    });

    const parts: any = {
      tankMat: steelTankMat,
      copperMat,
      coreIronMat,
      doors: []
    };

    if (isCSS) {
      // -------------------------------------------------------------
      // COMPACT SUBSTATION 3D MODEL
      // -------------------------------------------------------------
      // Main Enclosure Housing
      const enclosureGeo = new THREE.BoxGeometry(4.6, 2.6, 2.4);
      const enclosureMat = new THREE.MeshStandardMaterial({
        color: '#b2beca',
        roughness: 0.45,
        metalness: 0.4
      });
      const enclosure = new THREE.Mesh(enclosureGeo, enclosureMat);
      enclosure.position.y = 1.3;
      enclosure.castShadow = true;
      enclosure.receiveShadow = true;
      modelGroup.add(enclosure);

      // Roof Cover with overhang
      const roofGeo = new THREE.BoxGeometry(4.9, 0.2, 2.7);
      const roofMat = new THREE.MeshStandardMaterial({ color: '#5b6b7a', roughness: 0.4, metalness: 0.6 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 2.65;
      roof.castShadow = true;
      modelGroup.add(roof);

      // 3 Compartment Doors on the front
      const doorWidth = 1.4;
      const doorHeight = 2.2;
      const doorGeo = new THREE.BoxGeometry(doorWidth, doorHeight, 0.08);

      const doorNames = ['mv', 'tr', 'lv'];
      const doorPositions = [-1.5, 0, 1.5];

      doorNames.forEach((name, i) => {
        const doorPivot = new THREE.Group();
        doorPivot.position.set(doorPositions[i] - doorWidth / 2, 1.25, 1.22);

        const doorMesh = new THREE.Mesh(
          doorGeo,
          new THREE.MeshStandardMaterial({
            color: '#a3b1bd',
            roughness: 0.4,
            metalness: 0.5
          })
        );
        doorMesh.position.x = doorWidth / 2;
        doorMesh.castShadow = true;

        // Add handle
        const handle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.02, 0.3),
          brassMat
        );
        handle.position.set(doorWidth - 0.15, 0, 0.08);
        doorMesh.add(handle);

        doorPivot.add(doorMesh);
        modelGroup.add(doorPivot);
        parts.doors.push({ name, pivot: doorPivot, angle: 0 });
      });

      // Base channel frame
      const baseGeo = new THREE.BoxGeometry(4.8, 0.2, 2.6);
      const base = new THREE.Mesh(baseGeo, coreIronMat);
      base.position.y = 0.1;
      base.receiveShadow = true;
      modelGroup.add(base);

    } else if (isDryType) {
      // -------------------------------------------------------------
      // DRY-TYPE CAST RESIN TRANSFORMER 3D MODEL
      // -------------------------------------------------------------
      // 3-Limb Magnetic Core
      const coreBase = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.45, 0.6), coreIronMat);
      coreBase.position.y = 0.4;
      modelGroup.add(coreBase);

      const coreTop = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.45, 0.6), coreIronMat);
      coreTop.position.y = 2.4;
      modelGroup.add(coreTop);

      // 3 Limbs with Cast-Resin Red Cylinders
      const limbPositions = [-1.1, 0, 1.1];
      const coilCylinders: THREE.Mesh[] = [];

      limbPositions.forEach((xPos) => {
        // Core center iron
        const coreLimb = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.6, 16), coreIronMat);
        coreLimb.position.set(xPos, 1.4, 0);
        modelGroup.add(coreLimb);

        // Cast-Resin Encapsulated Coil (Deep Red/Amber)
        const coilMat = new THREE.MeshStandardMaterial({
          color: '#a32014',
          roughness: 0.25,
          metalness: 0.35,
          emissive: '#420b06',
          emissiveIntensity: 0.2
        });
        const coilMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.5, 32), coilMat);
        coilMesh.position.set(xPos, 1.4, 0);
        coilMesh.castShadow = true;
        modelGroup.add(coilMesh);
        coilCylinders.push(coilMesh);

        // Top Copper Busbar Terminals
        const busbar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.35), copperMat);
        busbar.position.set(xPos, 2.65, 0.25);
        modelGroup.add(busbar);
      });
      parts.coils = coilCylinders;

      // Base channel frame
      const baseChannel = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.2, 1.4), coreIronMat);
      baseChannel.position.y = 0.1;
      baseChannel.receiveShadow = true;
      modelGroup.add(baseChannel);

    } else {
      // -------------------------------------------------------------
      // OIL-FILLED & NATURAL ESTER POWER TRANSFORMER 3D MODEL
      // -------------------------------------------------------------
      // 1. Main Transformer Tank Body
      const tankGeo = new THREE.BoxGeometry(3.0, 2.0, 1.7);
      const tank = new THREE.Mesh(tankGeo, steelTankMat);
      tank.position.y = 1.35;
      tank.castShadow = true;
      tank.receiveShadow = true;
      modelGroup.add(tank);
      parts.tank = tank;

      // 2. Corrugated Radiator Cooling Fins on left & right sides
      const radiatorMat = new THREE.MeshStandardMaterial({
        color: '#6e8091',
        roughness: 0.4,
        metalness: 0.65,
        transparent: true,
        opacity: 1.0
      });
      parts.radiatorMat = radiatorMat;

      const leftRadiators = new THREE.Group();
      const rightRadiators = new THREE.Group();

      for (let i = 0; i < 7; i++) {
        const finGeo = new THREE.BoxGeometry(0.04, 1.7, 0.85);
        const zOffset = (i - 3) * 0.2;
        
        const finLeft = new THREE.Mesh(finGeo, radiatorMat);
        finLeft.position.set(-1.85, 1.35, zOffset);
        leftRadiators.add(finLeft);

        const finRight = new THREE.Mesh(finGeo, radiatorMat);
        finRight.position.set(1.85, 1.35, zOffset);
        rightRadiators.add(finRight);
      }
      modelGroup.add(leftRadiators);
      modelGroup.add(rightRadiators);
      parts.leftRadiators = leftRadiators;
      parts.rightRadiators = rightRadiators;

      // 3. Conservator Tank (Cylinder on top)
      const conservatorGroup = new THREE.Group();
      conservatorGroup.position.set(0.3, 2.9, -0.1);

      const conservatorGeo = new THREE.CylinderGeometry(0.42, 0.42, 2.6, 32);
      const conservator = new THREE.Mesh(conservatorGeo, steelTankMat);
      conservator.rotation.z = Math.PI / 2;
      conservator.castShadow = true;
      conservatorGroup.add(conservator);

      // Connecting pipe from tank to conservator with Buchholz relay
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.7), steelTankMat);
      pipe.position.set(-0.6, -0.38, 0);
      conservatorGroup.add(pipe);

      // Buchholz Relay bulb on pipe
      const buchholzGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.25, 16);
      const buchholz = new THREE.Mesh(buchholzGeo, brassMat);
      buchholz.position.set(-0.6, -0.38, 0);
      conservatorGroup.add(buchholz);

      // Silica gel breather on right end
      const breather = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.5), brassMat);
      breather.position.set(1.4, -0.2, 0);
      conservatorGroup.add(breather);

      modelGroup.add(conservatorGroup);
      parts.conservatorGroup = conservatorGroup;

      // 4. High-Voltage Porcelain Bushings (3 on top)
      const bushingsGroup = new THREE.Group();
      bushingsGroup.position.y = 2.35;

      const bushingOffsets = [-0.75, 0, 0.75];
      bushingOffsets.forEach((xOff) => {
        const bushingAssembly = new THREE.Group();
        bushingAssembly.position.set(xOff, 0, 0.45);

        // Brown grooved porcelain cone
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.75, 16), porcelainMat);
        cone.castShadow = true;
        bushingAssembly.add(cone);

        // Top copper electrode stud
        const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3), copperMat);
        stud.position.y = 0.45;
        bushingAssembly.add(stud);

        bushingsGroup.add(bushingAssembly);
      });
      modelGroup.add(bushingsGroup);
      parts.bushingsGroup = bushingsGroup;

      // 5. Internal Anatomy (Visible in X-Ray & Exploded View)
      const internalCoreGroup = new THREE.Group();
      internalCoreGroup.position.set(0, 1.35, 0);

      // Core iron limbs
      const innerCoreBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 0.5), coreIronMat);
      innerCoreBase.position.y = -0.7;
      internalCoreGroup.add(innerCoreBase);

      const innerCoreTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 0.5), coreIronMat);
      innerCoreTop.position.y = 0.7;
      internalCoreGroup.add(innerCoreTop);

      // 3 Copper Wound Limbs
      const internalCoils: THREE.Mesh[] = [];
      [-0.75, 0, 0.75].forEach((xPos) => {
        const coil = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.32, 1.1, 24),
          copperMat
        );
        coil.position.x = xPos;
        internalCoreGroup.add(coil);
        internalCoils.push(coil);
      });
      parts.internalCoils = internalCoils;
      modelGroup.add(internalCoreGroup);
      parts.internalCoreGroup = internalCoreGroup;

      // 6. Base channels with rollers
      const baseRoller = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.18, 1.8), coreIronMat);
      baseRoller.position.y = 0.1;
      baseRoller.receiveShadow = true;
      modelGroup.add(baseRoller);
    }

    animatedPartsRef.current = parts;

    // 7. Electromagnetic Flux & Oil Circulation Particles (Point Cloud)
    const particleCount = 200;
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

    const particleMat = new THREE.PointsMaterial({
      color: '#08b8f8',
      size: 0.07,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isUserInteracting = false;
    controls.addEventListener('start', () => { isUserInteracting = true; });
    controls.addEventListener('end', () => { isUserInteracting = false; });

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth auto-rotation if idle
      if (!activeHotspot && !isUserInteracting) {
        modelGroup.rotation.y += 0.0015;
      }

      // Animate Oil / Flux Circulation Particles when Energized
      if (particlesRef.current && isEnergized) {
        const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const speedMultiplier = (loadPercentage / 100) * 1.5;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] += particleSpeeds[i] * speedMultiplier;
          if (pos[i * 3 + 1] > 2.4) {
            pos[i * 3 + 1] = 0.5;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Smooth Door Rotations for CSS
      if (parts.doors && parts.doors.length) {
        parts.doors.forEach((d: any) => {
          const isOpen = doorsOpen[d.name as keyof typeof doorsOpen];
          const targetAngle = isOpen ? -Math.PI * 0.65 : 0;
          d.pivot.rotation.y = THREE.MathUtils.lerp(d.pivot.rotation.y, targetAngle, 0.1);
        });
      }

      // Exploded View Lerping
      if (parts.conservatorGroup && parts.bushingsGroup && parts.leftRadiators && parts.rightRadiators) {
        const isExploded = viewMode === 'exploded';
        const targetConservatorY = isExploded ? 4.2 : 2.9;
        const targetBushingsY = isExploded ? 3.4 : 2.35;
        const targetRadLeftX = isExploded ? -2.6 : 0;
        const targetRadRightX = isExploded ? 2.6 : 0;

        parts.conservatorGroup.position.y = THREE.MathUtils.lerp(parts.conservatorGroup.position.y, targetConservatorY, 0.08);
        parts.bushingsGroup.position.y = THREE.MathUtils.lerp(parts.bushingsGroup.position.y, targetBushingsY, 0.08);
        parts.leftRadiators.position.x = THREE.MathUtils.lerp(parts.leftRadiators.position.x, targetRadLeftX, 0.08);
        parts.rightRadiators.position.x = THREE.MathUtils.lerp(parts.rightRadiators.position.x, targetRadRightX, 0.08);
      }

      // Copper Coil Pulsing Glow under Load
      if (parts.internalCoils) {
        const glow = isEnergized ? (0.15 + 0.35 * (loadPercentage / 100) * (0.8 + 0.2 * Math.sin(time * 8))) : 0.05;
        parts.copperMat.emissiveIntensity = glow;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
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
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [productId, isCSS, isDryType]);

  // -------------------------------------------------------------
  // View Mode Updates (Exterior vs X-Ray vs Exploded)
  // -------------------------------------------------------------
  useEffect(() => {
    const parts = animatedPartsRef.current;
    if (!parts || !parts.tankMat) return;

    if (viewMode === 'xray') {
      parts.tankMat.opacity = 0.22;
      parts.tankMat.color.set('#5a7894');
      if (parts.radiatorMat) parts.radiatorMat.opacity = 0.28;
      if (particlesRef.current) (particlesRef.current.material as any).opacity = 0.85;
    } else if (viewMode === 'exploded') {
      parts.tankMat.opacity = 0.85;
      parts.tankMat.color.set('#8495a5');
      if (parts.radiatorMat) parts.radiatorMat.opacity = 0.85;
      if (particlesRef.current) (particlesRef.current.material as any).opacity = 0.45;
    } else {
      // Exterior
      parts.tankMat.opacity = 1.0;
      parts.tankMat.color.set('#8495a5');
      if (parts.radiatorMat) parts.radiatorMat.opacity = 1.0;
      if (particlesRef.current) (particlesRef.current.material as any).opacity = 0.0;
    }
  }, [viewMode]);

  // -------------------------------------------------------------
  // Scenario Triggers (Overload / Buchholz Gas Trip)
  // -------------------------------------------------------------
  const handleTriggerScenario = (scenario: 'normal' | 'overload' | 'buchholz') => {
    setActiveScenario(scenario);
    if (scenario === 'overload') {
      setLoadPercentage(120);
      setIsEnergized(true);
    } else if (scenario === 'buchholz') {
      // Gas surge triggers immediate trip!
      setIsEnergized(false);
      setLoadPercentage(0);
    } else {
      setLoadPercentage(75);
      setIsEnergized(true);
    }
  };

  // -------------------------------------------------------------
  // Hotspot Engineering Breakdown Data
  // -------------------------------------------------------------
  const hotspotsData: Record<string, { title: string; desc: string; spec: string }> = {
    core: {
      title: 'CRGO Cold-Rolled Grain-Oriented Core',
      desc: 'Step-lap 45° mitered joints constructed with prime-grade M3/M4 silicon steel laminations minimizing hysteresis & eddy current no-load losses.',
      spec: 'Core Loss: <0.72 W/kg · Step-Lap Precision'
    },
    windings: {
      title: 'Electrolytic Copper Foil Windings',
      desc: 'High-purity electrolytic copper with uniform current distribution, superior mechanical short-circuit withstand strength, and hot-spot elimination.',
      spec: 'Conductivity: 99.9% IACS · Class A/F Insulation'
    },
    buchholz: {
      title: 'Buchholz Gas & Surge Relay',
      desc: 'Double-float mechanical safety device situated between tank and conservator detecting internal dielectric breakdown, gas accumulation, and oil surge.',
      spec: 'Operating Time: <0.10s · IS 3637 / IEC 60076'
    },
    bushings: {
      title: 'High-Voltage Porcelain Bushings',
      desc: 'Oil-impregnated porcelain insulators with high creepage distance engineered for 33 kV impulse tolerance and pollution resistance.',
      spec: 'BIL: 170 kV Peak · Creepage: 25 mm/kV'
    },
    radiators: {
      title: 'Corrugated Fin Radiator Cooling Bank',
      desc: 'Precision folded cold-rolled steel corrugated fin panels providing maximum convective heat exchange with zero oil leakage risk.',
      spec: 'Cooling: ONAN (Oil Natural Air Natural)'
    },
    css_mv: {
      title: 'Medium Voltage Switchgear Chamber (CSS)',
      desc: 'Integrated with Siemens 8FB20 modular vacuum circuit breaker (VCB) with arc-fault protection and motorized rack-in mechanism.',
      spec: '12-36 kV · 20-25 kA / 3s Short Circuit'
    },
    css_lv: {
      title: 'Low Voltage Distribution Chamber (CSS)',
      desc: 'Fully compartmentalized LV panel with ACB/MCCB breakers, APFC capacitor banks, surge arresters, and smart digital energy meters.',
      spec: '415 V · IP54 Ingress Protection'
    }
  };

  return (
    <div className={`digital-twin-wrapper ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      {/* HEADER CONTROL BAR */}
      <div className="digital-twin-topbar">
        <div className="twin-brand-badge">
          <span className="live-pulse"></span>
          <strong>GRAYCELL DIGITAL TWIN</strong>
          <span className="twin-version">v2.4 SIMULATOR</span>
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
            title="Inspect internal magnetic core and copper windings"
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

        {/* Audio Hum & Fullscreen Controls */}
        <div className="twin-quick-actions">
          <button 
            className={`twin-icon-btn ${soundEnabled ? 'active-audio' : ''}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute 50Hz Transformer Hum' : 'Play 50Hz Transformer Hum'}
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

        {/* ON-CANVAS HUD: STATUS & TELEMETRY */}
        <div className="twin-hud-overlay">
          
          {/* Top Left: Power State & Primary Specs */}
          <div className="twin-hud-card">
            <div className="hud-title-row">
              <span className="hud-label">POWER STATUS</span>
              <button 
                className={`master-breaker-btn ${isEnergized ? 'online' : 'tripped'}`}
                onClick={() => setIsEnergized(!isEnergized)}
              >
                <Zap size={13} />
                {isEnergized ? 'ONLINE · ENERGIZED' : 'OFFLINE · TRIPPED'}
              </button>
            </div>
            <div className="hud-metric-row">
              <div className="hud-stat">
                <span className="lbl">Primary (HV)</span>
                <span className="val">{isEnergized ? '33.0 kV' : '0.0 kV'}</span>
              </div>
              <div className="hud-stat">
                <span className="lbl">Secondary (LV)</span>
                <span className="val">{secVoltage} V</span>
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
                <span className="lbl">Oil Temp (OTI)</span>
                <span className="val">{oilTemp}°C</span>
              </div>
              <div className="hud-stat">
                <span className="lbl">Winding (WTI)</span>
                <span className="val">{windingTemp}°C</span>
              </div>
              <div className="hud-stat">
                <span className="lbl">Efficiency</span>
                <span className="val">{efficiency}%</span>
              </div>
            </div>
          </div>

          {/* Interactive Door Toggles (for Compact Substations) */}
          {isCSS && (
            <div className="twin-doors-controller">
              <span className="doors-title">CSS Interactive Compartment Doors:</span>
              <div className="doors-btn-row">
                <button 
                  className={`door-toggle-btn ${doorsOpen.mv ? 'open' : ''}`}
                  onClick={() => setDoorsOpen(p => ({ ...p, mv: !p.mv }))}
                >
                  MV Switchgear {doorsOpen.mv ? '✓ Open' : 'Closed'}
                </button>
                <button 
                  className={`door-toggle-btn ${doorsOpen.tr ? 'open' : ''}`}
                  onClick={() => setDoorsOpen(p => ({ ...p, tr: !p.tr }))}
                >
                  Transformer {doorsOpen.tr ? '✓ Open' : 'Closed'}
                </button>
                <button 
                  className={`door-toggle-btn ${doorsOpen.lv ? 'open' : ''}`}
                  onClick={() => setDoorsOpen(p => ({ ...p, lv: !p.lv }))}
                >
                  LV Panel {doorsOpen.lv ? '✓ Open' : 'Closed'}
                </button>
              </div>
            </div>
          )}

          {/* Active Hotspot Engineering Card (if selected) */}
          {activeHotspot && hotspotsData[activeHotspot] && (
            <div className="twin-hotspot-card">
              <div className="hotspot-header">
                <h4>{hotspotsData[activeHotspot].title}</h4>
                <button onClick={() => setActiveHotspot(null)}>✕</button>
              </div>
              <p>{hotspotsData[activeHotspot].desc}</p>
              <div className="hotspot-spec-pill">
                <ShieldCheck size={13} color="var(--blue)" />
                {hotspotsData[activeHotspot].spec}
              </div>
            </div>
          )}
        </div>

        {/* 3D Navigation Hint */}
        <div className="twin-orbit-hint">
          <RotateCw size={12} />
          <span>Click & Drag to Rotate 360° · Scroll to Zoom</span>
        </div>
      </div>

      {/* BOTTOM PLAYABLE CONTROL DASHBOARD */}
      <div className="digital-twin-dashboard">
        
        {/* Control 1: Variable Load Slider */}
        <div className="dash-control-group">
          <div className="control-label-row">
            <span className="ctrl-title">
              <Sliders size={14} color="var(--blue)" />
              Electrical Load Demand:
            </span>
            <span className={`ctrl-val ${loadPercentage > 100 ? 'text-warn' : ''}`}>
              {loadPercentage}% ({Math.round(currentKVA)} kVA)
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="125" 
            step="5"
            value={loadPercentage}
            disabled={!isEnergized}
            onChange={(e) => setLoadPercentage(Number(e.target.value))}
            className="twin-slider"
          />
          <div className="slider-ticks">
            <span>0% (No Load)</span>
            <span>50%</span>
            <span>100% (Rated)</span>
            <span className="tick-warn">125% (Overload)</span>
          </div>
        </div>

        {/* Control 2: 5-Position Tap Changer Selector */}
        {!isCSS && !isSwitchgear && (
          <div className="dash-control-group tap-group">
            <div className="control-label-row">
              <span className="ctrl-title">
                <Activity size={14} color="var(--blue)" />
                OCTC Tap Changer:
              </span>
              <span className="ctrl-val">Pos {tapPosition} ({tapRatio > 1 ? `+${((tapRatio - 1)*100).toFixed(1)}%` : tapRatio < 1 ? `${((tapRatio - 1)*100).toFixed(1)}%` : 'Nominal'})</span>
            </div>
            <div className="tap-selector-buttons">
              {[1, 2, 3, 4, 5].map((pos) => (
                <button 
                  key={pos}
                  className={`tap-btn ${tapPosition === pos ? 'selected' : ''}`}
                  onClick={() => setTapPosition(pos)}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Control 3: Interactive Hotspots */}
        <div className="dash-control-group hotspots-group">
          <span className="ctrl-title">
            <Info size={14} color="var(--blue)" />
            Inspect Component Specs:
          </span>
          <div className="hotspots-btn-bar">
            {isCSS ? (
              <>
                <button className={`inspect-chip ${activeHotspot === 'css_mv' ? 'active' : ''}`} onClick={() => setActiveHotspot('css_mv')}>
                  MV Switchgear
                </button>
                <button className={`inspect-chip ${activeHotspot === 'css_lv' ? 'active' : ''}`} onClick={() => setActiveHotspot('css_lv')}>
                  LV Distribution
                </button>
                <button className={`inspect-chip ${activeHotspot === 'core' ? 'active' : ''}`} onClick={() => setActiveHotspot('core')}>
                  Transformer
                </button>
              </>
            ) : isDryType ? (
              <>
                <button className={`inspect-chip ${activeHotspot === 'core' ? 'active' : ''}`} onClick={() => setActiveHotspot('core')}>
                  Magnetic Core
                </button>
                <button className={`inspect-chip ${activeHotspot === 'windings' ? 'active' : ''}`} onClick={() => setActiveHotspot('windings')}>
                  Cast-Resin Coils
                </button>
              </>
            ) : (
              <>
                <button className={`inspect-chip ${activeHotspot === 'core' ? 'active' : ''}`} onClick={() => setActiveHotspot('core')}>
                  CRGO Core
                </button>
                <button className={`inspect-chip ${activeHotspot === 'windings' ? 'active' : ''}`} onClick={() => setActiveHotspot('windings')}>
                  Copper Coils
                </button>
                <button className={`inspect-chip ${activeHotspot === 'buchholz' ? 'active' : ''}`} onClick={() => setActiveHotspot('buchholz')}>
                  Buchholz Relay
                </button>
                <button className={`inspect-chip ${activeHotspot === 'bushings' ? 'active' : ''}`} onClick={() => setActiveHotspot('bushings')}>
                  HV Bushings
                </button>
                <button className={`inspect-chip ${activeHotspot === 'radiators' ? 'active' : ''}`} onClick={() => setActiveHotspot('radiators')}>
                  Radiators
                </button>
              </>
            )}
          </div>
        </div>

        {/* Control 4: Real-World Scenarios */}
        <div className="dash-control-group scenarios-group">
          <span className="ctrl-title">
            <AlertTriangle size={14} color="var(--blue)" />
            Test Real-World Scenarios:
          </span>
          <div className="scenario-btn-row">
            <button 
              className={`scenario-btn ${activeScenario === 'normal' ? 'active' : ''}`}
              onClick={() => handleTriggerScenario('normal')}
            >
              <CheckCircle2 size={13} />
              Rated Normal Load
            </button>
            <button 
              className={`scenario-btn warn ${activeScenario === 'overload' ? 'active' : ''}`}
              onClick={() => handleTriggerScenario('overload')}
            >
              <Flame size={13} />
              Thermal Overload
            </button>
            <button 
              className={`scenario-btn trip ${activeScenario === 'buchholz' ? 'active' : ''}`}
              onClick={() => handleTriggerScenario('buchholz')}
            >
              <AlertTriangle size={13} />
              Buchholz Gas Trip
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
