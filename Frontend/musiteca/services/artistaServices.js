const serverHost = "http://localhost:4000/api"; // Define la URL base del backend

const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Obtiene el token del localStorage
  if (token) {
    return { 'Authorization': `Bearer ${token}` }; // Devuelve el encabezado con el token
  }
  return {}; // Si no hay token, devuelve un objeto vacío
};

const artistaServices = {
  async obtenerArtistas() {
    try {
      const response = await fetch(`${serverHost}/artistas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al obtener los artistas');
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los artistas:', error);
      throw error;
    }
  },

  async crearArtista(artista) {
    try {
      const response = await fetch(`${serverHost}/artistas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(artista),
      });
      if (!response.ok) throw new Error('Error al crear el artista');
      return await response.json();
    } catch (error) {
      console.error('Error al crear el artista:', error);
      throw error;
    }
  },

  async actualizarArtista(id, artista) {
    try {
      const response = await fetch(`${serverHost}/artistas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(artista),
      });
      if (!response.ok) throw new Error('Error al actualizar el artista');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar el artista:', error);
      throw error;
    }
  },

  async eliminarArtista(id) {
    try {
      const response = await fetch(`${serverHost}/artistas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al eliminar el artista');
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar el artista:', error);
      throw error;
    }
  },
};

export default artistaServices;