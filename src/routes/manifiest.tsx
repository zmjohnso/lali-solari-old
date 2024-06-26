import { Box, Typography, Grid } from "@mui/material";
import { ManifiestoLoaderValue } from "../loaders/manifiesto-loader";
import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const Manifiesto: React.FC = () => {
  const manifiestoPage = useLoaderData() as ManifiestoLoaderValue;

  return (
    <Box width="100vw">
      <Typography
        align="center"
        variant="h2"
        mt={2}
        fontWeight="bold"
        sx={{
          fontSize: "clamp(1rem, 10vw, 3rem)",
          fontFamily: "Open Sans",
        }}
      >
        {manifiestoPage.fields.title}
      </Typography>
      <Box paddingLeft={{ xs: "1rem", md: "10rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} paddingRight={{ xs: "1rem", md: "6rem" }}>
            <Typography
              mb={3}
              variant="body1"
              sx={{
                fontFamily: "Arimo",
              }}
            >
              <ReactMarkdown>{manifiestoPage.fields.description}</ReactMarkdown>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src="/assets/manifiesto1.jpg"
              width={1198}
              height={600}
              alt="Manifiesto 1"
              loading="lazy"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              src="/assets/manifiesto2.jpg"
              width={1198}
              height={600}
              alt="Manifiesto 2"
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
