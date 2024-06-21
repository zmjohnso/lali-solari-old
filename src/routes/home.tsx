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
import { useLoaderData, useNavigate } from "react-router-dom";
import { HomeLoaderValue } from "../loaders/home-loader";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  onClick,
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
        onLoad={() => setLoaded(true)}
        onClick={onClick}
        style={{
          display: loaded ? "block" : "none",
          cursor: "pointer",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          flexShrink: 0,
        }}
        {...props}
      />
    </div>
  );
};

export const Home: React.FC = () => {
  const homePage = useLoaderData() as HomeLoaderValue;
  const theme = useTheme();
  const navigate = useNavigate();
  const [inViewL1, setInViewL1] = useState(false);
  const [inViewL2, setInViewL2] = useState(false);
  const [inViewED, setInViewED] = useState(false);
  const slideRefL1 = useRef(null);
  const slideRefL2 = useRef(null);
  const slideRefED = useRef(null);

  // this works, but how to make types happy?
  const arPhotos = homePage.filter(
    (x) => x.fields.gallery.fields.name === "ABSTRACT REVERBERATIONS"
  );
  const symbiosisPhotos = homePage.filter(
    (x) => x.fields.gallery.fields.name === "SYMBIOSIS"
  );
  const pandemicPhotos = homePage.filter(
    (x) => x.fields.gallery.fields.name === "PANDEMIC"
  );
  const rootsPhotos = homePage.filter(
    (x) => x.fields.gallery.fields.name === "ROOTS"
  );
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewED(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.9 } // You can adjust the threshold to control when the animation starts
    );

    if (slideRefED.current) {
      observer.observe(slideRefED.current);
    }

    return () => {
      if (slideRefED.current) {
        observer.unobserve(slideRefED.current);
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
      mb={4}
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
              display: "flex",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/")}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ fontSize: "clamp(1rem, 6vw, 10rem)", fontFamily: "Bison" }}
            >
              LALI SOLARI
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                fontSize: "clamp(0.5rem, 1.25vw, 6rem)",
                fontFamily: "Open Sans",
              }}
            >
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
              fontSize: "clamp(2rem, 18vw, 20rem)",
              "&:hover": {
                color: "#3bff00",
                cursor: "pointer",
              },
            }}
            ml={{ xs: 10, md: 30 }}
            onClick={() => navigate("/manifiesto")}
          >
            MANIFIESTO
          </Typography>
        </Slide>
      </Box>
      <Box ref={slideRefL2} display="flex" justifyContent="center" gap={5}>
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
              fontSize: "clamp(2rem, 16vw, 18rem)",
              "&:hover": {
                color: "#3bff00",
                cursor: "pointer",
              },
            }}
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
              fontSize: "clamp(2rem, 11vw, 13rem)",
              "&:hover": {
                color: "#3bff00",
                cursor: "pointer",
              },
            }}
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
      <Box ref={slideRefED} mb={15}>
        <Slide
          direction="left"
          in={inViewED}
          timeout={{ enter: 1500, exit: 300 }}
          easing="ease-in-out"
        >
          <Typography
            variant="h2"
            color={theme.palette.text.disabled}
            sx={{
              fontSize: "clamp(0.5rem, 6vw, 8rem)",
              fontWeight: "bold",
              fontStyle: "italic",
              fontFamily: "Bison",
            }}
            ml={25}
          >
            EXCLUSIVE DESIGNS
          </Typography>
        </Slide>
      </Box>
      <Grid container spacing={2}>
        {arPhotos.map((item) => (
          <Grid
            key={item.fields.photo.fields.title}
            item
            xs={12 / 5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LazyImage
              src={item.fields.photo.fields.file.url}
              alt={item.fields.photo.fields.title}
              width="100%"
              height="auto"
              onClick={() => navigate(`/gallery/${item.sys.id}`)}
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
        {rootsPhotos.map((item) => (
          <Grid
            key={item.fields.photo.fields.title}
            item
            xs={12 / 3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LazyImage
              src={item.fields.photo.fields.file.url}
              alt={item.fields.photo.fields.title}
              width="100%"
              height="auto"
              onClick={() => navigate(`/gallery/${item.sys.id}`)}
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
        {symbiosisPhotos.map((item) => (
          <Grid
            key={item.fields.photo.fields.title}
            item
            xs={12 / 4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LazyImage
              src={item.fields.photo.fields.file.url}
              alt={item.fields.photo.fields.title}
              width="100%"
              height="auto"
              onClick={() => navigate(`/gallery/${item.sys.id}`)}
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
        {pandemicPhotos.map((item) => (
          <Grid
            key={item.fields.photo.fields.title}
            item
            xs={12 / 5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LazyImage
              src={item.fields.photo.fields.file.url}
              alt={item.fields.photo.fields.title}
              width="100%"
              height="auto"
              onClick={() => navigate(`/gallery/${item.sys.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
