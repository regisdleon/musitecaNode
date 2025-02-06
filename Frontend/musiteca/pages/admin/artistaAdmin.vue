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
          <button @click="editarArtista(artista.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Editar
          </button>
          <button @click="eliminarArtista(artista.id)" class="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Eliminar
          </button>
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

// Función para cargar los artistas
const cargarArtistas = async () => {
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
};

// Función para eliminar un artista
const eliminarArtista = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`http://localhost:4000/api/artistas/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (response.ok) {
      // Recargar la lista de artistas después de eliminar
      alert("Artista eliminado.")
      await cargarArtistas();
    } else {
      console.error('Error eliminando el artista:', response.statusText);
    }
  } catch (error) {
    console.error('Error eliminando el artista:', error);
  }
};

// Definimos la metadata de la página
definePageMeta({
  layout: 'admin',
});
</script>