const http = require('http');
const url = require('url');

/*
 * Configuration
 * NODE_ENV = dev: For staging (port 3000)
 * NODE_ENV = prod: For production (port 4000)
 */

let config = {};
config.staging = {
    'envName' : 'staging',
    'port' : 3000,
};
config.production = {
    'envName' : 'prod',
    'port' : 4000,
};

//Checking the environment
let currentEnv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
var environment = typeof(config[currentEnv]) == 'object' ? config[currentEnvironment] : config.staging;

const server = http.createServer((req, res) => {
    let method = req.method.toUpperCase();
    let parsedUrl = url.parse(req.url, true);
    let trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
    console.log("TrimmedPath>>>>>>>", trimmedPath);

    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handler.notFound;
    console.log("Router[TrimmedPath]>>>>>>>>>>>>>",router[trimmedPath]);
    console.log("chosenHandler>>>>>>>>>",chosenHandler);
    chosenHandler((statusCode,payload = {}) =>{
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        let responseMsg = JSON.stringify(payload);
        res.end(responseMsg);
    })
})

var handler = {}

handler.hello = (callback) => {
    callback(200, {msg : 'Wlecome to Nodejs Master class'});
}

handler.notFound = (callback) => {
    callback(404, {msg : 'Not found'});
}
server.listen(environment.port, () => {
    console.log(`Listening on ${environment.port}!`);
});

var router = {
    'hello' : handler.hello
};