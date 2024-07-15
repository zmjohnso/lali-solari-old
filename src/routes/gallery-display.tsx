import {
  Box,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { GalleryDisplayLoaderValue } from "../loaders/gallery-display-loader";
import { extractPhotoId } from "../shared/utilities";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Entry } from "contentful";
import { GalleryItem } from "../shared/types";

interface GalleryProps {
  mainPhoto: Entry<GalleryItem> | undefined;
  galleryItems: Entry<GalleryItem>[];
}

const Gallery: React.FC<GalleryProps> = ({ mainPhoto, galleryItems }) => {
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
                onClick={() => navigate(`/gallery/${item.sys.id}`)}
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

export const GalleryDisplay: React.FC = () => {
  const { mainPhoto, galleryItems } =
    useLoaderData() as GalleryDisplayLoaderValue;
  const navigate = useNavigate();
  const [loadedMainPhoto, setLoadedMainPhoto] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    galleryItems.findIndex((item) => item.sys.id === mainPhoto?.sys.id)
  );

  const collectionName = mainPhoto?.fields.gallery.fields.name;
  const collectionDescription = mainPhoto?.fields.gallery.fields.description;
  const mainPhotoUrl = mainPhoto?.fields.photo.fields.file.url;
  const mainPhotoTitle = mainPhoto?.fields.photo.fields.title;
  const mainPhotoPaintingData = mainPhoto?.fields.paintingData;

  useEffect(() => {
    if (mainPhotoUrl) {
      const img = new Image();
      img.src = mainPhotoUrl;
      img.onload = () => setLoadedMainPhoto(true);
    }
  }, [mainPhotoUrl]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      navigate(`/gallery/${galleryItems[currentIndex - 1].sys.id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < galleryItems.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      navigate(`/gallery/${galleryItems[currentIndex + 1].sys.id}`);
    }
  };

  return (
    <Box
      paddingX={{ xs: "1rem", md: "10rem" }}
      paddingTop={{ xs: "0.5rem", md: "5rem" }}
    >
      <Stack mb={5}>
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={4}
          sx={{
            fontSize: "clamp(1rem, 10vw, 3rem)",
            fontFamily: "Open Sans",
          }}
        >
          {collectionName}
        </Typography>
        <Typography
          variant="body1"
          width={{ xs: "22rem", md: "30rem" }}
          mb={3}
          sx={{
            display: "flex",
            alignSelf: "center",
            fontFamily: "Arimo",
          }}
        >
          {collectionDescription}
        </Typography>
        <Grid container alignItems="center" spacing={2} mb={3}>
          <Grid item>
            <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Box position="relative" width="100%">
              {loadedMainPhoto ? (
                <TransformWrapper>
                  <TransformComponent>
                    <img
                      height="auto"
                      width="100%"
                      src={mainPhotoUrl}
                      alt={mainPhotoTitle}
                      loading="lazy"
                    />
                  </TransformComponent>
                </TransformWrapper>
              ) : (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="auto"
                  sx={{ paddingTop: "75%" }}
                />
              )}
              {mainPhotoPaintingData && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontFamily: "Arimo",
                    marginTop: "0.5rem",
                    paddingRight: "1rem",
                  }}
                >
                  {mainPhotoPaintingData.fields.size}{" "}
                  {mainPhotoPaintingData.fields.technique}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleNext}
              disabled={currentIndex >= galleryItems.length - 1}
            >
              <ArrowForward />
            </IconButton>
          </Grid>
        </Grid>
        <Gallery
          key={mainPhoto?.sys.id}
          mainPhoto={mainPhoto}
          galleryItems={galleryItems}
        />
      </Stack>
    </Box>
  );
};
