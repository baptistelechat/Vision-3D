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
import SecurityIcon from "@mui/icons-material/Security";
// OTHER
import { useNavigate, useLocation } from "react-router-dom";
// COMPONENTS
import RGPDrequest from "./RGPDrequest";

const RGPD = ({ openRGPD, setOpenRGPD, openConfidentiality }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openRGPDrequest, setOpenRGPDrequest] = useState(false);

  const handleClose = () => {
    setOpenRGPD(false);
    navigate(pathname);
  };

  return (
    <React.Fragment>
      <RGPDrequest
        openRGPDrequest={openRGPDrequest}
        setOpenRGPDrequest={setOpenRGPDrequest}
      />
      <Dialog
        fullScreen={fullScreen}
        onClose={handleClose}
        open={openRGPD}
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
            <SecurityIcon fontSize="large" />
            <h3>Politique de confidentialit√© (RGPD)</h3>
          </Stack>
          <IconButton
            onClick={handleClose}
            style={{ right: "12px", top: "20px", position: "absolute" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: "16px", mb: "16px" }}>
          <DialogContentText id="alert-dialog-description" sx={{ mb: "32px" }}>
            <h4>Introduction</h4>
            <br></br>
            <p>
              Devant le d√©veloppement des nouveaux outils de communication, il
              est n√©cessaire de porter une attention particuli√®re √† la
              protection de la vie priv√©e. C‚Äôest pourquoi, nous nous engageons √†
              respecter la confidentialit√© des renseignements personnels que
              nous collectons.
            </p>
            <br></br>
            <h4>Collecte des renseignements personnels</h4>
            <br></br>
            <p>‚ÄĘ Pr√©nom</p>
            <p>‚ÄĘ Adresse √©lectronique</p>
            <br></br>
            <p>
              Les renseignements personnels que nous collectons sont recueillis
              au travers de formulaires et gr√Ęce √† l‚Äôinteractivit√© √©tablie entre
              vous et Vision 3D. Nous utilisons √©galement, comme indiqu√© dans la
              section suivante, des fichiers t√©moins et/ou journaux pour r√©unir
              des informations vous concernant.
            </p>
            <br></br>
            <h4>Formulaires et interactivit√© :</h4>
            <br></br>
            <p>
              Vos renseignements personnels sont collect√©s par le biais de
              formulaire, √† savoir :
            </p>
            <br></br>
            <p>‚ÄĘ Formulaire d'inscription / de connexion √† l'application</p>
            <br></br>
            <p>
              Nous utilisons les renseignements ainsi collect√©s pour les
              finalit√©s suivantes :
            </p>
            <br></br>
            <p>‚ÄĘ Informations / Offres promotionnelles</p>
            <p>‚ÄĘ Statistiques</p>
            <p>‚ÄĘ Contact</p>
            <br></br>
            <p>
              Nous utilisons les renseignements ainsi collect√©s pour les
              finalit√©s suivantes :
            </p>
            <br></br>
            <p>‚ÄĘ Informations ou pour des offres promotionnelles</p>
            <p>‚ÄĘ Statistiques</p>
            <p>‚ÄĘ Contact </p>
            <br></br>
            <h4>Droit d‚Äôopposition et de retrait</h4>
            <br></br>
            <p>
              Nous nous engageons √† vous offrir un droit d‚Äôopposition et de
              retrait quant √† vos renseignements personnels. Le droit
              d‚Äôopposition s‚Äôentend comme √©tant la possiblit√© offerte aux
              internautes de refuser que leurs renseignements personnels soient
              utilis√©es √† certaines fins mentionn√©es lors de la collecte. Le
              droit de retrait s‚Äôentend comme √©tant la possibilit√© offerte aux
              internautes de demander √† ce que leurs renseignements personnels
              ne figurent plus, par exemple, dans une liste de diffusion. Pour
              pouvoir exercer ces droits :
            </p>
            <br></br>
            <p>‚ÄĘ Courriel : baptistelechat@outlook.fr</p>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              sx={{ mt: "16px", mb: "32px" }}
              onClick={() => setOpenRGPDrequest(true)}
            >
              <SecurityIcon sx={{ mr: "8px" }} />
              Droit d‚Äôopposition et de retrait
            </Fab>
            <h4>Droit d‚Äôacc√®s</h4>
            <br></br>
            <p>
              Nous nous engageons √† reconna√ģtre un droit d‚Äôacc√®s et de
              rectification aux personnes concern√©es d√©sireuses de consulter,
              modifier, voire radier les informations les concernant.L‚Äôexercice
              de ce droit se fera :
            </p>
            <br></br>
            <p>‚ÄĘ Courriel : baptistelechat@outlook.fr</p>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              sx={{ mt: "16px", mb: "32px" }}
              onClick={() => setOpenRGPDrequest(true)}
            >
              <SecurityIcon sx={{ mr: "8px" }} />
              Droit d‚Äôacc√®s
            </Fab>
            <br></br>
            <h4>S√©curit√©</h4>
            <br></br>
            <p>
              Les renseignements personnels que nous collectons sont conserv√©s
              dans un environnement s√©curis√©. Les personnes travaillant pour
              nous sont tenues de respecter la confidentialit√© de vos
              informations. Pour assurer la s√©curit√© de vos renseignements
              personnels, nous avons recours aux mesures suivantes :
            </p>
            <br></br>
            <p>‚ÄĘ Protocole SSL</p>
            <p>‚ÄĘ Gestion des acc√®s - personne autoris√©e</p>
            <p>‚ÄĘ Gestion des acc√®s - personne concern√©e</p>
            <p>‚ÄĘ Identifiant / mot de passe</p>
            <br></br>
            <p>
              Nous nous engageons √† maintenir un haut degr√© de confidentialit√©
              en int√©grant les derni√®res innovations technologiques permettant
              d‚Äôassurer la confidentialit√© de vos transactions. Toutefois, comme
              aucun m√©canisme n‚Äôoffre une s√©curit√© maximale, une part de risque
              est toujours pr√©sente lorsque l‚Äôon utilise Internet pour
              transmettre des renseignements personnels.
            </p>
            <br></br>
            <h4>L√©gislation</h4>
            <br></br>
            <p>
              Nous nous engageons √† respecter les dispositions l√©gislatives
              √©nonc√©es dans le R√®glement G√©n√©ral sur la Protection des Donn√©es
              (RGPD) - Celui-ci trouve son application au sein de la loi
              ‚ÄúInformatique et libert√©s‚ÄĚ.
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default RGPD;
