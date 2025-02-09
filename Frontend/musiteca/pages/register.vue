<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-cyan-900 flex items-center justify-center p-4">
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-8 border border-white/20">
      <!-- Encabezado -->
      <div class="text-center space-y-2">
        <h2 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 animate-gradient-x">
          🎵 Registro
        </h2>
        <p class="text-purple-100/80">Crea tu cuenta para comenzar</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="registrar" class="space-y-6">
        <!-- Campo Usuario -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">
            Nombre de usuario
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="nombre_usuario"
              required
              class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="Crea tu nombre de usuario"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Campo Contraseña -->
        <div>
          <label class="block text-sm font-medium text-purple-100 mb-2">
            Contraseña
          </label>
          <div class="relative">
            <input
              type="password"
              v-model="contrasena"
              required
              class="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Botón de Registro -->
        <button
          type="submit"
          class="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Crear Cuenta
        </button>

        <!-- Mensaje de error -->
        <div v-if="error" class="p-3 bg-red-500/20 text-red-200 rounded-lg text-sm border border-red-400/30">
          {{ error }}
        </div>
      </form>

      <!-- Enlace de login -->
      <p class="text-center text-purple-200/80">
        ¿Ya tienes cuenta? 
        <NuxtLink 
          to="/" 
          class="text-cyan-300 hover:text-cyan-400 underline underline-offset-4 transition-colors"
        >
          Inicia sesión
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Registro - Musiteca",
  meta: [
    {
      name: "description",
      content: "Crea tu cuenta en Musiteca para acceder a contenido exclusivo y gestionar tu perfil musical."
    }
  ]
});

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import usuarioServices from '@/services/usuarioServices';

const router = useRouter();
const nombre_usuario = ref('');
const contrasena = ref('');
const error = ref('');

const registrar = async () => {
  try {
    await usuarioServices.registrarUsuario({
      nombre_usuario: nombre_usuario.value,
      contrasena: contrasena.value
    });
    router.push('/login');
  } catch (err) {
    error.value = 'Error al registrar. Intenta con otro nombre de usuario.';
    console.error('Error en registro:', err);
  }
};
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