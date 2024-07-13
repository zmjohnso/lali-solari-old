import { getClient } from "../services/contentful/client";
import { Locale, MinimumHomePage } from "../shared/types";
import { extractPhotoId } from "../shared/utilities";

export const HomeLoader = async (languageMode: Locale) => {
  const client = getClient();
  const res = await client.getEntries<MinimumHomePage>({
    content_type: "minimumHomePage",
    locale: languageMode,
  });

  const sortedItems = res.items.sort(
    (a, b) => extractPhotoId(a.fields.title) - extractPhotoId(b.fields.title)
  );
  return sortedItems;
};

export type HomeLoaderValue = Awaited<ReturnType<typeof HomeLoader>>;
