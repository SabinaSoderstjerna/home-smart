const request = require('request');

var lights = {};
var ipAdress = '192.168.1.121';

lights.getLights = function (req, res) {
    if (req.params.id) {
        request.get('http://' + ipAdress + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/lights/' + req.params.id,
            { json: true },
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            });
    } else {
        request.get('http://' + ipAdress + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/lights',
            { json: true },
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            }
        );
    }
}

lights.toggleLight = function (req, res) {
    if (req.params.id) {
        request({
            url: 'http://' + ipAdress + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/lights/' + req.params.id + '/state',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            json: { "on": req.body.on }
        },
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            }
        );
    }
}

lights.setBrightness = function (req, res) {
    if (req.params.id) {
        request({
            url: 'http://' + ipAdress + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/lights/' + req.params.id + '/state',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            json: { "bri": req.body.brightness }
        },
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            }
        );
    }
}

lights.setColor = function (req, res) {
    if (req.params.id) {
        var xy = calculateColorFromHex(req.body.hexColor, req.body.brightness);
        request({
            url: 'http://' + ipAdress + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/lights/' + req.params.id + '/state',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            json: { "xy": xy }
        },
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            }
        );
    }
}

function calculateColorFromHex(hexColor, brightness) {
    var red = hexColor.substring(0, 2);
    var green = hexColor.substring(2, 4);
    var blue = hexColor.substring(4, 6);

    red = parseInt(red,16)/255;
    green = parseInt(green,16)/255;
    blue = parseInt(blue,16)/255;

    var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
    var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
    var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

    var x = X / (X + Y + Z);
    var y = Y / (X + Y + Z);

    return [x,y];
}

module.exports = lights;
