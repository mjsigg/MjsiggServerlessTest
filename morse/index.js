const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
const code = morse.textToMorse('Hey how are you?'); // .... . -.--   .... --- .--   .- .-. .   -.-- --- ..- ..-..
const text = morse.morseToText(code); // HEY HOW ARE YOU?

    context.res = {
        body: code
    }
}
