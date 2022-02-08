// REACT
import React, { useState, useEffect, useContext } from "react";
// MATERIAL UI
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// NOTISTACK
import { useSnackbar } from "notistack";
// MATERIAL UI ICON
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import ShareIcon from "@mui/icons-material/Share";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// COLORS
import { blueGrey, blue } from "@mui/material/colors";
// OTHER
import { CopyToClipboard } from "react-copy-to-clipboard"; // OTHER
import { useLocation, useNavigate } from "react-router-dom";
//COMPONENTS
import Confidentiality from "./Confidentiality/Confidentiality.jsx";
import Profile from "./Profile.jsx";
// FIREBASE
import { FirebaseContext } from "../../utils/firebase/firebaseContext";

const Settings = ({IFCview, loaderRef, preselectMat, selectMat}) => {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const isMobile =
    "ontouchstart" in document.documentElement &&
    navigator.userAgent.match(/Mobi/);
  const [supportPWA, setSupportPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [orientation, setOrientation] = useState(
    isMobile && (window.orientation === 90 || window.orientation === -90)
      ? "left"
      : (isMobile &&
          (window.orientation !== 90 || window.orientation !== -90)) ||
        isSmallDevice
      ? "down"
      : "left"
  );
  const [openConfidentiality, setOpenConfidentiality] = useState(
    hash === "#confidentialite" ? true : false
  );
  const [openProfile, setOpenProfile] = useState(
    hash === "#profil" ? true : false
  );

  window.onhashchange = () => {
    setOpenConfidentiality(hash === "#confidentialite" ? true : false);
    setOpenProfile(hash === "#profil" ? true : false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const { currentUser } = useContext(FirebaseContext);

  window.addEventListener("resize", () => {
    console.log();
    setOrientation(
      isMobile && (window.orientation === 90 || window.orientation === -90)
        ? "left"
        : (isMobile &&
            (window.orientation !== 90 || window.orientation !== -90)) ||
          isSmallDevice
        ? "down"
        : "left"
    );
  });

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const install = (event) => {
    event.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  const clipboard = `IFC
Visitez IFC ! Un visionneuse IFC en ligne

Découvrez également d'autres fonctionnalités ...
  
Application créée par Baptiste LECHAT et Matthieu LECHAT.
  
https://create-react-app-ifcjs.vercel.app/`;

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Vision 3D",
          text: `Visitez Vision 3D ! Une visionneuse IFC en ligne pour des modèles BIM

Découvrez également d'autres fonctionnalités ...

Application créée par Baptiste LECHAT et Matthieu LECHAT`,
          url: "https://vision-3d.vercel.app/",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("navigator.share not supported by the browser");
      enqueueSnackbar(`Lien de partage copié dans le presse-papier`, {
        variant: "success",
      });
    }
  };

  const openLink = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const actions = [
    {
      icon: (
        <AccountBalanceIcon
          sx={{ color: blue[800] }}
          onClick={() => {
            setOpenConfidentiality(true);
            navigate("#confidentialite");
          }}
        />
      ),
      name: "Confidentialité",
      disabled: false,
    },
    {
      icon: (
        <CopyToClipboard text={clipboard}>
          <ShareIcon sx={{ color: blue[800] }} onClick={share} />
        </CopyToClipboard>
      ),
      name: "Partager l'application",
      disabled: false,
    },
    {
      icon: (
        <GitHubIcon
          sx={{ color: blue[800] }}
          onClick={() =>
            openLink("https://github.com/baptistelechat/create-react-app-ifcjs")
          }
        />
      ),
      name: "GitHub",
      disabled: false,
    },
    {
      icon: (
        <EmailIcon
          sx={{ color: blue[800] }}
          onClick={() => openLink("mailto:baptistelechat@outlook.fr")}
        />
      ),
      name: "Contact",
      disabled: false,
    },
  ];

  return (
    <React.Fragment>
      <Confidentiality
        openConfidentiality={openConfidentiality}
        setOpenConfidentiality={setOpenConfidentiality}
      />

      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        IFCview={IFCview}
        loaderRef={loaderRef}
        preselectMat={preselectMat}
        selectMat={selectMat}
      />

      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", top: 24, right: 24 }}
        icon={
          <SpeedDialIcon icon={<SettingsIcon />} openIcon={<CloseIcon />} />
        }
        direction={orientation}
      >
        {supportPWA ? (
          <SpeedDialAction
            key="Installer PWA"
            icon={
              <AutoAwesomeIcon sx={{ color: blue[800] }} onClick={install} />
            }
            tooltipTitle="Installer PWA"
            FabProps={{
              size: "large",
              style: {
                fontSize: "1.5em",
                backgroundColor: blue[50],
              },
            }}
          />
        ) : null}
        {currentUser ? (
          <SpeedDialAction
            key="Mon profil"
            icon={
              <PersonIcon
                sx={{ color: blue[800] }}
                onClick={() => {
                  setOpenProfile(true);
                  navigate("#profil");
                }}
              />
            }
            tooltipTitle="Mon profil"
            FabProps={{
              size: "large",
              style: {
                fontSize: "1.5em",
                backgroundColor: blue[50],
              },
            }}
          />
        ) : null}
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            FabProps={{
              size: "large",
              style: {
                fontSize: "1.5em",
                backgroundColor: action.disabled ? blueGrey[50] : blue[50],
              },
              disabled: action.disabled,
            }}
          />
        ))}
      </SpeedDial>
    </React.Fragment>
  );
};

export default Settings;
