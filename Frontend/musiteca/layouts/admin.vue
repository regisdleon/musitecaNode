<template>
    <header>
        <div class="bg-black flex justify-between">
            <h1 class="font-bold text-purple-400 uppercase text-6xl m-4">Musiteca</h1>
            <img src="/logoMusiteca.jpg" width="100" alt="Logo" />
        </div>
        <nav>
            <div class="bg-gray-300 p-2">
                <ul class="flex">
                   <li class="font-bold mx-6 text-gray-700"><NuxtLink to="/admin/adminIndex">Administrador</NuxtLink></li>
                   <li class="font-bold mx-6 text-gray-700"><NuxtLink to="/admin/artistaAdmin">Gestionar Artistas</NuxtLink></li>
                   <li class="font-bold mx-6 text-gray-700"><NuxtLink to="/admin/albumAdmin">Gestionar Album</NuxtLink></li>
                   <li class="font-bold mx-6 text-gray-700"><NuxtLink to="/admin/cancionAdmin">Gestionar Canción</NuxtLink></li>
                   <li class="font-bold mx-6 text-gray-700" @click="cerrarSesion"><NuxtLink to="/">Cerrar Sesión</NuxtLink></li>
                </ul>
            </div>
        </nav>
    </header>

    <div class="bg-purple-100">
        <div class="bg-purple-100 p-4">
            <slot />
        </div>
    </div>

    <footer>
        <div class="border-2 py-3">
            <p class="flex justify-center">Copyright 2024 Musiteca</p>
            <p class="flex justify-center">REGIS</p>
        </div>
    </footer>
</template>

<script>
export default {
  methods: {
    cerrarSesion() {
      localStorage.removeItem('token');
    }
  }
}
</script>