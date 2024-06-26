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

const Gallery = () => {
  const { mainPhoto, galleryItems } =
    useLoaderData() as GalleryDisplayLoaderValue;
  const navigate = useNavigate();
  const itemsToShow = 5;

  const photoId = extractPhotoId(mainPhoto?.fields.title || "");

  const initialIndex = Math.floor(photoId / itemsToShow) * itemsToShow;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

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
      {galleryItems.length > 5 && (
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
      {galleryItems.length > 5 && (
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
  const { mainPhoto } = useLoaderData() as GalleryDisplayLoaderValue;
  const [loadedMainPhoto, setLoadedMainPhoto] = useState(false);
  const collectionName = mainPhoto?.fields.gallery.fields.name;
  const collectionDescription = mainPhoto?.fields.gallery.fields.description;
  const mainPhotoUrl = mainPhoto?.fields.photo.fields.file.url;

  useEffect(() => {
    if (mainPhotoUrl) {
      const img = new Image();
      img.src = mainPhotoUrl;
      img.onload = () => setLoadedMainPhoto(true);
    }
  }, [mainPhotoUrl]);

  return (
    <Box
      paddingX={{ xs: "1rem", md: "10rem" }}
      paddingTop={{ xs: "0.5rem", md: "5rem" }}
    >
      <Stack spacing={{ xs: 2, md: 4 }} mb={5}>
        <Typography
          variant="h3"
          fontWeight="bold"
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
          sx={{
            display: "flex",
            alignSelf: "center",
            fontFamily: "Arimo",
          }}
        >
          {collectionDescription}
        </Typography>
        {!loadedMainPhoto && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="auto"
            sx={{ paddingTop: "75%" }}
          />
        )}
        {loadedMainPhoto && (
          <TransformWrapper>
            <TransformComponent>
              <img
                height="auto"
                width="100%"
                src={mainPhotoUrl}
                alt={mainPhoto?.fields.photo.fields.title}
                loading="lazy"
              />
            </TransformComponent>
          </TransformWrapper>
        )}
        {mainPhoto?.fields.paintingData && (
          <Typography
            variant="caption"
            display="flex"
            justifyContent="flex-end"
            sx={{ marginTop: "0.5rem !important", fontFamily: "Arimo" }} // override default margin from the stack
          >
            {mainPhoto?.fields.paintingData.fields.size}{" "}
            {mainPhoto?.fields.paintingData.fields.technique}
          </Typography>
        )}
        <Gallery />
      </Stack>
    </Box>
  );
};
