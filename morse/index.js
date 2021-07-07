const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const plaintext = req.query.plaintext;
 
    const code = morse.textToMorse(plaintext); 
    
function message (){

    const code = morse.textToMorse(plaintext); 
    const plaintext = req.query.plaintext;

    return message('Yyyooooo')
}

    context.res = {
        body: code
    }
}
