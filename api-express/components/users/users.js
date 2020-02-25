var express = require('express');
var router = express.Router();
var controller = require('./usersController');

router.get('/', controller.getUsers);
router.get('/user/:userid', controller.getUser);

module.exports = router;
