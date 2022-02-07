import React, { useContext } from "react";
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
// MATERIAL UI ICON
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
// FIREBASE
import { FirebaseContext } from "../../utils/firebase/firebaseContext";
// OTHER
import { useNavigate } from "react-router-dom";

const Profile = ({ openProfile, setOpenProfile }) => {
  const navigate = useNavigate();

  const { projects } = useContext(FirebaseContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = [
    { field: "name", headerName: "Nom du projet", width: 250 },
    { field: "size", headerName: "Poids", width: 100 },
    { field: "ifc", headerName: "Lien", width: 150 },
  ];

  const handleClose = () => {
    setOpenProfile(false);
    navigate("");
  };

  return (
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
  );
};

export default Profile;
