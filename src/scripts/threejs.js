import * as THREE from "three";

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/300, 0.1, 1000); //window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, 300);
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0)

camera.position.setZ(30);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color:0xFF6347});

const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff, 1000)
pointLight.position.set(10,10,10)
scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)

//scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
    requestAnimationFrame(animate)

    torus.rotation.y += 0.001
    torus.rotation.z -= 0.01

    controls.update()

    renderer.render(scene, camera)
}

animate()