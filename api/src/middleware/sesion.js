const User = require('../models/User');
const { verifyToken } = require('../utils/handleJwt');
/**
 * Middleware de autenticación para verificar el token JWT en las solicitudes.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función de middleware siguiente.
 * @returns {void}
 */
const authMiddleware = async (req, res, next) => {
    try {
      // Verificar si se proporciona un token en el encabezado de autorización
      if (!req.headers.authorization) {
        res.status(401).send("Not_Token");
        return;
      }
      
      // Extraer el token del encabezado de autorización
      const token = req.headers.authorization.split(" ").pop();
  
      // Verificar el token JWT y extraer los datos
      const dataToken = await verifyToken(token);
      
      // Verificar si el token contiene un ID válido
      if (!dataToken.id) {
        res.status(401).send("Error_Id_Token");
        return;
      }
  
      // Buscar al usuario en la base de datos utilizando el ID del token
      const user = await User.findById(dataToken.id);
      
      // Asignar el usuario encontrado al objeto de solicitud para uso posterior
      req.user = user;
      
      // Llamar al siguiente middleware
      next();
    } catch (error) {
      // Manejar errores
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = authMiddleware;
  