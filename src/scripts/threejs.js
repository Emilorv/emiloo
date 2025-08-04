import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default class ThreeJSScene{

    constructor(canvasSelector = '#bg') {
        this.canvasSelector = canvasSelector;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.torus = null;
        this.animationId = null;
        this.isInitialized = false;
    }

    init() {
        const canvas = document.querySelector(this.canvasSelector);
        if (!canvas) {
            console.error(`Canvas with selector ${this.canvasSelector} not found.`);
            return;
        }

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/300, 0.1, 1000);
        this.camera.position.setZ(30);

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        });

        this.renderer.setPixelRatio( window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, 600);
        this.renderer.setClearColor(0x000000, 0)

        const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
        const material = new THREE.MeshStandardMaterial({color:0xFF6347});
        this.torus = new THREE.Mesh( geometry, material);
        this.scene.add(this.torus)

        const pointLight = new THREE.PointLight(0xffffff, 1000)
        pointLight.position.set(10,10,10)
        this.scene.add(pointLight)
        
        const lightHelper = new THREE.PointLightHelper(pointLight)
        const gridHelper = new THREE.GridHelper(200, 50)

        this.scene.add(lightHelper, gridHelper)


        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.animate();
        this.isInitialized = true;

        return true;

    }
    
    animate(){
       requestAnimationFrame(this.animate.bind(this));

       this.torus.rotation.y += 0.001;
       this.torus.rotation.z -= 0.01;

       this.controls.update();

       this.renderer.render(this.scene, this.camera);
    }
}


