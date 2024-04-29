const express = require('express');
const { login } = require('../../controller/login.controller');
const {  validateLogin } = require('../../validators/auth');

const router= express();

router.post('/login', validateLogin,login)

module.exports=router