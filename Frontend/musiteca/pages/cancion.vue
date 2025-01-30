<template>
    <div>
      <h1>Canciones</h1>
      <div>
        <ol>
          <li v-for="cancion in canciones" :key="cancion.nombre_cancion">
            <strong>Nombre:</strong> {{ cancion.nombre_cancion }},
            <strong>Duración:</strong> {{ cancion.duracion }},
            <strong>Álbum:</strong> {{ cancion.album }}
          </li>
        </ol>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Variable reactiva para almacenar la lista de canciones
  const canciones = ref([]);
  
  // Función que se ejecuta cuando el componente se monta
  onMounted(async () => {
    try {
      // Hacemos la solicitud a la API
      const response = await $fetch('http://localhost:4000/api/canciones');
      // Asignamos la respuesta a la variable canciones
      canciones.value = response;
    } catch (error) {
      console.error('Error mostrando canciones:', error);
    }
  });
  
  // Definimos la metadata de la página
  definePageMeta({
    layout: 'user',
  });
  </script>
  
  <style scoped>
  /* Estilos personalizados para la lista de canciones */
  ol {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background-color: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>