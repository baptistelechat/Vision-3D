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
  const isMobile =
    "ontouchstart" in document.documentElement &&
    navigator.userAgent.match(/Mobi/);

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
      {isMobile && (window.orientation === 90 || window.orientation === -90) ? (
        <Stack
          direction={"row"}
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50%",
              width: "50%",
            }}
          >
            <Lottie options={defaultOptions} height={window.innerHeight-25} width={window.innerHeight-25} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50%",
              width: "50%",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              {percentProgress}
            </Typography>
          </div>
        </Stack>
      ) : isMobile &&
        (window.orientation !== 90 || window.orientation !== -90) ? (
        <Stack
          direction={"column"}
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Lottie options={defaultOptions} height={window.innerWidth-25} width={window.innerWidth-25} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
            }}
          >
            {percentProgress}
          </Typography>
        </Stack>
      ) : (
        <Stack
          direction={"column"}
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Lottie options={defaultOptions} height={450} width={450} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
            }}
          >
            {percentProgress}
          </Typography>
        </Stack>
      )}
    </Backdrop>
  );
};

export default Progress;
