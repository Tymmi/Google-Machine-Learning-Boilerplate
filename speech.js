var request = require('request');
var fs = require('fs');
var translator = require('./translate');

var file = "<YOURFILE.flac>";
var translate = true;

var options = {
    url: 'https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=<YOUR_KEY>',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    json: {
        "config": {
            "encoding": "FLAC",
            "sample_rate": 16000,
            "language_code": "de-DE",
            "maxAlternatives": 1
            // , "speech_context": {
            //     "phrases": ["schlump"]
            // }
        },
        "audio": {
            "content": base64_encode(file)
        }
    }
};

request(options,
    function (error, response, body) {
        console.log(JSON.stringify(body, null, 4));
        if(translate) {
            translate(body);
        }
    }
);

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function translate(body) {
    console.log("--------------------\nTranslation");
    console.log(translator.translate(body.results[0].alternatives[0].transcript));
}