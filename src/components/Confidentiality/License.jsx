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
import TranslateIcon from "@mui/icons-material/Translate";
import CopyrightIcon from "@mui/icons-material/Copyright";
// OTHER
import { useNavigate } from "react-router-dom";

const License = ({ openLicense, setOpenLicense, openConfidentiality }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [translate, setTranslate] = useState(true);
  const urlMIT =
    "https://github.com/baptistelechat/Vision-3D/blob/main/LICENSE.txt";

  const openLink = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const handleClose = () => {
    setOpenLicense(false);
    navigate("");
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleClose}
      open={openLicense}
      hideBackdrop={openConfidentiality}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          sx={{ mt: "8px" }}
        >
          <CopyrightIcon fontSize="large" />
          <h3>Licence MIT</h3>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}
          style={{ right: "12px", top: "20px", position: "absolute" }}
        >
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => setTranslate(!translate)}
          >
            <TranslateIcon sx={{ mr: "8px" }} />
            Traduire
          </Fab>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ mt: "16px", mb: "16px" }}>
        {translate ? (
          <DialogContentText id="alert-dialog-description" sx={{ mb: "32px" }}>
            <h4>Copyright (c) 2021 Baptiste LECHAT and Matthieu LECHAT</h4>
            <br></br>
            <p>
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the "Software"), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>
            <br></br>
            <p>
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
            </p>
            <br></br>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </p>
          </DialogContentText>
        ) : (
          <DialogContentText id="alert-dialog-description" sx={{ mb: "32px" }}>
            <h4>Copyright (c) 2021 Baptiste LECHAT et Matthieu LECHAT</h4>
            <br></br>
            <p>
              L'autorisation est accordée par la présente, gratuitement, à toute
              personne obtenant une copie de ce logiciel et de la documentation
              associée, de traiter le logiciel sans restriction, y compris, mais
              sans s'y limiter, de droits d'utilisation, de copie, de
              modification, de fusion, de publication, de distribution, de
              concession des sous-licences et/ou de vente des copies du
              logiciel, et d'autoriser les personnes à qui le logiciel est
              détenu de le faire, le logiciel est fourni, sous réserve des
              conditions suivantes :
            </p>
            <br></br>
            <p>
              L'avis de copyright ci-dessus et cet avis d'autorisation doivent
              être inclus dans toutes les copies ou parties substantielles du
              logiciel.
            </p>
            <br></br>
            <p>
              LE LOGICIEL EST FOURNI "TEL QUEL", SANS GARANTIE D'AUCUNE SORTE,
              EXPRESSE OU IMPLICITE, Y COMPRIS, MAIS SANS S'Y LIMITER, LES
              GARANTIES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE
              PARTICULIER ET DE NON-VIOLATION. EN AUCUN CAS, LES AUTEURS OU LES
              DÉTENTEURS DE DROITS D'AUTEUR NE POURRONT ÊTRE TENUS RESPONSABLES
              DE TOUTE RÉCLAMATION, DE TOUT DOMMAGE OU DE TOUTE AUTRE
              RESPONSABILITÉ, QUE CE SOIT DANS LE CADRE D'UNE ACTION
              CONTRACTUELLE, DÉLICTUELLE OU AUTRE, DÉCOULANT DE OU LIÉE AU
              LOGICIEL OU À SON UTILISATION OU À D'AUTRES TRANSACTIONS.
            </p>
          </DialogContentText>
        )}
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          onClick={() => openLink(urlMIT)}
        >
          <CopyrightIcon sx={{ mr: "8px" }} />
          Consulter la licence en ligne
        </Fab>
      </DialogContent>
    </Dialog>
  );
};

export default License;
