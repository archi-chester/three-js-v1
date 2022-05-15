import * as THREE from "./three.module.js";

export default {
  updatePool: {},  //  functions pool for frames

  init() {
    //   create objects
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createLight();

    //  rendering
    this.update();
  },

  //  Create Render + Canvas
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();

    document.body.appendChild(this.renderer.domElement);

    this.renderer.setSize(document.body.offsetWidth, document.body.offsetHeight);
  },

  //  Create Camera
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      document.body.offsetWidth / document.body.offsetHeight,
      1,
      100
    );
  },

  //  Create Scene
  createScene() {
    this.scene = new THREE.Scene();
  },

  //  Create Light
  createLight() {
    this.light1 = new THREE.DirectionalLight(0xffffff, .5);
    this.scene.add(this.light1);
    this.light1.position.set(5, 5, 5);
  },

  //  Add new func to updatePool
  setUpdate(name, fc) {
    this.updatePool[name] = fc;
  },

  //  Remove func from updatePool
  removeUpdate(name) {
    delete this.updatePool[name];
  },

  //  Update Frame
  update() {
    this.renderer.render(this.scene, this.camera);

    const that = this;

    requestAnimationFrame(() => {
      that.update();
    });

    //  run all function when updating frame
    for(let key in this.updatePool) {
      this.updatePool[key]();
    }
  }
}
