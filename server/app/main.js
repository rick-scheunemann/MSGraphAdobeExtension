/* eslint-disable no-console */
/* eslint-disable import/extensions */

/* setup reference:
https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-spa
node server extension functions as SPA node server in tutorial
app is served from server extention to auth extension
main.js combines authRedirect.js and ui.js functionality from tutorial
CsInterface events are used to trigger and respond to server for MS graph calls
*/

import { loginRequest, tokenRequest } from './config/authConfig.js';
import * as msalS from './msalSetup.js';
import gConfig from './config/graphConfig.js';
import { callMSGraph } from './graph.js';
import * as ui from './ui.js';

import startListeners from './cepListeners.js';

// graph access calls that update ui //
function uiShowProfile() {
    msalS.getTokenRedirect(loginRequest)
        .then((response) => {
            callMSGraph(gConfig.meEndpoint, response.accessToken, false, ui.update);
        }).catch((error) => {
            console.error(error);
        });
}

function uiShowListMeta() {
    msalS.getTokenRedirect(tokenRequest)
        .then((response) => {
            callMSGraph(gConfig.colorListMetaEndpoint, response.accessToken, false, ui.update);
        }).catch((error) => {
            console.error(error);
        });
}

// init ui //
ui.signInButton.onclick = msalS.signIn;
ui.signOutButton.onclick = msalS.signOut;
ui.profileButton.onclick = uiShowProfile;
ui.readListButton.onclick = uiShowListMeta;

// start CEP event listeners //
startListeners();
