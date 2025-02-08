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
    layout: 'user',
  });

  useHead({
  title: "Lista de artistas como usuario - Musiteca",
  meta: [
    {
      name: "description",
      content: "Poder ver los artistas como usuario",
    },
  ],
});

  </script>

<style scoped>
/* Estilos personalizados para la lista de artistas */
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