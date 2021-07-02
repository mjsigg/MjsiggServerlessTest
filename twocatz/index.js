const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let resp = await fetch("https://cataas.com/cat/cute/says/serverless",{ 
        method: 'GET'
    });
    
    let data = await resp.arrayBuffer();

    base64data = Buffer.from(data).toString('base64')

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {base64data}
    };
}