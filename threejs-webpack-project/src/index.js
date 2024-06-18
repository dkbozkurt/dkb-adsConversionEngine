import * as THREE from 'three';
import './style.css';
import myImage from './assets/myImage.png';
import myAudio from './assets/myAudio.mp3';
import myModel from './assets/myModel.glb';

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const texture = new THREE.TextureLoader().load(myImage);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();

  // Use the audio file
  const audio = new Audio(myAudio);
  audio.play();

  // Load the model
  const loader = new THREE.GLTFLoader();
  loader.load(myModel, function (gltf) {
    scene.add(gltf.scene);
  });
}

init();
