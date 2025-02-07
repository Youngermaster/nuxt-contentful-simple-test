<template>
  <div>
    <NuxtRouteAnnouncer />
    <div>
      <div>Check developer console!</div>
    </div>
    <div>
      <!-- render data of the person -->
      <h1>{{ person.fields.name }}</h1>
      <!-- render blog posts -->
      <ul>
        <li v-for="post in posts">{{ post.fields.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { createClient } from "~/plugins/contentful.js";
const config = useRuntimeConfig();

console.log("Runtime config:", config);
if (import.meta.server) {
  console.log("API secret:", config.apiSecret);
  console.log("CTF_SPACE_ID:", config.CTFSpaceID);
  console.log("CTF_CDA_ACCESS_TOKEN:", config.CTFAccessToken);
  console.log("CTF_PERSON_ID:", config.CTFPersonID);
  console.log("CTF_BLOG_POST_TYPE_ID:", config.CTFBlogPostTypeID);
}

const client = createClient();

export default {
  // `env` is available in the context object
  asyncData({ env }) {
    return Promise.all([
      // fetch the owner of the blog
      client.getEntries({
        "sys.id": config.CTFPersonID,
      }),
      // fetch all blog posts sorted by creation date
      client.getEntries({
        content_type: config.CTFBlogPostTypeID,
        order: "-sys.createdAt",
      }),
    ])
      .then(([entries, posts]) => {
        // return data that should be available
        // in the template
        return {
          person: entries.items[0],
          posts: posts.items,
        };
      })
      .catch(console.error);
  },
};
</script>
