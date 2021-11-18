import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CloudIcon from "@mui/icons-material/Cloud";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { blueGrey, blue } from "@mui/material/colors";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faGoogleDrive,
  faDropbox,
} from "@fortawesome/free-brands-svg-icons";

const LoadFile = ({ IFCview, loaderRef, resetView }) => {
  function UploadSpeedDialAction(props) {
    return (
      <React.Fragment>
        <input
          accept="*.ifc"
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
  }

  const openOneDrivePicker = async () => {
    let odOptions = {
      clientId: process.env.REACT_APP_CLIENT_ID,
      action: "download",
      // multiSelect: true,
      advanced: {},
      success: async function (files) {
        // console.log(files.value[0]["@microsoft.graph.downloadUrl"]);
        await resetView();
        const ifcURL = files.value[0]["@microsoft.graph.downloadUrl"];
        const object = await loaderRef.current.loadAsync(ifcURL);
        object.name = "IFCModel";
        IFCview.add(object);
      },
      progress: function (percent) {
        console.log(percent);
      },
      cancel: function () {
        /* cancel handler */
      },
      error: function (error) {
        console.log(error);
      },
    };
    await window.OneDrive.open(odOptions);
  };

  const openLocalFile = async (event) => {
    const { target } = event;
    if (target.value.length > 0) {
      await resetView();
      const file = event.target.files[0];
      const ifcURL = URL.createObjectURL(file);
      const object = await loaderRef.current.loadAsync(ifcURL);
      object.name = "IFCModel";
      IFCview.add(object);
    }
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
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
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
