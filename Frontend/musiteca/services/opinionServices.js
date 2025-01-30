const serverHost = "http://localhost:4000/api"; // Define la URL base del backend

const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Obtiene el token del localStorage
  if (token) {
    return { 'Authorization': `Bearer ${token}` }; // Devuelve el encabezado con el token
  }
  return {}; // Si no hay token, devuelve un objeto vacío
};

const opinionServices = {
  async obtenerOpiniones() {
    try {
      const response = await fetch(`${serverHost}/opiniones`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al obtener las opiniones');
      return await response.json();
    } catch (error) {
      console.error('Error al obtener las opiniones:', error);
      throw error;
    }
  },

  async crearOpinion(opinion) {
    try {
      const response = await fetch(`${serverHost}/opiniones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(opinion),
      });
      if (!response.ok) throw new Error('Error al crear la opinión');
      return await response.json();
    } catch (error) {
      console.error('Error al crear la opinión:', error);
      throw error;
    }
  },

  async actualizarOpinion(id, opinion) {
    try {
      const response = await fetch(`${serverHost}/opiniones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(opinion),
      });
      if (!response.ok) throw new Error('Error al actualizar la opinión');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar la opinión:', error);
      throw error;
    }
  },

  async eliminarOpinion(id) {
    try {
      const response = await fetch(`${serverHost}/opiniones/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al eliminar la opinión');
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar la opinión:', error);
      throw error;
    }
  },
};

export default opinionServices;