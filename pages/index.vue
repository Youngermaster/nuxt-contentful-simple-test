<script setup lang="ts">
const config = useRuntimeConfig();

console.log("Runtime config:", config);
if (import.meta.server) {
  console.log("API secret:", config.apiSecret);
}
</script>

<template>
  <div>
    <div>Check developer console!</div>
  </div>
</template>
