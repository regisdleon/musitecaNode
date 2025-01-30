<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Crear Álbum</h1>
        <form @submit.prevent="crearAlbum" class="space-y-6">
          <div>
            <label for="nombre_album" class="block text-sm font-medium text-gray-700">Nombre del Álbum</label>
            <input
              v-model="nombre_album"
              type="text"
              id="nombre_album"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="duracion_album" class="block text-sm font-medium text-gray-700">Duración del Álbum</label>
            <input
              v-model="duracion_album"
              type="text"
              id="duracion_album"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="cantidad_canciones" class="block text-sm font-medium text-gray-700">Cantidad de Canciones</label>
            <input
              v-model="cantidad_canciones"
              type="text"
              id="cantidad_canciones"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="tipo" class="block text-sm font-medium text-gray-700">Tipo de Álbum</label>
            <input
              v-model="tipo"
              type="text"
              id="tipo"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="id_artista" class="block text-sm font-medium text-gray-700">Artista</label>
            <select
              v-model="id_artista"
              id="id_artista"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Selecciona un artista</option>
              <option v-for="artista in artistas" :key="artista.id" :value="artista.id">{{ artista.nombre_artistico }}</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Crear Álbum
            </button>
          </div>
        </form>
        <p v-if="error" class="mt-4 text-center text-sm text-red-600">{{ error }}</p>
        <NuxtLink to="/admin/albumAdmin" class="block mt-4 text-center text-sm text-indigo-600 hover:text-indigo-500">
          Volver a Administración de Álbumes
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const nombre_album = ref('');
  const duracion_album = ref('');
  const cantidad_canciones = ref('');
  const tipo = ref('');
  const id_artista = ref('');
  const artistas = ref([]);
  const error = ref('');
  
  // Obtener la lista de artistas al cargar la página
  onMounted(async () => {
    try {
      artistas.value = await $fetch('http://localhost:3000/api/artistas');
    } catch (err) {
      console.error('Error al obtener artistas:', err);
    }
  });
  
  const crearAlbum = async () => {
    try {
      const response = await $fetch('http://localhost:3000/api/albumes', {
        method: 'POST',
        body: {
          nombre_album: nombre_album.value,
          duracion_album: duracion_album.value,
          cantidad_canciones: cantidad_canciones.value,
          tipo: tipo.value,
          id_artista: id_artista.value,
        },
      });
  
      if (response.mensaje === 'Álbum creado exitosamente') {
        alert('Álbum creado exitosamente');
        navigateTo('/albumAdmin');
      } else {
        throw new Error(response.mensaje || 'Error al crear el álbum');
      }
    } catch (err) {
      console.error('Error al crear el álbum:', err);
      error.value = 'Error al crear el álbum. Inténtalo de nuevo.';
    }
  };
  </script>