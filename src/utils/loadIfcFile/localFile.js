const openLocalFile = async (
  event,
  randomLottie,
  resetView,
  IFCview,
  loaderRef,
  loadingFileProgress,
  setOpenProgress,
  setPercentProgress,
) => {
  await randomLottie();
  await setOpenProgress(true);
  const { target } = event;
  if (target.value.length > 0) {
    await resetView();
    const file = event.target.files[0];
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
  }
};

export default openLocalFile;