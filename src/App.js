// REACT
import React, { useEffect, useRef, useState } from "react";
// MATERIAL UI
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
// COLORS
import { blue } from "@mui/material/colors";
// THREE.js
import THREE from "./utils/three/three";
import { IFCLoader } from "web-ifc-three/IFCLoader";
// COMPONENTS
import LoadFile from "./components/LoadFile.jsx";
import Settings from "./components/Settings";
// OTHER
import { SnackbarProvider } from "notistack";
import { Toaster } from "react-hot-toast";
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from "three-mesh-bvh";
// REDUX
import { useSelector } from "react-redux";
// STYLES
import "./App.css";

const App = () => {
  const ifcModels = useSelector((state) => state.ifcModels.value);

  const loaderRef = useRef();
  const cameraRef = useRef();
  const [IFCview, setIFCview] = useState(null);

  const isMobile =
    "ontouchstart" in document.documentElement &&
    navigator.userAgent.match(/Mobi/);

  //Creates the Three.js scene
  useEffect(() => {
    // Listen for window resize
    window.addEventListener(
      "resize",
      function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      },
      false
    );

    const scene = new THREE.Scene();
    setIFCview(scene);
    // Sets up the IFC loading
    loaderRef.current = new IFCLoader();
    loaderRef.current.ifcManager.useWebWorkers(true, "../../IFCWorker.js");
    loaderRef.current.ifcManager.setWasmPath("../../");
    loaderRef.current.ifcManager.applyWebIfcConfig({
      COORDINATE_TO_ORIGIN: true,
      USE_FAST_BOOLS: false,
    });

    // Sets up optimized picking
    loaderRef.current.ifcManager.setupThreeMeshBVH(
      computeBoundsTree,
      disposeBoundsTree,
      acceleratedRaycast
    );

    //Object to store the size of the viewport
    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    //Creates the camera (point of view of the user)
    const aspect = size.width / size.height;
    cameraRef.current = new THREE.PerspectiveCamera(75, aspect);
    cameraRef.current.position.z = 15;
    cameraRef.current.position.y = 13;
    cameraRef.current.position.x = 8;

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
    const controls = new THREE.OrbitControls(cameraRef.current, threeCanvas);
    controls.enableDamping = true;
    controls.target.set(-2, 0, 0);

    //Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, cameraRef.current);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  //Raycaster
  const raycaster = new THREE.Raycaster();
  raycaster.firstHitOnly = true;
  const mouse = new THREE.Vector2();

  const cast = (event) => {
    // Computes the position of the mouse on the screen
    const bounds = document
      .getElementById("three-canvas")
      .getBoundingClientRect();

    const x1 = event.clientX - bounds.left;
    const x2 = bounds.right - bounds.left;
    mouse.x = (x1 / x2) * 2 - 1;

    const y1 = event.clientY - bounds.top;
    const y2 = bounds.bottom - bounds.top;
    mouse.y = -(y1 / y2) * 2 + 1;

    // Places it on the camera pointing to the mouse
    raycaster.setFromCamera(mouse, cameraRef.current);

    // Casts a ray
    return raycaster.intersectObjects(ifcModels);
  };

  const pick = async (event) => {
    const found = cast(event)[0];
    if (found) {
      const index = found.faceIndex;
      const geometry = found.object.geometry;
      const ifc = loaderRef.current.ifcManager;
      const id = ifc.getExpressId(geometry, index);
      const modelID = found.object.modelID;
      const props = await ifc.getItemProperties(modelID, id);
      console.log(props);
      const type = await ifc.getTypeProperties(modelID, id);
      console.log(type);
      const material = await ifc.getMaterialsProperties(modelID, id);
      console.log(material);
      const sets = await ifc.getPropertySets(modelID, id);
      console.log(sets);
      const tree = await ifc.getSpatialStructure(modelID, id);
      console.log(tree);
    }
  };

  // Creates subset material
  const preselectMat = new THREE.MeshLambertMaterial({
    transparent: true,
    opacity: 0.5,
    color: 0x1565c0,
    depthTest: true,
  });

  const selectMat = new THREE.MeshLambertMaterial({
    transparent: true,
    opacity: 1,
    color: 0x1565c0,
    depthTest: true,
  });

  // Reference to the previous selection
  let preselectModel = { id: -1 };

  const highlight = (event, material, model) => {
    const found = cast(event)[0];
    if (found) {
      // Gets model ID
      model.id = found.object.modelID;

      // Gets Express ID
      const index = found.faceIndex;
      const geometry = found.object.geometry;
      const ifc = loaderRef.current.ifcManager;
      const id = ifc.getExpressId(geometry, index);

      // Creates subset
      loaderRef.current.ifcManager.createSubset({
        modelID: model.id,
        ids: [id],
        material: material,
        scene: IFCview,
        removePrevious: true,
      });
    } else {
      // Removes previous highlight
      loaderRef.current.ifcManager.removeSubset(model.id, IFCview, material);
    }
  };

  window.onmousemove = (event) => {
    if (isMobile) {
      pick(event);
      highlight(event, selectMat, selectModel);
    } else {
      highlight(event, preselectMat, preselectModel);
    }
  };

  const selectModel = { id: -1 };

  if (document.getElementById("three-canvas") !== null) {
    document.getElementById("three-canvas").ondblclick = (event) => {
      pick(event);
      highlight(event, selectMat, selectModel);
    };
  }

  function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    document.getElementById("dropZone").style.display = "flex";
  }

  function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    document.getElementById("dropZone").style.display = "flex";
  }

  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionComponent={Slide}
    >
      <Toaster position="bottom-left" reverseOrder={true} />
      <Settings />
      <LoadFile
        IFCview={IFCview}
        loaderRef={loaderRef}
        preselectMat={preselectMat}
        selectMat={selectMat}
      />
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          background: "rgb(227,242,253,0.5)", // Make sure this color has an opacity of less than 1
          backdropFilter: "blur(4px)", // This be the blur
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        <img
          src="../assets/icon/house.svg"
          alt="Vision"
          style={{
            height: "64px",
            width: "64px",
          }}
        />
        {isMobile ? null : (
          <Typography
            variant="h5"
            sx={{
              color: blue[800],
              fontWeight: "bold",
              fontSize: "1.75rem",
              marginLeft: "16px",
              marginRight: "8px",
            }}
          >
            Vision
          </Typography>
        )}
      </div>
      <canvas
        id="three-canvas"
        onDrop={(event) => dropHandler(event)}
        onDragOver={(event) => dragOverHandler(event)}
      ></canvas>
    </SnackbarProvider>
  );
};

export default App;
