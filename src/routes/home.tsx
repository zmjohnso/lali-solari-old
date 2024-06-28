import {
  Box,
  Typography,
  Grid,
  Slide,
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
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        style={{
          display: "block",
          cursor: "pointer",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          transition: "transform 0.3s",
          flexShrink: 0,
        }}
        {...props}
      />
    </div>
  );
};

export const Home: React.FC = () => {
  const homePage = useLoaderData() as HomeLoaderValue;
  const navigate = useNavigate();
  const [inViewL1, setInViewL1] = useState(false);
  const [inViewL2, setInViewL2] = useState(false);
  const [inViewED, setInViewED] = useState(false);
  const [inViewContact, setInViewContact] = useState(false);
  const slideRefL1 = useRef(null);
  const slideRefL2 = useRef(null);
  const slideRefED = useRef(null);
  const slideRefContact = useRef(null);
  const [loadedArPhotos, setLoadedArPhotos] = useState(false);

  const arPhotos = homePage.filter(
    (x) => x.fields.gallery.sys.id === "5fEPCQ6vimuUf1Ps82KcAp"
  );
  const symbiosisPhotos = homePage.filter(
    (x) => x.fields.gallery.sys.id === "42VUVtuIaLuzxexiB1JgMW"
  );
  const pandemicPhotos = homePage.filter(
    (x) => x.fields.gallery.sys.id === "6VOr5XDiSSfaIKId58ABnw"
  );
  const rootsPhotos = homePage.filter(
    (x) => x.fields.gallery.sys.id === "1TwAKieiOmnU6LL4tWEWrV"
  );

  const abstractReverberationsName =
    arPhotos.length && arPhotos[0].fields.gallery.fields.name;
  const symbiosisName =
    symbiosisPhotos.length && symbiosisPhotos[0].fields.gallery.fields.name;
  const pandemicName =
    pandemicPhotos.length && pandemicPhotos[0].fields.gallery.fields.name;
  const rootsName =
    rootsPhotos.length && rootsPhotos[0].fields.gallery.fields.name;

  useEffect(() => {
    if (arPhotos) {
      const img = new Image();
      img.src = arPhotos[0].fields.thumbnail.fields.file.url;
      img.onload = () => setLoadedArPhotos(true);
    }
  }, [arPhotos]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewContact(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.9 } // You can adjust the threshold to control when the animation starts
    );

    if (slideRefContact.current) {
      observer.observe(slideRefContact.current);
    }

    return () => {
      if (slideRefContact.current) {
        observer.unobserve(slideRefContact.current);
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
              sx={{ fontSize: "clamp(2rem, 6vw, 10rem)", fontFamily: "Bison" }}
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
          timeout={{ enter: 2000, exit: 300 }}
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
          timeout={{ enter: 1500, exit: 300 }}
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
          timeout={{ enter: 1000, exit: 300 }}
          easing="ease-in-out"
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontFamily: "Bison",
              fontSize: "clamp(2rem, 16vw, 18rem)",
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
      <Box ref={slideRefContact}>
        <Slide
          direction="right"
          in={inViewContact}
          timeout={{ enter: 1300, exit: 300 }}
          easing="ease-in-out"
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "clamp(2rem, 11vw, 18rem)",
              fontWeight: "bold",
              fontFamily: "Bebas Neue",
              marginRight: { xs: "2rem", md: "4rem" },
              "&:hover": {
                color: "#3bff00",
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("contact")}
          >
            CONTACT
          </Typography>
        </Slide>
      </Box>
      <Box ref={slideRefED} sx={{ marginBottom: { xs: "2rem", md: "9rem" } }}>
        <Slide
          direction="left"
          in={inViewED}
          timeout={{ enter: 1000, exit: 300 }}
          easing="ease-in-out"
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "clamp(0.5rem, 6vw, 8rem)",
              fontWeight: "bold",
              fontStyle: "italic",
              fontFamily: "Bison",
              marginLeft: { xs: "8rem", md: "21rem" },
              "&:hover": {
                color: "#3bff00",
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("exclusive-designs")}
          >
            EXCLUSIVE DESIGNS
          </Typography>
        </Slide>
      </Box>
      <Typography
        fontStyle="bold"
        variant="h2"
        mb={1}
        sx={{
          fontSize: "clamp(2rem, 6vw, 10rem)",
          fontFamily: "Bebas Neue",
        }}
        onClick={() => navigate(`gallery/${arPhotos[0].sys.id}`)}
      >
        {abstractReverberationsName}
      </Typography>
      <Grid container spacing={2}>
        {arPhotos.map((item) => (
          <Grid
            key={item.fields.thumbnail.fields.title}
            item
            xs={12 / 5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!loadedArPhotos && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="auto"
                sx={{ paddingTop: "75%" }}
              />
            )}
            {loadedArPhotos && (
              <LazyImage
                src={item.fields.thumbnail.fields.file.url}
                alt={item.fields.thumbnail.fields.title}
                width="100%"
                height="auto"
                onClick={() => navigate(`gallery/${item.sys.id}`)}
              />
            )}
          </Grid>
        ))}
      </Grid>
      <Typography
        fontStyle="bold"
        variant="h2"
        mt={6}
        mb={2}
        sx={{
          fontSize: "clamp(2rem, 6vw, 10rem)",
          fontFamily: "Bebas Neue",
        }}
        onClick={() => navigate(`gallery/${rootsPhotos[0].sys.id}`)}
      >
        {rootsName}
      </Typography>
      <Grid container spacing={2}>
        {rootsPhotos.map((item) => (
          <Grid
            key={item.fields.thumbnail.fields.title}
            item
            xs={12 / 3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LazyImage
              src={item.fields.thumbnail.fields.file.url}
              alt={item.fields.thumbnail.fields.title}
              width="100%"
              height="auto"
              onClick={() => navigate(`gallery/${item.sys.id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        fontStyle="bold"
        variant="h2"
        mt={6}
        mb={2}
        sx={{
          fontSize: "clamp(2rem, 6vw, 10rem)",
          fontFamily: "Bebas Neue",
        }}
        onClick={() => navigate(`gallery/${symbiosisPhotos[0].sys.id}`)}
      >
        {symbiosisName}
      </Typography>
      <Grid container spacing={2}>
        {symbiosisPhotos.map((item) => (
          <Grid
            key={item.fields.thumbnail.fields.title}
            item
            xs={12 / 4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LazyImage
              src={item.fields.thumbnail.fields.file.url}
              alt={item.fields.thumbnail.fields.title}
              width="100%"
              height="auto"
              onClick={() => navigate(`gallery/${item.sys.id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        fontStyle="bold"
        variant="h2"
        mt={6}
        mb={2}
        sx={{
          fontSize: "clamp(2rem, 6vw, 10rem)",
          fontFamily: "Bebas Neue",
        }}
        onClick={() => navigate(`gallery/${pandemicPhotos[0].sys.id}`)}
      >
        {pandemicName}
      </Typography>
      <Grid container spacing={2}>
        {pandemicPhotos.map((item) => (
          <Grid
            key={item.fields.thumbnail.fields.title}
            item
            xs={12 / 5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LazyImage
              src={item.fields.thumbnail.fields.file.url}
              alt={item.fields.thumbnail.fields.title}
              width="100%"
              height="auto"
              onClick={() => navigate(`gallery/${item.sys.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
