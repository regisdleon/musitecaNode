<template>
  <div>
    <NuxtLink to="createCancion">Crear una nueva Cancion</NuxtLink>
    <h1>Canciones</h1>
    <div>
      <ol>
        <li v-for="cancion in canciones" :key="cancion.id">
          <strong>ID:</strong> {{ cancion.id }},
          <strong>Nombre:</strong> {{ cancion.nombre_cancion }},
          <strong>Género:</strong> {{ cancion.genero_cancion }},
          <strong>Duración:</strong> {{ cancion.duracion }},
          <strong>Álbum:</strong> {{ cancion.album ? cancion.album.nombre_album : 'Sin álbum' }}
          <button @click="descargarArchivo(cancion)">Descargar</button>
          <button @click="reproducirArchivo(cancion)">Reproducir</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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
      console.log(data);

      // Asignamos la respuesta a la variable canciones
      canciones.value = data;
    } else {
      console.error('Error mostrando canciones:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando canciones:', error);
  }
});

// Método para descargar el archivo
const descargarArchivo = async (cancion) => {
  try {
    // Creamos un blob con el archivo seleccionado
    const response = await fetch(`http://localhost:3000${cancion.archivo_cancion}`);
    const blob = await response.blob();

    // Creamos un objeto URL con el blob
    const url = URL.createObjectURL(blob);

    // Creamos un enlace para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = cancion.nombre_cancion;
    // Simulamos un clic en el enlace para descargar el archivo
    a.click();
    // Revocamos el objeto URL para liberar recursos
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error al descargar el archivo:', err);
  }
};

// Método para reproducir el archivo
const reproducirArchivo = async (cancion) => {
  try {
    // Creamos un blob con el archivo seleccionado
    const response = await fetch(`http://localhost:3000${cancion.archivo_cancion}`);
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
  layout: 'admin',
});
</script>