import { getClient } from "../services/contentful/client";
import { Locale, Manifiesto } from "../shared/types";

export const ManifiestoLoader = async (languageMode: Locale) => {
  const client = getClient();
  const res = await client.getEntries<Manifiesto>({
    content_type: "manifiesto",
    locale: languageMode,
  });

  return res.items[0];
};

export type ManifiestoLoaderValue = Awaited<
  ReturnType<typeof ManifiestoLoader>
>;
