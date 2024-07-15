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
import { useState } from "react";
import { GalleryDisplayLoaderValue } from "../../loaders/gallery-display-loader";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { usePhotoLoader } from "../../hooks/usePhotoLoader";
import { Gallery } from "./gallery";

export const GalleryDisplay: React.FC = () => {
  const { mainPhoto, galleryItems } =
    useLoaderData() as GalleryDisplayLoaderValue;
  const navigate = useNavigate();
  const { imageLoaded } = usePhotoLoader(mainPhoto?.fields.photo);
  const [currentIndex, setCurrentIndex] = useState(
    galleryItems.findIndex(
      (item) =>
        item.fields.thumbnail.sys.id === mainPhoto?.fields.thumbnail.sys.id
    )
  );

  const collectionName = mainPhoto?.fields.gallery.fields.name;
  const collectionDescription = mainPhoto?.fields.gallery.fields.description;
  const mainPhotoUrl = mainPhoto?.fields.photo.fields.file.url;
  const mainPhotoTitle = mainPhoto?.fields.photo.fields.title;
  const mainPhotoPaintingData = mainPhoto?.fields.paintingData;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      navigate(
        `/gallery/${galleryItems[currentIndex - 1].fields.thumbnail.sys.id}`
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < galleryItems.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      navigate(
        `/gallery/${galleryItems[currentIndex + 1].fields.thumbnail.sys.id}`
      );
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
              {imageLoaded ? (
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
          key={mainPhoto?.fields.thumbnail.sys.id}
          mainPhoto={mainPhoto}
          galleryItems={galleryItems}
        />
      </Stack>
    </Box>
  );
};
