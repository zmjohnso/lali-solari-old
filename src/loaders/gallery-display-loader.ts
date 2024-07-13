import { getClient } from "../services/contentful/client";
import { GalleryItem, Locale } from "../shared/types";
import { extractPhotoId } from "../shared/utilities";

export const GalleryDisplayLoader = async (
  languageMode: Locale,
  title: string | undefined
) => {
  const client = getClient();
  const res = await client.getEntries<GalleryItem>({
    content_type: "galleryPhoto",
    locale: languageMode,
  });
  const mainPhoto = res.items.find((x) => x.fields.title === title);
  const galleryItems = res.items.filter(
    (x) =>
      x.fields.gallery.fields.name === mainPhoto?.fields.gallery.fields.name
  );
  const sortedGalleryItems = galleryItems.sort(
    (a, b) => extractPhotoId(a.fields.title) - extractPhotoId(b.fields.title)
  );
  return { mainPhoto, galleryItems: sortedGalleryItems };
};

export type GalleryDisplayLoaderValue = Awaited<
  ReturnType<typeof GalleryDisplayLoader>
>;
