import * as contentful from "contentful";
// const contentful = require("contentful");

const runtimeConfig = useRuntimeConfig();
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  space: runtimeConfig.CTFSpaceID,
  accessToken: runtimeConfig.CTFAccessToken,
};

// export `createClient` to use it in page components
module.exports = {
  createClient() {
    return contentful.createClient(config);
  },
};
