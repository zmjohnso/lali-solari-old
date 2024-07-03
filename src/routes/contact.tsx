import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export const Contact: React.FC = () => {
  const emailAddress = "hola@lalisolari.com";

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        mb={4}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          sx={{
            fontSize: "clamp(1rem, 10vw, 3rem)",
            fontFamily: "Open Sans",
          }}
          gutterBottom
        >
          Hi, let's talk!
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <EmailIcon sx={{ mr: 1, fontSize: 40, color: "#3bff00" }} />
          <Typography
            variant="body1"
            sx={{
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              fontFamily: "Arimo",
            }}
          >
            <Link href={`mailto:${emailAddress}`} color="inherit">
              {emailAddress}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
