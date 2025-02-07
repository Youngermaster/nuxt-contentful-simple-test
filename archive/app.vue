<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
      <div>
        <NuxtRouteAnnouncer />
        <div>
          <div>Check developer console!</div>
        </div>
        <div>
          <!-- render data of the person -->
          <h1>{{ data.person.fields.name }}</h1>
          <!-- render blog posts -->
          <ul>
            <li v-for="post in data.posts" :key="post.sys.id">
              {{ post.fields.title }}
            </li>
          </ul>
        </div>
      </div>
      <v-app-bar extended>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-app-bar-title>Application</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon="mdi-dots-vertical"> </v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row>
            <v-col v-for="n in 24" :key="n" cols="4">
              <v-card height="200"></v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { createClient } from "~/utils/contentful";

const config = useRuntimeConfig();

console.log("Runtime config:", config);
if (import.meta.server) {
  // Check you set everything correctly
  // ! This for DEBUG only, you have to implement proper security measures
  console.log("API secret:", config.apiSecret);
  console.log("CTF_SPACE_ID:", config.CTFSpaceID);
  console.log("CTF_CDA_ACCESS_TOKEN:", config.CTFAccessToken);
  console.log("CTF_PERSON_ID:", config.CTFPersonID);
  console.log("CTF_BLOG_POST_TYPE_ID:", config.CTFBlogPostTypeID);
}

const client = createClient(
  config.public.CTFSpaceID,
  config.public.CTFAccessToken
);

// Use Nuxt 3's useAsyncData composable to fetch data asynchronously
const { data, error } = await useAsyncData("contentfulData", async () => {
  const [entries, posts] = await Promise.all([
    client.getEntries({
      "sys.id": config.CTFPersonID,
    }),
    client.getEntries({
      content_type: config.CTFBlogPostTypeID,
      order: "-sys.createdAt",
    }),
  ]);

  return {
    person: entries.items[0],
    posts: posts.items,
  };
});
</script>
