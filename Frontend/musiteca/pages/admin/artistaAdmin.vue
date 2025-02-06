<template>
  <div>
    <NuxtLink to="createArtista">Crear un nuevo Artista</NuxtLink>
    <h1>Artistas</h1>
    <div>
      <ol>
        <li v-for="artista in artistas" :key="artista.nombre_artistico">
          <strong>Nombre:</strong> {{ artista.nombre_artistico }},
          <strong>Inicio Actividad:</strong> {{ artista.inicio_actividad }},
          <strong>País:</strong> {{ artista.pais }}
          <button @click="editarArtista(artista.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Editar
          </button>
          <button @click="eliminarArtista(artista.id)" class="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Eliminar
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Variable reactiva para almacenar la lista de artistas
const artistas = ref([]);

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
    const response = await fetch('http://localhost:4000/api/artistas', {
      headers,
    });

    // Verificamos si la respuesta es exitosa
    if (response.ok) {
      // Obtenemos el cuerpo de la respuesta en formato JSON
      const data = await response.json();

      // Asignamos la respuesta a la variable artistas
      artistas.value = data;
    } else {
      console.error('Error mostrando artistas:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando artistas:', error);
  }
});

// Función para cargar los artistas
const cargarArtistas = async () => {
  try {
    // Obtenemos el token de autenticación del localStorage
    const token = localStorage.getItem('token');

    // Configuramos la solicitud con el token en el header
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    // Hacemos la solicitud a la API con el token en el header
    const response = await fetch('http://localhost:4000/api/artistas', {
      headers,
    });

    // Verificamos si la respuesta es exitosa
    if (response.ok) {
      // Obtenemos el cuerpo de la respuesta en formato JSON
      const data = await response.json();

      // Asignamos la respuesta a la variable artistas
      artistas.value = data;
    } else {
      console.error('Error mostrando artistas:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando artistas:', error);
  }
};

// Función para eliminar un artista
const eliminarArtista = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`http://localhost:4000/api/artistas/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (response.ok) {
      // Recargar la lista de artistas después de eliminar
      alert("Artista eliminado.")
      await cargarArtistas();
    } else {
      console.error('Error eliminando el artista:', response.statusText);
    }
  } catch (error) {
    console.error('Error eliminando el artista:', error);
  }
};
const editarArtista = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await fetch(`http://localhost:4000/api/artistas/${id}`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json();

        // Crear un formulario de edición
        const formulario = document.createElement('form');
        formulario.innerHTML = `
          <label for="nombre_artistico">Nombre del artista:</label>
          <input type="text" id="nombre_artistico" value="${data.nombre_artistico}"><br>
          <label for="inicio_actividad">Inicio de actividad:</label>
          <input type="text" id="inicio_actividad" value="${data.inicio_actividad}"><br>
          <label for="pais">País:</label>
          <input type="text" id="pais" value="${data.pais}"><br>
          <button type="submit">Guardar cambios</button>
        `;

        // Agregar el formulario a la página
        document.body.appendChild(formulario);

        // Agregar un evento de submit al formulario
        formulario.addEventListener('submit', async (e) => {
          e.preventDefault();

          // Recuperar los datos del formulario
          const nombre_artistico = document.getElementById('nombre_artistico').value;
          const inicio_actividad = document.getElementById('inicio_actividad').value;
          const pais = document.getElementById('pais').value;

          // Actualizar los datos del artista en la base de datos
          const respuesta = await fetch(`http://localhost:4000/api/artistas/${id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nombre_artistico,
              inicio_actividad,
              pais,
            }),
          });

          // Recargar la lista de artistas después de editar
          await cargarArtistas();

          // Quitar el formulario de la página
          formulario.remove();
        });
      } else {
        console.error('Error al editar el artista:', response.statusText);
      }
    } catch (error) {
      console.error('Error al editar el artista:', error);
    }
  };

// Definimos la metadata de la página
definePageMeta({
  layout: 'admin',
});
</script>