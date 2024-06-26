import { getClient } from "../services/contentful/client";
import { About, Locale } from "../shared/types";

export const AboutLoader = async (languageMode: Locale) => {
  const client = getClient();
  const res = await client.getEntries<About>({
    content_type: "about",
    locale: languageMode,
  });

  return res.items[0];
};

export type AboutLoaderValue = Awaited<ReturnType<typeof AboutLoader>>;
