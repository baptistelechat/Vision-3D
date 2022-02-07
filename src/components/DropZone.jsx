// REACT
import React, { useCallback } from "react";
//MATERIAL UI
import Typography from "@mui/material/Typography";
// MATERIAL UI ICON
import AttachmentIcon from "@mui/icons-material/Attachment";
// COLORS
import { blueGrey } from "@mui/material/colors";
// REACT DROPZONE
import { useDropzone } from "react-dropzone";
// REDUX
import { useDispatch } from "react-redux";
import { addModel } from "../utils/redux/ifcModels";

const DropZone = ({
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

  return (
    <div
      {...getRootProps()}
      id="dropZone"
      style={{
        display: isDragActive ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDragActive
          ? "rgb(21, 101, 192, 0.25)"
          : "rgba(0,0,0,0)",
        width: "100vw",
        height: "100vh",
        padding: "5%",
      }}
    >
      <input {...getInputProps()} />
      <div
        style={{
          display: isDragActive ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "4px dashed rgb(21, 101, 192)",
          borderRadius: "16px",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: blueGrey[800],
            fontWeight: "bold",
          }}
        >
          Relâcher pour charger le fichier IFC
        </Typography>
        <AttachmentIcon
          sx={{
            display: isDragActive ? "" : "none",
            fontSize: 120,
            color: blueGrey[800],
          }}
        />
      </div>
    </div>
  );
};

export default DropZone;
