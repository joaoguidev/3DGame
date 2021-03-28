

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js'
//import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'

console.log(THREE);
const clock = new THREE.Clock() //2
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
//renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// const geometry = new THREE.SphereGeometry(1, 10, 10)
// const material = new THREE.MeshLambertMaterial({ color: 0xffff00 })
// const sphere = new THREE.Mesh(geometry, material)
// scene.add(sphere)
// const light = new THREE.PointLight( 0xff0000, 1, 500 );
// light.position.set( 10, 0, 25 );

const controls = new OrbitControls(camera, renderer.domElement)
controls.update();

const light = new THREE.AmbientLight(0x404040, 5); // soft white light
scene.add(light);

const loader = new GLTFLoader();

loader.load(
    "textures/Models/GLTF/truck_green.glb",
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

const animate = function () {
    const deltaTime = clock.getDelta();
    console.log(deltaTime);
    //sphere.rotation.x += 3 * deltaTime;
    //sphere.rotation.y += 3 * deltaTime;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();
