<template>
  <v-card class="mb-4" outlined>
    <v-card-title>{{ post.fields.title }}</v-card-title>
    <v-card-text>
      <div v-if="post.fields.summary">
        {{ post.fields.summary }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary">Read More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>
