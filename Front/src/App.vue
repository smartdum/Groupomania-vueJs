<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { useTheme } from "vuetify";
  const theme = useTheme();
  console.log(theme.global.name.value);
  console.log(theme.current.value.colors);
</script>
