const express = require('express')
const router = express.Router();
const UserController = require('../controller/UserController');
const verifyToken = require('../middleware/auth')

router.post('/login', UserController.handleLogin)

router.post('/refreshtoken', UserController.handleRefreshToken)

router.post('/logout', UserController.handleLogout)

router.get('/check-login', verifyToken, UserController.handleCheckLogin)


module.exports = router