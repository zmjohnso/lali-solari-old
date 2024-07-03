import { Box, Grid, Typography, ImageList, ImageListItem } from "@mui/material";
import { AboutLoaderValue } from "../loaders/about-loader";
import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const About: React.FC = () => {
  const aboutPage = useLoaderData() as AboutLoaderValue;

  return (
    <Box width="100vw" mt={2}>
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        sx={{
          fontSize: "clamp(1rem, 10vw, 3rem)",
          fontFamily: "Open Sans",
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
        }}
      >
        {aboutPage.fields.title}
      </Typography>
      <Grid container spacing={2} mt={7}>
        <Grid item xs={12} md={6}>
          <ImageList
            sx={{ width: { xs: "100vw", md: "50vw" }, height: 400 }}
            variant="woven"
            cols={3}
            rowHeight={150}
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
        <Grid item xs={12} md={6}>
          <Box marginRight="1rem" marginLeft="1rem">
            <Typography
              mb={3}
              component="div"
              variant="body1"
              sx={{
                fontFamily: "Arimo",
              }}
            >
              <ReactMarkdown>{aboutPage.fields.description}</ReactMarkdown>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
