import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 );
camera.position.set(0, 0, 30);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 0, 200);

const controls = new OrbitControls( camera, renderer.domElement );
controls.maxDistance = 200;
controls.update();

const texture = new THREE.TextureLoader();

// Фон
const galaxyGeometry = new THREE.SphereGeometry(400, 64, 64);
const galaxyMaterial = new THREE.MeshBasicMaterial({
    map: texture.load('../img/maps/8k_stars_milky_way.jpg'), 
    side: THREE.DoubleSide
});
const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

// Земля
const planetGeometry = new THREE.SphereGeometry(6.371, 80, 80);
const planetMaterial = new THREE.MeshPhongMaterial({ 
  bumpScale: 0.01,
  bumpMap: texture.load('../img/maps/elev_bump_8k.jpg'),
  map: texture.load('../img/maps/2_no_clouds_8k.jpg'),
  shininess: 10,
  specular: new THREE.Color('grey'),
  specularMap: texture.load('../img/maps/water_8k.png'),
});
const planetSphere = new THREE.Mesh(planetGeometry, planetMaterial);
planetSphere.rotation.y = 3.8;

// Атмосфера Земли
const atmosphereGeometry = new THREE.SphereGeometry(6.44, 80, 80);
const atmosphereMaterial = new THREE.MeshPhongMaterial({ 
  alphaMap: texture.load('../img/maps/clouds_8k.jpg'),
  transparent: true
});
const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

// Луна
const moonGeometry = new THREE.SphereGeometry(1.7371, 80, 80);
const moonMaterial = new THREE.MeshPhongMaterial({ 
  map: texture.load('../img/maps/8k_moon.jpg'),
});
const moonSphere = new THREE.Mesh(moonGeometry, moonMaterial);
moonSphere.position.set(50, 0, 0);

// Физика движения по орбите 
const radius = 50;
let theta = 5;
const dTheta = 2 * Math.PI / 1000;

scene.add(spotLight);
scene.add(galaxy);
scene.add(planetSphere);
scene.add(atmosphere);
scene.add(moonSphere);

const animate = function () {
  requestAnimationFrame( animate );

  planetSphere.rotation.y += 0.0001;
  atmosphere.rotation.y += .00005;
  theta += dTheta;
  moonSphere.position.x = radius * Math.cos(theta);
  moonSphere.position.z = radius * Math.sin(theta);

  controls.update();
  renderer.render( scene, camera );
};

animate();