/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { csi, eventTarget } from './cepDispatch.js';
import getListItems from './getListItems.js';

function start() {
    // add listeners here, with unique callbacks
    csi.addEventListener(eventTarget('msList'), getListItems);
    console.log('listener added');
}

export default start;
