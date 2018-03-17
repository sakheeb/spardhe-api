var Joi = require('joi');
var cloudinary = require('cloudinary');
const data = require("../datalayer.js");

cloudinary.config({ 
    cloud_name: 'digists', 
    api_key: '996649427657756', 
    api_secret: 'SuvYCkTDtpr_Y0K6kZEvLlpx2iA' 
});

module.exports = [{
    method: 'POST',
    path: '/addContest',
    config: {
        validate: {
            payload: {
                title: Joi.string().required(),
                description: Joi.string().required(),
                start_date: Joi.string().required(),
                start_time: Joi.string().required(),
                end_date: Joi.string().required(),
                end_time: Joi.string().required(),
                location: Joi.string().required(),
                banner: Joi.string()
            }
        },

        handler: function (request, reply) {
            const { title, description, start_date, start_time, end_date, end_time, location, banner } = request.payload;
          //  var base64Data = banner.replace("data:image\/jpeg;base64,","");
          //  base64Data = banner.replace("data:image\/*;charset=utf-8;base64,","");
          var base64Data = banner.split('base64,')[1];
            var _filename =  "banner_" + parseInt(Math.random() * 100000) + ".jpg";
           
            require("fs").writeFile("./uploads/"+_filename, base64Data, 'base64', (err) => {
                if(err) throw err;

                cloudinary.uploader.upload('./uploads/'+_filename, function(saveResult){
                  
                    if('url' in saveResult){
                        let sql = "insert into contest(title, description, start_date, start_time, end_date, end_time, location, postedon, banner) values( '" + title + "', '" + description + "', '" + start_date + "', '" + start_time + "', '" + end_date + "', '" + end_time + "', '" + location + "',now(), '"+saveResult.url+"');";
                        console.log(sql);
            
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
                    else{
                        console.log("Eror:", saveResult );
                    }
                });   
            });
        }
    }
}];