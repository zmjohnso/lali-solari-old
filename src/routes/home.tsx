import {
  Box,
  Typography,
  Grid,
  Slide,
  Skeleton,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TranslateIcon from "@mui/icons-material/Translate";
import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { HomeLoaderValue } from "../loaders/home-loader";
import { handleInstagramClick } from "../shared/utilities";
import { useStore } from "../store/store";

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
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="auto"
          sx={{ paddingTop: "75%" }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        style={{
          display: imageLoaded ? "block" : "none",
          cursor: "pointer",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          transition: "transform 0.3s",
          flexShrink: 0,
        }}
        onLoad={() => setImageLoaded(true)}
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

  const [languageMode, setLanguageMode] = useStore((state) => [
    state.languageMode,
    state.setLanguageMode,
  ]);
  const [translateAnchorEl, setTranslateMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const translateOpen = Boolean(translateAnchorEl);

  const handleTranslateMenuClose = () => {
    setTranslateMenuAnchorEl(null);
  };
  const handleTranslateMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setTranslateMenuAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // Update the lang attribute on the <html> element whenever the currentLanguage changes
    const rootHTMLlang = languageMode === "en-US" ? "en" : "es";
    document.documentElement.lang = rootHTMLlang;
  }, [languageMode]);

  const handleLanguageMode = (currentLanguage: string) => {
    const newLanguageMode = currentLanguage === "English" ? "en-US" : "es";
    setLanguageMode(newLanguageMode);
  };

  const languageOptions = ["English", "castellano"];

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

  const handleEtsyClick = () => {
    window.open(
      "https://www.etsy.com/es/shop/Lalisolariart",
      "_blank",
      "noopener noreferrer"
    );
  };

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
      paddingLeft={{ xs: "1rem", md: "2rem" }}
      paddingRight={{ xs: "1rem", md: "2rem" }}
      mt={2}
      mb={4}
    >
      <Container maxWidth="xl" sx={{ paddingY: "0.5rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          width="100%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box>{/* empty box for spacing */}</Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              paddingLeft="5rem"
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
                sx={{
                  fontSize: "clamp(2rem, 6vw, 10rem)",
                  fontFamily: "Bison",
                }}
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
                lang="en"
              >
                FINE ARTS & EXCLUSIVE DESIGNS
              </Typography>
            </Box>
            <Box>
              <IconButton
                aria-label="translate button"
                onClick={handleTranslateMenuClick}
              >
                <TranslateIcon />
              </IconButton>
              <Menu
                id="translate-menu"
                anchorEl={translateAnchorEl}
                open={translateOpen}
                onClose={handleTranslateMenuClose}
              >
                {languageOptions.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={() => {
                      handleLanguageMode(item);
                      handleTranslateMenuClose();
                    }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton onClick={handleInstagramClick}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
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
            onClick={() => navigate("/manifesto")}
            lang="en"
          >
            MANIFESTO
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
            lang="en"
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
            onClick={handleEtsyClick}
            lang="en"
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
            lang="en"
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
            lang="en"
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
