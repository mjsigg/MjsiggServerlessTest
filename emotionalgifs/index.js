var multipart = require('parse-multipart');

module.exports = async function (context, req) {

// here's your boundary:
    var boundary = multipart.getBoundary(req.headers['content-type']);
  
// TODO: assign the body variable the correct value
    var body = req.body

// parse the body
    var parts = multipart.Parse(body, boundary);

    var imageData = parts.data

    var convertedResult = Buffer.from(imageData).toString('base64');

    context.res = {
        body: convertedResult
    };
}