// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: "", // can be overridden by NUXT_API_SECRET environment variable
    CTFSpaceID: process.env.CTF_SPACE_ID,
    CTFAccessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    CTFPersonID: process.env.CTF_PERSON_ID,
    CTFBlogPostTypeID: process.env.CTF_BLOG_POST_TYPE_ID,
    public: {
      apiBase: "", // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
});
