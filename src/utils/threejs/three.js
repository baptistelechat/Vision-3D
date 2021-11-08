import * as THREE from "three";

window.THREE = THREE;

require("three/examples/js/controls/OrbitControls");

const threePackage = {
  ...THREE,
  OrbitControls: window.THREE.OrbitControls,
};

export default threePackage
