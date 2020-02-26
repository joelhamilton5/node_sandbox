var express = require('express');
var router = express.Router();
var controller = require('./usersController');

router.get('/', controller.getUsers);

router.post('/clearCached/:userid?', controller.clearCachedUsers);
router.get('/user/:userid', controller.getUser);

module.exports = router;
