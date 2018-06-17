const request = require('request');

var groups = {};

groups.getGroups = function (req, res) {
    if (req.params.id) {
        request.get('http://192.168.8.100' + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/groups/' + req.params.id,
            { json: true },
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            });
    } else {
        request.get('http://192.168.8.100' + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/groups',
            { json: true },
            function (error, response, body) {
                res.status(response.statusCode).send(body);
            }
        );
    }
}

groups.getLights = function (req, res) {
    request.get('http://192.168.8.100' + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/groups/' + req.params.id,
        { json: true },
        function (error, response, body) {
            res.status(response.statusCode).send(body.lights);
        });
}

groups.toggleGroup = function (req, res) {
    if (req.params.id) {
        request({
            url: 'http://192.168.8.100' + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/groups/' + req.params.id + '/action',
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

groups.setBrightness = function(req, res) {
    if(req.params.id) {
        request({
            url:'http://192.168.8.100' + '/api/' + '6x-bkvv6nNQ8phAferczfhNvRSzvG8j4uvYuJUgW/groups/'+req.params.id+'/action',
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

module.exports = groups;