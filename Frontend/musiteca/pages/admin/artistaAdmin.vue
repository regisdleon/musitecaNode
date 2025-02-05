<template>
    <div>
        <NuxtLink to="createArtista">Crear un nuevo Artista</NuxtLink>
      <h1>Artistas</h1>
      <div>
        <ol>
          <li v-for="artista in artistas" :key="artista.nombre_artistico">
            <strong>Nombre:</strong> {{ artista.nombre_artistico }},
            <strong>Inicio Actividad:</strong> {{ artista.inicio_actividad }},
            <strong>País:</strong> {{ artista.pais }}
          </li>
        </ol>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  
  // Variable reactiva para almacenar la lista de artistas
  const artistas = ref([]);
  
  // Función que se ejecuta cuando el componente se monta
// Función que se ejecuta cuando el componente se monta
onMounted(async () => {
  try {
    // Obtenemos el token de autenticación del localStorage
    const token = localStorage.getItem('token');

    // Configuramos la solicitud con el token en el header
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    // Hacemos la solicitud a la API con el token en el header
    const response = await fetch('http://localhost:4000/api/artistas', {
      headers,
    });

    // Verificamos si la respuesta es exitosa
    if (response.ok) {
      // Obtenemos el cuerpo de la respuesta en formato JSON
      const data = await response.json();

      // Asignamos la respuesta a la variable artistas
      artistas.value = data;
    } else {
      console.error('Error mostrando artistas:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando artistas:', error);
  }
});
  
  // Definimos la metadata de la página
  definePageMeta({
    layout: 'admin',
  });
  </script>