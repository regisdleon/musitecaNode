<template>
    <div>
      <h1>Álbumes</h1>
      <div>
        <ol>
          <li v-for="album in albums" :key="album.nombre_album">
            <strong>Nombre:</strong> {{ album.nombre_album }},
            <strong>Fecha de Lanzamiento:</strong> {{ album.fecha_lanzamiento }},
            <strong>Artista:</strong> {{ album.artista }}
          </li>
        </ol>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Variable reactiva para almacenar la lista de álbumes
  const albums = ref([]);
  
  // Función que se ejecuta cuando el componente se monta
  onMounted(async () => {
    try {
      // Hacemos la solicitud a la API
      const response = await $fetch('http://localhost:4000/api/albums');
      // Asignamos la respuesta a la variable albums
      albums.value = response;
    } catch (error) {
      console.error('Error mostrando álbumes:', error);
    }
  });
  
  // Definimos la metadata de la página
  definePageMeta({
    layout: 'user',
  });
  </script>
  
  <style scoped>
  /* Estilos personalizados para la lista de álbumes */
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