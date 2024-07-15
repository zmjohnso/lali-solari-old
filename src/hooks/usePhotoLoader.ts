import { useState, useEffect } from "react";
import { Photo } from "../shared/types";

export const usePhotoLoader = (photo: Photo) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (photo.fields.file.url) {
      const img = new Image();
      img.src = photo.fields.file.url;
      img.onload = () => setImageLoaded(true);
    }
  }, [photo]);

  return { imageLoaded };
};
