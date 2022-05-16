import * as THREE from "./three.module.js";

export default {
  resizePool: {},  //  functions pool for resize frames
  updatePool: {},  //  functions pool for update frames

  //  Add new func to resizePool
  addResize(name, fc) {
    this.resizePool[name] = fc;
  },

  //  Add new func to resizePool
  addUpdate(name, fc) {
    this.updatePool[name] = fc;
  },

  //  CONSTRUCTOR
  init(data) {
    //   resizing 
    this.createResize();

    //   create objects
    this.createRenderer(data.renderer);
    this.createCamera();
    this.createScene();
    this.createLight();

    //  rendering
    this.update();
  },

  //  Create Render + Canvas
  createRenderer(settings) {
    //  test for renderer existing. If it exist - kill
    if (this.renderer) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);

      //  куьщму акщь ьуьщкн
      this.renderer.dispose();
    }

    this.renderer = new THREE.WebGLRenderer(settings);

    settings.parent.appendChild(this.renderer.domElement);

    this.renderer.setClearColor(settings.clearColor || "black");

    this.renderer.setPixelRatio(settings.pixelRatio || devicePixelRatio);

    const that = this;
    //  add func to pool
    this.addResize("resize_render", () => {
      that.renderer.setSize(
        that.renderer.domElement.parentNode.offsetWidth,
        that.renderer.domElement.parentNode.offsetHeight
      );
    });

    this.resizePool["resize_render"]();

  },

  //  Create Camera
  createCamera() {
    //  create camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.renderer.domElement.width / this.renderer.domElement.height,
      1,
      100
    );

    //  save context
    const that = this;

    //  add resize camera
    this.addResize("resize_camera", () => {
			that.camera.aspect = that.renderer.domElement.width/that.renderer.domElement.height;
			
			that.camera.updateProjectionMatrix();
    });
  },

  //  Create Light
  createLight() {
    this.light1 = new THREE.DirectionalLight(0xffffff, .5);
    this.scene.add(this.light1);
    this.light1.position.set(5, 5, 5);
  },

  //  Resize Frame
  createResize() {
    //  save context
    const that = this;

    //  create listener
    window.addEventListener("resize", () => that.resize())
  },

  //  Create Scene
  createScene() {
    this.scene = new THREE.Scene();
  },

  //  Remove func from updatePool
  removeResize(name) {
    delete this.updatePool[name];
  },

  //  Remove func from updatePool
  removeUpdate(name) {
    delete this.updatePool[name];
  },

  //  Resize Frame
  resize() {
    // this.renderer.render(this.scene, this.camera);

    // const that = this;

    // requestAnimationFrame(() => {
    //   that.update();
    // });

    //  run all function when resizing frame
    for(let key in this.resizePool) {
      this.resizePool[key]();
    }
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
