<template>
    <div class="min-h-screen bg-gradient-to-b from-purple-50 to-cyan-50 p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Encabezado -->
        <div class="mb-12 text-center">
          <h1 class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500 mb-4 animate-gradient-x">
            🛠 Panel de Administración
          </h1>
          <p class="text-lg text-gray-600">Gestión completa de la plataforma</p>
          <div class="mt-4 h-1 bg-gradient-to-r from-purple-300 to-cyan-300 rounded-full w-1/4 mx-auto"></div>
        </div>
  
        <!-- Tarjetas de Gestión -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Usuarios -->
          <NuxtLink 
            to="/admin/usuarios"
            class="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100 hover:border-purple-200"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                Gestión de Usuarios
              </h2>
            </div>
            <p class="mt-2 text-sm text-gray-600">Administra permisos y cuentas de usuarios</p>
          </NuxtLink>
  
          <!-- Artistas -->
          <NuxtLink 
            to="/admin/artistas"
            class="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100 hover:border-purple-200"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM3 6l15-3 3 3"/>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                Gestión de Artistas
              </h2>
            </div>
            <p class="mt-2 text-sm text-gray-600">Administra artistas y sus datos</p>
          </NuxtLink>
  
          <!-- Álbumes -->
          <NuxtLink 
            to="/admin/albumes"
            class="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100 hover:border-purple-200"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                Gestión de Álbumes
              </h2>
            </div>
            <p class="mt-2 text-sm text-gray-600">Administra discografías y contenido</p>
          </NuxtLink>
  
          <!-- Canciones -->
          <NuxtLink 
            to="/admin/canciones"
            class="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100 hover:border-purple-200"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM3 6l15-3 3 3"/>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                Gestión de Canciones
              </h2>
            </div>
            <p class="mt-2 text-sm text-gray-600">Administra el catálogo musical</p>
          </NuxtLink>
  
          <!-- Opiniones -->
          <NuxtLink 
            to="/admin/opiniones"
            class="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100 hover:border-purple-200"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                Gestión de Opiniones
              </h2>
            </div>
            <p class="mt-2 text-sm text-gray-600">Modera comentarios y reseñas</p>
          </NuxtLink>
  
          <!-- Configuración -->
          <NuxtLink 
            to="/admin/configuracion"
            class="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100 hover:border-purple-200"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                Configuración
              </h2>
            </div>
            <p class="mt-2 text-sm text-gray-600">Ajustes generales de la plataforma</p>
          </NuxtLink>
        </div>
  
        <!-- Footer -->
        <div class="mt-12 border-t border-purple-100 pt-6 text-center">
          <NuxtLink 
            to="/about" 
            class="text-purple-500 hover:text-cyan-600 font-medium transition-colors"
          >
            ← Volver al sitio principal
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'admin'
  });
  
  useHead({
    title: "Panel de Administración - Musiteca",
    meta: [
      {
        name: "description",
        content: "Panel de administración para la gestión completa de Musiteca"
      }
    ]
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