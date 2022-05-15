import Viewer from "./viewer.js";
import * as THREE from "./three.module.js";

export default class {

  constructor() {
    Viewer.init();
    this.createObject();
  }

  //  Create Simple object
  createObject() {
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({color: "gray"})
    );

    //   add object to scene
    Viewer.scene.add(this.object);

    //  move object
    this.object.position.z = -5;

    //  Save context
    const that = this;

    //  add func to UpdatePool
    Viewer.setUpdate(
      "rotate_object",
      () => that.object.rotation.y += .01
    );
  }
}
