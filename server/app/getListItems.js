/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { tokenRequest } from './config/authConfig.js';
import gConfig from './config/graphConfig.js';
import { batchCallMSGraph } from './graph.js';
import { graphDispatch } from './cepDispatch.js';
import { getTokenRedirect } from './msalSetup.js';

function getListItems(req) {
    // req.data is array of arrays of format [["c", "ink name"], [...], ...]
    // console.log(req.data);

    const endpoint = gConfig.colorListItemEndpoint;

    // use provided data, request info in batch(limit 20 calls in batch...)

    // const fields = 'fields'; // request all fields
    const fields = 'fields($select=title)'; // request title only
    // const fields = 'fields($select=title,field_2,field_3)' // request multiple fields

    const headers = {
        Prefer: 'HonorNonIndexedQueriesWarningMayFailRandomly',
    };

    // iterate over data list, building batch request array of objects
    // current limit is 20 requests per batch, requests after 20 are ignored
    const requests = [];
    req.data.forEach((e, index) => {
        requests.push({
            id: `${index}_${e[1]}`,
            method: 'GET',
            url: `${endpoint.batchUrl}$expand=${fields}&$filter=fields/Title eq '${e[1]}'`,
            headers,
        });
    });

    const body = JSON.stringify({ requests });

    getTokenRedirect(tokenRequest)
        .then((response) => {
            batchCallMSGraph(
                endpoint,
                response.accessToken,
                body,
                graphDispatch,
            );
        }).catch((error) => {
            console.log('callMSGraph issue');
            console.error(error);
        });

    // single (not batch) call:
    // const options = {
    //     fields: 'fields($select=title,field_4,field_3,field_5,field_6)',
    //     filter: `fields/Title eq '${req.data[0][1]}'`,
    //     headers: [
    //         ['Prefer', 'HonorNonIndexedQueriesWarningMayFailRandomly'],
    //     ],
    // };

    // getTokenRedirect(tokenRequest)
    //     .then((response) => {
    //         callMSGraph(
    //             gConfig.colorListItemEndpoint,
    //             response.accessToken,
    //             options,
    //             graphDispatch,
    //         );
    //     }).catch((error) => {
    //         console.log('callMSGraph issue');
    //         console.error(error);
    //     });
}

export default getListItems;
