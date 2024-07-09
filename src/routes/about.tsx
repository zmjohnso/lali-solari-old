import { Box, Grid, Typography, ImageList, ImageListItem } from "@mui/material";
import { AboutLoaderValue } from "../loaders/about-loader";
import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const About: React.FC = () => {
  const aboutPage = useLoaderData() as AboutLoaderValue;

  return (
    <Box
      paddingX={{ xs: "1rem", md: "10rem" }}
      paddingTop={{ xs: "0.5rem", md: "5rem" }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={4}
        sx={{
          fontSize: "clamp(1rem, 10vw, 3rem)",
          fontFamily: "Open Sans",
          textTransform: "uppercase",
        }}
      >
        {aboutPage.fields.title}
      </Typography>

      <Typography
        variant="body1"
        component="div"
        width={{ xs: "22rem", md: "30rem" }}
        mb={3}
        paddingLeft={{ xs: "0", md: "14rem" }}
        sx={{
          fontFamily: "Arimo",
        }}
      >
        <ReactMarkdown>{aboutPage.fields.description}</ReactMarkdown>
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <ImageList
            sx={{ width: "auto", height: "auto" }}
            cols={3}
            variant="woven"
            rowHeight={500}
          >
            {aboutPage.fields.media.map((item) => (
              <ImageListItem key={item.fields.title}>
                <img
                  src={item.fields.file.url}
                  alt={item.fields.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
  );
};
