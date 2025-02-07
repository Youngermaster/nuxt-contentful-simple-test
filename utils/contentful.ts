import * as contentful from "contentful";

export const createClient = (space: string, accessToken: string) => {
  const config = {
    space: space,
    accessToken: accessToken,
  };

  return contentful.createClient(config);
};
