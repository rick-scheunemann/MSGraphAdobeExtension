# MSGraphAdobeExtension
Adobe Illustrator extension panels for Microsoft identity platform login and calling Microsoft Graph API

## Background
This Adobe CEP extension uses Microsoft's Authentication Library (MSAL) for JavaScript v2.0 to grant Adobe Extensions access to a Microsoft List using the Microsoft Graph API.

The extension consists of 3 parts:
1) Authorizer Panel for handling MSAL login and Graph requests.
1) Node Server running in an invisible extension for serving Authorizer Panel content, communicating with the Authorizer Panel using CEP Events, and exposing an API for other panels to get Graph data using fetch.
3) Test Panel to demonstrate data access using the Server API.

Microfoft Code is adapted from https://github.com/Azure-Samples/ms-identity-javascript-v2

## Setup
1) Setup your SPA registration https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration. The redirect URI used is http://localhost:8764/token, and is set in authConfig.js
2) Clone the repository into your Adobe extensions folder https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md#extension-folders
3) Run 'npm install' in the Server directory
4) Enter your client id, tenant id, and redirectUri in authConfig.js
5) Enter your site id and list id in graphConfig.js. Your list should include a "Title" field for testing with the included Test Panel
6) Enable unsigned Adobe extensions https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md#debugging-unsigned-extensions

For more details on the Microsoft MSAL and Graph API see https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-auth-code

For more details on Adobe CEP Extensions see https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md


