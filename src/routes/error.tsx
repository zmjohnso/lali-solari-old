import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate, useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Error: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const error = useRouteError();
  console.debug(error); // keep for dev purposes
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
          lang="en"
        >
          {t("error.title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", fontFamily: "Open Sans" }}
          gutterBottom
          lang="en"
        >
          {t("error.body")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleBackHomeClick}
          lang="en"
        >
          {t("error.backHome")}
        </Button>
      </Box>
    </Container>
  );
};
