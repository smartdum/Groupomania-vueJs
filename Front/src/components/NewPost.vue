<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="600">
      <v-form v-model="valid" @submit.prevent="onSubmit">
        <v-container>
          <v-textarea v-model="post" :rules="postRules" class="mb-2" label="Post" placeholder="Enter your message" clearable></v-textarea>
        </v-container>
        <v-container class="d-flex flex-wrap justify-center">
          <v-btn :disabled="!valid" color="success" size="large" type="submit" variant="elevated" block> Send message </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import type { Ref } from "vue";
  // import { useConnexionStore } from "@/stores/connexion";

  const valid: Ref<boolean> = ref(true);
  const post: Ref<string> = ref("");
  const postRules = [(v: string) => !!v || "Message is required", (v: string) => (v && v.length >= 10) || "Message must be more than 10 characters"];
  const emit = defineEmits(["newPostEmit"]);

  const onSubmit = (): void => {
    console.log("post", post.value);
    // connexionStore.newPost(post.value);
    emit("newPostEmit", { newPost: false });
  };
</script>
