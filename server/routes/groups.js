const express = require('express');

var groupControllers = require('../controllers/groups.js');

var router = express.Router();

router.get('/', groupControllers.getGroups);
router.get('/:id', groupControllers.getGroups);
router.get('/:id/lights', groupControllers.getLights);
router.put('/:id/toggle', groupControllers.toggleGroup);
router.put('/:id/brightness', groupControllers.setBrightness);


module.exports = router;