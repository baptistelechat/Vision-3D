const openDropboxPicker = async (
  randomLottie,
  resetView,
  getData,
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
  const options = {
    // Required. Called when a user selects an item in the Chooser.
    success: async (files) => {
      const extension = files[0].name.substr(files[0].name.length - 3);
      if (extension === "ifc") {
        await resetView();
        const ifcUrl = files[0].link;
        enqueueSnackbar(
          `${files[0].name} en cours de traitement, veuillez patienter...`,
          {
            variant: "info",
          }
        );
        loaderRef.current.ifcManager.setOnProgress((event) =>
          loadingFileProgress(event)
        );
        // Get content of link
        var ifc = "";
        getData(ifcUrl, (responseText) => {
          ifc = responseText;
        });
        const object = await loaderRef.current.loadAsync(ifcUrl + "?dl=1");
        object.name = "IFCModel";
        IFCview.add(object);
        dispatch(addModel([object, files[0].name]));
        setOpenProgress(false);
        setPercentProgress("Chargement ...");
        enqueueSnackbar(
          `${files[0].name} (${(files[0].bytes / Math.pow(10, 6)).toFixed(
            2
          )} Mo) chargé avec succès`,
          {
            variant: "success",
          }
        );
        await setFileData({
          name: files[0].name,
          size: (files[0].bytes / Math.pow(10, 6)).toFixed(2),
          ifc: ifc,
        });
        await setTimeout(setOpenSaveFileDialog, 1000, true);
      } else {
        enqueueSnackbar(`${files[0].name} n'est pas un fichier IFC valide`, {
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
    },

    // Optional. Called when the user closes the dialog without selecting a file
    // and does not include any parameters.
    cancel: function () {
      /* cancel handler */
      setOpenProgress(false);
      setPercentProgress("Chargement ...");
    },

    // Optional. "preview" (default) is a preview link to the document for sharing,
    // "direct" is an expiring link to download the contents of the file. For more
    // information about link types, see Link types below.
    // linkType: "preview",
    linkType: "direct",

    // Optional. A value of false (default) limits selection to a single file, while
    // true enables multiple file selection.
    multiselect: false, // or true

    // Optional. This is a list of file extensions. If specified, the user will
    // only be able to select files with these extensions. You may also specify
    // file types, such as "video" or "images" in the list. For more information,
    // see File types below. By default, all extensions are allowed.
    extensions: [".ifc"],

    // Optional. A value of false (default) limits selection to files,
    // while true allows the user to select both folders and files.
    // You cannot specify `linkType: "direct"` when using `folderselect: true`.
    folderselect: false, // or true

    // Optional. A limit on the size of each file that may be selected, in bytes.
    // If specified, the user will only be able to select files with size
    // less than or equal to this limit.
    // For the purposes of this option, folders have size zero.
    // sizeLimit: 1024, // or any positive number
  };
  randomLottie();
  setOpenProgress(true);
  window.Dropbox.choose(options);
};

export default openDropboxPicker;
