<template>
    <header>
        <div class="bg-black flex justify-between">
            <h1 class="font-bold text-purple-400 uppercase text-6xl m-4">Musiteca</h1>
            <img src="/logoMusiteca.jpg" width="100" alt="Logo" />
        </div>
        <nav>
            <div class="bg-gray-300 p-2">
                <ul class="flex">
                   <li class="font-bold mx-6 text-gray-700"><NuxtLink to="/artista">Artistas</NuxtLink></li>
                   <li class="font-bold mx-6 text-gray-700"><NuxtLink to="/album">Albumes</NuxtLink></li>
                   <li class="font-bold mx-6 text-gray-700"><NuxtLink to="/cancion">Cancion</NuxtLink></li>
                   <li class="font-bold mx-6 text-gray-700"><NuxtLink to="/about">Acerca de</NuxtLink></li>
                   <li class="font-bold mx-6 text-gray-700" @click="cerrarSesion"><NuxtLink to="/">Cerrar Sesión</NuxtLink></li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
  methods: {
    cerrarSesion() {
      // Aquí puedes agregar la lógica para cerrar la sesión
      // Por ejemplo, puedes eliminar el token de autenticación del localStorage
      localStorage.removeItem('token');
      // O puedes hacer una solicitud a la API para cerrar la sesión
      // fetch('/api/cerrar-sesion', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
    }
  }
}
</script>