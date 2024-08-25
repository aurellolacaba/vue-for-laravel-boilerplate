<template>

  <component :is="layout">
    <RouterView/>
  </component>
  
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import Authenticated from './layout/Authenticated.vue';
import Guest from './layout/Guest.vue';
import { initFlowbite } from 'flowbite';

onMounted(() => {
  initFlowbite()

  // var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  // var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
  // if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //     document.documentElement.classList.add('dark');
  //     themeToggleDarkIcon.classList.toggle('hidden');
  // } else {
  //     document.documentElement.classList.remove('dark')
  //     themeToggleLightIcon.classList.toggle('hidden');
  // }
})

const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout == 'Authenticated') {
    return Authenticated;
  } 

  return Guest
})
</script>
