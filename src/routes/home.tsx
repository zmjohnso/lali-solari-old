import {
  Box,
  Typography,
  Grid,
  Slide,
  useTheme,
  Container,
  Skeleton,
} from "@mui/material";
import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import {
  abstractReverberationsPaintings,
  pandemiaPaintings,
  raicesPaintings,
  simbiosisPaintings,
} from "../shared/photos";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  minWidth?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  onClick,
  minWidth,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="auto"
          style={{ paddingTop: "75%" }} // This maintains the aspect ratio while loading
        />
      )}
      <img
        src={src}
        alt={alt}
        style={{ display: loaded ? "block" : "none", cursor: "pointer", minWidth: minWidth }}
        onLoad={() => setLoaded(true)}
        onClick={onClick}
        {...props}
      />
    </div>
  );
};

export const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [inViewL1, setInViewL1] = useState(false);
  const [inViewL2, setInViewL2] = useState(false);
  const slideRefL1 = useRef(null);
  const slideRefL2 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewL1(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.9 } // You can adjust the threshold to control when the animation starts
    );

    if (slideRefL1.current) {
      observer.observe(slideRefL1.current);
    }

    return () => {
      if (slideRefL1.current) {
        observer.unobserve(slideRefL1.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewL2(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.9 } // You can adjust the threshold to control when the animation starts
    );

    if (slideRefL2.current) {
      observer.observe(slideRefL2.current);
    }

    return () => {
      if (slideRefL2.current) {
        observer.unobserve(slideRefL2.current);
      }
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingLeft="2rem"
      paddingRight="2rem"
      mt={2}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="black"
              onClick={() => navigate("/")}
            >
              LALI SOLARI
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              color="black"
              sx={{
                fontFamily: "Open Sans",
              }}
            >
              FINE ARTS & EXCLUSIVE DESIGNS
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              display: { xs: "none", md: "flex" },
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/")}
          >
            <Typography variant="h4" fontWeight="bold" color="black">
              LALI SOLARI
            </Typography>
            <Typography variant="body1" gutterBottom color="black">
              FINE ARTS & EXCLUSIVE DESIGNS
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box ref={slideRefL1}>
        <Slide
          direction="left"
          in={inViewL1}
          timeout={{ enter: 2500, exit: 300 }}
          easing="ease-in-out"
        >
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              fontFamily: "Bebas Neue",
              fontSize: 259,
              "&:hover": {
                color: "#3bff00",
                cursor: "pointer",
              },
            }}
            mt={2}
            ml={15}
            onClick={() => navigate("/manifiesto")}
          >
            MANIFIESTO
          </Typography>
        </Slide>
      </Box>
      <Box ref={slideRefL2} display="flex" justifyContent="center" gap={10}>
        <Slide
          direction="right"
          in={inViewL2}
          timeout={{ enter: 2000, exit: 300 }}
          easing="ease-in-out"
        >
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              fontFamily: "Bebas Neue",
              fontSize: 244,
              "&:hover": {
                color: "#3bff00",
                cursor: "pointer",
              },
            }}
            mt={2}
            onClick={() => navigate("/about")}
          >
            ABOUT
          </Typography>
        </Slide>
        <Slide
          direction="left"
          in={inViewL2}
          timeout={{ enter: 1500, exit: 300 }}
          easing="ease-in-out"
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontFamily: "Bison",
              fontSize: 146,
              "&:hover": {
                color: "#3bff00",
                cursor: "pointer",
              },
            }}
            mt={2}
          >
            GALLERY
          </Typography>
        </Slide>
      </Box>
      {/* <Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontFamily: "Bebas Neue",
            "&:hover": {
              color: "#3bff00",
              cursor: "pointer",
            },
          }}
          mt={2}
        >
          CONTACT
        </Typography>
      </Box> */}
      <Box>
        <Typography
          variant="h2"
          color={theme.palette.text.disabled}
          sx={{
            fontSize: 54,
            fontWeight: "bold",
            fontStyle: "italic",
            fontFamily: "Bison",
          }}
          mt={2}
        >
          EXCLUSIVE DESIGNS / (COMING SOON)
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {abstractReverberationsPaintings.map((item) => (
          <Grid key={item.id} item xs={12 / 5}>
            <LazyImage
              src={item.file}
              alt={`Abstract Reverberations Painting ${item.id}`}
              width="100%"
              height="auto"
              onClick={() =>
                navigate(`/gallery/abstract-reverberations/${item.id}`)
              }
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        fontStyle="bold"
        variant="h2"
        sx={{
          fontFamily: "Bebas Neue",
        }}
      >
        RAICES
      </Typography>
      <Grid container spacing={2}>
        {raicesPaintings.map((item) => (
          <Grid key={item.id} item xs={12 / 3}>
            <LazyImage
              src={item.file}
              alt={`Raices Painting ${item.id}`}
              width="auto"
              minWidth="250px"
              height="250px"
              onClick={() => navigate(`/gallery/raices/${item.id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        fontStyle="bold"
        variant="h2"
        sx={{
          fontFamily: "Bebas Neue",
        }}
      >
        SIMBIOSIS
      </Typography>
      <Grid container spacing={2}>
        {simbiosisPaintings.map((item) => (
          <Grid key={item.id} item xs={12 / 4}>
            <LazyImage
              src={item.file}
              alt={`Simbiosis Painting ${item.id}`}
              width="100%"
              height="auto"
              onClick={() => navigate(`/gallery/simbiosis/${item.id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        fontStyle="bold"
        variant="h2"
        sx={{
          fontFamily: "Bebas Neue",
        }}
      >
        PANDEMIA
      </Typography>
      <Grid container spacing={2}>
        {pandemiaPaintings.map((item) => (
          <Grid key={item.id} item xs={12 / 5}>
            <LazyImage
              src={item.file}
              alt={`Pandemia Painting ${item.id}`}
              width="100%"
              height="auto"
              onClick={() => navigate(`/gallery/pandemia/${item.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
