import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Entry } from "contentful";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryItem } from "../../shared/types";
import { extractPhotoId } from "../../shared/utilities";

interface GalleryProps {
  mainPhoto: Entry<GalleryItem> | undefined;
  galleryItems: Entry<GalleryItem>[];
}

export const Gallery: React.FC<GalleryProps> = ({
  mainPhoto,
  galleryItems,
}) => {
  const navigate = useNavigate();
  const itemsToShow = 5;

  const photoId = extractPhotoId(mainPhoto?.fields.title || "");
  const initialIndex = Math.floor(photoId / itemsToShow) * itemsToShow;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const newPhotoId = extractPhotoId(mainPhoto?.fields.title || "");
    setCurrentIndex(Math.floor(newPhotoId / itemsToShow) * itemsToShow);
  }, [mainPhoto, itemsToShow]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < galleryItems.length - itemsToShow ? prevIndex + 1 : prevIndex
    );
  };

  const visibleImages = galleryItems.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  return (
    <Grid container alignItems="center">
      {galleryItems.length > itemsToShow && (
        <Grid item>
          <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
            <ArrowBack />
          </IconButton>
        </Grid>
      )}
      <Grid item xs>
        <Grid container spacing={2}>
          {visibleImages.map((item) => (
            <Grid
              item
              xs={12 / itemsToShow}
              key={item.fields.thumbnail.fields.title}
              display="flex"
              alignItems="center"
            >
              <img
                src={item.fields.thumbnail.fields.file.url}
                alt={item.fields.thumbnail.fields.title}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                onClick={() =>
                  navigate(`/gallery/${item.fields.thumbnail.sys.id}`)
                }
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {galleryItems.length > itemsToShow && (
        <Grid item>
          <IconButton
            onClick={handleNext}
            disabled={currentIndex >= galleryItems.length - itemsToShow}
          >
            <ArrowForward />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};
