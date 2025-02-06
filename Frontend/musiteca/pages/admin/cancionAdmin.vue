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
          <button @click="editarCancion(cancion.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Editar
          </button>
          <button @click="eliminarCancion(cancion.id)" class="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Eliminar
          </button>
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

// Método para cargar las canciones
const cargarCanciones = async () => {
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

      // Asignamos la respuesta a la variable canciones
      canciones.value = data;
    } else {
      console.error('Error mostrando canciones:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando canciones:', error);
  }
};

// Método para eliminar una canción
const eliminarCancion = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`http://localhost:4000/api/canciones/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (response.ok) {
      // Recargar la lista de canciones después de eliminar
      alert("Canción eliminada.")
      await cargarCanciones();
    } else {
      console.error('Error eliminando la canción:', response.statusText);
    }
  } catch (error) {
    console.error('Error eliminando la canción:', error);
  }
};


// Método para editar una canción
const editarCancion = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await fetch(`http://localhost:4000/api/canciones/${id}`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json();

        // Crear un formulario de edición
const formulario = document.createElement('form');
formulario.innerHTML = `
  <label for="nombre_cancion">Nombre de la canción:</label>
  <input type="text" id="nombre_cancion" value="${data.nombre_cancion}"><br>
  <label for="genero_cancion">Género de la canción:</label>
  <input type="text" id="genero_cancion" value="${data.genero_cancion}"><br>
  <label for="duracion">Duración de la canción:</label>
  <input type="text" id="duracion" value="${data.duracion}"><br>
  <label for="id_album">Álbum:</label>
  <input type="text" id="id_album" value="${data.id_album}"><br>
  <label for="archivo_cancion">Archivo de canción:</label>
  <input type="file" id="archivo_cancion"><br>
  <button type="submit">Guardar cambios</button>
`;

        // Agregar el formulario a la página
        document.body.appendChild(formulario);

        // Agregar un evento de submit al formulario
        formulario.addEventListener('submit', async (e) => {
          e.preventDefault();

          // Recuperar los datos del formulario
          const nombre_cancion = document.getElementById('nombre_cancion').value;
          const genero_cancion = document.getElementById('genero_cancion').value;
          const duracion = document.getElementById('duracion').value;
          const id_album = document.getElementById('id_album').value;
          const archivo_cancion = document.getElementById('archivo_cancion').files[0];

          // Actualizar los datos de la canción en la base de datos
          const respuesta = await fetch(`http://localhost:4000/api/canciones/${id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nombre_cancion,
              genero_cancion,
              duracion,
              id_album,
            }),
          });

          // Recargar la lista de canciones después de editar
          await cargarCanciones();

          // Quitar el formulario de la página
          formulario.remove();
        });
      } else {
        console.error('Error al editar la canción:', response.statusText);
      }
    } catch (error) {
      console.error('Error al editar la canción:', error);
    }
  };

// Definimos la metadata de la página
definePageMeta({
  layout: 'admin',
});
</script>