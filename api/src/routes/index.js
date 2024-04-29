const express = require('express')

const router = express();
const login = require('./login/login')
const register = require('./register/register')
const productos = require('./productos/productos')

router.use(login)
router.use(register)
router.use(productos)


module.exports = router;