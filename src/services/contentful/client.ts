import { createClient } from "contentful";

export const getClient = () => {
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY,
  });

  return client;
};
