import * as contentful from "contentful";

export const createClient = (space: string, accessToken: string) => {
  return contentful.createClient({
    space,
    accessToken,
  });
};
