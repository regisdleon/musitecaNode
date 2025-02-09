<template>
  <header class="shadow-xl">
      <div class="bg-gradient-to-r from-purple-900 to-cyan-900 flex items-center justify-between px-6 py-4">
          <div class="flex items-center space-x-4">
              <img 
                  src="/logoMusiteca.jpg" 
                  alt="Logo" 
                  class="w-16 h-16 rounded-full border-2 border-purple-300 hover:rotate-12 transition-transform duration-300"
              />
              <h1 class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 text-4xl md:text-5xl uppercase tracking-tighter">
                  Musiteca
              </h1>
          </div>
          
          <div class="hidden md:block">
              <button 
                  @click="cerrarSesion"
                  class="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 flex items-center"
              >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Cerrar Sesión
              </button>
          </div>
      </div>
      
      <nav class="bg-gradient-to-r from-purple-800 to-cyan-800 border-b border-purple-300/20">
          <ul class="flex justify-center space-x-8 py-3">
              <li v-for="link in links" :key="link.path">
                  <NuxtLink 
                      :to="link.path"
                      class="text-purple-100 hover:text-cyan-300 px-4 py-2 flex items-center transition-all duration-300 group"
                  >
                      <span class="mr-2 opacity-70 group-hover:opacity-100">{{ link.icon }}</span>
                      {{ link.label }}
                  </NuxtLink>
              </li>
          </ul>
      </nav>
  </header>
</template>

<script>
export default {
data() {
  return {
    links: [
      { path: '/artista', label: 'Artistas', icon: '🎤' },
      { path: '/album', label: 'Álbumes', icon: '💿' },
      { path: '/cancion', label: 'Canciones', icon: '🎵' },
      { path: '/about', label: 'Acerca de', icon: 'ℹ️' }
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