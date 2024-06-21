import { getClient } from "../services/contentful/client";
import { GalleryItem } from "../shared/types";
import { extractPhotoId } from "../shared/utilities";

export const HomeLoader = async () => {
  const client = getClient();
  const res = await client.getEntries<GalleryItem>({
    content_type: "galleryPhoto",
  });

  const sortedItems = res.items.sort(
    (a, b) => extractPhotoId(a.fields.title) - extractPhotoId(b.fields.title)
  );
  return sortedItems;
};

export type HomeLoaderValue = Awaited<ReturnType<typeof HomeLoader>>;
