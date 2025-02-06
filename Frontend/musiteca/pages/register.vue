<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Registro</h2>
      <form @submit.prevent="registrar">
        <div class="mb-4">
          <label for="nombre_usuario" class="block text-gray-700">Nombre de usuario</label>
          <input
            v-model="nombre_usuario"
            type="text"
            id="nombre_usuario"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="contrasena" class="block text-gray-700">Contraseña</label>
          <input
            v-model="contrasena"
            type="password"
            id="contrasena"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Registrarse
        </button>
      </form>
      <p class="mt-4 text-center">
        ¿Ya tienes una cuenta?
        <NuxtLink to="/index" class="text-purple-500 hover:underline">Inicia sesión</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre_usuario: '',
      contrasena: '',
    };
  },
  methods: {
    async registrar() {
      try {
        const response = await fetch('http://localhost:4000/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_usuario: this.nombre_usuario,
            contrasena: this.contrasena,
            rol: 'usuario',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Usuario registrado exitosamente');
          this.$router.push('/');
        } else {
          throw new Error('Error al registrar el usuario');
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Error al registrar el usuario');
      }
    },
  },
};
</script>