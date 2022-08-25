// dependencies
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

// local dependencies
const apiRoutes = require('./routes');

/// /////////////////////// ///

const app = express();
// no view engine needed for server extension

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(express.static(path.join(__dirname, 'app')));

//
// Configure morgan module to log all requests.
app.use(morgan('dev'));
//

// Routes
app.use('/', apiRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // send the error response
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err,
    });
});

module.exports = app;
