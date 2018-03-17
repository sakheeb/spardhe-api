const config=require('./config');
var mysql=require("mysql");

exports.exec = function(query,callback){
var connection=mysql.createConnection(config.connectionString);
connection.connect();
connection.query(query,callback);
connection.end();
};