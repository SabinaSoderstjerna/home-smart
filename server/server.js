const express = require('express');

var lightsRoutes = require('./routes/lights.js');

var app = express();
app.listen(8080);

app.use('/api/lights', lightsRoutes);