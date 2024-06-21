import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import { GalleryDisplayLoaderValue } from "../loaders/gallery-display-loader";
import { extractPhotoId } from "../shared/utilities";

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
    <Grid container spacing={2} alignItems="center">
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
              key={item.fields.photo.fields.title}
              display="flex"
              alignItems="center"
            >
              <img
                src={item.fields.photo.fields.file.url}
                alt={item.fields.photo.fields.title}
                style={{ width: "100%", cursor: "pointer" }}
                onClick={() => navigate(`/gallery/${item.sys.id}`)}
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
  const collectionName = mainPhoto?.fields.gallery.fields.name;
  const collectionDescription = mainPhoto?.fields.gallery.fields.description;

  const [zoom, setZoom] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPosition({ x, y });
    setZoom(!zoom);
  };

  return (
    <Box
      paddingX={{ xs: "1rem", md: "10rem" }}
      paddingTop={{ xs: "0.5rem", md: "5rem" }}
    >
      <Stack spacing={{ xs: 2, md: 4 }} mb={5}>
        <Typography
          variant="h3"
          fontStyle="bold"
          sx={{
            fontFamily: "Open Sans",
          }}
        >
          {collectionName}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: { xs: "70vw", md: "50vw" },
            fontFamily: "Arimo",
            display: "flex",
            alignSelf: "flex-end",
          }}
        >
          {collectionDescription}
        </Typography>
        <Box
          onClick={handleClick}
          sx={{
            overflow: "hidden",
            position: "relative",
            cursor: "zoom-in",
            "& img": {
              transition: "transform 0.3s ease, transform-origin 0.3s ease",
              transform: zoom ? `scale(2)` : "none",
              transformOrigin: `${cursorPosition.x}% ${cursorPosition.y}%`,
              cursor: zoom ? "zoom-out" : "zoom-in",
              width: "100%",
              height: "100%",
            },
          }}
        >
          <img
            src={mainPhoto?.fields.photo.fields.file.url}
            alt={mainPhoto?.fields.photo.fields.title}
            loading="lazy"
          />
        </Box>
        <Gallery />
      </Stack>
    </Box>
  );
};
