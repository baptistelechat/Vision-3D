// REACT
import React, { useState } from "react";
// THREE.js
import THREE from "../utils/three/three";
// NOTISTACK
import { useSnackbar } from "notistack";
// MATERIAL UI
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Fab from "@mui/material/Fab";
// COLORS
import { blueGrey, blue } from "@mui/material/colors";
// MATERIAL UI ICON
import CloudIcon from "@mui/icons-material/Cloud";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AttachmentIcon from "@mui/icons-material/Attachment";
import AddIcon from "@mui/icons-material/Add";
//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faGoogleDrive,
  faDropbox,
} from "@fortawesome/free-brands-svg-icons";
//COMPONENTS
import Progress from "./Progress";
import DropZoneDialog from "./DropZoneDialog";
import DropZone from "./DropZone";
// UTILS
import openLocalFile from "../utils/loadIfcFile/localFile";
import openOneDrivePicker from "../utils/loadIfcFile/oneDrive";
import openDropboxPicker from "../utils/loadIfcFile/dropbox";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addModel, removeModel } from "../utils/redux/ifcModels";

const LoadFile = ({ IFCview, loaderRef, preselectMat, selectMat }) => {
  const dispatch = useDispatch();
  const ifcModels = useSelector((state) => state.ifcModels.value);

  const [openProgress, setOpenProgress] = useState(false);
  const [percentProgress, setPercentProgress] = useState("Chargement ...");
  const [randomLottieFile, setRandomLottieFile] = useState(1);
  const [openDropZone, setOpenDropZone] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const isMobile =
    "ontouchstart" in document.documentElement &&
    navigator.userAgent.match(/Mobi/);

  const randomLottie = () => {
    const rand = Math.ceil(Math.random() * 20);
    console.log(rand);
    setRandomLottieFile(rand);
  };

  const resetView = () => {
    if (ifcModels[0] !== undefined) {
      loaderRef.current.ifcManager.removeSubset(
        ifcModels[0].mesh.modelID,
        IFCview,
        preselectMat
      );
      loaderRef.current.ifcManager.removeSubset(
        ifcModels[0].mesh.modelID,
        IFCview,
        selectMat
      );
      console.log("resetView");
    }
    const selectedObject = IFCview.getObjectByName("IFCModel");
    if (!(selectedObject instanceof THREE.Object3D)) return false;
    // for better memory management and performance
    if (selectedObject.geometry) {
      selectedObject.geometry.dispose();
      dispatch(removeModel());
    }
    if (selectedObject.material) {
      if (selectedObject.material instanceof Array) {
        // for better memory management and performance
        selectedObject.material.forEach((material) => material.dispose());
        dispatch(removeModel());
      } else {
        // for better memory management and performance
        selectedObject.material.dispose();
        dispatch(removeModel());
      }
    }
    if (selectedObject.parent) {
      selectedObject.parent.remove(selectedObject);
      dispatch(removeModel());
    }
    // the parent might be the scene or another Object3D, but it is sure to be removed this way
    return true;
  };

  const loadingFileProgress = (event) => {
    const progress = Math.ceil((event.loaded / event.total) * 100);
    console.log("Progress: ", progress, "%");
    setPercentProgress(progress + "%");
  };

  // The Browser API key obtained from the Google API Console.
  // Replace with your own Browser API key, or your own key.
  const developerKey = process.env.REACT_APP_GOOGLE_DRIVE_DEVELOPER_KEY;

  // The Client ID obtained from the Google API Console. Replace with your own Client ID.
  const clientId = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;

  // Replace with your own project number from console.developers.google.com.
  // See "Project number" under "IAM & Admin" > "Settings"
  const appId = process.env.REACT_APP_GOOGLE_DRIVE_APP_ID;

  // Scope to use to access user's Drive items.
  const scope = [process.env.REACT_APP_GOOGLE_DRIVE_SCOPES];

  var pickerApiLoaded = false;
  var oauthToken = null;

  const getData = (url, callback) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.responseText);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Authorization", "Bearer " + oauthToken);
    xmlhttp.send();
  };

  // Use the Google API Loader script to load the google.picker script.
  const openGoogleDrivePicker = () => {
    window.gapi.load("auth", { callback: onAuthApiLoad });
    window.gapi.load("picker", { callback: onPickerApiLoad });
  };

  const onAuthApiLoad = () => {
    window.gapi.auth.authorize(
      {
        client_id: clientId,
        scope: scope,
        immediate: false,
      },
      handleAuthResult
    );
  };

  const onPickerApiLoad = () => {
    pickerApiLoaded = true;
    createPicker();
  };

  const handleAuthResult = (authResult) => {
    if (authResult && !authResult.error) {
      oauthToken = authResult.access_token;
      createPicker();
    }
  };

  // Create and render a Picker object for searching images.
  const createPicker = () => {
    if (pickerApiLoaded && oauthToken) {
      var view = new window.google.picker.View(
        window.google.picker.ViewId.DOCS
      );
      // view.setMimeTypes("image/png,image/jpeg,image/jpg");
      view.setMimeTypes("application/octet-stream");
      var picker = new window.google.picker.PickerBuilder()
        .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
        // .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(appId)
        .setOAuthToken(oauthToken)
        .setLocale("fr")
        .addView(view)
        .addView(new window.google.picker.DocsUploadView())
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .build();
      picker.setVisible(true);
    }
  };

  // A simple callback implementation.
  const pickerCallback = (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      var fileId = data.docs[0].id;
      var url = "https://www.googleapis.com/drive/v2/files/" + fileId;
      getData(url, async (responseText) => {
        var metaData = JSON.parse(responseText);
        if (metaData.title.substr(metaData.title.length - 3) === "ifc") {
          getData(metaData.downloadUrl, async (text) => {
            console.log(text);
            const blob = new Blob([text]);
            await randomLottie();
            await setOpenProgress(true);
            await resetView();
            enqueueSnackbar(
              `${metaData.title} en cours de traitement, veuillez patienter...`,
              {
                variant: "info",
              }
            );
            loaderRef.current.ifcManager.setOnProgress((event) =>
              loadingFileProgress(event)
            );
            const ifcURL = URL.createObjectURL(blob);
            const object = await loaderRef.current.loadAsync(ifcURL);
            object.name = "IFCModel";
            IFCview.add(object);
            dispatch(addModel(object));
            setOpenProgress(false);
            setPercentProgress("Chargement ...");

            enqueueSnackbar(
              `${metaData.title} (${(
                metaData.fileSize / Math.pow(10, 6)
              ).toFixed(2)} Mo) chargé avec succès`,
              {
                variant: "success",
              }
            );
          });
        } else {
          enqueueSnackbar(
            `${metaData.title} (${(metaData.fileSize / Math.pow(10, 6)).toFixed(
              2
            )} Mo) n'est pas un fichier IFC`,
            {
              variant: "error",
            }
          );
          await setOpenProgress(false);
          if (!isMobile) {
            document.getElementById("dropZone").style.display = "none";
          }
        }
      });
    }
  };

  const UploadLocalFileSpeedDialAction = (props) => {
    return (
      <React.Fragment>
        <input
          accept=".ifc"
          style={{ display: "none" }}
          id="local-button-file"
          type="file"
          onChange={(event) =>
            openLocalFile(
              event,
              randomLottie,
              resetView,
              IFCview,
              loaderRef,
              loadingFileProgress,
              setOpenProgress,
              setPercentProgress,
              enqueueSnackbar,
              dispatch,
              addModel
            )
          }
        />
        <label htmlFor="local-button-file">
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

  const UploadLocalFileOnMobile = (props) => {
    return (
      <React.Fragment>
        <input
          accept=".ifc"
          style={{ display: "none" }}
          id="local-button-file-mobile"
          type="file"
          onChange={(event) =>
            openLocalFile(
              event,
              randomLottie,
              resetView,
              IFCview,
              loaderRef,
              loadingFileProgress,
              setOpenProgress,
              setPercentProgress,
              enqueueSnackbar,
              dispatch,
              addModel
            )
          }
        />
        <label htmlFor="local-button-file-mobile">
          <Fab
            color="primary"
            disableFocusRipple={true}
            sx={{
              position: "absolute",
              bottom: 24,
              right: 24,
              // backgroundColor: blue[00],
              color: "white",
            }}
            component="span"
            {...props}
          >
            <AddIcon />
          </Fab>
        </label>
      </React.Fragment>
    );
  };

  const UploadGDriveFileSpeedDialAction = (props) => {
    return (
      <React.Fragment>
        <button
          style={{ display: "none" }}
          id="gdrive-button-file"
          onClick={openGoogleDrivePicker}
        >
          Show Google Drive Picker
        </button>
        <label htmlFor="gdrive-button-file">
          <SpeedDialAction
            icon={
              <FontAwesomeIcon
                icon={faGoogleDrive}
                style={{ color: blue[800] }}
              />
            }
            tooltipTitle="Google Drive"
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
          onClick={() =>
            openOneDrivePicker(
              randomLottie,
              resetView,
              IFCview,
              loaderRef,
              loadingFileProgress,
              setOpenProgress,
              setPercentProgress,
              enqueueSnackbar,
              dispatch,
              addModel
            )
          }
        />
      ),
      name: "OneDrive",
      disabled: false,
    },
    {
      name: "Google Drive",
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faDropbox}
          style={{ color: blue[800] }}
          onClick={() =>
            openDropboxPicker(
              randomLottie,
              resetView,
              getData,
              IFCview,
              loaderRef,
              loadingFileProgress,
              setOpenProgress,
              setPercentProgress,
              enqueueSnackbar,
              dispatch,
              addModel
            )
          }
        />
      ),
      name: "DropBox",
      disabled: false,
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
      {isMobile ? (
        <UploadLocalFileOnMobile />
      ) : (
        <div>
          <DropZoneDialog
            openDropZone={openDropZone}
            setOpenDropZone={setOpenDropZone}
            randomLottie={randomLottie}
            resetView={resetView}
            IFCview={IFCview}
            loaderRef={loaderRef}
            loadingFileProgress={loadingFileProgress}
            setOpenProgress={setOpenProgress}
            setPercentProgress={setPercentProgress}
            enqueueSnackbar={enqueueSnackbar}
          />
          <DropZone
            randomLottie={randomLottie}
            resetView={resetView}
            IFCview={IFCview}
            loaderRef={loaderRef}
            loadingFileProgress={loadingFileProgress}
            setOpenProgress={setOpenProgress}
            setPercentProgress={setPercentProgress}
            enqueueSnackbar={enqueueSnackbar}
          />
          <SpeedDial
            ariaLabel="SpeedDial"
            sx={{ position: "absolute", bottom: 24, right: 24 }}
            icon={<SpeedDialIcon />}
            direction={"up"}
          >
            <UploadLocalFileSpeedDialAction
              FabProps={{
                size: "large",
                style: {
                  fontSize: "1.5em",
                  backgroundColor: blue[50],
                },
              }}
            />
            <SpeedDialAction
              key="DropZone"
              icon={
                <AttachmentIcon
                  sx={{ fontSize: 30, color: blue[800] }}
                  onClick={() => setOpenDropZone(true)}
                />
              }
              tooltipTitle="DropZone"
              FabProps={{
                size: "large",
                style: {
                  fontSize: "1.5em",
                  backgroundColor: blue[50],
                },
                disabled: false,
              }}
            />
            {actions.map((action) =>
              action.name === "Google Drive" ? (
                <UploadGDriveFileSpeedDialAction
                  FabProps={{
                    size: "large",
                    style: {
                      fontSize: "1.5em",
                      backgroundColor: blue[50],
                    },
                  }}
                />
              ) : (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  FabProps={{
                    size: "large",
                    style: {
                      fontSize: "1.5em",
                      backgroundColor: action.disabled
                        ? blueGrey[50]
                        : blue[50],
                    },
                    disabled: action.disabled,
                  }}
                />
              )
            )}
          </SpeedDial>
        </div>
      )}
    </div>
  );
};

export default LoadFile;
