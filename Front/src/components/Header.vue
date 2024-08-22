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
      <v-text v-if="isLogged" color="rgb(var(--v-theme-primary))">Vous êtes connecté</v-text>
      <v-btn color="rgb(var(--v-theme-primary))" @click="checkIsLogged">TEST</v-btn>
      <v-btn v-if="isLogged" color="rgb(var(--v-theme-primary))" @click="publishPost">Nouvelle publication</v-btn>
      <v-btn icon>
        <v-icon v-if="isLogged" color="rgb(var(--v-theme-primary))" @click="logout">mdi-logout</v-icon>
        <!-- <v-icon v-else color="rgb(var(--v-theme-primary))" @click="login">mdi-login</v-icon> -->
      </v-btn>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    </v-toolbar>
  </v-banner>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from "vue";
  import type { Ref } from "vue";

  const isLogged: Ref<boolean> = ref(false);
  const emit = defineEmits(["isLogged"]);

  /**
   * Checks whether the user is logged in or not.
   *
   * @return {void} No return value
   */
  const checkIsLogged = (): void => {
    const token: string | null = localStorage.getItem("token");
    console.log("token : ", token);
    token !== null ? (isLogged.value = true) : (isLogged.value = false);
    // console.log("isLogged : ", isLogged.value);
  };

  // /**
  //  * Sets a token in the local storage and calls the `checkIsLogged` function.
  //  *
  //  * @return {void} This function does not return a value
  //  */
  // const login = (): void => {
  //   localStorage.setItem("token", "flkvnklfbn<kldfsnb");
  //   checkIsLogged();
  // };

  /**
   * Logs out the user by removing the token from local storage and updates the isLogged state.
   *
   * @return {void} No return value
   */
  const logout = (): void => {
    localStorage.removeItem("token");
    checkIsLogged();
  };

  /**
   * Publishes a new post.
   *
   * @return {void} No return value
   */
  const publishPost = (): void => {
    console.log("publishPost");
  };

  onMounted(() => {
    // login();
  });

  watch(
    () => isLogged.value,
    (newVal, oldVal) => {
      // console.log("oldVal", oldVal);
      // console.log("newVal", newVal);
      console.log("isLogged.value", isLogged.value);
      emit("isLogged", isLogged.value);
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
