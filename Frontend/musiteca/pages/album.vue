<template>
    <div>
      <h1>Álbumes</h1>
      <div>
        <ol>
          <li v-for="album in albums" :key="album.nombre_album">
            <strong>Nombre:</strong> {{ album.nombre_album }},
            <strong>Fecha de Lanzamiento:</strong> {{ album.fecha_album }},
            <strong>Artista:</strong> {{ album.id_artista }}
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
    // Obtenemos el token de autenticación del localStorage
    const token = localStorage.getItem('token');
// Configuramos la solicitud con el token en el header
const headers = {
      'Authorization': `Bearer ${token}`,
    };

    // Hacemos la solicitud a la API con el token en el header
    const response = await fetch('http://localhost:4000/api/albums', {
      headers,
    });
      // Verificamos si la respuesta es exitosa
      if (response.ok) {
      // Obtenemos el cuerpo de la respuesta en formato JSON
      const data = await response.json();

      // Asignamos la respuesta a la variable artistas
      albums.value = data;
    } else {
      console.error('Error mostrando albums:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando albums:', error);
  }
});
  
  // Definimos la metadata de la página
  definePageMeta({
    layout: 'user',
  });

  useHead({
  title: "Lista de albumes - Musiteca",
  meta: [
    {
      name: "description",
      content: "Poder ver los albumes que contiene el sitio como usuario",
    },
  ],
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