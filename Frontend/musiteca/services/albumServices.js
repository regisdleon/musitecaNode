const serverHost = "http://localhost:4000/api"; // Define la URL base del backend

const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Obtiene el token del localStorage
  if (token) {
    return { 'Authorization': `Bearer ${token}` }; // Devuelve el encabezado con el token
  }
  return {}; // Si no hay token, devuelve un objeto vacío
};

const albumServices = {
  async obtenerAlbums() {
    try {
      const response = await fetch(`${serverHost}/albums`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al obtener los álbumes');
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los álbumes:', error);
      throw error;
    }
  },

  async crearAlbum(album) {
    try {
      const response = await fetch(`${serverHost}/albums`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(album),
      });
      if (!response.ok) throw new Error('Error al crear el álbum');
      return await response.json();
    } catch (error) {
      console.error('Error al crear el álbum:', error);
      throw error;
    }
  },

  async actualizarAlbum(id, album) {
    try {
      const response = await fetch(`${serverHost}/albums/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(album),
      });
      if (!response.ok) throw new Error('Error al actualizar el álbum');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar el álbum:', error);
      throw error;
    }
  },

  async eliminarAlbum(id) {
    try {
      const response = await fetch(`${serverHost}/albums/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al eliminar el álbum');
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar el álbum:', error);
      throw error;
    }
  },
};

export default albumServices;