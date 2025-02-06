export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@sidebase/nuxt-auth',
  ],
  runtimeConfig: {
    public: {
      host: '0.0.0.0',
      port: 3000
    },
  },

  app: {
    head: {
      title: "Musiteca - Escucha musica",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Escuha musica",
        },
        { name: "keywords", content: "Escucha musica" },
        { name: "author", content: "Regis Brayan de LRon Cabeza" },
        { property: "og:title", content: "Musiteca - escucha musica" },
        { property: "og:description", content: "Escuchar musica" },
        { property: "og:image", content: "/logoMusiteca.png" }, // Ruta de tu logo
        { property: "og:url", content: "https://musitecanode.onrender.com" }, // URL de tu sitio
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },


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

    // ...
  
    // ...

  compatibilityDate: '2025-01-15',
});