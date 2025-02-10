import { useRuntimeConfig } from '#imports';


const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No hay token de autenticación');
    throw new Error('No autenticado');
  }
  return { 'Authorization': `Bearer ${token}` };
};


const artistaServices = {
  async crearArtista(artista) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/artistas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(artista),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el artista');
      }

      return await response.json();
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  },
};
export default artistaServices;