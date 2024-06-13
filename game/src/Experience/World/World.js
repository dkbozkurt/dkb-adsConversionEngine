// import * as THREE from 'three'
import Experience from "../Experience.js";
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js';

export default class World{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        // console.log("The World!")

        // // Test mesh
        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1,1,1),
        //     new THREE.MeshStandardMaterial()
        // )
        // this.scene.add(testMesh)

        // ! We listen and wait for the resources to load, before instantiating the Environment class
        this.resources.on('ready',() =>
        {
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()

            this.environment = new Environment()
        })
    }
    update()
    {
        if(this.fox)
            this.fox.update()
    }
}