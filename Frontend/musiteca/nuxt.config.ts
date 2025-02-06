export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@sidebase/nuxt-auth',
  ],

  

  auth: {
    globalAppMiddleware: false, // Desactiva el middleware global
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/api/iniciar-sesion', method: 'post' },
        signOut: { path: '/api/cerrar-sesion', method: 'post' },
        getSession: { path: '/api/perfil', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/token',
      },
    },
  },

  

  compatibilityDate: '2025-01-15',

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8080', // Asegúrate que este es el puerto correcto de tu backend
        changeOrigin: true,
        prependPath: true,
      }
    },
    cors: {
      origin: '*',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
      allowHeaders: ['Content-Type', 'Authorization']
    }
  },
  
});