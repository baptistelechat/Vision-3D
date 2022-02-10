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
// OTHER
import { CopyToClipboard } from "react-copy-to-clipboard"; // OTHER
import { useLocation, useNavigate } from "react-router-dom";
//COMPONENTS
import Confidentiality from "./Confidentiality/Confidentiality.jsx";
import Profile from "./Profile.jsx";
// FIREBASE
import { FirebaseContext } from "../../utils/firebase/firebaseContext";

const Settings = ({ IFCview, loaderRef, preselectMat, selectMat }) => {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  const { currentUser, username } = useContext(FirebaseContext);

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

  const share = () => {
    enqueueSnackbar(`Lien de partage copié dans le presse-papier`, {
      variant: "success",
    });
  };

  const openLink = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const actions = [
    {
      icon: (
        <AccountBalanceIcon
          sx={{
            color:
              username === "123structure" || pathname.includes("123structure")
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
          }}
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
        <CopyToClipboard text={window.location.href}>
          <ShareIcon
            sx={{
              color:
                username === "123structure" || pathname.includes("123structure")
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
            }}
            onClick={share}
          />
        </CopyToClipboard>
      ),
      name: "Partager",
      disabled: false,
    },
    {
      icon: (
        <GitHubIcon
          sx={{
            color:
              username === "123structure" || pathname.includes("123structure")
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
          }}
          onClick={() =>
            openLink("https://github.com/baptistelechat/Vision-3D")
          }
        />
      ),
      name: "GitHub",
      disabled: false,
    },
    {
      icon: (
        <EmailIcon
          sx={{
            color:
              username === "123structure" || pathname.includes("123structure")
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
          }}
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
              <AutoAwesomeIcon
                sx={{
                  color:
                    username === "123structure" ||
                    pathname.includes("123structure")
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                }}
                onClick={install}
              />
            }
            tooltipTitle="Installer PWA"
            FabProps={{
              size: "large",
              style: {
                fontSize: "1.5em",
                backgroundColor: theme.palette.primary.light,
              },
            }}
          />
        ) : null}
        {currentUser ? (
          <SpeedDialAction
            key="Mon profil"
            icon={
              <PersonIcon
                sx={{
                  color:
                    username === "123structure" ||
                    pathname.includes("123structure")
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                }}
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
                backgroundColor: theme.palette.primary.light,
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
                backgroundColor: theme.palette.primary.light,
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
