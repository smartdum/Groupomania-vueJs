<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="600">
      <v-form v-model="valid" @submit.prevent="onSubmit">
        <v-container>
          <v-text-field v-model="login" :readonly="loading" :rules="loginRules" class="mb-2" label="Login" placeholder="Enter your login" clearable></v-text-field>
          <v-text-field v-model="password" :readonly="loading" :rules="passwordRules" label="Password" placeholder="Enter your password" clearable></v-text-field>
        </v-container>
        <v-container class="d-flex flex-wrap justify-center">
          <v-btn :disabled="!valid" :loading="loading" color="success" size="large" type="submit" variant="elevated" block> Sign In </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import type { Ref } from "vue";
  import { useConnexionStore } from "@/stores/connexion";

  const loading: Ref<boolean> = ref(false);
  const valid: Ref<boolean> = ref(false);
  const login: Ref<string> = ref("");
  const password: Ref<string> = ref("");

  const loginRules = [(v: string) => !!v || "Login is required", (v: string) => (v && v.length <= 10) || "Login must be less than 10 characters"];
  const passwordRules = [(v: string) => !!v || "Password is required", (v: string) => (v && v.length <= 10) || "Password must be less than 10 characters"];

  const connexionStore = useConnexionStore();

  /**
   * Submits the login and password to the server.
   *
   * @param {Ref<string>} login - The login to submit.
   * @param {Ref<string>} password - The password to submit.
   * @return {void} This function does not return anything.
   */
  const onSubmit = (): void => {
    console.log("login", login.value);
    console.log("password", password.value);
    connexionStore.login(login.value, password.value);
  };
</script>
