const querystring = require('querystring');

module.exports = async function (context, req) {
    var reqbody = req.body
    context.log(reqbody)

    const queryObject = querystring.parse(req.body);

    var url = queryObject.MediaUrl0

    context.res = {
        body: url
     };
     
}

