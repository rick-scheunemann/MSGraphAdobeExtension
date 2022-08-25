// local dependencies
const cep = require('./cepEvents');

//
const timeout = (prom, time, exception) => {
    let timer;
    return Promise.race([
        prom,
        // eslint-disable-next-line no-return-assign
        new Promise((_r, rej) => (timer = setTimeout(rej, time, exception))),
    ]).finally(() => clearTimeout(timer));
};

// dispatch event to trigger graph data call, then listen for response event
const graphPromise = (target, data, listenFor) => new Promise((resolve, reject) => {
    const handleEvent = (res) => {
        cep.csi.removeEventListener(listenFor, handleEvent);

        resolve(res);
    };

    cep.csi.addEventListener(listenFor, handleEvent);

    try {
        const dispatched = cep.dispatch(target, data);
        console.log(`dispatched to ${target}`);

        if (!dispatched) {
            console.log('failed dispatch');
            reject();
        }
    } catch (err) {
        reject(err);
    }
});

module.exports = { graphPromise, timeout };
