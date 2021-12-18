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
import { useNavigate } from "react-router-dom";
// COMPONENTS
import RGPDrequest from "./RGPDrequest";

const RGPD = ({ openRGPD, setOpenRGPD, openProfile }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openRGPDrequest, setOpenRGPDrequest] = useState(false);

  const handleClose = () => {
    setOpenRGPD(false);
    navigate("");
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
        hideBackdrop={openProfile}
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
            <h3>Politique de confidentialité (RGPD)</h3>
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
              Devant le développement des nouveaux outils de communication, il
              est nécessaire de porter une attention particulière à la
              protection de la vie privée. C’est pourquoi, nous nous engageons à
              respecter la confidentialité des renseignements personnels que
              nous collectons.
            </p>
            <br></br>
            <h4>Collecte des renseignements personnels</h4>
            <br></br>
            <p>• Prénom</p>
            <p>• Adresse électronique</p>
            <br></br>
            <p>
              Les renseignements personnels que nous collectons sont recueillis
              au travers de formulaires et grâce à l’interactivité établie entre
              vous et Vision 3D. Nous utilisons également, comme indiqué dans la
              section suivante, des fichiers témoins et/ou journaux pour réunir
              des informations vous concernant.
            </p>
            <br></br>
            <h4>Formulaires et interactivité :</h4>
            <br></br>
            <p>
              Vos renseignements personnels sont collectés par le biais de
              formulaire, à savoir :
            </p>
            <br></br>
            <p>• Formulaire d'inscription / de connexion à l'application</p>
            <br></br>
            <p>
              Nous utilisons les renseignements ainsi collectés pour les
              finalités suivantes :
            </p>
            <br></br>
            <p>• Informations / Offres promotionnelles</p>
            <p>• Statistiques</p>
            <p>• Contact</p>
            <br></br>
            <p>
              Nous utilisons les renseignements ainsi collectés pour les
              finalités suivantes :
            </p>
            <br></br>
            <p>• Informations ou pour des offres promotionnelles</p>
            <p>• Statistiques</p>
            <p>• Contact </p>
            <br></br>
            <h4>Droit d’opposition et de retrait</h4>
            <br></br>
            <p>
              Nous nous engageons à vous offrir un droit d’opposition et de
              retrait quant à vos renseignements personnels. Le droit
              d’opposition s’entend comme étant la possiblité offerte aux
              internautes de refuser que leurs renseignements personnels soient
              utilisées à certaines fins mentionnées lors de la collecte. Le
              droit de retrait s’entend comme étant la possibilité offerte aux
              internautes de demander à ce que leurs renseignements personnels
              ne figurent plus, par exemple, dans une liste de diffusion. Pour
              pouvoir exercer ces droits :
            </p>
            <br></br>
            <p>• Courriel : baptistelechat@outlook.fr</p>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              sx={{ mt: "16px", mb: "32px" }}
              onClick={() => setOpenRGPDrequest(true)}
            >
              <SecurityIcon sx={{ mr: "8px" }} />
              Droit d’opposition et de retrait
            </Fab>
            <h4>Droit d’accès</h4>
            <br></br>
            <p>
              Nous nous engageons à reconnaître un droit d’accès et de
              rectification aux personnes concernées désireuses de consulter,
              modifier, voire radier les informations les concernant.L’exercice
              de ce droit se fera :
            </p>
            <br></br>
            <p>• Courriel : baptistelechat@outlook.fr</p>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              sx={{ mt: "16px", mb: "32px" }}
              onClick={() => setOpenRGPDrequest(true)}
            >
              <SecurityIcon sx={{ mr: "8px" }} />
              Droit d’accès
            </Fab>
            <br></br>
            <h4>Sécurité</h4>
            <br></br>
            <p>
              Les renseignements personnels que nous collectons sont conservés
              dans un environnement sécurisé. Les personnes travaillant pour
              nous sont tenues de respecter la confidentialité de vos
              informations. Pour assurer la sécurité de vos renseignements
              personnels, nous avons recours aux mesures suivantes :
            </p>
            <br></br>
            <p>• Protocole SSL</p>
            <p>• Gestion des accès - personne autorisée</p>
            <p>• Gestion des accès - personne concernée</p>
            <p>• Identifiant / mot de passe</p>
            <br></br>
            <p>
              Nous nous engageons à maintenir un haut degré de confidentialité
              en intégrant les dernières innovations technologiques permettant
              d’assurer la confidentialité de vos transactions. Toutefois, comme
              aucun mécanisme n’offre une sécurité maximale, une part de risque
              est toujours présente lorsque l’on utilise Internet pour
              transmettre des renseignements personnels.
            </p>
            <br></br>
            <h4>Législation</h4>
            <br></br>
            <p>
              Nous nous engageons à respecter les dispositions législatives
              énoncées dans le Règlement Général sur la Protection des Données
              (RGPD) - Celui-ci trouve son application au sein de la loi
              “Informatique et libertés”.
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default RGPD;
