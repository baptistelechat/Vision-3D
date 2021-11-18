// REACT
import React, { useEffect, useRef, useState } from "react";
// THREE.js
import THREE from "./utils/three";
import { IFCLoader } from "web-ifc-three/IFCLoader";
// COMPONENTS
import LoadFile from "./components/LoadFile.jsx";
// STYLES
import "./App.css";

const App = () => {
  const loaderRef = useRef();
  const [IFCview, setIFCview] = useState(null);
  //Creates the Three.js scene

  useEffect(() => {
    const scene = new THREE.Scene();
    setIFCview(scene);
    // Sets up the IFC loading
    loaderRef.current = new IFCLoader();
    loaderRef.current.ifcManager.setWasmPath("../../");

    //Object to store the size of the viewport
    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    //Creates the camera (point of view of the user)
    const aspect = size.width / size.height;
    const camera = new THREE.PerspectiveCamera(75, aspect);
    camera.position.z = 15;
    camera.position.y = 13;
    camera.position.x = 8;

    //Creates the lights of the scene
    const lightColor = 0xffffff;

    const ambientLight = new THREE.AmbientLight(lightColor, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(lightColor, 1);
    directionalLight.position.set(0, 10, 0);
    directionalLight.target.position.set(-5, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    //Sets up the renderer, fetching the canvas of the HTML
    const threeCanvas = document.getElementById("three-canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas: threeCanvas,
      alpha: true,
    });

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //Creates grids and axes in the scene
    const grid = new THREE.GridHelper(50, 30);
    scene.add(grid);

    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    scene.add(axes);

    //Creates the orbit controls (to navigate the scene)
    const controls = new THREE.OrbitControls(camera, threeCanvas);
    controls.enableDamping = true;
    controls.target.set(-2, 0, 0);

    //Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const resetView = () => {
    const selectedObject = IFCview.getObjectByName("IFCModel");
    if (!(selectedObject instanceof THREE.Object3D)) return false;
    // for better memory management and performance
    if (selectedObject.geometry) {
      selectedObject.geometry.dispose();
    }
    if (selectedObject.material) {
      if (selectedObject.material instanceof Array) {
        // for better memory management and performance
        selectedObject.material.forEach((material) => material.dispose());
      } else {
        // for better memory management and performance
        selectedObject.material.dispose();
      }
    }
    if (selectedObject.parent) {
      selectedObject.parent.remove(selectedObject);
    }
    // the parent might be the scene or another Object3D, but it is sure to be removed this way
    return true;
  };

  return (
    <div>
      <LoadFile IFCview={IFCview} loaderRef={loaderRef} resetView={resetView} />
      <canvas id="three-canvas"></canvas>
    </div>
  );
};

export default App;
