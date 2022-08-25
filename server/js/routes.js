/* eslint no-console: ["error", {allow: ["log"]}] */

// dependencies
const express = require('express');
const path = require('path');

// local dependencies
const cep = require('./cepEvents');
const ctlr = require('./controllers');

/// /////////////////////// ///

// Express Routes //
const router = express.Router();

// Authorizer Routes
router.route('/login').get((req, res) => {
    console.log('login page requested');
    res.sendFile(path.join(`${__dirname}/app/index.html`));
});

router.route('/token').get(async (req, res) => {
    console.log('login page requested, token received');
    console.log(req);
    res.sendFile(path.join(`${__dirname}/app/index.html`));
});

// Tester Routes
router.route('/runTest')
    .post(ctlr.runtTest);

// End Express Routes //


// CEP Event routing //

// listen for events from Illustrator:
cep.csi.addEventListener('documentAfterActivate', ctlr.routeEvent);
console.log('His timeless sleep has been upset by documentAfterActivate events');
// documentAfterActivate is sent after a previously unsaved doc is saved.
// documentAfterActivate is sent after a saved doc is saved as a new file(different name).
// when multiple docs are opened at once, documentAfterActivate is sent for the last doc only.
// no documentAfterActivate is sent when a doc not in focus is closed.

cep.csi.addEventListener('documentAfterDeactivate', ctlr.routeEvent);
console.log('documentAfterDeactivate events begin the summoning');
// starting with Ai v24.2.1 documentAfterActivate with event.data xml outer
// tag of documentAfterDeactivate is no longer sent when last doc is closed.
// we now listen for documentAfterDeactivate to know when to display "no open document".
// if another doc is open, documentAfterActivate will be fired after this event.

// End CEP Event routing //

module.exports = router;
