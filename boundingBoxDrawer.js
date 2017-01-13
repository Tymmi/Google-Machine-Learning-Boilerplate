var Canvas = require('canvas');
var fs = require('fs');

module.exports.draw = function(body, input, output) {
    body.responses.forEach(function (e) {
        if ('faceAnnotations' in e) {
            let vertices = body.responses[0].faceAnnotations.map(function (e) {
                return e.fdBoundingPoly.vertices;
            });
            highlightFaces(input, vertices, output, console.log)
        }
    });
};

function highlightFaces (inputFile, vertices, output, callback) {
  fs.readFile(inputFile, function (err, image) {
    if (err) {
      return callback(err);
    }

    var Image = Canvas.Image;
    // Open the original image into a canvas
    var img = new Image();
    img.src = image;
    var canvas = new Canvas(img.width, img.height);
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);

    // Now draw boxes around all the faces
    context.strokeStyle = 'rgba(0,255,0,0.8)';
    context.lineWidth = '5';

    vertices.forEach(function (box) {
      context.beginPath();
      box.forEach(function (bounds) {
        context.lineTo(bounds.x, bounds.y);
      });
      context.lineTo(box[0].x, box[0].y);
      context.stroke();
    });

    // Write the result to a file
    console.log('Writing to file ' + output);
    var writeStream = fs.createWriteStream(output);
    var pngStream = canvas.pngStream();

    pngStream.on('data', function (chunk) {
      writeStream.write(chunk);
    });
    pngStream.on('error', console.log);
    pngStream.on('end', callback);
  });
};