<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar sesión</h1>
      <form @submit.prevent="iniciarSesion" class="space-y-6">
        <div>
          <label for="nombre_usuario" class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
          <input
            type="text"
            id="nombre_usuario"
            v-model="nombre_usuario"
            placeholder="Nombre de usuario"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="contrasena" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            v-model="contrasena"
            placeholder="Contraseña"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
      <p v-if="error" class="mt-4 text-center text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Usa useAuth proporcionado por Nuxt
const { signIn } = useAuth();
const nombre_usuario = ref('');
const contrasena = ref('');
const error = ref('');

const iniciarSesion = async () => {
  try {
    const response = await signIn('credentials', {
      nombre_usuario: nombre_usuario.value,
      contrasena: contrasena.value,
    });

    if (response?.error) {
      error.value = response.error;
    } else {
      alert('Inicio de sesión exitoso');
      navigateTo('/');
    }
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    error.value = 'Error al iniciar sesión. Inténtalo de nuevo.';
  }
};
</script>