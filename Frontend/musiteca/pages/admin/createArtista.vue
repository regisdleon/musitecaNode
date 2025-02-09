<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-cyan-900 flex items-center justify-center p-4">
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 border border-white/20">
      <!-- Encabezado -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
          🎤 Crear Artista
        </h1>
        <p class="text-purple-200/80">Registra un nuevo artista en la plataforma</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="crearArtista" class="space-y-6">
        <!-- Nombre Artístico -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">Nombre Artístico</label>
          <div class="relative">
            <input
              type="text"
              v-model="artista.nombre_artistico"
              required
              placeholder="Ej: Michael Jackson"
              class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Inicio Actividad -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">Inicio de Actividad</label>
          <div class="relative">
            <input
              type="text"
              v-model="artista.inicio_actividad"
              required
              class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- País -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">País</label>
          <div class="relative">
            <input
              type="text"
              v-model="artista.pais"
              required
              placeholder="Ej: Estados Unidos"
              class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </span>
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
          Crear Artista
        </button>

        <!-- Enlace de retorno -->
        <NuxtLink 
          to="/admin/artistaAdmin" 
          class="mt-4 text-center text-cyan-300 hover:text-cyan-400 underline underline-offset-4 transition-colors block"
        >
          ← Volver a Artistas
        </NuxtLink>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import artistaServices from '@/services/artistaServices';

const artista = ref({
  nombre_artistico: '',
  inicio_actividad: '',
  pais: '',
});

const crearArtista = async () => {
  try {
    console.log('Enviando solicitud a la API...');
    await artistaServices.crearArtista(artista.value);
    alert('Artista creado exitosamente');
    artista.value = {
      nombre_artistico: '',
      inicio_actividad: '',
      pais: '',
    };
  } catch (error) {
    console.error('Error al crear el artista:', error);
    alert('Hubo un error al crear el artista');
  }
};
</script>