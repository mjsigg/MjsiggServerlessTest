const fetch = require('node-fetch')

function gimmename() {

    var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
    var random_value = Math.floor(names.length * Math.random())
    var resultname = names[random_value]

    return resultname
}


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let THE_ENDPOINT = "https://cataas.com/cat/cute/says/Bitcamp"

    let resp = await fetch(THE_ENDPOINT, {
        method: 'GET'
    });
    
    let data = await resp.arrayBuffer()

    let base64data = Buffer.from(data).toString('base64')

    let name1 = gimmename()
    let name2 = gimmename()
    let cat1 = get_cat()
    let cat2 = get_cat()
    

function get_cat() {

        return resp 
     }
 
    context.res = {
        
        body: {
            cat1: base64data,
            cat2: base64data,
            names: [name1, name2]
            
    }
        
    };
}