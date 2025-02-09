<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-cyan-900 flex items-center justify-center p-4">
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-white/20">
      <!-- Encabezado -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
          🎵 Crear Canción
        </h1>
        <p class="text-purple-200/80">Agrega una nueva canción al catálogo</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="crearCancion" class="space-y-6">
        <!-- Nombre Canción -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">Nombre</label>
          <div class="relative">
            <input
              v-model="nombre_cancion"
              type="text"
              required
              placeholder="Ej: Bohemian Rhapsody"
              class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM3 6l15-3 3 3"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Género y Duración en grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Género -->
          <div>
            <label class="block text-sm font-medium text-purple-100 mb-2">Género</label>
            <div class="relative">
              <input
                v-model="genero_cancion"
                type="text"
                required
                placeholder="Ej: Rock"
                class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                </svg>
              </span>
            </div>
          </div>

          <!-- Duración -->
          <div>
            <label class="block text-sm font-medium text-purple-100 mb-2">Duración</label>
            <div class="relative">
              <input
                v-model="duracion"
                type="text"
                required
                placeholder="Ej: 5:55"
                class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <!-- Álbum -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">Álbum</label>
          <div class="relative">
            <select
              v-model="id_album"
              required
              class="w-full pl-12 pr-10 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
            >
              <option value="" disabled class="bg-purple-800">Selecciona un álbum</option>
              <option 
                v-for="album in albumes" 
                :key="album.id" 
                :value="album.id"
                class="bg-purple-800"
              >
                {{ album.nombre_album }}
              </option>
            </select>
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
              </svg>
            </span>
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Subida de Archivo -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">Archivo de Audio</label>
          <div 
            @click="$refs.fileInput.click()"
            class="border-2 border-dashed border-purple-300/50 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition-colors"
          >
            <input 
              type="file" 
              ref="fileInput" 
              @change="seleccionarArchivo" 
              accept="audio/*" 
              class="hidden"
            />
            <div class="space-y-2">
              <svg class="w-8 h-8 mx-auto text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m6-16H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/>
              </svg>
              <p class="text-purple-200 text-sm">
                {{ archivo_seleccionado ? archivo_seleccionado.name : 'Haz clic para subir el archivo' }}
              </p>
              <p class="text-purple-300/80 text-xs">Formatos soportados: .mp3, .wav</p>
            </div>
          </div>
        </div>

        <!-- Botón de Envío -->
        <button
          type="submit"
          class="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Crear Canción
        </button>

        <!-- Mensaje de error -->
        <div v-if="error" class="p-3 bg-red-500/20 text-red-200 rounded-lg text-sm border border-red-400/30 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          {{ error }}
        </div>

        <!-- Enlace de retorno -->
        <NuxtLink 
          to="/admin/cancionAdmin" 
          class="mt-4 text-center text-cyan-300 hover:text-cyan-400 underline underline-offset-4 transition-colors block"
        >
          ← Volver a Canciones
        </NuxtLink>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from '#imports';

const router = useRouter();
const fileInput = ref(null);

const nombre_cancion = ref('');
const genero_cancion = ref('');
const duracion = ref('');
const id_album = ref('');
const albumes = ref([]);
const error = ref('');
const archivo_seleccionado = ref(null);
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiBaseUrl}/api/albums`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      albumes.value = await response.json();
    }
  } catch (error) {
    console.error('Error cargando álbumes:', error);
  }
});

const seleccionarArchivo = (event) => {
  archivo_seleccionado.value = event.target.files[0];
};

const crearCancion = async () => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    formData.append('nombre_cancion', nombre_cancion.value);
    formData.append('genero_cancion', genero_cancion.value);
    formData.append('duracion', duracion.value);
    formData.append('id_album', id_album.value);
    formData.append('archivo_cancion', archivo_seleccionado.value);

    const response = await fetch(`${apiBaseUrl}/api/canciones/createCancion`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });

    if (response.ok) {
      alert('Canción creada exitosamente');
      router.push('/admin/cancionAdmin');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear la canción');
    }
  } catch (err) {
    console.error('Error al crear la canción:', err);
    error.value = err.message || 'Error al crear la canción. Inténtalo de nuevo.';
  }
};
</script>