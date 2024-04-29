const fetch = require('node-fetch');

/**
 * Obtener productos de una API externa.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} - Respuesta JSON con los productos obtenidos.
 */
const products = async (req, res) => {
  try {
    // Realizar la solicitud a la API externa
    const response = await fetch('https://dummyjson.com/carts');

    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }

    // Obtener los productos como datos JSON
    const products = await response.json();
    
    // Retornar los productos como respuesta
    res.json(products);
  } catch (error) {
    // Manejar errores
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  products
};

