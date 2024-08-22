<template>
  <v-banner lines="one" width="100%">
    <v-toolbar dark prominent>
      <v-avatar>
        <v-img src="@/assets/logo.svg" />
      </v-avatar>
      <v-toolbar-title>
        <v-text color="rgb(var(--v-theme-primary))" class="text-h4 font-weight-bold">Groupomania</v-text>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text v-if="connexionStore.checkLoginStatus()" color="rgb(var(--v-theme-primary))">Vous êtes connecté</v-text>
      <v-btn color="rgb(var(--v-theme-primary))" @click="connexionStore.checkLoginStatus()">TEST</v-btn>
      <v-btn v-if="connexionStore.checkLoginStatus()" color="rgb(var(--v-theme-primary))" @click="publishPost">Nouvelle publication</v-btn>
      <v-btn icon>
        <v-icon v-if="connexionStore.checkLoginStatus()" color="rgb(var(--v-theme-primary))" @click="connexionStore.logout">mdi-logout</v-icon>
      </v-btn>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    </v-toolbar>
  </v-banner>
</template>

<script setup lang="ts">
  import { onMounted, watch } from "vue";
  import { useConnexionStore } from "@/stores/connexion";

  const connexionStore = useConnexionStore();
  const emit = defineEmits(["newPostEmit"]);

  /**
   * Publishes a new post.
   *
   * @return {void} No return value
   */
  const publishPost = (): void => {
    console.log("publishPost");
    emit("newPostEmit", { newPost: true });
  };

  onMounted(() => {
    // login();
    console.log(connexionStore.checkLoginStatus());
  });

  watch(
    () => connexionStore.checkLoginStatus(),
    (newVal, oldVal) => {
      console.log("oldVal", oldVal);
      console.log("newVal", newVal);
      console.log("Connexion : ", connexionStore.checkLoginStatus());
    }
  );
</script>

<style lang="scss" scoped>
  @use "../styles/settings";

  .v-banner .v-btn {
    border: solid 1px orange;
    // color: rgb(var(--v-theme-primary));
  }
</style>
