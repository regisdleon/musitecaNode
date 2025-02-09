<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-cyan-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500 mb-4 animate-gradient-x">
          🎤 Artistas
        </h1>
        <p class="text-lg text-gray-600">Descubre a los artistas de nuestra comunidad</p>
        <div class="mt-4 h-1 bg-gradient-to-r from-purple-300 to-cyan-300 rounded-full w-1/4 mx-auto"></div>
      </div>

      <!-- Lista de Artistas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="artista in artistas" 
          :key="artista.nombre_artistico"
          class="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100 hover:border-purple-200"
        >
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center">
                <span class="text-white text-2xl">🎤</span>
              </div>
            </div>
            
            <div class="flex-1">
              <h2 class="text-xl font-bold text-purple-800 mb-2">{{ artista.nombre_artistico }}</h2>
              
              <div class="space-y-2">
                <div class="flex items-center text-sm">
                  <span class="text-purple-500 font-medium w-20">Inicio:</span>
                  <span class="text-gray-600">{{ artista.inicio_actividad }}</span>
                </div>
                
                <div class="flex items-center text-sm">
                  <span class="text-purple-500 font-medium w-20">País:</span>
                  <span class="text-cyan-600 font-medium flex items-center">
                    <span class="mr-2">🌎</span>
                    {{ artista.pais }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="absolute top-4 right-4">
            <button class="text-purple-400 hover:text-cyan-500 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const artistas = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    
    const response = await fetch('http://localhost:4000/api/artistas', { headers });
    
    if (response.ok) {
      artistas.value = await response.json();
    } else {
      console.error('Error mostrando artistas:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando artistas:', error);
  }
});

definePageMeta({
  layout: 'user',
});

useHead({
  title: "Artistas - Musiteca",
  meta: [
    {
      name: "description",
      content: "Explora nuestra colección de artistas musicales con información detallada y biografías exclusivas."
    },
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