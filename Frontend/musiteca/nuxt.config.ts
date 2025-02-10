// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@sidebase/nuxt-auth'
  ],

  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.NUXT_PUBLIC_BACKEND_URL, // Corregido: prefijo NUXT_PUBLIC_
      FRONTEND_URL: process.env.NUXT_PUBLIC_FRONTEND_URL // Corregido: prefijo NUXT_PUBLIC_
    }
  },

  app: {
    head: {
      title: "Musiteca - Escucha música",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { 
          hid: "description", 
          name: "description", 
          content: "Disfruta de tu música favorita" 
        },
        { 
          property: "og:image", 
          content: process.env.NUXT_PUBLIC_FRONTEND_URL + "/logoMusiteca.png" // URL absoluta
        },
        // ... resto de meta tags
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ]
    }
  },

  auth: {
    globalAppMiddleware: true, // Habilitado para mejor seguridad
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/api/auth/login', method: 'post' }, // Endpoint corregido
        signOut: { path: '/api/auth/logout', method: 'post' },
        getSession: { path: '/api/auth/session', method: 'get' }
      },
      token: {
        signInResponseTokenPointer: '/data/token' // Ajusta según respuesta de tu API
      }
    }
  },

  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://localhost:8080',
        changeOrigin: true,
        prependPath: true
      }
    },
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': process.env.NUXT_PUBLIC_FRONTEND_URL || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    }
  },

  imports: {
    dirs: ['stores'] // Si usas Pinia
  },

  typescript: {
    strict: true
  }
})