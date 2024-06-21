import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRef, useState } from "react";
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
                style={{
                  width: "100%",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                onClick={() => navigate(`/gallery/${item.sys.id}`)}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.15)")
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
  const collectionName = mainPhoto?.fields.gallery.fields.name;
  const collectionDescription = mainPhoto?.fields.gallery.fields.description;

  const [zoom, setZoom] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    setZoom(!zoom);
    setDragging(false);
    setCurrentPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom) {
      setDragging(true);
      setStartPosition({
        x: e.clientX - currentPosition.x,
        y: e.clientY - currentPosition.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setCurrentPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseLeave = () => {
    setDragging(false);
  };

  return (
    <Box
      paddingX={{ xs: "1rem", md: "10rem" }}
      paddingTop={{ xs: "0.5rem", md: "5rem" }}
    >
      <Stack spacing={{ xs: 2, md: 4 }} mb={5}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Open Sans",
            fontWeight: "bold",
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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          sx={{
            overflow: "hidden",
            position: "relative",
            cursor: zoom ? "grab" : "zoom-in",
            width: "100%",
            height: "auto", // Ensure height scales with width
            "& img": {
              transition: zoom ? "none" : "transform 0.3s ease",
              transform: zoom
                ? `scale(2) translate(${currentPosition.x}px, ${currentPosition.y}px)`
                : "none",
              cursor: dragging ? "grabbing" : zoom ? "grab" : "zoom-in",
              width: "100%", // Ensure image covers its container
            },
          }}
        >
          <img
            src={mainPhoto?.fields.photo.fields.file.url}
            alt={mainPhoto?.fields.photo.fields.title}
            loading="lazy"
            ref={imageRef}
          />
          {mainPhoto?.fields.paintingData && (
            <Typography
              variant="caption"
              display="flex"
              justifyContent="flex-end"
            >
              {mainPhoto?.fields.paintingData.fields.size}{" "}
              {mainPhoto?.fields.paintingData.fields.technique}
            </Typography>
          )}
        </Box>
        <Gallery />
      </Stack>
    </Box>
  );
};
