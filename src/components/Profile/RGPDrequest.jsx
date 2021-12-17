import React, { useState } from "react";
// MATERIAL UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// COLORS
import { blue } from "@mui/material/colors";
// MATERIAL UI ICON
import CloseIcon from "@mui/icons-material/Close";
import SecurityIcon from "@mui/icons-material/Security";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import SendIcon from "@mui/icons-material/Send";
// OTHER
import emailjs from "emailjs-com";

const RGPDrequest = ({ openRGPDrequest, setOpenRGPDrequest }) => {
  const date = new Date();
  const curr_date = date.getDate();
  const curr_month =
    date.getMonth() + 2 > 12
      ? "01"
      : date.getMonth() + 2 < 10
      ? "0" + (date.getMonth() + 2)
      : (date.getMonth() + 2).toString();
  const curr_year = date.getFullYear();
  const newDate = curr_date + "/" + curr_month + "/" + curr_year;

  const data = {
    prenom: "",
    nom: "",
    email: "",
    access: "",
    remove: "",
    date: newDate,
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [requestData, setRequestData] = useState(data);
  const [access, setAccess] = useState(false);
  const [remove, setRemove] = useState(false);
  const { prenom, nom, email } = requestData;

  const handleTextFieldChange = (e) => {
    setRequestData({ ...requestData, [e.target.id]: e.target.value });
  };

  const sendEmail = () => {
    console.log("send email", requestData);
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        requestData,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleClose = () => {
    setOpenRGPDrequest(false);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleClose}
      open={openRGPDrequest}
      hideBackdrop={false}
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
        <TextField
          required
          fullWidth
          id="prenom"
          label="Prénom"
          variant="outlined"
          value={prenom}
          onChange={handleTextFieldChange}
          autoFocus
          sx={{ mt: "16px", mb: "16px" }}
        />
        <TextField
          required
          fullWidth
          id="nom"
          label="Nom"
          variant="outlined"
          value={nom}
          onChange={handleTextFieldChange}
          sx={{ mb: "16px" }}
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleTextFieldChange}
          sx={{ mb: "16px" }}
        />
        <h4>Je souhaite exercer mon : </h4>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          sx={{ mt: "8px" }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            onClick={() => {
              setRemove(!remove);
              !remove === true
                ? setRequestData({
                    ...requestData,
                    remove: "Droit d’opposition et de retrait",
                  })
                : setRequestData({
                    ...requestData,
                    remove: "",
                  });
            }}
          >
            <Checkbox
              icon={<CancelOutlinedIcon fontSize="large" />}
              checkedIcon={<CancelIcon fontSize="large" />}
              checked={remove}
            />
            <p style={{ color: remove ? blue[800] : "#626465" }}>
              Droit d’opposition et de retrait
            </p>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            onClick={() => {
              setAccess(!access);
              !access === true
                ? setRequestData({ ...requestData, access: "Droit d’accès" })
                : setRequestData({ ...requestData, access: "" });
            }}
          >
            <Checkbox
              icon={<ArticleOutlinedIcon fontSize="large" />}
              checkedIcon={<ArticleIcon fontSize="large" />}
              checked={access}
            />
            <p style={{ color: access ? blue[800] : "#626465" }}>
              Droit d’accès
            </p>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Fab
            disabled={remove || access ? false : true}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            sx={{ mt: "16px", mb: "16px", mr: "16px" }}
            onClick={sendEmail}
          >
            <SendIcon sx={{ mr: "8px" }} />
            Envoyer
          </Fab>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default RGPDrequest;
