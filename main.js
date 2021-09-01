import "./style.css"
import * as THREE from "three";
import { AmbientLightProbe } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);


// manipulating the light scenes to make the torus better
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(10, 10, 10)


const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientlight)

// const lighthelper = new THREE.PointLightHelper(pointlight);
// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(lighthelper, gridhelper)

function addstar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addstar);

const controls = new OrbitControls(camera, renderer.domElement)

const spacetexture=new THREE.TextureLoader().load('space.jpg')
scene.background=spacetexture;

// const dptexture=new THREE.TextureLoader().load('dp.jpg');


// const dp = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial({map:dptexture})
// )

// scene.add(dp);

// const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
// const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const torusKnot = new THREE.Mesh(geometry, material);
// scene.add(torusKnot);



const moontexture=new THREE.TextureLoader().load('moon.jpg');
const normaltexture = new THREE.TextureLoader().load('normal.jpg');

const moon=new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moontexture,
    normalMap:normaltexture
  })
)

scene.add(moon);

moon.position.z=30;
moon.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // torusKnot.rotation.y += 0.01;
  // torusKnot.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();