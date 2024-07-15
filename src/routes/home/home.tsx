import { Box, Typography, Grid, Slide } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { HomeLoaderValue } from "../../loaders/home-loader";
import { extractTitle } from "../../shared/utilities";
import { useTranslation } from "react-i18next";
import { PhotoGridItem } from "./photo-grid-item";

export const Home: React.FC = () => {
  const { t } = useTranslation();
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

  const arPhotos = homePage.filter(
    (x) => extractTitle(x.fields.title) === t("home.abstractReverberations")
  );
  const symbiosisPhotos = homePage.filter(
    (x) => extractTitle(x.fields.title) === t("home.symbiosis")
  );
  const pandemicPhotos = homePage.filter(
    (x) => extractTitle(x.fields.title) === t("home.pandemic")
  );
  const rootsPhotos = homePage.filter(
    (x) => extractTitle(x.fields.title) === t("home.roots")
  );

  const abstractReverberationsName =
    arPhotos[0] && extractTitle(arPhotos[0].fields.title);
  const symbiosisName =
    symbiosisPhotos[0] && extractTitle(symbiosisPhotos[0].fields.title);
  const pandemicName =
    pandemicPhotos[0] && extractTitle(pandemicPhotos[0].fields.title);
  const rootsName = rootsPhotos[0] && extractTitle(rootsPhotos[0].fields.title);

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
      mb={4}
    >
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
              textTransform: "uppercase",
              "&:hover": {
                color: "#3bff00",
                cursor: "pointer",
              },
            }}
            ml={{ xs: 10, md: 30 }}
            onClick={() => navigate("/manifesto")}
            lang="en"
          >
            {t("home.manifesto")}
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
        onClick={() =>
          navigate(`gallery/${arPhotos[0].fields.thumbnail.sys.id}`)
        }
      >
        {abstractReverberationsName}
      </Typography>
      <Grid container spacing={2}>
        {arPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.fields.thumbnail.fields.title}
            photo={photo}
            columns={5}
          />
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
        onClick={() =>
          navigate(`gallery/${rootsPhotos[0].fields.thumbnail.sys.id}`)
        }
      >
        {rootsName}
      </Typography>
      <Grid container spacing={2}>
        {rootsPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.fields.thumbnail.fields.title}
            photo={photo}
            columns={3}
          />
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
        onClick={() =>
          navigate(`gallery/${symbiosisPhotos[0].fields.thumbnail.sys.id}`)
        }
      >
        {symbiosisName}
      </Typography>
      <Grid container spacing={2}>
        {symbiosisPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.fields.thumbnail.fields.title}
            photo={photo}
            columns={4}
          />
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
        onClick={() =>
          navigate(`gallery/${pandemicPhotos[0].fields.thumbnail.sys.id}`)
        }
      >
        {pandemicName}
      </Typography>
      <Grid container spacing={2}>
        {pandemicPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.fields.thumbnail.fields.title}
            photo={photo}
            columns={5}
          />
        ))}
      </Grid>
    </Box>
  );
};
