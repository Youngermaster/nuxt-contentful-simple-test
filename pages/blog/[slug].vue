<template>
  <v-container v-if="post" class="mt-6">
    <!-- Hero Image -->
    <v-img
      v-if="post.fields.heroImage"
      :src="post.fields.heroImage.fields.file.url"
      height="400"
      class="mb-6"
      cover
      :alt="post.fields.heroImage.fields.file.fileName"
    ></v-img>

    <!-- Title and meta info -->
    <div class="d-flex flex-column mb-6">
      <h1 class="text-h3 mb-2">{{ post.fields.title }}</h1>

      <div class="d-flex align-center mb-4">
        <!-- Author info if available -->
        <div v-if="post.fields.author" class="d-flex align-center mr-4">
          <v-avatar size="40" class="mr-2">
            <v-img
              v-if="post.fields.author.fields.image"
              :src="post.fields.author.fields.image.fields.file.url"
              alt="Author"
            ></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
          <span class="text-subtitle-1">{{
            post.fields.author.fields.name
          }}</span>
        </div>

        <!-- Publish date -->
        <div v-if="post.fields.publishDate" class="mr-4">
          <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
          <span class="text-subtitle-2">{{
            formatDate(post.fields.publishDate)
          }}</span>
        </div>

        <!-- Tags -->
        <div v-if="post.fields.tags && post.fields.tags.length > 0">
          <v-chip
            v-for="tag in post.fields.tags"
            :key="tag"
            size="small"
            class="mr-1"
            color="primary"
            variant="outlined"
          >
            {{ tag }}
          </v-chip>
        </div>
      </div>
    </div>

    <!-- Description / Summary -->
    <div
      v-if="post.fields.description"
      class="text-body-1 font-weight-medium mb-6"
    >
      {{ post.fields.description }}
    </div>

    <!-- Content Body -->
    <div v-if="post.fields.body" class="text-body-1 font-weight-medium mb-6">
      {{ post.fields.body }}
    </div>

    <!-- Back button -->
    <div class="mt-6">
      <v-btn
        variant="outlined"
        color="primary"
        to="/"
        prepend-icon="mdi-arrow-left"
      >
        Back to Posts
      </v-btn>
    </div>
  </v-container>

  <!-- Loading state -->
  <v-container
    v-else-if="pending"
    class="d-flex justify-center align-center"
    style="min-height: 50vh"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      size="64"
    ></v-progress-circular>
  </v-container>

  <!-- Error state -->
  <v-container
    v-else
    class="d-flex flex-column justify-center align-center"
    style="min-height: 50vh"
  >
    <v-icon x-large color="error" size="64" class="mb-4"
      >mdi-alert-circle</v-icon
    >
    <h2 class="text-h4 mb-2">Post not found</h2>
    <p class="text-body-1 mb-6">
      The blog post you're looking for doesn't exist or has been removed.
    </p>
    <v-btn color="primary" to="/">Return to Homepage</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { createClient } from "~/utils/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document } from "@contentful/rich-text-types";

// Get the route params
const route = useRoute();
const slug = route.params.slug as string;

// Get config and create client
const config = useRuntimeConfig().public;
const client = createClient(config.CTFSpaceID, config.CTFAccessToken);

// Fetch the blog post by slug
const {
  data: post,
  pending,
  error,
} = await useAsyncData(`blog-post-${slug}`, async () => {
  const entries = await client.getEntries({
    content_type: config.CTFBlogPostTypeID,
    "fields.slug": slug,
    include: 2, // Include linked entries up to 2 levels deep (for author and other references)
  });

  if (entries.items.length === 0) {
    return null;
  }

  return entries.items[0];
});

// Format date helper function
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Render rich text content if available
const renderedContent = computed(() => {
  if (post.value?.fields.body) {
    return documentToHtmlString(post.value.fields.body as Document);
  }
  return "";
});

// Handle error state
if (error.value) {
  console.error("Error fetching blog post:", error.value);
}

// Set the page title
useHead({
  title: computed(() => post.value?.fields.title || "Blog Post Not Found"),
});
</script>

<style scoped>
:deep(.rich-text img) {
  max-width: 100%;
  height: auto;
  margin: 2rem 0;
}

:deep(.rich-text a) {
  color: var(--v-primary-base);
  text-decoration: none;
}

:deep(.rich-text a:hover) {
  text-decoration: underline;
}

:deep(.rich-text h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(.rich-text h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

:deep(.rich-text p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

:deep(.rich-text blockquote) {
  border-left: 4px solid var(--v-primary-lighten3);
  padding-left: 1rem;
  margin-left: 0;
  font-style: italic;
}

:deep(.rich-text ul),
:deep(.rich-text ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}
</style>
