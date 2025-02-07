<template>
  <v-card class="mb-4">
    <v-card-title>{{ person.fields.name }}</v-card-title>
    <v-card-text>
      <div v-if="person.fields.description">
        {{ person.fields.description }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  person: {
    type: Object,
    required: true,
  },
});
</script>
