/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// eslint-disable-next-line no-unused-vars
const serverExtVersion = 'v1.0.0 220824'; // version and build date
let httpServer;

window.onload = function onload() {
    // Module dependencies
    const http = require('http');
    const path = require('path');

    console.log(`__dirname: ${__dirname}`);

    try {
        // set working directory to avoid process.cwd() Error when Express is loaded
        // process.cwd() should return dir where node was run
        // My guess is Adobe is deleting this dir but process is still tied to deleted dir,
        // based on googling "error: enoent: no such file or directory, uv_cwd"
        process.chdir(__dirname);
        console.log(`process.chdir : ${process.cwd()}`);
    } catch (err) {
        console.log(`chdir: ${err}`);
    }

    const app = require(path.join(__dirname, '/server/js/app.js'));

    // Get port and store in Express
    const port = 8764;
    app.set('port', port);

    // Event listener for HTTP server "error" event.
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? `Pipe ${port}`
            : `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
        }
    }

    // Event listener for HTTP server "listening" event.
    function onListening() {
        const addr = httpServer.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
        console.log(`Running Node ${process.version}`);
    }

    // Create HTTP server.
    httpServer = http.createServer(app);

    // Listen on provided port, on all network interfaces.
    httpServer.listen(port);
    httpServer.on('error', onError);
    httpServer.on('listening', onListening);
};

window.onunload = function onunload() {
    console.log('Shutting down server');
    httpServer.close();
};
