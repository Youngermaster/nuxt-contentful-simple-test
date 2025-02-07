<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>My Nuxt Contentful App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <!-- This is where page content will be injected -->
      <slot />
    </v-main>
    <v-footer app inset>
      <span class="mx-auto">&copy; 2025 My Company</span>
    </v-footer>
  </v-app>
</template>
