// REACT
import React, { useCallback } from "react";
// MATERIAL UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
// COLORS
import { blueGrey, blue } from "@mui/material/colors";
// MATERIAL UI ICON
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloseIcon from "@mui/icons-material/Close";
// REACT DROPZONE
import { useDropzone } from "react-dropzone";
// REDUX
import { useDispatch } from "react-redux";
import { addModel } from "../utils/redux/ifcModels";

const DropZoneDialog = ({
  openDropZone,
  setOpenDropZone,
  randomLottie,
  resetView,
  IFCview,
  loaderRef,
  loadingFileProgress,
  setOpenProgress,
  setPercentProgress,
  enqueueSnackbar,
  setOpenSaveFileDialog,
  setFileData,
}) => {
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        enqueueSnackbar(`Veuillez charger un seul fichier IFC`, {
          variant: "error",
        });
        document.getElementById("dropZone").style.display = "none";
      } else {
        // Do something with the files
        const file = acceptedFiles[0];
        const extension = file.name.substr(file.name.length - 3);
        if (extension === "ifc") {
          const loadFile = async () => {
            await randomLottie();
            setOpenProgress(true);
            await resetView();
            enqueueSnackbar(
              `${file.name} en cours de traitement, veuillez patienter...`,
              {
                variant: "info",
              }
            );
            loaderRef.current.ifcManager.setOnProgress((event) =>
              loadingFileProgress(event)
            );
            var ifc = "";
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (e) {
              ifc = e.target.result;
            };
            const ifcURL = URL.createObjectURL(file);
            const object = await loaderRef.current.loadAsync(ifcURL);
            object.name = "IFCModel";
            IFCview.add(object);
            dispatch(addModel(object));
            setOpenProgress(false);
            setPercentProgress("Chargement ...");
            await enqueueSnackbar(
              `${file.name} (${(file.size / Math.pow(10, 6)).toFixed(
                2
              )} Mo) chargé avec succès`,
              {
                variant: "success",
              }
            );
            await setFileData({
              name: file.name,
              size: (file.size / Math.pow(10, 6)).toFixed(2),
              ifc: ifc,
            });
            await setTimeout(setOpenSaveFileDialog, 1000, true);
          };
          setOpenDropZone(false);
          loadFile();
          document.getElementById("dropZone").style.display = "none";
        } else {
          enqueueSnackbar(`${file.name} n'est pas un fichier IFC valide`, {
            variant: "error",
          });
          document.getElementById("dropZone").style.display = "none";
        }
      }
    },
    [
      randomLottie,
      resetView,
      IFCview,
      loaderRef,
      loadingFileProgress,
      setOpenProgress,
      setPercentProgress,
      enqueueSnackbar,
      setOpenDropZone,
      setOpenSaveFileDialog,
      setFileData,
      dispatch,
    ]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handleClose = () => {
    setOpenDropZone(false);
  };

  return (
    <Dialog onClose={handleClose} open={openDropZone}>
      <DialogTitle>
        <h3 style={{ marginTop: "8px", marginBottom: "8px" }}>
          Glisser-déposer un fichier
        </h3>
        <IconButton
          style={{ right: "12px", top: "8px", position: "absolute" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ marginBottom: "16px" }}
        >
          Glisser-déposer un fichier IFC dans la zone ci-dessous.
        </DialogContentText>
        <div
          {...getRootProps()}
          id="dropZone"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isDragActive
              ? "rgb(21, 101, 192, 0.25)"
              : "rgba(0,0,0,0)",
            border: "2px dashed rgb(21, 101, 192)",
            borderRadius: "8px",
            width: "100%",
            height: "100%",
          }}
        >
          <input {...getInputProps()} />
          <AttachmentIcon
            sx={{
              fontSize: 80,
              marginTop: "32px",
              marginBottom: "32px",
              color: isDragActive ? blueGrey[800] : blue[800],
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DropZoneDialog;
