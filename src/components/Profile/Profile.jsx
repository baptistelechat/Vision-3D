import React, { useState } from "react";
// MATERIAL UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// MATERIAL UI ICON
import CloseIcon from "@mui/icons-material/Close";
import CopyrightIcon from "@mui/icons-material/Copyright";
import SubjectIcon from "@mui/icons-material/Subject";
import SecurityIcon from "@mui/icons-material/Security";
// COMPONENTS
import License from "./License";
import RGPD from "./RGPD";
import CGU from "./CGU";

const Profile = ({ openProfile, setOpenProfile }) => {
  const [openCGU, setOpenCGU] = useState(false);
  const [openRGPD, setOpenRGPD] = useState(false);
  const [openLicense, setOpenLicense] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpenProfile(false);
  };

  return (
    <React.Fragment>
      <CGU openCGU={openCGU} setOpenCGU={setOpenCGU} />
      <RGPD openRGPD={openRGPD} setOpenRGPD={setOpenRGPD} />
      <License openLicense={openLicense} setOpenLicense={setOpenLicense} />
      <Dialog fullScreen={fullScreen} onClose={handleClose} open={openProfile}>
        <DialogTitle>
          <h3 style={{ marginTop: "8px", marginBottom: "8px" }}>Mon Profil</h3>
          <IconButton
            style={{ right: "12px", top: "12px", position: "absolute" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ mb: "16px" }}>
            Retrouvez içi l'ensemble des informations relatives à votre compte
            Vision 3D
          </DialogContentText>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            sx={{ mt: "16px", mb: "16px" }}
          >
            <Fab
              variant="extended"
              color="primary"
              onClick={() => setOpenCGU(true)}
            >
              <SubjectIcon sx={{ mr: 1 }} />
              Conditions générales d'utilisation (CGU)
            </Fab>
            <Fab
              variant="extended"
              color="primary"
              onClick={() => setOpenRGPD(true)}
            >
              <SecurityIcon sx={{ mr: 1 }} />
              Politique de confidentialité (RGPD)
            </Fab>
            <Fab
              variant="extended"
              color="primary"
              onClick={() => setOpenLicense(true)}
            >
              <CopyrightIcon sx={{ mr: 1 }} />
              Licence (MIT License)
            </Fab>
          </Stack>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Profile;
