const fs = require('fs');
var appRoot = require('app-root-path'); //npm i -S app-root-path
let routes = [];

fs.readdirSync(appRoot + '/controllers')
  .forEach(file => {
    routes = routes.concat(require(`../controllers/${file}`))
  });

module.exports = routes;