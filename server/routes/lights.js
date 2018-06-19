const express = require('express');

var lightControllers = require('../controllers/lights.js'); 

var router = express.Router(); 

router.get('/', lightControllers.getLights);

router.get('/:id', lightControllers.getLights);

router.put('/:id/toggle', lightControllers.toggleLight);

router.put('/:id/brightness', lightControllers.setBrightness);

router.put('/:id/color', lightControllers.setColor);

module.exports = router;