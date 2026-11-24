import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  createHeaderTexture,
  createPropertyCardTexture,
  createLeftVinylTexture,
  createRightServicesTexture
} from './textures.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#0c131f');
scene.fog = new THREE.FogExp2('#0c131f', 0.032);

const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 2.35, 9.2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
document.getElementById('app').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.target.set(0, 2.2, 0);
controls.minDistance = 2.8;
controls.maxDistance = 15;
controls.maxPolarAngle = Math.PI / 2 - 0.03;
controls.minAzimuthAngle = -Math.PI / 2.4;
controls.maxAzimuthAngle = Math.PI / 2.4;

const ambientLight = new THREE.AmbientLight('#8aa4c8', 0.75);
scene.add(ambientLight);

const streetLight = new THREE.DirectionalLight('#b8d4ff', 1.2);
streetLight.position.set(6, 9, 8);
streetLight.castShadow = true;
scene.add(streetLight);

const interiorLight1 = new THREE.PointLight('#ffbe76', 14, 10, 1.5);
interiorLight1.position.set(-1.6, 3.3, -1.8);
scene.add(interiorLight1);

const interiorLight2 = new THREE.PointLight('#ffbe76', 14, 10, 1.5);
interiorLight2.position.set(2.2, 3.3, -1.8);
scene.add(interiorLight2);

const facadeMat = new THREE.MeshStandardMaterial({
  color: '#0e1d30',
  roughness: 0.42,
  metalness: 0.25
});

const glassMat = new THREE.MeshPhysicalMaterial({
  color: '#dceeff',
  transparent: true,
  opacity: 0.22,
  roughness: 0.08,
  metalness: 0.1,
  reflectivity: 0.9,
  depthWrite: false
});

const street = new THREE.Mesh(
  new THREE.PlaneGeometry(32, 24),
  new THREE.MeshStandardMaterial({ color: '#18202c', roughness: 0.35, metalness: 0.2 })
);
street.rotation.x = -Math.PI / 2;
street.receiveShadow = true;
scene.add(street);

const buildingGroup = new THREE.Group();
scene.add(buildingGroup);

const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.32, 0.65), facadeMat);
basePlinth.position.set(0, 0.16, 0);
buildingGroup.add(basePlinth);

[-4.05, 1.25, 4.05].forEach((px, idx) => {
  const width = idx === 1 ? 0.24 : 0.48;
  const pillar = new THREE.Mesh(new THREE.BoxGeometry(width, 3.9, 0.62), facadeMat);
  pillar.position.set(px, 2.25, 0);
  pillar.castShadow = true;
  buildingGroup.add(pillar);
});

const headerBox = new THREE.Mesh(new THREE.BoxGeometry(8.7, 0.95, 0.72), facadeMat);
headerBox.position.set(0, 4.65, 0.03);
buildingGroup.add(headerBox);

const headerSign = new THREE.Mesh(
  new THREE.PlaneGeometry(8.3, 0.85),
  new THREE.MeshStandardMaterial({ map: createHeaderTexture(), roughness: 0.3 })
);
headerSign.position.set(0, 4.65, 0.4);
buildingGroup.add(headerSign);

const interiorGroup = new THREE.Group();
buildingGroup.add(interiorGroup);

const floorWood = new THREE.Mesh(
  new THREE.PlaneGeometry(8.2, 5.2),
  new THREE.MeshStandardMaterial({ color: '#8c6239', roughness: 0.55 })
);
floorWood.rotation.x = -Math.PI / 2;
floorWood.position.set(0, 0.02, -2.6);
interiorGroup.add(floorWood);

const backWall = new THREE.Mesh(
  new THREE.PlaneGeometry(8.4, 4.5),
  new THREE.MeshStandardMaterial({ color: '#1b2b40', roughness: 0.8 })
);
backWall.position.set(0, 2.25, -5.0);
interiorGroup.add(backWall);

const sideWallLeft = new THREE.Mesh(
  new THREE.PlaneGeometry(5.2, 4.5),
  new THREE.MeshStandardMaterial({ color: '#e5dfd5', roughness: 0.85 })
);
sideWallLeft.rotation.y = Math.PI / 2;
sideWallLeft.position.set(-4.0, 2.25, -2.5);
interiorGroup.add(sideWallLeft);

const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(8.4, 5.2),
  new THREE.MeshStandardMaterial({ color: '#f3efe6', roughness: 0.9 })
);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.set(0, 4.2, -2.5);
interiorGroup.add(ceiling);

function addDesk(x, z) {
  const deskGroup = new THREE.Group();
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.08, 0.85),
    new THREE.MeshStandardMaterial({ color: '#c89d6c', roughness: 0.5 })
  );
  top.position.y = 0.78;
  deskGroup.add(top);

  const monitor = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.38, 0.04),
    new THREE.MeshStandardMaterial({
      color: '#1e293b',
      emissive: '#38bdf8',
      emissiveIntensity: 0.25
    })
  );
  monitor.position.set(0, 1.05, 0);
  deskGroup.add(monitor);

  deskGroup.position.set(x, 0, z);
  interiorGroup.add(deskGroup);
}
addDesk(-1.5, -2.6);
addDesk(2.4, -2.4);

[-3.0, -1.4, 0.2].forEach((lx) => {
  const spot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.09, 0.16, 16),
    new THREE.MeshStandardMaterial({ color: '#111827' })
  );
  spot.position.set(lx, 4.08, -0.35);
  buildingGroup.add(spot);
});

const properties = [
  { title: 'Etxea Getxon', price: '290.000 €', area: '120 m²', rooms: '5 logela', baths: '2 komun' },
  { title: 'Pisua Bilbon', price: '295.000 €', area: '95 m²', rooms: '3 logela', baths: '2 komun' },
  { title: 'Etxea Derion', price: '295.000 €', area: '150 m²', rooms: '4 logela', baths: '2 komun' },
  { title: 'Pisua Deustun', price: '350.000 €', area: '165 m²', rooms: '3 logela', baths: '2 komun' },
  { title: 'Pisua Bilbon', price: '450.000 €', area: '130 m²', rooms: '4 logela', baths: '2 komun' },
  { title: 'Pisua Bilbon', price: '560.000 €', area: '160 m²', rooms: '4 logela', baths: '3 komun' }
];

const colsX = [-2.95, -1.4, 0.15];
const rowsY = [3.15, 2.02];
const cableMat = new THREE.MeshBasicMaterial({ color: '#cbd5e1' });

colsX.forEach((cx) => {
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 2.6, 8), cableMat);
  cable.position.set(cx, 2.9, -0.18);
  buildingGroup.add(cable);
});

properties.forEach((prop, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const cardTex = createPropertyCardTexture(prop, i);

  const cardMat = new THREE.MeshStandardMaterial({
    map: cardTex,
    emissiveMap: cardTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.45,
    roughness: 0.25
  });

  const card = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.94, 0.03), cardMat);
  card.position.set(colsX[col], rowsY[row], -0.18);
  buildingGroup.add(card);
});

const leftGlass = new THREE.Mesh(new THREE.PlaneGeometry(4.85, 3.85), glassMat);
leftGlass.position.set(-1.4, 2.25, 0.18);
buildingGroup.add(leftGlass);

const leftVinyl = new THREE.Mesh(
  new THREE.PlaneGeometry(4.75, 1.9),
  new THREE.MeshBasicMaterial({
    map: createLeftVinylTexture(),
    transparent: true,
    depthWrite: false
  })
);
leftVinyl.position.set(-1.4, 1.25, 0.19);
buildingGroup.add(leftVinyl);

const rightGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.55, 3.85), glassMat);
rightGlass.position.set(2.65, 2.25, 0.18);
buildingGroup.add(rightGlass);

const rightServices = new THREE.Mesh(
  new THREE.PlaneGeometry(2.45, 3.25),
  new THREE.MeshBasicMaterial({
    map: createRightServicesTexture(),
    transparent: true,
    depthWrite: false
  })
);
rightServices.position.set(2.65, 2.0, 0.19);
buildingGroup.add(rightServices);

const bench = new THREE.Mesh(
  new THREE.BoxGeometry(1.6, 0.42, 0.55),
  new THREE.MeshStandardMaterial({ color: '#3b281c', roughness: 0.7 })
);
bench.position.set(-3.3, 0.21, 1.45);
scene.add(bench);

const views = {
  general: { pos: new THREE.Vector3(0, 2.35, 9.2), target: new THREE.Vector3(0, 2.2, 0) },
  escaparate: { pos: new THREE.Vector3(-1.4, 2.45, 4.6), target: new THREE.Vector3(-1.4, 2.35, 0) },
  servicios: { pos: new THREE.Vector3(2.65, 2.15, 4.4), target: new THREE.Vector3(2.65, 2.05, 0) }
};

let desiredPos = views.general.pos.clone();
let desiredTarget = views.general.target.clone();
let isTransitioning = false;

function setView(name, btnId) {
  desiredPos.copy(views[name].pos);
  desiredTarget.copy(views[name].target);
  isTransitioning = true;

  document.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
  document.getElementById(btnId).classList.add('active');
}

document.getElementById('btn-general').addEventListener('click', () => setView('general', 'btn-general'));
document.getElementById('btn-escaparate').addEventListener('click', () => setView('escaparate', 'btn-escaparate'));
document.getElementById('btn-servicios').addEventListener('click', () => setView('servicios', 'btn-servicios'));

controls.addEventListener('start', () => {
  isTransitioning = false;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  if (isTransitioning) {
    camera.position.lerp(desiredPos, 0.08);
    controls.target.lerp(desiredTarget, 0.08);
    if (camera.position.distanceTo(desiredPos) < 0.02) {
      isTransitioning = false;
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
