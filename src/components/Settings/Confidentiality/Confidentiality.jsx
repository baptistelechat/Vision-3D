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
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// COMPONENTS
import License from "./License";
import RGPD from "./RGPD";
import CGU from "./CGU";
// OTHER
import { useLocation, useNavigate } from "react-router-dom";

const Confidentiality = ({ openConfidentiality, setOpenConfidentiality }) => {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  const [openCGU, setOpenCGU] = useState(hash === "#cgu" ? true : false);
  const [openRGPD, setOpenRGPD] = useState(
    hash === "#rgpd" || hash === "#security" ? true : false
  );
  const [openLicense, setOpenLicense] = useState(
    hash === "#license" ? true : false
  );

  window.onhashchange = () => {
    setOpenCGU(hash === "#cgu" ? true : false);
    setOpenLicense(hash === "#rgpd" || hash === "#security" ? true : false);
    setOpenRGPD(hash === "#license" ? true : false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpenConfidentiality(false);
    navigate(pathname);
  };

  return (
    <React.Fragment>
      <CGU
        openCGU={openCGU}
        setOpenCGU={setOpenCGU}
        openConfidentiality={openConfidentiality}
      />
      <RGPD
        openRGPD={openRGPD}
        setOpenRGPD={setOpenRGPD}
        openConfidentiality={openConfidentiality}
      />
      <License
        openLicense={openLicense}
        setOpenLicense={setOpenLicense}
        openConfidentiality={openConfidentiality}
      />
      <Dialog
        fullScreen={fullScreen}
        onClose={handleClose}
        open={openConfidentiality}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            sx={{ mt: "8px" }}
          >
            <AccountBalanceIcon fontSize="large" />
            <h3>Confidentialité</h3>
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
            Retrouvez içi l'ensemble des informations relatives à la
            confidentialité
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
              onClick={() => {
                setOpenCGU(true);
                navigate("#cgu");
              }}
            >
              <SubjectIcon sx={{ mr: 1 }} />
              Conditions générales d'utilisation (CGU)
            </Fab>
            <Fab
              variant="extended"
              color="primary"
              onClick={() => {
                setOpenRGPD(true);
                navigate("#rgpd");
              }}
            >
              <SecurityIcon sx={{ mr: 1 }} />
              Politique de confidentialité (RGPD)
            </Fab>
            <Fab
              variant="extended"
              color="primary"
              onClick={() => {
                setOpenLicense(true);
                navigate("#license");
              }}
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

export default Confidentiality;
