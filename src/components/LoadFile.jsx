// REACT
import React, { useState } from "react";
// THREE.js
import THREE from "../utils/three/three";
// MATERIAL UI
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// COLORS
import { blueGrey, blue } from "@mui/material/colors";
// MATERIAL UI ICON
import CloudIcon from "@mui/icons-material/Cloud";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faGoogleDrive,
  faDropbox,
} from "@fortawesome/free-brands-svg-icons";
//COMPONENTS
import Progress from "./Progress";

const LoadFile = ({ IFCview, loaderRef }) => {
  const [openProgress, setOpenProgress] = useState(false);
  const [percentProgress, setPercentProgress] = useState("Chargement ...");
  const [randomLottieFile, setRandomLottieFile] = useState(1);

  const randomLottie = () => {
    const rand = Math.ceil(Math.random() * 20);
    console.log(rand);
    setRandomLottieFile(rand);
  };

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

  const loadingFileProgress = (event) => {
    const progress = Math.ceil((event.loaded / event.total) * 100);
    console.log("Progress: ", progress, "%");
    setPercentProgress(progress + "%");
  };

  const openOneDrivePicker = async () => {
    let odOptions = {
      clientId: process.env.REACT_APP_CLIENT_ID,
      action: "download",
      // multiSelect: true,
      advanced: {},
      success: async function (files) {
        // console.log(files.value[0]["@microsoft.graph.downloadUrl"]);
        await randomLottie();
        await resetView();
        const ifcURL = files.value[0]["@microsoft.graph.downloadUrl"];
        loaderRef.current.ifcManager.setOnProgress((event) =>
          loadingFileProgress(event)
        );
        const object = await loaderRef.current.loadAsync(ifcURL);
        object.name = "IFCModel";
        IFCview.add(object);
        setOpenProgress(false);
        setPercentProgress("Chargement ...");
      },
      progress: function (percent) {
        console.log(percent);
      },
      cancel: function () {
        /* cancel handler */
        setOpenProgress(false);
        setPercentProgress("Chargement ...");
      },
      error: function (error) {
        setOpenProgress(false);
        setPercentProgress("Chargement ...");
        console.log(error);
      },
    };
    await setOpenProgress(true);
    await window.OneDrive.open(odOptions);
  };

  const openLocalFile = async (event) => {
    await randomLottie();
    await setOpenProgress(true);
    const { target } = event;
    if (target.value.length > 0) {
      await resetView();
      const file = event.target.files[0];
      loaderRef.current.ifcManager.setOnProgress((event) =>
        loadingFileProgress(event)
      );
      const ifcURL = URL.createObjectURL(file);
      const object = await loaderRef.current.loadAsync(ifcURL);
      object.name = "IFCModel";
      IFCview.add(object);
      setOpenProgress(false);
      setPercentProgress("Chargement ...");
    }
  };

  const UploadSpeedDialAction = (props) => {
    return (
      <React.Fragment>
        <input
          accept=".ifc"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={openLocalFile}
        />
        <label htmlFor="icon-button-file">
          <SpeedDialAction
            icon={<FileDownloadIcon sx={{ fontSize: 30, color: blue[800] }} />}
            tooltipTitle="Charger"
            component="span"
            {...props}
          ></SpeedDialAction>
        </label>
      </React.Fragment>
    );
  };

  const actions = [
    {
      icon: (
        <CloudIcon
          icon={faWindows}
          sx={{ color: blue[800] }}
          onClick={openOneDrivePicker}
        />
      ),
      name: "OneDrive",
      disabled: false,
    },
    {
      icon: <FontAwesomeIcon icon={faGoogleDrive} sx={{ color: blue[800] }} />,
      name: "Google Drive",
      disabled: true,
    },
    {
      icon: <FontAwesomeIcon icon={faDropbox} sx={{ color: blue[800] }} />,
      name: "DropBox",
      disabled: true,
    },
  ];

  return (
    <div>
      <Progress
        openProgress={openProgress}
        setOpenProgress={setOpenProgress}
        percentProgress={percentProgress}
        randomLottieFile={randomLottieFile}
      />
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
      >
        <UploadSpeedDialAction
          FabProps={{
            size: "large",
            style: {
              fontSize: "1.5em",
              backgroundColor: blue[50],
            },
          }}
        />
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            FabProps={{
              size: "large",
              style: {
                fontSize: "1.5em",
                backgroundColor: action.disabled ? blueGrey[50] : blue[50],
              },
              disabled: action.disabled,
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default LoadFile;
