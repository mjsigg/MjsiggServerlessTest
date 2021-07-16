const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    var reqbody = req.body
    context.log(reqbody)

    const queryObject = querystring.parse(req.body);
    var url = queryObject.MediaUrl0

    let resp = await fetch(url,{
        method: 'GET',
    })

    let data = await resp.arrayBuffer()
    let age_data = await analyzeImage(data)
    let age = age_data[0].faceAttributes.age

    let generation = determine_generation(age)

    context.log(generation)

    const songs = {
    
    "GenZ":"https://open.spotify.com/track/0SIAFU49FFHwR3QnT5Jx0k?si=1c12067c9f2b4fbf", 
    "GenY":"https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9", 
    "GenX":"https://open.spotify.com/track/4Zau4QvgyxWiWQ5KQrwL43?si=790d9e3ef2ed408d", 
    "BabyBoomers":"https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=1abb329f2dc24f50", 
    "Unknown":"https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG?si=84b49b41d09d4d11"}

    let song_classification = songs[generation]

    let songs_output = `We guessed you're part of this generation: ${generation} Happy listening! ${song_classification}`

    context.log(songs_output)

    context.res = {
        body: songs_output
    };   
}

function determine_generation(age){
    let generation;
    if(age > 5 && age < 25) {
        generation = 'GenZ';
    } else if (age > 24 && age < 41) {
        generation = "GenY";
    } else if (age > 40 && age < 57) {
        generation = "GenX";    
    } else if (age > 56 && age < 76) {
        generation = "BabyBoomers";
    } else  {
        generation = "Unknown";
    }
    return generation;
}

async function analyzeImage(img){
    
    const subscriptionKey = process.env.FACEAPI_KEY1;
    const uriBase = process.env.FACEAPI_ENDPOINT + '/face/v1.0/detect';
    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'age'
        })

        let resp = await fetch(uriBase + '?' + params.toString(), {
            method: 'POST',  
            body: img,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        })
    
        let result = await resp.json();
        return result;
}
