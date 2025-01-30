<template>
        <NuxtLink to="createAlbum">Crear un nuevo Album</NuxtLink>
            <h1>Albumes</h1>
        <div>
            <ol>
                <li>Album 1</li>
                <li>Album 2</li>
                <li>Album 3</li>
            </ol>
        </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})
</script>