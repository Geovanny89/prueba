const express = require('express');
const { register } = require('../../controller/register.controller');
const { validateRegister } = require('../../validators/auth');

const router= express();

router.post('/register',validateRegister, register)
module.exports=router