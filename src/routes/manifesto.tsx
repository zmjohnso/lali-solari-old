import { Box, Typography, Grid } from "@mui/material";
import { ManifestoLoaderValue } from "../loaders/manifesto-loader";
import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const Manifesto: React.FC = () => {
  const manifestoPage = useLoaderData() as ManifestoLoaderValue;

  return (
    <Box width="100vw">
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        sx={{
          fontSize: "clamp(1rem, 10vw, 3rem)",
          fontFamily: "Open Sans",
        }}
        mt={2}
      >
        {manifestoPage.fields.title}
      </Typography>
      <Box paddingLeft={{ xs: "1rem", md: "10rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} paddingRight={{ xs: "1rem", md: "6rem" }}>
            <Typography
              mb={3}
              component="div"
              variant="body1"
              sx={{
                fontFamily: "Arimo",
              }}
            >
              <ReactMarkdown>{manifestoPage.fields.description}</ReactMarkdown>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
