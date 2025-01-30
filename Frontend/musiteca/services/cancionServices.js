const serverHost = "http://localhost:4000/api"; // Define la URL base del backend

const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Obtiene el token del localStorage
  if (token) {
    return { 'Authorization': `Bearer ${token}` }; // Devuelve el encabezado con el token
  }
  return {}; // Si no hay token, devuelve un objeto vacío
};

const cancionServices = {
  async obtenerCanciones() {
    try {
      const response = await fetch(`${serverHost}/canciones`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al obtener las canciones');
      return await response.json();
    } catch (error) {
      console.error('Error al obtener las canciones:', error);
      throw error;
    }
  },

  async crearCancion(cancion) {
    try {
      const response = await fetch(`${serverHost}/canciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(cancion),
      });
      if (!response.ok) throw new Error('Error al crear la canción');
      return await response.json();
    } catch (error) {
      console.error('Error al crear la canción:', error);
      throw error;
    }
  },

  async actualizarCancion(id, cancion) {
    try {
      const response = await fetch(`${serverHost}/canciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(cancion),
      });
      if (!response.ok) throw new Error('Error al actualizar la canción');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar la canción:', error);
      throw error;
    }
  },

  async eliminarCancion(id) {
    try {
      const response = await fetch(`${serverHost}/canciones/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al eliminar la canción');
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar la canción:', error);
      throw error;
    }
  },
};

export default cancionServices;