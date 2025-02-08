<template>
    <p>Musiteca es un sitio donde puedes dar tu opinion acerca de las letras de las canciones
    y leer aquellas con las que otros han contribuido</p>
    <p>Todos los derechos reservados</p>

</template>

<script setup>
definePageMeta({
    layout: 'user'
})

useHead({
  title: "Acerca del sitio - Musiteca",
  meta: [
    {
      name: "description",
      content: "Informacion acerca del sitio",
    },
  ],
});

</script>