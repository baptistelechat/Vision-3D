import React, { useState, useEffect, useContext } from "react";
// MATERIAL UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
// MATERIAL UI ICON
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
// OTHER
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import base64 from "base-64";
import PropagateLoader from "react-spinners/PropagateLoader";

// FIREBASE
import { db } from "../utils/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { FirebaseContext } from "../utils/firebase/firebaseContext";

const SaveFileDialog = ({
  openSaveFileDialog,
  setOpenSaveFileDialog,
  fileData,
}) => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState(fileData.name);
  const [saveFile, setSaveFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { enqueueSnackbar } = useSnackbar();

  const { username, uid, projects } = useContext(FirebaseContext);
  const projectsCollectionRef = collection(db, "projects");

  const data = {
    name: fileName,
    size: fileData.size,
  };

  const handleClose = () => {
    setOpenSaveFileDialog(false);
    setSaveFile(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await setIsLoading(true);
    enqueueSnackbar(
      `${fileName}.ifc en cours de traitement, veuillez patienter...`,
      {
        variant: "info",
      }
    );

    const content = base64.encode(fileData.ifc);
    var payload = JSON.stringify({
      message: `🏡 Upload ${fileName}.ifc (${username})`,
      content: `${content}`,
    });

    const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;

    const config = {
      method: "put",
      url: `https://api.github.com/repos/${process.env.REACT_APP_GITHUB_FILES_STORAGE_REPOS}/contents/${username}_${uid}/${fileName}.ifc`,
      // url: `https://api.github.com/repos/baptistelechat/Vision-3D-files/git/blobs/0923ac2929841e0d19ed0de7028014bd87a47dc0`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    };

    await axios(config)
      .then(async (response) => {
        const url = JSON.stringify(response.data.content.sha).replaceAll(
          '"',
          ""
        );
        await addDoc(projectsCollectionRef, {
          ...data,
          ifc: url,
          username,
          uid,
          url: fileName.replaceAll(/\s/g, "_"),
        });
        await enqueueSnackbar(
          `${fileName}.ifc (${fileData.size} Mo) enregistré avec succès`,
          {
            variant: "success",
          }
        );
        await handleClose();
        await setFileName("");
        await setIsLoading(false);
        await navigate(`/${fileName.replace(/\s/g, "_")}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  useEffect(() => {
    setFileName(fileData.name.slice(0, -4));
  }, [fileData.name]);

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleClose}
      open={openSaveFileDialog}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          sx={{ mt: "8px" }}
        >
          <LoginIcon fontSize="large" />
          <h3>Enregistrer le fichier ?</h3>
        </Stack>
        <IconButton
          onClick={handleClose}
          style={{ right: "12px", top: "20px", position: "absolute" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: "16px", mb: "16px" }}>
        <DialogContentText id="alert-dialog-description" sx={{ mb: "16px" }}>
          Souhaitez vous enregistrer le fichier pour le recharger ultérieurement
          ?
        </DialogContentText>
        {saveFile ? (
          <React.Fragment>
            <TextField
              required
              error={projects
                .map((project) => {
                  return project.url.toLowerCase();
                })
                .includes(fileName.replaceAll(/\s/g, "_").toLowerCase())}
              helperText={
                projects
                  .map((project) => {
                    return project.url.toLowerCase();
                  })
                  .includes(fileName.replaceAll(/\s/g, "_").toLowerCase())
                  ? "Nom du projet déjà utilisé"
                  : ""
              }
              fullWidth
              id="name"
              label="Nom du projet"
              variant="outlined"
              value={fileName}
              onChange={handleFileNameChange}
              autoFocus
              sx={{ mt: "16px", mb: "16px" }}
            />

            <hr />
            <h4 style={{ color: "#1565c0" }}>
              Adresse du projet : {window.location.hostname}:
              {window.location.port ? window.location.port : ""}/{fileName.replace(/\s/g, "_")}
            </h4>
            <h4>Poids : {fileData.size} Mo</h4>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              {isLoading ? (
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                >
                  <PropagateLoader
                    color="#1565c0"
                    loading={isLoading}
                    size={20}
                  />
                  <h4>Enregistrement en cours ...</h4>
                </Stack>
              ) : (
                <Stack></Stack>
              )}
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <Fab
                  disabled={
                    fileName === "" ||
                    isLoading ||
                    projects
                      .map((project) => {
                        return project.url.toLowerCase();
                      })
                      .includes(fileName.replaceAll(/\s/g, "_").toLowerCase())
                  }
                  variant="extended"
                  size="medium"
                  color="primary"
                  aria-label="add"
                  sx={{ mt: "16px", mb: "16px", mr: "16px" }}
                  onClick={handleSubmit}
                >
                  <SaveIcon sx={{ mr: "8px" }} />
                  Enregistrer
                </Fab>
              </Stack>
            </Stack>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
                sx={{ mt: "16px", mb: "16px", mr: "16px" }}
                onClick={() => setSaveFile(true)}
              >
                <CheckIcon sx={{ mr: "8px" }} />
                OUI
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
                sx={{ mt: "16px", mb: "16px", mr: "16px" }}
                onClick={handleClose}
              >
                <DoNotDisturbIcon sx={{ mr: "8px" }} />
                NON
              </Fab>
            </Stack>
          </React.Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SaveFileDialog;
