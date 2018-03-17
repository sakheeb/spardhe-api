var Joi = require('joi');
const data = require("../datalayer.js");

module.exports = [{
    method: 'GET',
    path: '/Cards',
    config: {
        handler: function (request, reply) {
            let sql = "select * from homefeeds order by postedon desc;";
            data.exec(sql, function (error, results, fields) {
                if (error) reply(error);
                else {
                    output = {
                        "Status": "Success",
                        "data": results
                    }
                    reply(output);
                }
            });
        }
    }
}];

