
var Joi = require('joi');
const data = require("../datalayer.js");

module.exports = [{
    method: 'POST',
    path: '/Participate',
    config: {
        validate: {
            payload: {
                user_id: Joi.string().required(),
                contest_Id: Joi.string().required(),
            }
        },

        handler: function (request, reply) {
            const { participant_Name, contest_title, contest_Id } = request.payload;
            let sql = "insert into participate( user_id, contest_Id) values( '" + user_id + "', '" + contest_Id + "');";

            data.exec(sql, function (error, results, fields) {
                if (error) reply(error);
                else {
                    output = {
                        "Status": "Success",
                        "Message": "Sccessfully created"
                    }
                    reply(output);
                }
            });
        }
    }
}];