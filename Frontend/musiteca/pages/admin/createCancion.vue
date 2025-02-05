<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Crear Canción</h1>
      <form @submit.prevent="crearCancion" class="space-y-6">
        <!-- Campos del formulario -->
        <div>
          <label for="nombre_cancion" class="block text-sm font-medium text-gray-700">Nombre de la Canción</label>
          <input v-model="nombre_cancion" type="text" id="nombre_cancion" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="genero_cancion" class="block text-sm font-medium text-gray-700">Género de la Canción</label>
          <input v-model="genero_cancion" type="text" id="genero_cancion" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="duracion" class="block text-sm font-medium text-gray-700">Duración</label>
          <input v-model="duracion" type="text" id="duracion" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="id_album" class="block text-sm font-medium text-gray-700">Álbum</label>
          <select v-model="id_album" id="id_album" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" disabled>Selecciona un álbum</option>
            <option v-for="album in albumes" :key="album.id" :value="album.id">{{ album.nombre_album }}</option>
          </select>
        </div>
        <div>
          <label for="archivo_audio" class="block text-sm font-medium text-gray-700">Archivo de Audio</label>
          <input @change="seleccionarArchivo" type="file" id="archivo_audio" accept="audio/*"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="archivo_seleccionado" class="mt-1 text-sm text-gray-600">{{ archivo_seleccionado.name }}</p>
        </div>
        <div>
          <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Crear Canción </button>
        </div>
      </form>
      <p v-if="error" class="mt-4 text-center text-sm text-red-600">{{ error }}</p>
      <NuxtLink to="/admin/cancionAdmin" class="block mt-4 text-center text-sm text-indigo-600 hover:text-indigo-500">
        Volver a Administración de Canciones </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const nombre_cancion = ref('');
const genero_cancion = ref('');
const duracion = ref('');
const id_album = ref('');
const albumes = ref([]);
const error = ref('');
const archivo_seleccionado = ref(null);
const nombre_archivo = ref('');

// Obtener la lista de álbumes al cargar la página
onMounted(async () => {
  try {
    // Obtenemos el token de autenticación del localStorage
    const token = localStorage.getItem('token');

    // Configuramos la solicitud con el token en el header
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    // Hacemos la solicitud a la API con el token en el header
    const response = await fetch('http://localhost:4000/api/albums', {
      headers,
    });

    // Verificamos si la respuesta es exitosa
    if (response.ok) {
      // Obtenemos el cuerpo de la respuesta en formato JSON
      const data = await response.json();

      // Asignamos la respuesta a la variable albums
      albumes.value = data;
    } else {
      console.error('Error mostrando albums:', response.statusText);
    }
  } catch (error) {
    console.error('Error mostrando albums:', error);
  }
});

const seleccionarArchivo = (event) => {
  archivo_seleccionado.value = event.target.files[0];
  nombre_archivo.value =  event.target.files[0].name
  
};

const crearCancion = async () => {
  try {
    // Obtenemos el token de autenticación del localStorage
    const token = localStorage.getItem('token');
    // Configuramos la solicitud con el token en el header
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    // Creamos un objeto JSON con los datos
    const body = JSON.stringify({
      nombre_cancion: nombre_cancion.value,
      genero_cancion: genero_cancion.value,
      duracion: duracion.value,
      id_album: id_album.value,
      archivo_cancion: `/assets/${nombre_archivo.value}`,
    });

    // Hacemos la solicitud a la API con el token en el header y el objeto JSON
    const response = await fetch('http://localhost:4000/api/canciones/createCancion', {
      method: 'POST',
      headers,
      body: body,
    });
    // Verificamos si la respuesta es exitosa
    if (response.ok) {
      alert('Canción creada exitosamente');
      router.push('/admin/cancionAdmin');
    } else {
      throw new Error(response.mensaje || 'Error al crear la canción');
    }
  } catch (err) {
    console.error('Error al crear la canción:', err);
    error.value = 'Error al crear la canción. Inténtalo de nuevo.';
  }
};
</script>