import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import myImage from './assets/my-image.png';
import modelPath from './assets/model.glb';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load texture
const texture = new THREE.TextureLoader().load(myImage);

// Create a geometry and material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ map: texture });

// Create a mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.AmbientLight( 0x404040,3 ); // soft white light
scene.add( light );

// Position the camera
camera.position.z = 5;

// Load the GLB model
const loader = new GLTFLoader();
loader.load(modelPath, (gltf) => {
  const model = gltf.scene;
  model.position.set(0, 1, 0);
  model.scale.set(0.1,0.1,0.1); // Set model position
  scene.add(model);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
