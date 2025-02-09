<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 flex items-center justify-center p-6">
    <div class="max-w-2xl mx-auto text-center space-y-8">
      <!-- Encabezado -->
      <div class="space-y-4">
        <h1 class="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500 animate-gradient-x">
          🎵 Acerca de Musiteca
        </h1>
        <div class="h-1 bg-gradient-to-r from-purple-300 to-cyan-300 rounded-full w-3/4 mx-auto shadow-md"></div>
      </div>

      <!-- Contenido principal -->
      <div class="space-y-6">
        <p class="text-xl md:text-2xl text-gray-800 leading-relaxed">
          En <span class="font-semibold text-purple-500">Musiteca</span> creamos un espacio vibrante donde los amantes de la música pueden compartir y descubrir 
          <span class="text-cyan-500">análisis profundos</span> de letras, 
          <span class="text-purple-500">interpretaciones creativas</span> y 
          <span class="text-cyan-500">conexiones significativas</span> a través de las canciones que nos mueven.
        </p>

        <div class="py-4">
          <div class="border-l-4 border-purple-400 pl-4">
            <p class="text-lg italic text-gray-600">
              "La música es el lenguaje del espíritu. Abre el secreto de la vida llevando paz, 
              aboliendo los conflictos y la tensión."
            </p>
            <p class="mt-2 text-purple-500 font-medium">- Kahlil Gibran</p>
          </div>
        </div>
      </div>

      <!-- Derechos reservados -->
      <div class="mt-12 border-t border-purple-100 pt-6">
        <p class="text-sm text-gray-500 italic">
          🎶 Todos los derechos reservados - Musiteca 2024 🎧
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'user'
});

useHead({
  title: "Acerca de - Musiteca",
  meta: [
    {
      name: "description",
      content: "Descubre la esencia de Musiteca: Un espacio comunitario para análisis y apreciación musical profunda."
    },
    {
      property: "og:image",
      content: "/musiteca-og.jpg"
    }
  ],
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