<script lang="ts" setup>
import { useRoute } from 'vue-router/auto';
const route = useRoute("/[...path]");
console.log(route.path);
const err: string = 'ERROR';
console.log(err);
</script>
<template>
  <Header />
  <h1>Page non touvée (404) : {{ route.path }}</h1>
  <v-alert text="404 Erreur"> : {{ route.path }}</v-alert>
  <Footer />
</template>