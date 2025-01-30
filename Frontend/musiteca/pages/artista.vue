<template>
    <div>
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
  onMounted(async () => {
    try {
      // Hacemos la solicitud a la API
      const response = await $fetch('http://localhost:4000/api/artistas');
      // Asignamos la respuesta a la variable artistas
      artistas.value = response;
    } catch (error) {
      console.error('Error mostrando artistas:', error);
    }
  });
  
  // Definimos la metadata de la página
  definePageMeta({
    layout: 'user',
  });
  </script>