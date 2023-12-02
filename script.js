import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Load the OBJ file from the 'objects' directory
const objLoader = new OBJLoader();
objLoader.load('objects/3floor.obj', function (object) {
    scene.add(object);
    object.position.y = -1; // Adjust the position if needed
});

// Camera position
camera.position.z = 5;

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => renderer.render(scene, camera));

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Only required if controls.enableDamping or controls.autoRotate are set to true
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
