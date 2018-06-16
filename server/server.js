const express = require('express');
const bodyParser = require('body-parser')

var lightsRoutes = require('./routes/lights.js');

var app = express();
app.listen(8080);

app.use(bodyParser.json());
app.use('/api/lights', lightsRoutes);