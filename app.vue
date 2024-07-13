<template>
  <div class="flex flex-1 w-full h-full overflow-hidden flex-col">
    <header class="flex flex-none w-full h-12 bg-stone-800"></header>
    <div class="flex flex-1 w-full h-full overflow-hidden bg-stone-800">
      <NuxtPage />
    </div>
  </div>
</template>
<style>
html, body, #__nuxt {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
