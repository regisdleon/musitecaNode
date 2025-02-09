<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-cyan-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500 mb-4 animate-gradient-x">
          🎶 Canciones
        </h1>
        <p class="text-lg text-gray-600">Explora nuestra colección musical</p>
        <div class="mt-4 h-1 bg-gradient-to-r from-purple-300 to-cyan-300 rounded-full w-1/4 mx-auto"></div>
      </div>

      <!-- Lista de Canciones -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="cancion in canciones" 
          :key="cancion.nombre_cancion"
          class="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100 hover:border-purple-200"
        >
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center">
                <span class="text-white text-2xl">🎵</span>
              </div>
            </div>
            
            <div class="flex-1">
              <h2 class="text-xl font-bold text-purple-800 mb-2">{{ cancion.nombre_cancion }}</h2>
              
              <div class="space-y-2">
                <div class="flex items-center text-sm">
                  <span class="text-purple-500 font-medium w-20">Duración:</span>
                  <span class="text-gray-600">{{ cancion.duracion }}</span>
                </div>
                
                <div class="flex items-center text-sm">
                  <span class="text-purple-500 font-medium w-20">Álbum:</span>
                  <span class="text-cyan-600 font-medium">#{{ cancion.album.id }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Botón de reproducción -->
          <button 
            @click="reproducirArchivo(cancion.archivo_cancion)"
            class="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 p-2 rounded-full shadow-md transition-all duration-300"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from '#imports';

const canciones = ref([]);
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    
    const response = await fetch(`${apiBaseUrl}/api/canciones`, { headers });
    
    if (response.ok) {
      canciones.value = await response.json();
    } else {
      console.error('Error mostrando canciones:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando canciones:', error);
  }
});

const reproducirArchivo = async (cancion) => {
  try {
    const response = await fetch(`${config.public.FRONTEND_URL}${cancion}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const ventana = window.open(url, '_blank', 'width=800,height=600');
    ventana.focus();
  } catch (err) {
    console.error('Error al reproducir el archivo:', err);
  }
};

definePageMeta({
  layout: 'user',
});

useHead({
  title: "Canciones - Musiteca",
  meta: [
    {
      name: "description",
      content: "Descubre y disfruta de nuestra extensa colección de canciones en Musiteca."
    },
    {
      property: "og:image",
      content: "/musiteca-songs-og.jpg"
    }
  ],
});
</script>

<style>
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 8s ease infinite;
}

@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>