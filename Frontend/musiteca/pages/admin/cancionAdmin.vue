<template>
        <NuxtLink to="createCancion">Crear una nueva Cancion</NuxtLink>
        <h1>Canciones</h1>
        <div>
            <ol>
                <li>Cancion 1</li>
                <li>Cancion 2</li>
                <li>Cancion 3</li>
            </ol>
        </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})
</script>