const { Router } = require('express');
const express = require('express');

const authController = require('../controller/auth')
const AuthRoute = express.Router();



AuthRoute.get('/', authController.index)
AuthRoute.post('/login', authController.login)

module.exports = {AuthRoute};