import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type ProceduralModelOptions = {
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  tankColor?: number;
  highlightPart?: string | null;
  explodedOffset?: number; // 0 = normal, 1 = exploded
};

export type ProceduralModelRuntime = {
  nodes: Record<string, THREE.Object3D>;
  meshes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

/**
 * Procedural Three.js model factory generated via img2threejs architecture.
 * Reference: public/images/products/oil-filled-transformer.png
 * Pure procedural geometry & PBR shaders — zero external mesh dependencies.
 */
export function createOilFilledTransformerModel(
  options: ProceduralModelOptions = {}
): { group: THREE.Group; runtime: ProceduralModelRuntime } {
  const root = new THREE.Group();
  root.name = "OilFilledTransformer_Root";

  const nodes: Record<string, THREE.Object3D> = {};
  const meshes: Record<string, THREE.Mesh> = {};
  const materials: Record<string, THREE.Material> = {};

  const wireframe = options.wireframe ?? false;
  const castShadow = options.castShadow ?? true;
  const receiveShadow = options.receiveShadow ?? true;
  const tankColorHex = options.tankColor ?? 0x475569; // Industrial slate steel RAL 7031
  const explodedOffset = options.explodedOffset ?? 0;

  // 1. PBR Materials
  const tankMaterial = new THREE.MeshStandardMaterial({
    color: tankColorHex,
    roughness: 0.45,
    metalness: 0.65,
    wireframe,
  });
  materials['tank'] = tankMaterial;

  const radiatorMaterial = new THREE.MeshStandardMaterial({
    color: tankColorHex,
    roughness: 0.5,
    metalness: 0.6,
    wireframe,
  });
  materials['radiator'] = radiatorMaterial;

  const conservatorMaterial = new THREE.MeshStandardMaterial({
    color: tankColorHex,
    roughness: 0.4,
    metalness: 0.7,
    wireframe,
  });
  materials['conservator'] = conservatorMaterial;

  const porcelainMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x6e2619, // Glazed brown electrical porcelain
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    wireframe,
  });
  materials['porcelain'] = porcelainMaterial;

  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Brass / Copper terminal studs
    roughness: 0.3,
    metalness: 0.85,
    wireframe,
  });
  materials['brass'] = brassMaterial;

  const steelDarkMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.6,
    metalness: 0.8,
    wireframe,
  });
  materials['steelDark'] = steelDarkMaterial;

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x93c5fd,
    transmission: 0.85,
    opacity: 0.9,
    transparent: true,
    roughness: 0.1,
    ior: 1.5,
    wireframe,
  });
  materials['glass'] = glassMaterial;

  // 2. Base Skid & Channels
  const skidGroup = new THREE.Group();
  skidGroup.name = "SkidBase";
  nodes['skid'] = skidGroup;
  root.add(skidGroup);

  const skidChannelGeo = new THREE.BoxGeometry(2.4, 0.15, 0.2);
  [-0.6, 0.6].forEach((zPos, idx) => {
    const channel = new THREE.Mesh(skidChannelGeo, steelDarkMaterial);
    channel.position.set(0, -0.925, zPos);
    channel.castShadow = castShadow;
    channel.receiveShadow = receiveShadow;
    skidGroup.add(channel);
    meshes[`skid_channel_${idx}`] = channel;
  });

  // Rollers / Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 18);
  [-0.8, 0.8].forEach((xPos) => {
    [-0.6, 0.6].forEach((zPos) => {
      const wheel = new THREE.Mesh(wheelGeo, steelDarkMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(xPos, -1.05, zPos);
      wheel.castShadow = castShadow;
      skidGroup.add(wheel);
    });
  });

  // 3. Main Tank Body
  const tankGroup = new THREE.Group();
  tankGroup.name = "MainTankGroup";
  tankGroup.position.y = -explodedOffset * 0.2;
  nodes['tank'] = tankGroup;
  root.add(tankGroup);

  const tankBodyGeo = new THREE.BoxGeometry(1.8, 1.5, 1.1);
  const tankBodyMesh = new THREE.Mesh(tankBodyGeo, tankMaterial);
  tankBodyMesh.position.y = -0.1;
  tankBodyMesh.castShadow = castShadow;
  tankBodyMesh.receiveShadow = receiveShadow;
  tankGroup.add(tankBodyMesh);
  meshes['tank_body'] = tankBodyMesh;

  // Tank Cover Flange & Bolts
  const flangeGeo = new THREE.BoxGeometry(1.9, 0.08, 1.2);
  const flangeMesh = new THREE.Mesh(flangeGeo, tankMaterial);
  flangeMesh.position.y = 0.68 + explodedOffset * 0.4;
  flangeMesh.castShadow = castShadow;
  tankGroup.add(flangeMesh);
  meshes['tank_flange'] = flangeMesh;

  // 4. Radiator Cooling Fins (Left and Right Banks)
  const radiatorGroup = new THREE.Group();
  radiatorGroup.name = "RadiatorBanks";
  nodes['radiators'] = radiatorGroup;
  root.add(radiatorGroup);

  const finCount = 14;
  const finWidth = 0.02;
  const finHeight = 1.3;
  const finDepth = 0.45;
  const finGeo = new THREE.BoxGeometry(finWidth, finHeight, finDepth);

  // Left & Right Header pipes
  const headerPipeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.6, 16);

  [-1, 1].forEach((side) => {
    const bankGroup = new THREE.Group();
    bankGroup.position.set(0, -0.1, side * (0.82 + explodedOffset * 0.3));

    // Top and bottom manifold pipes
    [0.55, -0.55].forEach((yPos) => {
      const manifold = new THREE.Mesh(headerPipeGeo, steelDarkMaterial);
      manifold.rotation.z = Math.PI / 2;
      manifold.position.set(0, yPos, 0);
      manifold.castShadow = castShadow;
      bankGroup.add(manifold);

      // Connection stubs to tank
      const stubGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.28, 12);
      [-0.6, 0.6].forEach((xPos) => {
        const stub = new THREE.Mesh(stubGeo, steelDarkMaterial);
        stub.rotation.x = Math.PI / 2;
        stub.position.set(xPos, yPos, -side * 0.14);
        bankGroup.add(stub);
      });
    });

    // Individual radiator fins
    for (let i = 0; i < finCount; i++) {
      const xPos = -0.7 + (i / (finCount - 1)) * 1.4;
      const fin = new THREE.Mesh(finGeo, radiatorMaterial);
      fin.position.set(xPos, 0, 0);
      fin.castShadow = castShadow;
      bankGroup.add(fin);
    }

    radiatorGroup.add(bankGroup);
  });

  // 5. Conservator Tank Assembly
  const conservatorGroup = new THREE.Group();
  conservatorGroup.name = "ConservatorAssembly";
  conservatorGroup.position.set(0, 1.25 + explodedOffset * 0.7, -0.2);
  nodes['conservator'] = conservatorGroup;
  root.add(conservatorGroup);

  // Cylindrical Oil Tank
  const conservatorCylGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.35, 24);
  const conservatorMesh = new THREE.Mesh(conservatorCylGeo, conservatorMaterial);
  conservatorMesh.rotation.z = Math.PI / 2;
  conservatorMesh.castShadow = castShadow;
  conservatorGroup.add(conservatorMesh);
  meshes['conservator_tank'] = conservatorMesh;

  // Dished ends
  const dishedGeo = new THREE.SphereGeometry(0.24, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  [-0.675, 0.675].forEach((xPos, idx) => {
    const endCap = new THREE.Mesh(dishedGeo, conservatorMaterial);
    endCap.rotation.z = idx === 0 ? Math.PI / 2 : -Math.PI / 2;
    endCap.position.x = xPos;
    conservatorGroup.add(endCap);
  });

  // Oil Level Gauge (Prismatic glass indicator)
  const gaugeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 12);
  const gaugeMesh = new THREE.Mesh(gaugeGeo, glassMaterial);
  gaugeMesh.position.set(0.68, 0, 0.24);
  conservatorGroup.add(gaugeMesh);

  // Support brackets mounting to tank lid
  const bracketGeo = new THREE.BoxGeometry(0.06, 0.6, 0.06);
  [-0.45, 0.45].forEach((xPos) => {
    const bracket = new THREE.Mesh(bracketGeo, steelDarkMaterial);
    bracket.position.set(xPos, -0.32, 0);
    conservatorGroup.add(bracket);
  });

  // Connecting Pipe from Conservator to Tank with Buchholz Relay
  const pipePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.35, 0, 0),
    new THREE.Vector3(-0.35, -0.25, 0.1),
    new THREE.Vector3(-0.35, -0.5, 0.2),
  ]);
  const pipeGeo = new THREE.TubeGeometry(pipePath, 16, 0.035, 12, false);
  const pipeMesh = new THREE.Mesh(pipeGeo, steelDarkMaterial);
  pipeMesh.castShadow = castShadow;
  conservatorGroup.add(pipeMesh);

  // Buchholz Relay Unit on pipe
  const buchholzGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.16, 16);
  const buchholzMesh = new THREE.Mesh(buchholzGeo, tankMaterial);
  buchholzMesh.rotation.x = Math.PI / 4;
  buchholzMesh.position.set(-0.35, -0.35, 0.14);
  conservatorGroup.add(buchholzMesh);
  meshes['buchholz_relay'] = buchholzMesh;

  // 6. High Voltage Bushings (HT Bushings) with Porcelain Petticoats / Sheds
  const htBushingGroup = new THREE.Group();
  htBushingGroup.name = "HT_Bushings";
  htBushingGroup.position.set(0, 0.72 + explodedOffset * 0.5, 0.25);
  nodes['ht_bushings'] = htBushingGroup;
  root.add(htBushingGroup);

  function createPorcelainBushing(height: number, shedCount: number, baseRadius: number) {
    const bGroup = new THREE.Group();

    // Central Stem
    const stemGeo = new THREE.CylinderGeometry(baseRadius * 0.4, baseRadius * 0.6, height, 16);
    const stem = new THREE.Mesh(stemGeo, porcelainMaterial);
    stem.position.y = height / 2;
    stem.castShadow = castShadow;
    bGroup.add(stem);

    // Weather Sheds / Petticoats
    for (let s = 0; s < shedCount; s++) {
      const shedY = 0.08 + (s / shedCount) * (height - 0.14);
      const radius = baseRadius * (1.1 - (s / shedCount) * 0.25);
      const shedGeo = new THREE.ConeGeometry(radius, 0.04, 16);
      const shed = new THREE.Mesh(shedGeo, porcelainMaterial);
      shed.rotation.x = Math.PI;
      shed.position.y = shedY;
      shed.castShadow = castShadow;
      bGroup.add(shed);
    }

    // Brass Top Terminal Stud
    const studGeo = new THREE.CylinderGeometry(baseRadius * 0.2, baseRadius * 0.2, 0.08, 12);
    const stud = new THREE.Mesh(studGeo, brassMaterial);
    stud.position.y = height + 0.04;
    bGroup.add(stud);

    // Flange Base
    const flangeBGeo = new THREE.CylinderGeometry(baseRadius * 0.8, baseRadius * 0.9, 0.04, 16);
    const bFlange = new THREE.Mesh(flangeBGeo, steelDarkMaterial);
    bFlange.position.y = 0.02;
    bGroup.add(bFlange);

    return bGroup;
  }

  // 3 HT Bushings (R, Y, B phases)
  [-0.45, 0, 0.45].forEach((xPos, idx) => {
    const bushing = createPorcelainBushing(0.55, 6, 0.09);
    bushing.position.set(xPos, 0, 0);
    htBushingGroup.add(bushing);
    meshes[`ht_bushing_${idx}`] = bushing.children[0] as THREE.Mesh;
  });

  // 7. Low Voltage Bushings (4 Bushings: 3 Phase + Neutral)
  const ltBushingGroup = new THREE.Group();
  ltBushingGroup.name = "LT_Bushings";
  ltBushingGroup.position.set(0, 0.72 + explodedOffset * 0.5, -0.25);
  nodes['lt_bushings'] = ltBushingGroup;
  root.add(ltBushingGroup);

  [-0.45, -0.15, 0.15, 0.45].forEach((xPos, idx) => {
    const bushing = createPorcelainBushing(0.32, 4, 0.06);
    bushing.position.set(xPos, 0, 0);
    ltBushingGroup.add(bushing);
    meshes[`lt_bushing_${idx}`] = bushing.children[0] as THREE.Mesh;
  });

  // 8. Explosion Vent / De-aerator Pipe
  const ventGroup = new THREE.Group();
  ventGroup.name = "ExplosionVent";
  nodes['vent'] = ventGroup;
  root.add(ventGroup);

  const ventPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.65, 0.72 + explodedOffset * 0.5, 0),
    new THREE.Vector3(0.75, 1.25 + explodedOffset * 0.6, 0),
    new THREE.Vector3(0.85, 1.45 + explodedOffset * 0.65, 0.1),
  ]);
  const ventPipe = new THREE.Mesh(
    new THREE.TubeGeometry(ventPath, 16, 0.045, 12, false),
    tankMaterial
  );
  ventPipe.castShadow = castShadow;
  ventGroup.add(ventPipe);

  // Diaphragm cowl at end of vent
  const cowlGeo = new THREE.ConeGeometry(0.1, 0.12, 16);
  const cowl = new THREE.Mesh(cowlGeo, steelDarkMaterial);
  cowl.position.set(0.85, 1.45 + explodedOffset * 0.65, 0.1);
  cowl.rotation.z = -Math.PI / 4;
  ventGroup.add(cowl);

  // 9. Marshalling Box / Control Panel on Tank Side
  const boxGroup = new THREE.Group();
  boxGroup.name = "MarshallingBox";
  boxGroup.position.set(0.95 + explodedOffset * 0.3, -0.1, 0);
  nodes['box'] = boxGroup;
  root.add(boxGroup);

  const boxGeo = new THREE.BoxGeometry(0.15, 0.45, 0.35);
  const boxMesh = new THREE.Mesh(boxGeo, steelDarkMaterial);
  boxMesh.castShadow = castShadow;
  boxGroup.add(boxMesh);
  meshes['marshalling_box'] = boxMesh;

  // Marshalling box door handle & glass window
  const mWindowGeo = new THREE.PlaneGeometry(0.2, 0.2);
  const mWindow = new THREE.Mesh(mWindowGeo, glassMaterial);
  mWindow.rotation.y = Math.PI / 2;
  mWindow.position.set(0.08, 0.05, 0);
  boxGroup.add(mWindow);

  // 10. Lifting Lugs & Drain Valve
  const lugGeo = new THREE.TorusGeometry(0.07, 0.02, 8, 16);
  [-0.85, 0.85].forEach((xPos) => {
    [-0.5, 0.5].forEach((zPos) => {
      const lug = new THREE.Mesh(lugGeo, steelDarkMaterial);
      lug.position.set(xPos, 0.65 + explodedOffset * 0.4, zPos);
      lug.rotation.y = Math.PI / 2;
      root.add(lug);
    });
  });

  // Oil Drain Valve at bottom
  const valveGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.12, 12);
  const valve = new THREE.Mesh(valveGeo, brassMaterial);
  valve.rotation.z = Math.PI / 2;
  valve.position.set(-0.95, -0.75, 0);
  root.add(valve);

  return {
    group: root,
    runtime: {
      nodes,
      meshes,
      materials,
    },
  };
}

/**
 * Creates studio lighting specifically calibrated for inspecting procedural PBR models.
 */
export function createLookDevLighting(mode: 'studio' | 'reference' | 'dramatic' = 'studio'): THREE.Group {
  const lights = new THREE.Group();
  lights.name = "LookDevLighting";

  if (mode === 'studio') {
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    lights.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.bias = -0.0001;
    lights.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.8);
    fillLight.position.set(-4, 3, -3);
    lights.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, 5, -5);
    lights.add(rimLight);
  } else if (mode === 'reference') {
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    lights.add(ambient);

    const direct = new THREE.DirectionalLight(0xffeedd, 2.2);
    direct.position.set(-3, 7, 5);
    direct.castShadow = true;
    lights.add(direct);

    const groundBounce = new THREE.DirectionalLight(0x94a3b8, 0.4);
    groundBounce.position.set(0, -3, 0);
    lights.add(groundBounce);
  } else {
    // dramatic grazing light to evaluate roughness and normal maps
    const ambient = new THREE.AmbientLight(0x0f172a, 0.2);
    lights.add(ambient);

    const grazing = new THREE.DirectionalLight(0x38bdf8, 3.0);
    grazing.position.set(6, 1, 2);
    lights.add(grazing);

    const rim = new THREE.DirectionalLight(0xf59e0b, 1.5);
    rim.position.set(-5, 4, -4);
    lights.add(rim);
  }

  return lights;
}
