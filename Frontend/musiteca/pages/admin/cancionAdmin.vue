<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-cyan-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500">
          🎵 Gestión de Canciones
        </h1>
        <NuxtLink 
          to="createCancion"
          class="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Nueva Canción
        </NuxtLink>
      </div>

      <!-- Lista de Canciones -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="cancion in canciones" 
          :key="cancion.id"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-purple-100"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-purple-800">{{ cancion.nombre_cancion }}</h2>
            <span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
              {{ cancion.genero_cancion }}
            </span>
          </div>

          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Duración:</span>
              <span class="text-gray-700">{{ cancion.duracion }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Álbum:</span>
              <span class="text-cyan-600">{{ cancion.album?.nombre_album || 'Sin álbum' }}</span>
            </div>
          </div>

          <div class="flex justify-end space-x-2 mt-4">
            <button 
              @click="reproducirArchivo(cancion)"
              class="text-purple-500 hover:text-purple-700 transition-colors p-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </button>
            <button 
              @click="descargarArchivo(cancion)"
              class="text-cyan-500 hover:text-cyan-700 transition-colors p-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </button>
            <button 
              @click="editarCancion(cancion.id)"
              class="text-blue-500 hover:text-blue-700 transition-colors p-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
            <button 
              @click="confirmarEliminacion(cancion.id)"
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
          <h3 class="text-xl font-bold mb-4">Editar Canción</h3>
          <form @submit.prevent="guardarCambios">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input v-model="edicion.nombre_cancion" type="text" class="w-full px-4 py-2 border rounded-lg">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Género</label>
                <input v-model="edicion.genero_cancion" type="text" class="w-full px-4 py-2 border rounded-lg">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                <input v-model="edicion.duracion" type="text" class="w-full px-4 py-2 border rounded-lg">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Álbum ID</label>
                <input v-model="edicion.id_album" type="text" class="w-full px-4 py-2 border rounded-lg">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Archivo</label>
                <input type="file" @change="handleFileUpload" class="w-full px-4 py-2 border rounded-lg">
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
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const canciones = ref([]);
const showModal = ref(false);
const cancionEditId = ref(null);
const edicion = ref({
  nombre_cancion: '',
  genero_cancion: '',
  duracion: '',
  id_album: '',
  archivo_cancion: null
});

onMounted(async () => {
  await cargarCanciones();
});

const cargarCanciones = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${config.public.BACKEND_URL}/api/canciones`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      canciones.value = await response.json();
    }
  } catch (error) {
    console.error('Error cargando canciones:', error);
  }
};

const editarCancion = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${config.public.BACKEND_URL}/api/canciones/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      edicion.value = { ...data };
      cancionEditId.value = id;
      showModal.value = true;
    }
  } catch (error) {
    console.error('Error editando canción:', error);
  }
};

const guardarCambios = async () => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    Object.entries(edicion.value).forEach(([key, value]) => {
      if (key !== 'archivo_cancion') formData.append(key, value);
    });
    
    if (edicion.value.archivo_cancion) {
      formData.append('archivo_cancion', edicion.value.archivo_cancion);
    }

    const response = await fetch(`${config.public.BACKEND_URL}/api/canciones/${cancionEditId.value}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });

    if (response.ok) {
      await cargarCanciones();
      showModal.value = false;
    }
  } catch (error) {
    console.error('Error guardando cambios:', error);
  }
};

const handleFileUpload = (event) => {
  edicion.value.archivo_cancion = event.target.files[0];
};

const confirmarEliminacion = (id) => {
  if (confirm('¿Estás seguro de eliminar esta canción?')) {
    eliminarCancion(id);
  }
};

const eliminarCancion = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${config.public.BACKEND_URL}/api/canciones/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      await cargarCanciones();
    }
  } catch (error) {
    console.error('Error eliminando canción:', error);
  }
};

// Métodos para descargar y reproducir (mantener los existentes)
// ... (mantener las funciones de descargarArchivo y reproducirArchivo)

definePageMeta({
  layout: 'admin'
});
</script>