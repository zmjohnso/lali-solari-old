import { Entry } from "contentful";
import { useState, useEffect } from "react";
import { MinimumHomePage } from "../shared/types";

export const usePhotoLoad = (photo: Entry<MinimumHomePage>) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (photo.fields.thumbnail.fields.file.url) {
      const img = new Image();
      img.src = photo.fields.thumbnail.fields.file.url;
      img.onload = () => setImageLoaded(true);
    }
  }, [photo]);

  return { imageLoaded };
};
