import { Box, Typography } from "@mui/material";
import { ManifestoLoaderValue } from "../loaders/manifesto-loader";
import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const Manifesto: React.FC = () => {
  const manifestoPage = useLoaderData() as ManifestoLoaderValue;

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
        {manifestoPage.fields.title}
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
        <ReactMarkdown>{manifestoPage.fields.description}</ReactMarkdown>
      </Typography>
    </Box>
  );
};
