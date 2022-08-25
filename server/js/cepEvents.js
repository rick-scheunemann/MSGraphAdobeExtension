/* global CSInterface, CSEvent */

// no dependencies, supplies cep capabilities to other modules

/// /////////////////////// ///

const csi = new CSInterface(); // instance of CSInterface
// eslint-disable-next-line no-console
console.log('cepEvents new CSInterface created');

// wraps evalScript in a function that returns a Promise
const evalScriptPr = function (command) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        csi.evalScript(command, resolve);
    });
};

// send data to the desired extension via CSInterface, returns bool
const dispatch = function (target, data) {
    try {
        const event = new CSEvent(`com.rps.server.${target}`, 'APPLICATION');
        event.data = data;
        csi.dispatchEvent(event);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

/*
 * Prepares a string to cross the HTML/App boundary, escaping
 *  characters as necessary. Specifically:
 *      Replaces:
 *          \ with \\
 *          ' with \'
 *          " with \"
 * @param str The JSX string to prepare.
*/
const escStr = function (str) {
    // Replaces:
    //  \ with \\
    //  ' with \'
    //  " with \"
    // See: https://stackoverflow.com/a/3967927/5285364
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
};

module.exports = {
    csi,
    evalScriptPr,
    dispatch,
    escStr,
};
