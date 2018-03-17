var Joi = require('joi');
const data = require("../datalayer.js");

module.exports = [{
    method: 'POST',
    path: '/signup',
    config: {
        validate: {
            payload: {
                name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email().required(),
                phone: Joi.string().min(10).max(12).required(),
                password: Joi.string().required(),
                dob: Joi.string().required(),
                gender: Joi.string().min(1).required()
            }
        },

        handler: function (request, reply) {

            const { name, email, phone, password, dob, gender } = request.payload;
            let sql = "insert into users(name, email, phone, password, dob, gender, createdOn) values( '" + name + "', '" + email + "', '" + phone + "', '" + password + "', '" + dob + "', '" + gender + "',now());";
            console.log(sql);

            data.exec(sql, function (error, results, fields) {
                if (error) reply(error);
                else {
                    output = {
                        "Status": "Success",
                        "Message": "Sccessfully registered"
                    }
                    reply(output);
                }
            });
        }
    }
}]; 


//.regex(/^[a-zA-Z0-9]{3,30}$/)