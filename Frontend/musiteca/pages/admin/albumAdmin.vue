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
          <button @click="editarAlbum(album.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Editar
          </button>
          <button @click="eliminarAlbum(album.id)" class="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Eliminar
          </button>
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

const editarAlbum = async (id) => {
  try {
    // Recuperar los datos del álbum que se está editando
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`http://localhost:4000/api/albums/${id}`, {
      headers,
    });

    if (response.ok) {
      const data = await response.json();

      // Crear un formulario de edición
      const formulario = document.createElement('form');
      formulario.innerHTML = `
        <label for="nombre_album">Nombre del álbum:</label>
        <input type="text" id="nombre_album" value="${data.nombre_album}"><br>
        <label for="fecha_album">Fecha del álbum:</label>
        <input type="date" id="fecha_album" value="${data.fecha_album}"><br>
        <label for="duracion_album">Duración del álbum:</label>
        <input type="text" id="duracion_album" value="${data.duracion_album}"><br>
        <label for="cantidad_canciones">Cantidad de canciones:</label>
        <input type="number" id="cantidad_canciones" value="${data.cantidad_canciones}"><br>
        <label for="tipo">Tipo de álbum:</label>
        <input type="text" id="tipo" value="${data.tipo}"><br>
        <button type="submit">Guardar cambios</button>
      `;

      // Agregar el formulario a la página
      document.body.appendChild(formulario);

      // Agregar un evento de submit al formulario
      formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Recuperar los datos del formulario
        const nombre_album = document.getElementById('nombre_album').value;
        const fecha_album = document.getElementById('fecha_album').value;
        const duracion_album = document.getElementById('duracion_album').value;
        const cantidad_canciones = document.getElementById('cantidad_canciones').value;
        const tipo = document.getElementById('tipo').value;

        // Actualizar los datos del álbum en la base de datos
        const respuesta = await fetch(`http://localhost:4000/api/albums/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_album,
            fecha_album,
            duracion_album,
            cantidad_canciones,
            tipo,
          }),
        });

        // Recargar la lista de álbumes después de editar
        await cargarAlbums();
      });
    } else {
      console.error('Error al editar el álbum:', response.statusText);
    }
  } catch (error) {
    console.error('Error al editar el álbum:', error);
  }
};

// Definimos la metadata de la página
definePageMeta({
  layout: 'admin',
});
</script>