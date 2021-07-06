const fetch = require('node-fetch')

function resultname (){

        var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
        var random_value = Math.floor(names.length * Math.random())
        var random_name = names[random_value]


        return random_name;
} 
function make_cat () {

        var cat = [1,2]
        var get_cat = fetch("https://cataas.com/cat/cute/says/Bitcamp",{ 
            method: 'GET'
     }); 
        var generate_cat = (cat.length * get_cat)

        return generate_cat;
}
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let name1 = resultname()
    let name2 = resultname()
    let cat = [1,2]
    let get_cat = cat[length]

    let resp = await fetch("https://cataas.com/cat/cute/says/Bitcamp",{ 
        method: 'GET'
 }); 
}
    let data = await resp.arrayBuffer();

    let base64data = Buffer.from(data).toString('base64');

    context.res = {
        body: {
            cat1: get_cat(),
            cat2: get_cat(),
            names: [name1, name2]
        }
    }