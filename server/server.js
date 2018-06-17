const express = require('express');
const bodyParser = require('body-parser')

var lightsRoutes = require('./routes/lights.js');
var groupsRoutes = require('./routes/groups.js');

var app = express();
app.listen(8080);

app.use(bodyParser.json());
app.use('/api/lights', lightsRoutes);
app.use('/api/groups', groupsRoutes);