// REACT
import React from "react";
// STYLES
import "./MicrosoftGraphApi.css";

const MicrosoftGraphApi = ({ IFCview, loaderRef, resetView }) => {
  const launchOneDrivePicker = async () => {
    let odOptions = {
      clientId: process.env.REACT_APP_CLIENT_ID,
      action: "download",
      // multiSelect: true,
      advanced: {},
      success: async function (files) {
        // console.log(files.value[0]["@microsoft.graph.downloadUrl"]);
        await resetView();
        const ifcURL = files.value[0]["@microsoft.graph.downloadUrl"];
        const object = await loaderRef.current.loadAsync(ifcURL);
        object.name = "IFCModel";
        IFCview.add(object);
      },
      progress: function (percent) {
        console.log(percent);
      },
      cancel: function () {
        /* cancel handler */
      },
      error: function (error) {
        console.log(error);
      },
    };
    await window.OneDrive.open(odOptions);
  };

  return (
    <button id="ms-file-picker" onClick={launchOneDrivePicker}>
      OneDrive
    </button>
  );
};

export default MicrosoftGraphApi;
