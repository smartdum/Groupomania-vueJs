<template>
  <Header @newPostEmit="emitFromChild" />
  <v-card>
    <v-btn @click="connexionStore.checkLoginStatus()">TEST</v-btn>
  </v-card>
  <v-container v-if="connexionStore.checkLoginStatus()">
    <NewPost v-if="newPost" @newPostEmit="emitFromChild" />
    <Home v-else />
  </v-container>
  <v-container v-else>
    <Login />
  </v-container>
  <Footer />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import type { Ref } from "vue";
  import { useConnexionStore } from "@/stores/connexion";

  const connexionStore = useConnexionStore();
  const newPost: Ref<boolean> = ref(false);

  /**
   * Handles emitted events from child components.
   *
   * @param {Record<string, boolean>} payLoad - The payload emitted from the child component. The payload should be an object with a single key-value pair, where the key is "newPostEmit" and the value is a boolean.
   * @returns {void}
   */
  const emitFromChild = (payLoad: Record<string, boolean>): void => {
    console.log(payLoad);
    newPost.value = payLoad["newPost"];
    console.log("newPost.value", newPost.value);
  };

  onMounted(() => {
    console.clear();
    console.log("Hello World !");
    connexionStore.logout();
  });
</script>
