/* eslint-disable no-console */

/**
 * Helper functions to call MS Graph API endpoint
 * using the authorization bearer token scheme
*/

// single request
function callMSGraph(endpoint, token, opts, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;
    headers.append('Authorization', bearer);

    if (opts.headers) {
        opts.headers.forEach((e) => {
            headers.append(e[0], e[1]);
        });
    }

    let { url } = endpoint;

    if (opts.fields) {
        url = `${url}$expand=${opts.fields}`;
    }

    if (opts.filter) {
        url = `${url}${opts.fields ? '&' : ''}$filter=${opts.filter}`;
    }

    console.log(url);

    const options = {
        method: opts.method,
        headers,
    };

    console.log(`request made to Graph API at: ${new Date().toString()}`);

    fetch(encodeURI(url), options)
        .then((response) => response.json())
        .then((response) => callback(response, endpoint))
        .catch((error) => console.log(error));
}

// batch request (limit 20 per batch)
// here endpoint is used only in routing response
// all batch Graph calls go to same batch endpoint
function batchCallMSGraph(endpoint, token, body, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;
    headers.append('Authorization', bearer);
    headers.append('Content-Type', 'application/json');

    const options = {
        method: 'POST',
        headers,
        body,
    };

    console.log(`batch request made to Graph API at: ${new Date().toString()}`);

    fetch(encodeURI('https://graph.microsoft.com/v1.0/$batch'), options)
        .then((response) => response.json())
        .then((response) => callback(response, endpoint))
        .catch((error) => console.log(error));
}

export {
    callMSGraph,
    batchCallMSGraph,
};
