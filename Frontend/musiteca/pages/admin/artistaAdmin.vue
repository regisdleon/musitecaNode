<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-cyan-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500">
          🎤 Gestión de Artistas
        </h1>
        <NuxtLink 
          to="createArtista"
          class="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Nuevo Artista
        </NuxtLink>
      </div>

      <!-- Lista de Artistas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="artista in artistas" 
          :key="artista.id"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-purple-100"
        >
          <div class="flex items-center space-x-4 mb-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <span class="text-white text-xl">🎤</span>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold text-purple-800">{{ artista.nombre_artistico }}</h2>
              <p class="text-sm text-cyan-600">{{ artista.pais }}</p>
            </div>
          </div>

          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Inicio Actividad:</span>
              <span class="text-gray-700">{{ artista.inicio_actividad }}</span>
            </div>
          </div>

          <div class="flex justify-end space-x-2 mt-4">
            <button 
              @click="editarArtista(artista.id)"
              class="text-purple-500 hover:text-purple-700 transition-colors p-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
            <button 
              @click="confirmarEliminacion(artista.id)"
              class="text-red-400 hover:text-red-600 transition-colors p-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de Edición -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 class="text-xl font-bold mb-4">Editar Artista</h3>
          <form @submit.prevent="guardarCambios">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Artístico</label>
                <input v-model="edicion.nombre_artistico" type="text" class="w-full px-4 py-2 border rounded-lg">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Inicio Actividad</label>
                <input v-model="edicion.inicio_actividad" type="date" class="w-full px-4 py-2 border rounded-lg">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">País</label>
                <input v-model="edicion.pais" type="text" class="w-full px-4 py-2 border rounded-lg">
              </div>
            </div>
            <div class="flex justify-end space-x-4 mt-6">
              <button 
                type="button"
                @click="showModal = false"
                class="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from '#imports';

const artistas = ref([]);
const showModal = ref(false);
const artistaEditId = ref(null);
const edicion = ref({
  nombre_artistico: '',
  inicio_actividad: '',
  pais: ''
});
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;

onMounted(async () => {
  await cargarArtistas();
});

const cargarArtistas = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiBaseUrl}/api/artistas`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      artistas.value = await response.json();
    }
  } catch (error) {
    console.error('Error cargando artistas:', error);
  }
};

const editarArtista = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiBaseUrl}/api/artistas/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      edicion.value = { ...data };
      artistaEditId.value = id;
      showModal.value = true;
    }
  } catch (error) {
    console.error('Error editando artista:', error);
  }
};

const guardarCambios = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiBaseUrl}/api/artistas/${artistaEditId.value}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(edicion.value)
    });

    if (response.ok) {
      await cargarArtistas();
      showModal.value = false;
    }
  } catch (error) {
    console.error('Error guardando cambios:', error);
  }
};

const confirmarEliminacion = (id) => {
  if (confirm('¿Estás seguro de eliminar este artista?')) {
    eliminarArtista(id);
  }
};

const eliminarArtista = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiBaseUrl}/api/artistas/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      await cargarArtistas();
    }
  } catch (error) {
    console.error('Error eliminando artista:', error);
  }
};

definePageMeta({
  layout: 'admin'
});
</script>