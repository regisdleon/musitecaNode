<template>
  <div>
    <NuxtLink to="createAlbum">Crear un nuevo Album</NuxtLink>
    <h1>Albumes</h1>
    <div>
      <ol>
        <li v-for="album in albums" :key="album.id">
          <strong>ID:</strong> {{ album.id }},
          <strong>Nombre:</strong> {{ album.nombre_album }},
          <strong>Fecha:</strong> {{ album.fecha_album }},
          <strong>Duración:</strong> {{ album.duracion_album }},
          <strong>Cantidad de canciones:</strong> {{ album.cantidad_canciones }},
          <strong>Tipo:</strong> {{ album.tipo }},
          <strong>Nombre Artista:</strong> {{ album.artistum ? album.artistum.nombre_artistico : 'Desconocido' }}
          <button @click="editarAlbum(album.id)">Editar</button>
          <button @click="eliminarAlbum(album.id)">Eliminar</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Variable reactiva para almacenar la lista de albums
const albums = ref([]);

// Función que se ejecuta cuando el componente se monta
onMounted(async () => {
  await cargarAlbums();
});

// Función para cargar los álbumes
const cargarAlbums = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch('http://localhost:4000/api/albums', {
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      albums.value = data;
    } else {
      console.error('Error mostrando albums:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando albums:', error);
  }
};

// Función para eliminar un álbum
const eliminarAlbum = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`http://localhost:4000/api/albums/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (response.ok) {
      // Recargar la lista de álbumes después de eliminar
      alert("Album eliminado.")
      await cargarAlbums();
    } else {
      console.error('Error eliminando el álbum:', response.statusText);
    }
  } catch (error) {
    console.error('Error eliminando el álbum:', error);
  }
};

// Función para editar un álbum (vacía por ahora)
const editarAlbum = (id) => {
  // Aquí puedes implementar la lógica para editar el álbum
  console.log(`Editar álbum con ID: ${id}`);
};

// Definimos la metadata de la página
definePageMeta({
  layout: 'admin',
});
</script>