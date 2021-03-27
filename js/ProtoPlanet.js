import * as THREE from "./three.module.js";

export default class ProtoPlanet {
  constructor(size, material){
    this._size = size;
    this._material = material;
  }

  generate(){
    const proto = new THREE.Mesh(new THREE.SphereGeometry(this._size, 80, 80), new THREE.MeshPhongMaterial(this._material));
    return proto;
  }
}