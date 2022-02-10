const openOneDrivePicker = async (
  randomLottie,
  resetView,
  IFCview,
  loaderRef,
  loadingFileProgress,
  setOpenProgress,
  setPercentProgress,
  enqueueSnackbar,
  dispatch,
  addModel,
  setOpenSaveFileDialog,
  setFileData
) => {
  let odOptions = {
    clientId: process.env.REACT_APP_MS_GRAPH_CLIENT_ID,
    action: "download",
    // multiSelect: true,
    advanced: {
      filter: ".ifc",
    },
    success: async function (files) {
      const extension = files.value[0].name.substr(
        files.value[0].name.length - 3
      );
      if (extension === "ifc") {
        await randomLottie();
        await resetView();
        const ifcURL = files.value[0]["@microsoft.graph.downloadUrl"];
        var ifc = "";
        fetch(ifcURL).then((data) => {
          data.text().then((text) => {
            ifc = text;
          });
        });
        enqueueSnackbar(
          `${files.value[0].name} en cours de traitement, veuillez patienter...`,
          {
            variant: "info",
          }
        );
        loaderRef.current.ifcManager.setOnProgress((event) =>
          loadingFileProgress(event)
        );
        const object = await loaderRef.current.loadAsync(ifcURL);
        object.name = "IFCModel";
        IFCview.add(object);
        dispatch(addModel([object, files.value[0].name]));
        setOpenProgress(false);
        setPercentProgress("Chargement ...");
        enqueueSnackbar(
          `${files.value[0].name} (${(
            files.value[0].size / Math.pow(10, 6)
          ).toFixed(2)} Mo) chargé avec succès`,
          {
            variant: "success",
          }
        );
        await setFileData({
          name: files.value[0].name,
          size: (files.value[0].size / Math.pow(10, 6)).toFixed(2),
          ifc: ifc,
        });
        await setTimeout(setOpenSaveFileDialog, 1000, true);
      } else {
        enqueueSnackbar(
          `${files.value[0].name} n'est pas un fichier IFC valide`,
          {
            variant: "error",
          }
        );
        await setOpenProgress(false);
        const isMobile =
          "ontouchstart" in document.documentElement &&
          navigator.userAgent.match(/Mobi/);
        if (!isMobile) {
          document.getElementById("dropZone").style.display = "none";
        }
      }
    },
    progress: function (percent) {
      console.log(percent);
    },
    cancel: function () {
      /* cancel handler */
      setOpenProgress(false);
      setPercentProgress("Chargement ...");
    },
    error: function (error) {
      setOpenProgress(false);
      setPercentProgress("Chargement ...");
      console.log(error);
    },
  };
  await setOpenProgress(true);
  await window.OneDrive.open(odOptions);
};

export default openOneDrivePicker;
