<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-cyan-900 flex items-center justify-center p-4"
  >
    <div
      class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-8 border border-white/20"
    >
      <!-- Encabezado -->
      <div class="text-center space-y-2">
        <h1
          class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 animate-gradient-x"
        >
          🎵 Musiteca
        </h1>
        <p class="text-purple-100/80">Inicia sesión para explorar la música</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="iniciarSesion" class="space-y-6">
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
              placeholder="Tu nombre de usuario"
            />
            <span
              class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
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
              :type="showPassword ? 'text' : 'password'"
              v-model="contrasena"
              required
              class="w-full pl-12 pr-12 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
            <span
              class="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <!-- Icono de ojo -->
            <span
              class="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 cursor-pointer hover:text-cyan-400 transition-colors"
              @click="togglePasswordVisibility"
              title="Mostrar/ocultar contraseña"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="showPassword"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M10.343 10.343l4.243 4.243M4 4l3.05 3.05m12.9 1.9l2.05 2.05M2 2l20 20"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>


        <!-- Botón de Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          <span v-if="!loading">Iniciar Sesión</span>
          <div v-else class="flex items-center">
            <svg
              class="animate-spin h-5 w-5 mr-3 text-white"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4l-4-4v3z"
              />
            </svg>
            Procesando...
          </div>
        </button>

        <!-- Mensaje de error -->
        <div
          v-if="error"
          class="p-3 bg-red-500/20 text-red-200 rounded-lg text-sm border border-red-400/30"
        >
          {{ error }}
        </div>
      </form>

      <!-- Enlace de registro -->
      <p class="text-center text-purple-200/80">
        ¿No tienes cuenta?
        <NuxtLink
          to="/register"
          class="text-cyan-300 hover:text-cyan-400 underline underline-offset-4 transition-colors"
        >
          Regístrate aquí
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import usuarioServices from "@/services/usuarioServices";

useHead({
  title: "Iniciar Sesión - Musiteca",
  meta: [
    {
      name: "description",
      content:
        "Accede a tu cuenta de Musiteca para explorar nuestra colección musical exclusiva.",
    },
  ],
});

const nombre_usuario = ref("");
const contrasena = ref("");
const error = ref("");
const router = useRouter();
const loading = ref(false);
const showPassword = ref(false);

const iniciarSesion = async () => {
  try {
    loading.value = true; // Activa el estado de carga

    const response = await usuarioServices.iniciarSesion({
      nombre_usuario: nombre_usuario.value,
      contrasena: contrasena.value,
    });

    if (response.token) {
      localStorage.setItem("token", response.token);
      router.push(
        response.usuario.rol === "admin" ? "/admin/adminIndex" : "/cancion"
      );
    }
  } catch (err) {
    error.value = "Error al iniciar sesión. Verifica tus credenciales.";
  } finally {
    loading.value = false; // Desactiva el estado de carga
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style>
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 8s ease infinite;
}

@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
