import axios from "axios";
import base64 from "base-64";

const firebase = async (
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
  file
) => {
  const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;

  const repos = process.env.REACT_APP_GITHUB_FILES_STORAGE_REPOS;

  const config = {
    method: "get",
    url: `https://api.github.com/repos/${repos}/git/blobs/${file.ifc}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(async (response) => {
      const data = base64.decode(response.data.content);
      const blob = new Blob([data]);
      const ifcURL = URL.createObjectURL(blob);
      await randomLottie();
      await setOpenProgress(true);
      await resetView();
      enqueueSnackbar(
        `${file.name}.ifc en cours de traitement, veuillez patienter...`,
        {
          variant: "info",
        }
      );
      console.log(data);

      loaderRef.current.ifcManager.setOnProgress((event) =>
        loadingFileProgress(event)
      );
      const object = await loaderRef.current.loadAsync(ifcURL);
      object.name = "IFCModel";
      IFCview.add(object);
      dispatch(addModel(object));
      setOpenProgress(false);
      setPercentProgress("Chargement ...");

      enqueueSnackbar(`${file.name} (${file.size} Mo) chargé avec succès`, {
        variant: "success",
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default firebase;
