
const User = require('../models/User');
const { matchedData } = require('express-validator');
const { encrypt} = require('../utils/handlePassword')


/**
 * Registrar un nuevo usuario.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} - Respuesta JSON con los datos del nuevo usuario registrado.
 * @throws {500} - Si hay un error interno del servidor al procesar la solicitud.
 */
const register = async (req, res) => {
    try {
      // Obtener los datos de la solicitud validados
      const requestData = matchedData(req);
  
      // Encriptar la contraseña antes de almacenarla en la base de datos
      const password = await encrypt(requestData.password);
      const body = { ...requestData, password };
  
      // Crear un nuevo objeto de usuario con los datos proporcionados
      const newUser = await User(body);
  
      // Guardar el nuevo usuario en la base de datos
      await newUser.save();
  
      // Enviar una respuesta con los datos del nuevo usuario registrado
      res.status(201).send(newUser);
    } catch (error) {
      // Manejar errores
      console.error(error);
      res.status(500).json({ message: 'Error al registrar el usuario' });
    }
  };
  
  module.exports = {
    register
  };
  