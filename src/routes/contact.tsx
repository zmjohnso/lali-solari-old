import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export const Contact: React.FC = () => {
  const phoneNumber = "+34692868666";
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
          variant="h4"
          fontWeight="bold"
          sx={{
            fontFamily: "Open Sans",
            mb: 2,
            fontSize: "clamp(2rem, 5vw, 4rem)",
          }}
          lang="en"
        >
          Contact
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <PhoneIcon sx={{ mr: 1, fontSize: 40, color: "#3bff00" }} />
          <Typography
            variant="body1"
            sx={{
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              fontFamily: "Arimo",
            }}
          >
            <Link href={`tel:${phoneNumber}`} color="inherit">
              {phoneNumber}
            </Link>
          </Typography>
        </Box>
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
