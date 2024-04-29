const express = require('express');
const {products} = require('../../controller/productos.controller');
const authMiddleware = require('../../middleware/sesion');


const router= express();

router.get('/product', authMiddleware ,products)

module.exports=router