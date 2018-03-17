var Joi = require('joi');
const data = require("../datalayer.js");
var jwt = require('jsonwebtoken');
var privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';
module.exports = [{
    method: 'POST',
    path: '/login',

    config: {
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }
        },

        handler: function (request, reply) {
            const { email, password } = request.payload;
            let sql = "select * from  users where email='" + email + "' and password='" + password + "';";
            data.exec(sql, function (error, results, fields) {
                if (error) reply(error);
                else {
                   // console.log(results[0]['userid']);
                    var token = jwt.sign({"id":results[0]['user_id']}, privateKey);
                    output = {
                        "Status": "Success",
                        "phone": results[0]['phone'],
                        "name":results[0]['name'],
                        "email":results[0]['email'],
                        "token":token
                    }
                    reply(output);
                }

            });
        }
    }
}];

//.regex(/^[a-zA-Z0-9]{3,30}$/)