let config = require('./config');

const mongoose = require('mongoose');
mongoose.connect(config.mongoURL);

config = {
    ...config,
    schemas: {
        User: require('./schemas/user'),
        Survey: require('./schemas/survey'),
    },
    google: {
        getAuthUrl: require('./utils/google').getGoogleUrl()
    }
};

const app = require("fastify")();
const path = require('path');

app.register(require('@fastify/static'), {
    root: path.join(__dirname, 'views', 'assets')
});
app.register(require('@fastify/formbody'));
app.register(require('@fastify/cookie'));
app.register(require('@fastify/session'), {
    secret: 'F33m$rCnCpvmW$0?@?96AFwqt3NyJ$N7',
    cookie: { secure: false },
});
app.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs"),
    },
    root: path.join(__dirname, "views"),
    propertyName: "render"
});

require('./utils/handler/functions')(config, app, mongoose);
require('./utils/handler/pages')(config, app, mongoose);

app.setNotFoundHandler(function (req, res) {
    console.log("404")
});

app.setErrorHandler(function (err, req, res) {
    console.log(err);
});

app.listen({ port: 1037, host: '0.0.0.0' }, (err) => {
    if (err) throw err;
    console.log(`server listening on ${app.server.address().port}`);
});