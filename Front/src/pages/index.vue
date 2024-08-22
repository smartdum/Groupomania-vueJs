<template>
  <Header @isLogged="emitFromChild" />
  <v-card>
    <v-btn @click="test">TEST</v-btn>
  </v-card>
  <Home v-if="isLogged" />
  <Login v-else @isLogged="emitFromChild" />
  <Footer />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import type { Ref } from "vue";

  const isLogged: Ref<boolean> = ref(false);

  const emitFromChild = (payLoad: boolean): void => {
    console.log("emitFromChild : ", payLoad);
    isLogged.value = payLoad;
  };

  const test = (): void => {
    console.log("isLogged : ", isLogged.value);
  };

  onMounted(() => {
    console.clear();
    localStorage.removeItem("token");
  });
</script>
