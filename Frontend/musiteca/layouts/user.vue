<template>
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-cyan-50">
      <Header />
      
      <main class="flex-1">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-purple-100/30">
            <slot />
          </div>
        </div>
      </main>
  
      <Footer />
    </div>
  </template>
  
  <style>
  /* Animación suave para transiciones de página */
  .page-enter-active,
  .page-leave-active {
    transition: all 0.3s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>