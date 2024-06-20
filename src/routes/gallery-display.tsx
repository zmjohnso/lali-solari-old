import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  abstractReverberationsPaintings,
  pandemiaPaintings,
  raicesPaintings,
  simbiosisPaintings,
} from "../shared/photos";
import { Image, Collection } from "../shared/types";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const { collection, id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const itemsToShow = 5;
  const initialIndex = id
    ? Math.floor((parseInt(id, 10) - 1) / itemsToShow) * itemsToShow
    : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - itemsToShow ? prevIndex + 1 : prevIndex
    );
  };

  const visibleImages = images.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
          <ArrowBack />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid container spacing={2}>
          {visibleImages.map((image) => (
            <Grid item xs={12 / itemsToShow} key={image.id}>
              <img
                src={image.file}
                alt={`${image.id}`}
                style={{ width: "100%", cursor: "pointer" }}
                onClick={() => navigate(`/gallery/${collection}/${image.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton
          onClick={handleNext}
          disabled={currentIndex >= images.length - itemsToShow}
        >
          <ArrowForward />
        </IconButton>
      </Grid>
    </Grid>
  );
};

interface RouteParams extends Record<string, string | undefined> {
  collection?: Collection;
  id?: string;
}

export const GalleryDisplay: React.FC = () => {
  const { collection, id } = useParams<RouteParams>();
  const photoArray: Image[] =
    collection === "abstract-reverberations"
      ? abstractReverberationsPaintings
      : collection === "raices"
        ? raicesPaintings
        : collection === "simbiosis"
          ? simbiosisPaintings
          : pandemiaPaintings;
  const displayPhoto = photoArray.find((x) => x.id.toString() === id);
  const collectionName =
    collection === "abstract-reverberations"
      ? "ABSTRACT REBERVERATIONS"
      : collection === "raices"
        ? "RAICES"
        : collection === "simbiosis"
          ? "SIMBIOSIS"
          : "PANDEMIA";
  const collectionDescription =
    collection === "abstract-reverberations"
      ? "Esta serie creada en Buenos Aires, nace a raíz de la música y mi interpretación en papel. Me permite explorar y expresar de manera genuina mis emociones más profundas al reconectarme con mi cuna, actuando como un catalizador para mi creatividad. Así, cada pintura se transforma en una representación tangible de mis sentimientos al vivir y crear rodeada del entorno inspirador en el que me crié."
      : collection === "raices"
        ? 'En esta serie de tres, plasmo la capacidad de adaptación a los cambios, la metamorfosis personal y renacimiento. Fusionando elementos de realidad y fantasía, "Raíces" invita al espectador a sumergirse en un mundo donde la imaginación florece, mostrando cómo, a través del cambio de contexto, se puede encontrar la verdadera esencia y crecer desde las raíces más profundas.'
        : collection === "simbiosis"
          ? "SIMBIOSIS"
          : "PANDEMIA";

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
      <Stack spacing={{ xs: 2, md: 4 }}>
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
          <img src={displayPhoto?.file} loading="lazy" />
        </Box>
        {/* <img
          src={displayPhoto?.file}
          loading="lazy"
          height="100%"
          width="100%"
        /> */}
        <Gallery images={photoArray} />
      </Stack>
    </Box>
  );
};
