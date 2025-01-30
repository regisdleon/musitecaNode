const serverHost = "http://localhost:4000/api"; // Define la URL base del backend

const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Obtiene el token del localStorage
  if (token) {
    return { 'Authorization': `Bearer ${token}` }; // Devuelve el encabezado con el token
  }
  return {}; // Si no hay token, devuelve un objeto vacío
};

const usuarioServices = {
  async obtenerUsuarios() {
    try {
      const response = await fetch(`${serverHost}/usuarios`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al obtener los usuarios');
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  },

  async registrarUsuario(usuario) {
    try {
      const response = await fetch(`${serverHost}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error('Error al registrar el usuario');
      return await response.json();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  },

  async actualizarUsuario(id, usuario) {
    try {
      const response = await fetch(`${serverHost}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error('Error al actualizar el usuario');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
    }
  },

  async eliminarUsuario(id) {
    try {
      const response = await fetch(`${serverHost}/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al eliminar el usuario');
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw error;
    }
  },

  async iniciarSesion(usuario) {
    try {
      const response = await fetch(`${serverHost}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error('Error al iniciar sesión');
      const data = await response.json();
      localStorage.setItem('token', data.token); // Guarda el token en localStorage
      return data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },

  async refrescarToken(refreshToken) {
    try {
      const response = await fetch(`${serverHost}/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) throw new Error('Error al refrescar el token');
      const data = await response.json();
      localStorage.setItem('token', data.token); // Actualiza el token en localStorage
      return data;
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      throw error;
    }
  },

  async obtenerPerfil() {
    try {
      const response = await fetch(`${serverHost}/perfil`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(), // Incluye el encabezado de autorización
        },
      });
      if (!response.ok) throw new Error('Error al obtener el perfil');
      return await response.json();
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      throw error;
    }
  },
};

export default usuarioServices;