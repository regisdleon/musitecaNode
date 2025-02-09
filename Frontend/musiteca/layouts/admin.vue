<template>
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="bg-gradient-to-r from-purple-900 to-cyan-900 shadow-xl">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between py-4">
            <!-- Logo y título -->
            <div class="flex items-center space-x-4">
              <img 
                src="/logoMusiteca.jpg" 
                alt="Logo" 
                class="w-16 h-16 rounded-full border-2 border-purple-300 hover:rotate-12 transition-transform"
              />
              <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                MUSITECA
              </h1>
            </div>
  
            <!-- Botón cerrar sesión -->
            <button 
              @click="cerrarSesion"
              class="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span class="text-red-100">Cerrar Sesión</span>
            </button>
          </div>
  
          <!-- Navegación -->
          <nav class="mt-4">
            <ul class="flex space-x-4 overflow-x-auto pb-2">
              <li v-for="link in navLinks" :key="link.path">
                <NuxtLink 
                  :to="link.path"
                  class="px-4 py-2 text-purple-100 hover:text-cyan-300 flex items-center space-x-2 transition-colors group"
                >
                  <span class="text-lg">{{ link.icon }}</span>
                  <span class="font-medium">{{ link.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
  
      <!-- Contenido principal -->
      <main class="flex-1 bg-gradient-to-b from-purple-50 to-cyan-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <slot />
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="bg-gradient-to-r from-purple-900 to-cyan-900 border-t border-purple-300/20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="text-center space-y-2">
            <p class="text-sm text-purple-300">
              © 2024 Musiteca. Todos los derechos reservados
            </p>
            <p class="text-xs text-purple-400 flex items-center justify-center space-x-1">
              <span>Desarrollado con</span>
              <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>por <strong class="text-cyan-400">REGIS</strong></span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        navLinks: [
          { path: '/admin/adminIndex', label: 'Dashboard', icon: '📊' },
          { path: '/admin/artistaAdmin', label: 'Artistas', icon: '🎤' },
          { path: '/admin/albumAdmin', label: 'Álbumes', icon: '💿' },
          { path: '/admin/cancionAdmin', label: 'Canciones', icon: '🎵' }
        ]
      }
    },
    methods: {
      cerrarSesion() {
        localStorage.removeItem('token');
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style>
  .router-link-exact-active {
    @apply text-cyan-400 border-b-2 border-cyan-400;
  }
  </style>