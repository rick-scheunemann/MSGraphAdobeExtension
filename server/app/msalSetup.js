/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* global msal */

import * as aConfig from './config/authConfig.js';
import { showWelcomeMessage } from './ui.js';

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(aConfig.msalConfig);

const user = { name: '' };

function signIn() {
    /**
     * You can pass a custom request object below.
     * This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    myMSALObj.loginRedirect(aConfig.loginRequest);
}

function signOut() {
    /**
     * You can pass a custom request object below.
     * This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(user.name),
        postLogoutRedirectUri: aConfig.msalConfig.auth.redirectUri,
    };

    myMSALObj.logoutRedirect(logoutRequest);
}

function selectAccount() {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (currentAccounts.length === 0) {
        // nothing
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.warn('Multiple accounts detected.');
    } else if (currentAccounts.length === 1) {
        user.name = currentAccounts[0].username;
        showWelcomeMessage(user.name);
    }
}

function handleResponse(response) {
    if (response !== null) {
        user.name = response.account.username;
        showWelcomeMessage(user.name);
    } else {
        selectAccount();
    }
}

/**
 * A promise handler needs to be registered for handling the
 * response returned from redirect flow. For more information, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md
 */
myMSALObj
    .handleRedirectPromise()
    .then(handleResponse)
    .catch((error) => {
        console.error(error);
    });

function getTokenRedirect(request) {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(user.name);

    return myMSALObj.acquireTokenSilent(request)
        // eslint-disable-next-line consistent-return
        .catch((error) => {
            console.warn('silent token acquisition fails. acquiring token using redirect');
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenRedirect(request);
            }
            console.warn(error);
        });
}

export {
    myMSALObj,
    user,
    signIn,
    signOut,
    selectAccount,
    getTokenRedirect,
};
