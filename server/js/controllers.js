/* eslint-disable import/extensions */

// local dependencies
const cep = require('./cepEvents');
const ms = require('./graphPromise');

/// /////////////////////// ///

// Tester Extension //

const makeRequest = async function (req, callback) {
    // in this implementation, we are only requesting a single item
    // but multiple search strings are supported in array passed to graphPromise

    const { searchStr } = req.body;

    // retrieve list data from ms graph
    const timeoutError = Symbol('wait time has expired');
    let graphRes;
    try {
        graphRes = await ms.timeout(
            ms.graphPromise('msList', [searchStr], 'com.rps.server.msListRes'),
            5000, // 5 second timeout
            timeoutError,
        );
    } catch (e) {
        if (e === timeoutError) { // handle timeout
            await cep.evalScriptPr(
                'alert_User_Multiline("|) Marker - Timout Error", ["The required resource is unavailable.", "Please confirm you are logged in using the Authorize panel"], "OK")',
            );
            return callback('evalRes timeout');
        }
        // other error
        return callback(`${e.name}:${e.message}`);
    }

    console.log('graphRes');
    console.log(graphRes);

    // format the response from MS Graph here
    // since we batch Graph requests, each has its own response
    const resultArr = graphRes.data.responses.reduce((res, e) => {
        if (e.status === 200 && e.body.value.length > 0) {
            // here we could filter out unneeded field values
            // or act upon them before responding
            const f = e.body.value[0].fields;
            res.push(f);
        }
        return res;
    }, []);

    console.log(resultArr);

    return callback({
        status: 'ok',
        payload: JSON.stringify(resultArr),
    });
};

const getGraphData = function (req, res) {
    makeRequest(req, (result) => {
        if (result.status === 'ok') {
            res.status(200).json({
                message: 'Request Completed',
                payload: result.payload,
            });
        } else if (result.status === 'canceled') {
            res.status(200).json({
                message: 'Request Canceled',
            });
        } else { // bad response
            res.status(400).json({
                message: 'Problem Completing Request',
            });
        }
    });
};
// End Tester Extension //

module.exports = {
    getGraphData,
};
