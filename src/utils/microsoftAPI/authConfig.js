require("dotenv").config();

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: process.env.REACT_APP_AUTHORITY_HOST_URL, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const driveRequest = {
  scopes: [
    "user.read",
    "Files.Read",
    "Files.Read.All",
    "Files.ReadWrite.All",
    "Sites.Read.All",
    "Sites.ReadWrite.All",
    "Files.Read.Selected",
  ],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeDriveDataEndpoint:
    "https://graph.microsoft.com/v1.0/me/drive/items/{item-id}",
};
