const User = require('../models/User');
const { matchedData } = require('express-validator');
const { compare} = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt');


/**
 * Iniciar sesión de usuario.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} - Respuesta JSON con el token de autenticación y los datos del usuario.
 * @throws {401} - Si el usuario no existe o la contraseña es incorrecta.
 * @throws {500} - Si hay un error interno del servidor al procesar la solicitud.
 */
const login = async (req, res) => {
    try {
      // Obtener los datos de la solicitud validados
      const requestData = matchedData(req);
      
      // Buscar al usuario por su correo electrónico en la base de datos
      const user = await User.findOne({ email: requestData.email });
  
      // Verificar si el usuario existe
      if (!user) {
        res.status(401).send("Usuario no existe");
        return;
      }
  
      // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
      const hashPassword = user.password;
      const check = await compare(requestData.password, hashPassword);
  
      // Verificar si la contraseña es válida
      if (!check) {
        res.status(401).send("Contraseña inválida");
        return;
      }
  
      // Eliminar la contraseña del objeto de usuario para evitar su envío en la respuesta
      user.set('password', undefined, { strict: false });
  
      // Generar un token de autenticación y enviarlo junto con los datos del usuario
      const data = {
        token: await tokenSign(user),
        user
      };
  
      // Enviar la respuesta con el token de autenticación y los datos del usuario
      res.send(data);
    } catch (error) {
      // Manejar errores
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  };
  
  module.exports = {
    login
  };
  