const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let THE_ENDPOINT = "https://cataas.com/cat/cute/says/serverless"

    let resp = await fetch(THE_ENDPOINT, {
        method: 'GET'
    });
    
    let data = await resp.arrayBuffer()

    let base64data = Buffer.from(data).toString('base64')



    context.res = {
        
        body: base64data
    };
}