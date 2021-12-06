const openLocalFile = async (
  event,
  randomLottie,
  resetView,
  IFCview,
  loaderRef,
  loadingFileProgress,
  setOpenProgress,
  setPercentProgress,
  enqueueSnackbar
) => {
  await randomLottie();
  await setOpenProgress(true);
  const { target } = event;
  if (target.value.length > 0) {
    await resetView();
    const file = event.target.files[0];
    const extension = file.name.substr(file.name.length - 3);
    if (extension === "ifc") {
      enqueueSnackbar(
        `${file.name} en cours de traitement, veuillez patienter...`,
        {
          variant: "info",
        }
      );
      loaderRef.current.ifcManager.setOnProgress((event) =>
        loadingFileProgress(event)
      );
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (e) {
        console.log(e.target.result);
      };
      const ifcURL = URL.createObjectURL(file);
      const object = await loaderRef.current.loadAsync(ifcURL);
      object.name = "IFCModel";
      IFCview.add(object);
      setOpenProgress(false);
      setPercentProgress("Chargement ...");
      enqueueSnackbar(
        `${file.name} (${(file.size / Math.pow(10, 6)).toFixed(
          2
        )} Mo) chargé avec succès`,
        {
          variant: "success",
        }
      );
    } else {
      enqueueSnackbar(`${file.name} n'est pas un fichier IFC valide`, {
        variant: "error",
      });
      await setOpenProgress(false);
      const isMobile =
        "ontouchstart" in document.documentElement &&
        navigator.userAgent.match(/Mobi/);
      if (!isMobile) {
        document.getElementById("dropZone").style.display = "none";
      }
    }
  }
};

export default openLocalFile;
