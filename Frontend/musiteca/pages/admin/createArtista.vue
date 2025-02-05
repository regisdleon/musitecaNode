<template>
    <div class="create-artista-container">
      <h1>Crear Artista</h1>
      <form @submit.prevent="crearArtista" class="create-artista-form">
        <div class="form-group">
          <label for="nombre_artistico">Nombre Artístico:</label>
          <input
            type="text"
            id="nombre_artistico"
            v-model="artista.nombre_artistico"
            required
            placeholder="Ingrese el nombre artístico"
          />
        </div>
  
        <div class="form-group">
          <label for="inicio_actividad">Inicio de Actividad:</label>
          <input
            type="text"
            id="inicio_actividad"
            v-model="artista.inicio_actividad"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="pais">País:</label>
          <input
            type="text"
            id="pais"
            v-model="artista.pais"
            required
            placeholder="Ingrese el país"
          />
        </div>
  
        <button type="submit" class="submit-button">Crear Artista</button>

        <NuxtLink to="/admin/artistaAdmin" class="block mt-4 text-center text-sm text-indigo-600 hover:text-indigo-500">
        Volver a Administración de Artistas
      </NuxtLink>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import artistaServices from '@/services/artistaServices'; // Asegúrate de importar el servicio correcto
  
  // Datos del artista
  const artista = ref({
    nombre_artistico: '',
    inicio_actividad: '',
    pais: '',
  });
  
  // Función para crear un artista
  const crearArtista = async () => {
    try {
      await artistaServices.crearArtista(artista.value);
      alert('Artista creado exitosamente');
      // Limpiar el formulario después de crear
      artista.value = {
        nombre_artistico: '',
        inicio_actividad: '',
        pais: '',
      };
    } catch (error) {
      console.error('Error al crear el artista:', error);
      alert('Hubo un error al crear el artista');
    }
  };
  </script>
  
  <style scoped>
  .create-artista-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .create-artista-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .form-group label {
    font-weight: bold;
    color: #333;
  }
  
  .form-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>