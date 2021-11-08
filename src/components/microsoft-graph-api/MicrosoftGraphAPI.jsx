// REACT
import React, { useState } from "react";
// THREE.js
import THREE from "../../utils/threejs/three";
// MICROSOFT GRAPH API
import {
  useMsal,
} from "@azure/msal-react";
// import { loginRequest } from "../../utils/microsoftAPI/authConfig";
import { GraphFileBrowser } from "@microsoft/file-browser";
import {
  callMsGraphDriveData,
} from "../../utils/microsoftAPI/request";
import { driveRequest } from "../../utils/microsoftAPI/authConfig";
// STYLES
import "./MicrosoftGraphApi.css";

const MicrosoftGraphApi = ({ IFCview, loaderRef }) => {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  const resetView = () => {
    const selectedObject = IFCview.getObjectByName("IFCModel");
    if (!(selectedObject instanceof THREE.Object3D)) return false;
    // for better memory management and performance
    if (selectedObject.geometry) {
      selectedObject.geometry.dispose();
    }
    if (selectedObject.material) {
      if (selectedObject.material instanceof Array) {
        // for better memory management and performance
        selectedObject.material.forEach((material) => material.dispose());
      } else {
        // for better memory management and performance
        selectedObject.material.dispose();
      }
    }
    if (selectedObject.parent) {
      selectedObject.parent.remove(selectedObject);
    }
    // the parent might be the scene or another Object3D, but it is sure to be removed this way
    return true;
  };

  const RequestDriveAccessToken = () => {
    const request = {
      ...driveRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        setAccessToken(response.accessToken);
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          setAccessToken(response.accessToken);
        });
      });
  };

  const getAuthenticationToken = () => {
    return Promise.resolve(accessToken);
  };

  const onSuccess = (keys) => {
    console.log("onSuccess", keys);
    const itemId = keys[0].driveItem_203[2];
    // console.log(itemId);
    const request = {
      ...driveRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraphDriveData(response.accessToken, itemId).then(
          async (response) => {
            // console.log(response["@microsoft.graph.downloadUrl"]);
            await resetView();
            const ifcURL = response["@microsoft.graph.downloadUrl"];
            const object = await loaderRef.current.loadAsync(ifcURL);
            object.name = "IFCModel";
            IFCview.add(object);
          }
        );
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraphDriveData(response.accessToken).then(async (response) => {
            console.log(response["@microsoft.graph.downloadUrl"]);
            await resetView();
            const ifcURL = response["@microsoft.graph.downloadUrl"];
            const object = await loaderRef.current.loadAsync(ifcURL);
            object.name = "IFCModel";
            IFCview.add(object);
          });
        });
      });
  };

  const onCancel = (err) => {
    console.log("onCancel", err.message);
  };

  return (
    <div className="ms-file-picker-wrapper">
      <h3>Microsoft Drive</h3>
      {accessToken ? (
        <GraphFileBrowser
          getAuthenticationToken={getAuthenticationToken}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      ) : (
        <button className="ms-file-picker" onClick={RequestDriveAccessToken}>
          Request OneDrive Viewer
        </button>
      )}
    </div>
  );
};

export default MicrosoftGraphApi;
