/* global serverExtVersion */

// dependencies
const cmd = require('node-cmd');

// local dependencies
const cep = require('./cepEvents');

/// /////////////////////// ///

// Tester Extension //
const runTest = async function (req, res) {

    const theQuery = [];

    // initiate array of ink objects, adding query value for Pantones
    let searchStr = '';
    theInks.forEach((ink) => {
        if (ink.slice(0, 8) === 'PANTONE ' && ink.slice(-2) === ' C') {
            searchStr = ink.slice(0, -2); // ignore suffix

            watcher.logTo(searchStr);

            inkArr.push({
                name: ink,
                query: searchStr,
                notes: [],
                data: null,
            });
            theQuery.push(['c', searchStr]);
        } else {
            inkArr.push({
                name: ink,
                query: ink,
                notes: [],
                data: null,
            });
            theQuery.push(['c', ink]);
        }
    });

    let apiRes;
    if (theQuery.length === 0) { // no color swatches to check
        watcher.logTo('no ink db query needed');
        apiRes = {
            statusCode: 'ok',
            statusMessage: 'no ink db query needed',
        };
    } else { // retrieve color data from ms graph
        const timeoutError = Symbol('wait time has expired');
        let graphRes;
        try {
            graphRes = await ms.timeout(
                ms.graphPromise('msColor', theQuery, 'com.rps.cthulhu.msColorRes'),
                5000, // 5 second timeout
                timeoutError,
            );
        } catch (e) {
            if (e === timeoutError) { // handle timeout
                // console.log('timeout error');
                await cep.evalScriptPr(
                    'alert_User_Multiline("|) Marker - Timout Error", ["The required resource is unavailable.", "Please confirm you are logged in using the |) Authorizer panel"], "OK")',
                );
                return callback('evalRes timeout');
            }
            // other error
            return callback(`${e.name}:${e.message}`);
        }

        // console.log('graphRes');
        // console.log(graphRes);

        resultArr = graphRes.data.responses.reduce((res, e) => {
            if (e.status === 200 && e.body.value.length > 0) {
                const f = e.body.value[0].fields;
                res.push({
                    name: f.Title,
                    kind: f.field_2,
                    recommendOrange: f.field_4 === '1',
                    recommendGreen: f.field_3 === '1',
                    recommendViolet: f.field_5 === '1',
                    recommendSilver: f.field_6 === '1',
                    cmyk_Scrape: f.field_8 ? f.field_8.split(',') : undefined,
                    cmykogv_XGscrape: f.field_14 ? f.field_14.split(',') : undefined,
                });
            }
            return res;
        }, []);
    }

    if (graphRes === 'ok') {

        res.status(200).json({
            message: 'Mark Created',
        });
    } else if (graphRes === 'canceled') {

        res.status(200).json({
            message: 'Mark Canceled',
        });
    } else { // bad response

        res.status(400).json({
            message: 'Problem Creating Mark',
        });
    }

};
// End Tester Extension //

module.exports = {
    runTest,
};
