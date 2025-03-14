<template>
  <v-container class="mt-6">
    <!-- Render the MVP info -->
    <p class="font-weight-black pb-2">Company MVP</p>
    <PersonCard v-if="data" :person="data.mvp" />

    <!-- Render the person info -->
    <p class="font-weight-black pb-2">Company Employees</p>
    <v-row v-if="data">
      <v-col
        v-for="person in data.people"
        :key="person.sys.id"
        cols="12"
        sm="6"
        md="4"
      >
        <PersonCard :person="person" />
      </v-col>
    </v-row>

    <!-- Render the posts in a grid -->
    <p class="font-weight-black pb-2">Blog posts</p>
    <v-row v-if="data">
      <v-col
        v-for="post in data.posts"
        :key="post.sys.id"
        cols="12"
        sm="6"
        md="4"
      >
        <PostCard :post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { createClient } from "~/utils/contentful";
import PersonCard from "~/components/PersonCard.vue";
import PostCard from "~/components/PostCard.vue";

// Use public keys (they're exposed for the Content Delivery API)
const config = useRuntimeConfig().public;

// Create the Contentful client using our utility
const client = createClient(config.CTFSpaceID, config.CTFAccessToken);

// Fetch data from Contentful using Nuxt's composable
const { data, error } = await useAsyncData("contentfulData", async () => {
  const [mvp, entries, posts] = await Promise.all([
    client.getEntries({
      "sys.id": config.CTFPersonID,
    }),
    client.getEntries({
      content_type: "person",
      order: ["-sys.createdAt"] as any,
    }),
    client.getEntries({
      content_type: config.CTFBlogPostTypeID,
      order: ["-sys.createdAt"] as any,
    }),
  ]);

  return {
    mvp: mvp.items[0],
    people: entries.items,
    posts: posts.items,
  };
});

// Log errors if needed
if (error.value) {
  console.error("Error fetching data:", error.value);
}
</script>
