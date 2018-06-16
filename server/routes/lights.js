const express = require('express');

var lightControllers = require('../controllers/lights.js'); 

var router = express.Router(); 

router.get('/', lightControllers.getLights);

router.get('/:id', lightControllers.getLights);

router.get('/:id/toggle', lightControllers.toggleLight);

module.exports = router;