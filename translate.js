var request = require('request');

module.exports.translate = function (text) {
    request(getOptions(text),
        function (error, response, body) {
            console.log(JSON.stringify(body, null, 4));
        }
    );
};

function getOptions(text) {
    return {
        url: 'https://translation.googleapis.com/language/translate/v2?key=<YOUR_KEY>',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            'q': text,
            'source': 'de',
            'target': 'zh',
            'format': 'text'
        }
    }
}