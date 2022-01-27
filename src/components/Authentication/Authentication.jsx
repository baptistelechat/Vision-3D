// REACT
import React, { useState, useContext } from "react";
// MATERIAL UI
import Fab from "@mui/material/Fab";
// NOTISTACK
import { useSnackbar } from "notistack";
// MATERIAL UI ICON
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
// COMPONENTS
import Login from "./Login.jsx";
// FIREBASE
import { FirebaseContext } from "../../utils/firebase/firebaseContext";
import { auth } from "../../utils/firebase/firebaseConfig";
import { signOut } from "firebase/auth";

const Authentication = () => {
  const { currentUser } = useContext(FirebaseContext);
  const [openLogin, setOpenLogin] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const logOut = async () => {
    try {
      await signOut(auth);
      await enqueueSnackbar("Vous êtes déconnecté", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        `Une erreur est survenu : ${error.message} (${error.code}) veuillez réessayer ou contacter l'administrateur`,
        {
          variant: "error",
        }
      );
    }
  };

  if (!currentUser) {
    return (
      <React.Fragment>
        <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />

        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: 24,
            left: 24,
          }}
          onClick={() => setOpenLogin(true)}
        >
          <LoginIcon />
        </Fab>
      </React.Fragment>
    );
  } else {
    return (
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 24,
          left: 24,
        }}
        onClick={logOut}
      >
        <LogoutIcon onClick={() => logOut()} />
      </Fab>
    );
  }
};

export default Authentication;
