import React, { useState, useEffect } from "react";
// MATERIAL UI
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
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
// COLORS
import { blueGrey, blue } from "@mui/material/colors";
// OTHER
import { CopyToClipboard } from "react-copy-to-clipboard";

const Settings = () => {
  const [supportPWA, setSupportPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

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
          title: "IFC",
          text: `Visitez IFC ! Un visionneuse IFC en ligne

Découvrez également d'autres fonctionnalités ...

Application créée par Baptiste LECHAT et Matthieu LECHAT`,
          url: "https://create-react-app-ifcjs.vercel.app/",
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
      icon: <PersonIcon sx={{ color: blue[800] }} />,
      name: "Mon profil",
      disabled: true,
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
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{ position: "absolute", top: 24, right: 24 }}
      icon={<SpeedDialIcon icon={<SettingsIcon />} openIcon={<CloseIcon />} />}
      direction="left"
    >
      {supportPWA ? (
        <SpeedDialAction
          key="Installer PWA"
          icon={<AutoAwesomeIcon sx={{ color: blue[800] }} onClick={install} />}
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
  );
};

export default Settings;
