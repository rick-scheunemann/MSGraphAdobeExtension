/* eslint-disable no-console */
/* global CSEvent */

/* Helper functions for CEP event listening & dispatching */

const csi = new window.CSInterface();

const eventPrefix = 'com.rps.server'; // server extension

// Helper function to concat event targets
function eventTarget(suffix) {
    return `${eventPrefix}.${suffix}`;
}

// Helper function to dispatch CEP Events
function graphDispatch(response, endpoint) {
    console.log(`graphDispatch called, dispatching to ${endpoint.target}`);
    try {
        console.log(response);
        const event = new CSEvent(eventTarget(endpoint.target), 'APPLICATION');
        event.data = response;
        csi.dispatchEvent(event);
        return true;
    } catch (e) {
        console.log('graphDispatch Failed');
        console.log(e);
        const event = new CSEvent(eventTarget(endpoint.target), 'APPLICATION');
        event.data = e;
        csi.dispatchEvent(event);
        return e;
    }
}

export {
    csi,
    eventTarget,
    graphDispatch,
};
