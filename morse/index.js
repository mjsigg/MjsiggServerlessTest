const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
const code = morse.textToMorse('Hey how are you?'); // .... . -.--   .... --- .--   .- .-. .   -.-- --- ..- ..-..


    context.res = {
        body: code
    }
}
