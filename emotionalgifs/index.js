var multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body
    var parts = multipart.Parse(body, boundary)
    var image = parts[0].data
    
    var result = await analyzeImage(image)
    
    let emotions = result[0].faceAttributes.emotion;
    let objects = Object.values(emotions);

    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));
    
    var gif = await findGifs(main_emotion)

    context.res = {
        body: gif.data.url
    };
}

async function analyzeImage(img){
    
    const subscriptionKey = process.env.FACEAPI_KEY1;
    const uriBase = process.env.FACEAPI_ENDPOINT + '/face/v1.0/detect';
    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
        })

        let resp = await fetch(uriBase + '?' + params.toString(), {
            method: 'POST',  
            body: img,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        })
    
        let data = await resp.json();
        return data;
}

async function findGifs(emotion){

    const giphyKey = process.env.GIPHY_KEY
    const giphyEndpoint = "https://api.giphy.com/v1/gifs/translate"; 

    let params = new URLSearchParams({
        'api_key': giphyKey,
        's': emotion
    })

    const apiResult = await fetch(giphyEndpoint + '?' + params.toString(), {
        method: 'GET'
    })

    const jsonResult = await apiResult.json()
    return jsonResult

}