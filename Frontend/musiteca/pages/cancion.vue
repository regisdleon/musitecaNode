<template>
  <div>
    <h1>Canciones</h1>
    <div>
      <ol>
        <li v-for="cancion in canciones" :key="cancion.nombre_cancion">
          <strong>Nombre:</strong> {{ cancion.nombre_cancion }},
          <strong>Duración:</strong> {{ cancion.duracion }},
          <strong>Álbum:</strong> {{ cancion.album.id }}
          <button @click="reproducirArchivo(cancion.archivo_cancion)">Reproducir</button>
          <audio :id="cancion.nombre_cancion" :src="`http://localhost:3000${cancion.archivo_cancion}`" />
          
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();


// Variable reactiva para almacenar la lista de canciones
const canciones = ref([]);

// Función que se ejecuta cuando el componente se monta
onMounted(async () => {
  try {
    // Obtenemos el token de autenticación del localStorage
    const token = localStorage.getItem('token');
    // Configuramos la solicitud con el token en el header
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    // Hacemos la solicitud a la API con el token en el header
    const response = await fetch('http://localhost:4000/api/canciones', {
      headers,
    });
    // Verificamos si la respuesta es exitosa
    if (response.ok) {
      // Obtenemos el cuerpo de la respuesta en formato JSON
      const data = await response.json();

      // Asignamos la respuesta a la variable artistas
      canciones.value = data;
    } else {
      console.error('Error mostrando artistas:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando artistas:', error);
  }
});

// Método para reproducir el archivo
const reproducirArchivo = async (cancion) => {
  try {
    // Creamos un blob con el archivo seleccionado
    const response = await fetch(`${config.public.FRONTEND_URL}${cancion}`);
    const blob = await response.blob();

    // Creamos un objeto URL con el blob
    const url = URL.createObjectURL(blob);

    // Creamos una ventana emergente para reproducir el archivo
    const ventana = window.open(url, '_blank', 'width=800,height=600');
    ventana.focus();
  } catch (err) {
    console.error('Error al reproducir el archivo:', err);
  }
};

// Definimos la metadata de la página
definePageMeta({
  layout: 'user',
});

useHead({
  title: "Lista de canciones como usuario - Musiteca",
  meta: [
    {
      name: "description",
      content: "Poder ver las canciones como usuario",
    },
  ],
});

</script>

<style scoped>
/* Estilos personalizados para la lista de canciones */
ol {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>