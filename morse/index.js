const morse = require("morse-code-converter");

const code = morse.morseToText("Hello. Please work")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const plaintext = req.query.plaintext;

    const code = morse.textToMorse(plaintext);

    context.res = {
        body: code
    };
}
