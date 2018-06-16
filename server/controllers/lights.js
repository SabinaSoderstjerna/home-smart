const request = require('request');

var lights = {};

lights.getLights = function (req, res) {
    if(req.params.id) {
        request.get('http://192.168.8.100' + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/lights/'+req.params.id,
            { json: true },
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            });
    } else {
        request.get('http://192.168.8.100' + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/lights',
        { json: true },
        function (error, response, body) {
            res.status(response.statusCode).send(body);
        }
    );
    }
}

lights.toggleLight = function (req, res) {
    if(req.params.id) {
        request({
            url:'http://192.168.8.100' + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/lights/'+req.params.id+'/state',
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            json:{"on": req.body.on}},
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            }
        );
    }
}

lights.setBrightness = function(req, res) {
    if(req.params.id) {
        request({
            url:'http://192.168.8.100' + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/lights/'+req.params.id+'/state',
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            json:{"bri": req.body.brightness}},
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            }
        );
    }
}

module.exports = lights;
