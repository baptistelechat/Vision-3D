// REACT
import React from "react";
// MATERIAL UI
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// LOTTIE FILES
import Lottie from "react-lottie";

const Progress = ({
  openProgress,
  setOpenProgress,
  percentProgress,
  randomLottieFile,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require("../utils/lotties/lottie_" +
      randomLottieFile +
      ".json"),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openProgress}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Lottie options={defaultOptions} height={400} width={400} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          {percentProgress}
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default Progress;
