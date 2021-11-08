import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a Microsoft Graph API call.
 */
export async function callMsGraphDriveData(accessToken, itemId) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeDriveDataEndpoint.replace('{item-id}', itemId), options)
        .then(response => response.json())
        .catch(error => console.log(error));
}