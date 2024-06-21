import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TranslateIcon from "@mui/icons-material/Translate";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../store/store";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [setLanguageMode] = useStore((state) => [state.setLanguageMode]);
  const [translateAnchorEl, setTranslateMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const translateOpen = Boolean(translateAnchorEl);

  const handleTranslateMenuClose = () => {
    setTranslateMenuAnchorEl(null);
  };
  const handleTranslateMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setTranslateMenuAnchorEl(event.currentTarget);
  };

  const handleLanguageMode = (currentLanguage: string) => {
    const newLanguageMode = currentLanguage === "English" ? "en-US" : "es";
    setLanguageMode(newLanguageMode);
  };

  const languageOptions = ["English", "castellano"];

  const handleInstagramClick = () => {
    window.open(
      "https://www.instagram.com/lalisolariart/",
      "_blank",
      "noopener noreferrer"
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Container
          maxWidth="xl"
          sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
        >
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                color="black"
                onClick={() => navigate("/")}
                sx={{
                  fontSize: "clamp(1rem, 6vw, 10rem)",
                  fontFamily: "Bison",
                }}
              >
                LALI SOLARI
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color="black"
                sx={{
                  fontSize: "clamp(0.5rem, 1.25vw, 6rem)",
                  fontFamily: "Open Sans",
                }}
              >
                FINE ARTS & EXCLUSIVE DESIGNS
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{
                display: { xs: "none", md: "flex" },
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/")}
            >
              <Typography variant="h4" fontWeight="bold" color="black">
                LALI SOLARI
              </Typography>
              <Typography variant="body1" gutterBottom color="black">
                FINE ARTS & EXCLUSIVE DESIGNS
              </Typography>
            </Box>
            <Box>
              <IconButton
                aria-label="translate button"
                onClick={handleTranslateMenuClick}
              >
                <TranslateIcon />
              </IconButton>
              <Menu
                id="translate-menu"
                anchorEl={translateAnchorEl}
                open={translateOpen}
                onClose={handleTranslateMenuClose}
              >
                {languageOptions.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={() => {
                      handleLanguageMode(item);
                      handleTranslateMenuClose();
                    }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton onClick={handleInstagramClick}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
};
