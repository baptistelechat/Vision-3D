import React, { useState, useContext } from "react";
// MATERIAL UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
// MATERIAL UI ICON
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// NOTISTACK
import { useSnackbar } from "notistack";
// FIREBASE
import { FirebaseContext } from "../../utils/firebase/firebaseContext";

const Login = ({ openLogin, setOpenLogin }) => {
  const data = {
    email: "",
    password: "",
  };
  const [requestData, setRequestData] = useState(data);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { email, password } = requestData;
  const { enqueueSnackbar } = useSnackbar();
  const { signIn } = useContext(FirebaseContext);

  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(email, password);
      await enqueueSnackbar(`Vous êtes connecté avec l'email ${email}`, {
        variant: "success",
      });
      handleClose();
    } catch (error) {
      enqueueSnackbar(
        `Une erreur est survenu : ${error.message} Veuillez réessayer ou contacter l'administrateur`,
        {
          variant: "error",
        }
      );
    }
  };

  const handleTextFieldChange = (e) => {
    setRequestData({ ...requestData, [e.target.id]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog fullScreen={fullScreen} onClose={handleClose} open={openLogin}>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          sx={{ mt: "8px" }}
        >
          <LoginIcon fontSize="large" />
          <h3>Connexion</h3>
        </Stack>
        <IconButton
          onClick={handleClose}
          style={{ right: "12px", top: "20px", position: "absolute" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: "16px", mb: "16px" }}>
        <DialogContentText id="alert-dialog-description" sx={{ mb: "16px" }}>
          Contactez nous par{" "}
          <a
            href="mailto:baptistelechat@outlook.fr"
            style={{ color: "#1565c0" }}
          >
            Email
          </a>{" "}
          pour la création d'un compte administrateur
        </DialogContentText>
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleTextFieldChange}
          autoFocus
          sx={{ mt: "16px", mb: "16px" }}
        />
        <TextField
          required
          fullWidth
          id="password"
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={handleTextFieldChange}
          sx={{ mb: "16px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Fab
            disabled={email !== "" && password !== "" ? false : true}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            sx={{ mt: "16px", mb: "16px", mr: "16px" }}
            onClick={handleSubmit}
          >
            <LockOpenIcon sx={{ mr: "8px" }} />
            Envoyer
          </Fab>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
