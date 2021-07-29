const multipart = require('parse-multipart')
const fetch = require('node-fetch')
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var the_header_value = req.headers['codename'];

    var responseMessage = ""
    if (body == null) {
        responseMessage = "Sorry! No image attached."
    } else {
        var password = the_header_value
        var boundary = multipart.getBoundary(req.headers['content-type']);
        var body = req.body;
        var parsedBody = multipart.Parse(body, boundary);
        
        var filetype = parsedBody[0].type;
        if (filetype == "image/png") {
            ext = "png";
        } else if (filetype == "image/jpeg") {
            ext = "jpeg";
        } else if (filetype == "image/jpg") {
            ext = "jpg"
        } else {
            username = "invalidimage"
            ext = "";
        }
        responseMessage = await uploadFile(parsedBody, ext, password);
    }

    context.res = {
        body: responseMessage
    };

}      

async function uploadFile(parsedBody, ext) {
    
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "1bitcamp";
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container  
    
    const blobName = password + "." + ext;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);

    return ("Your blob is saved");

}