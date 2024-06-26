import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

export const Error: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHomeClick = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
        <Typography
          variant="h4"
          sx={{ fontFamily: "Bison", fontSize: "clamp(2rem, 5vw, 4rem)" }}
          gutterBottom
        >
          Oops! Something went wrong.
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", fontFamily: "Open Sans" }}
          gutterBottom
        >
          We couldn't find the page you were looking for. It might have been
          removed, or you may have mistyped the address.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleBackHomeClick}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};
