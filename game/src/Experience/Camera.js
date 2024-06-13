import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience.js";

export default class Camera{
    constructor(){
        // console.log('My camera')

        // ! From a global variable
        // this.experience = window.experience;
        // console.log(this.experience.sizes.width)

        // ! From a parameter
        // this.experience = experience;
        // console.log(this.experience.sizes.width)

        // ! Singleton
        // Will not generate instance but will use the first instance.
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(6,4,8)
        this.scene.add(this.instance)
    }

    setControls(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}