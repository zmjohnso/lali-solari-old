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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { useTranslation } from "react-i18next";

export const Layout: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [languageMode, setLanguageMode] = useStore((state) => [
    state.languageMode,
    state.setLanguageMode,
  ]);
  const [translateAnchorEl, setTranslateMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const translateOpen = Boolean(translateAnchorEl);

  const handleTranslateMenuClose = () => {
    setTranslateMenuAnchorEl(null);
  };
  const handleTranslateMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setTranslateMenuAnchorEl(event.currentTarget);
  };

  const handleInstagramClick = () => {
    window.open(
      "https://www.instagram.com/lalisolariart/",
      "_blank",
      "noopener noreferrer",
    );
  };

  const handleLanguageMode = (currentLanguage: string) => {
    const newLanguageMode = currentLanguage === "English" ? "en-US" : "es";
    const i18nLanguageFormat = currentLanguage === "English" ? "en" : "es";
    i18n.changeLanguage(i18nLanguageFormat);
    setLanguageMode(newLanguageMode);
  };

  useEffect(() => {
    // Update the lang attribute on the <html> element whenever the currentLanguage changes
    const rootHTMLlang = languageMode === "en-US" ? "en" : "es";
    document.documentElement.lang = rootHTMLlang;
  }, [languageMode]);

  const languageOptions = ["English", "castellano"];

  const isHomePage = location.pathname === "/";

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
        <Container maxWidth="xl" sx={{ paddingY: "0.5rem" }}>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {isHomePage && <Box>{/* empty box for spacing */}</Box>}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              paddingLeft={isHomePage ? "5rem" : "0"}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/")}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                color="black"
                sx={{
                  fontSize: isHomePage
                    ? "clamp(2rem, 6vw, 10rem)"
                    : "clamp(1rem, 6vw, 4rem)",
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
                lang="en"
              >
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
                {languageOptions.map((lang) => (
                  <MenuItem
                    key={lang}
                    onClick={() => {
                      handleLanguageMode(lang);
                      handleTranslateMenuClose();
                    }}
                  >
                    {lang}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                aria-label="instagram link button"
                onClick={handleInstagramClick}
              >
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
