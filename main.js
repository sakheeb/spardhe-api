'use strict';

var Hapi = require('hapi');
var corsHeaders = require('hapi-cors-headers')
const routes = require('./routes');


const server = new Hapi.Server();

server.connection({
    port: 80,
	host: "192.168.0.10"
});
server.ext('onPreResponse', corsHeaders);


server.register([], function(err) {

    if (err) {
        console.error('Failed loading plugins');
        process.exit(1);
    }

    server.route(routes);
    
    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});

