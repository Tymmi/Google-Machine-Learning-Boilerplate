var request = require('request');
var fs = require('fs');
var drawer = require('./boundingBoxDrawer');

var inputFolder = "<YOUR_INPUT_FOLDER>";
var outPutFolder = "./output/";
var filename = "<YOUR_IMAGE_FILE>";

var options = {
    url: 'https://vision.googleapis.com/v1/images:annotate?key=<YOUR_KEY>',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    json: {
        "requests": [{
            "features": [
                {
                    "type": "LABEL_DETECTION"
                }
            ],
            "image": {
                "content": base64_encode(inputFolder + filename)
            }
        }]
    }
};

request(options,
    function (error, response, body) {
        console.log(JSON.stringify(body, null, 4));
        drawer.draw(body, inputFolder + filename, outPutFolder + filename);
    }
);

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}