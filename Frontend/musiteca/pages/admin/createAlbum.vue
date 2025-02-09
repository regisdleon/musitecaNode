<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-cyan-900 flex items-center justify-center p-4">
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-white/20">
      <!-- Encabezado -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
          🎧 Crear Álbum
        </h1>
        <p class="text-purple-200/80">Agrega un nuevo álbum a la colección</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="crearAlbum" class="space-y-6">
        <!-- Campo Nombre -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">Nombre del Álbum</label>
          <div class="relative">
            <input 
              v-model="nombre_album" 
              type="text" 
              required
              class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              placeholder="Ej: Thriller"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h18M3 19h18M5 7l7 7 7-7"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Campo Duración -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">Duración</label>
          <div class="relative">
            <input 
              v-model="duracion_album" 
              type="text" 
              required
              class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              placeholder="Ej: 42:15"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Campos en grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Fecha Lanzamiento -->
          <div>
            <label class="block text-sm font-medium text-purple-100 mb-2">Fecha Lanzamiento</label>
            <div class="relative">
              <input 
                v-model="fecha_album" 
                type="date" 
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

          <!-- Cantidad Canciones -->
          <div>
            <label class="block text-sm font-medium text-purple-100 mb-2">Canciones</label>
            <div class="relative">
              <input 
                v-model="cantidad_canciones" 
                type="number" 
                required
                class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Número de canciones"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM3 6l15-3 3 3"/>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <!-- Tipo de Álbum -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">Tipo</label>
          <div class="relative">
            <input 
              v-model="tipo" 
              type="text" 
              required
              class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              placeholder="Ej: Estudio, Recopilación"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Selección de Artista -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">Artista</label>
          <div class="relative">
            <select 
              v-model="id_artista" 
              required
              class="w-full pl-12 pr-10 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
            >
              <option value="" disabled class="bg-purple-800">Selecciona un artista</option>
              <option 
                v-for="artista in artistas" 
                :key="artista.id" 
                :value="artista.id"
                class="bg-purple-800"
              >
                {{ artista.nombre_artistico }}
              </option>
            </select>
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
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
          Crear Álbum
        </button>

        <!-- Mensaje de error -->
        <div v-if="error" class="p-3 bg-red-500/20 text-red-200 rounded-lg text-sm border border-red-400/30 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          {{ error }}
        </div>
      </form>

      <!-- Enlace de retorno -->
      <NuxtLink 
        to="/admin/albumAdmin" 
        class="mt-6 text-center text-cyan-300 hover:text-cyan-400 underline underline-offset-4 transition-colors block"
      >
        ← Volver a Álbumes
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Mantener las mismas variables y lógica del script original
// ... (el resto del script se mantiene igual)
</script>