import React, { useContext, useState, useCallback } from "react";
// MATERIAL UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
// MATERIAL UI ICON
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
// FIREBASE
import { FirebaseContext } from "../../utils/firebase/firebaseContext";
import { db } from "../../utils/firebase/firebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";
// OTHER
import { useLocation, useNavigate } from "react-router-dom";
import THREE from "../../utils/three/three";
import { useSnackbar } from "notistack";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addModel, removeModel } from "../../utils/redux/ifcModels";
// UTILS
import firebase from "../../utils/loadIfcFile/firebase";
//COMPONENTS
import Progress from "../Progress.jsx";

const Profile = ({
  openProfile,
  setOpenProfile,
  IFCview,
  loaderRef,
  preselectMat,
  selectMat,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const ifcModels = useSelector((state) => state.ifcModels.value);

  const projectsCollectionRef = collection(db, "projects");

  const { pathname } = useLocation();
  // const location = useLocation();
  const navigate = useNavigate();

  const [openProgress, setOpenProgress] = useState(false);
  const [randomLottieFile, setRandomLottieFile] = useState(1);
  const [percentProgress, setPercentProgress] = useState("Chargement ...");

  const { projects } = useContext(FirebaseContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const randomLottie = () => {
    const rand = Math.ceil(Math.random() * 20);
    console.log(rand);
    setRandomLottieFile(rand);
  };

  const loadingFileProgress = useCallback((event) => {
    const progress = Math.ceil((event.loaded / event.total) * 100);
    console.log("Progress: ", progress, "%");
    setPercentProgress(progress + "%");
  }, []);

  const resetView = useCallback(() => {
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
  }, [dispatch, loaderRef, ifcModels, IFCview, preselectMat, selectMat]);

  const handleClose = useCallback(() => {
    setOpenProfile(false);
  }, [setOpenProfile]);

  const handleOpenFileFromFirebase = useCallback(
    async (file) => {
      await navigate(`/${file.url}`);
      await handleClose();
      await firebase(
        randomLottie,
        resetView,
        IFCview,
        loaderRef,
        loadingFileProgress,
        setOpenProgress,
        setPercentProgress,
        enqueueSnackbar,
        dispatch,
        addModel,
        file
      );
    },
    [
      navigate,
      handleClose,
      resetView,
      IFCview,
      loaderRef,
      loadingFileProgress,
      dispatch,
      enqueueSnackbar,
    ]
  );

  const request = async () => {
    console.log("🚗 route :", pathname);

    if (pathname !== "/") {
      const q = await query(
        projectsCollectionRef,
        where("url", "==", pathname.replace("/", ""))
      );
      const querySnapshot = await getDocs(q);
      const projects = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(projects);
      if (projects[0] !== undefined) {
        console.log(projects[0]);
        handleOpenFileFromFirebase(projects[0]);
      }
    }
  };

  window.onload = request;

  const columns = [
    { field: "name", headerName: "Nom du projet", width: 300 },
    { field: "size", headerName: "Poids", width: 100 },
    {
      field: "open",
      headerName: "Charger",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleOpenFileFromFirebase(cellValues.row);
            }}
          >
            Charger
          </Button>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Progress
        openProgress={openProgress}
        setOpenProgress={setOpenProgress}
        percentProgress={percentProgress}
        randomLottieFile={randomLottieFile}
      />
      <Dialog fullScreen={fullScreen} onClose={handleClose} open={openProfile}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            sx={{ mt: "8px" }}
          >
            <PersonIcon fontSize="large" />
            <h3>Mon Profil</h3>
          </Stack>
          <IconButton
            style={{ right: "12px", top: "12px", position: "absolute" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ mb: "16px" }}>
            Liste des projets enregistrés sur le site
          </DialogContentText>
          <div style={{ height: 400, width: 525 }}>
            <DataGrid
              rows={projects}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
            />
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Profile;
