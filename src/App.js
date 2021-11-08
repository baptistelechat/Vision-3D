import React, { useEffect, useRef, useState } from "react";
import THREE from "./3D/three";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import "./App.css";

const App = () => {
  const loaderRef = useRef();
  const [IFCview, setIFCview] = useState(null);
  //Creates the Three.js scene
  
  useEffect(() => {
    const scene = new THREE.Scene();
    setIFCview(scene)
    loaderRef.current = new IFCLoader();
    loaderRef.current.ifcManager.setWasmPath("../../");
    // loadWasm();

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

  // const loadWasm = async () => {
  //   try {
  //     const wasm = await import("../public/web-ifc.wasm");
  //     setWasmFile(wasm);
  //   } catch (err) {
  //     console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
  //   }
  // };

  const handleChange = async (event) => {
    // Sets up the IFC loading
    // const ifcLoader = new IFCLoader();
    // ifcLoader.ifcManager.setWasmPath("../");
    const file = event.target.files[0];
    const ifcURL = URL.createObjectURL(file);
    console.log("loaderRef.current", loaderRef.current);
    const object = await loaderRef.current.loadAsync(ifcURL);
    IFCview.add(object)
    console.log(file);
  };

  return (
    <div>
      <input type="file" name="load" id="file-input" onChange={handleChange} />
      <canvas id="three-canvas"></canvas>
    </div>
  );
};

export default App;
