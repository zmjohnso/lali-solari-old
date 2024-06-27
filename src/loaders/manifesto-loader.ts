import { getClient } from "../services/contentful/client";
import { Locale, Manifesto } from "../shared/types";

export const ManifestoLoader = async (languageMode: Locale) => {
  const client = getClient();
  const res = await client.getEntries<Manifesto>({
    content_type: "manifiesto",
    locale: languageMode,
  });

  return res.items[0];
};

export type ManifestoLoaderValue = Awaited<ReturnType<typeof ManifestoLoader>>;
