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
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { handleInstagramClick, handleLanguageMode } from "../shared/utilities";
import { useTranslation } from "react-i18next";

export const Layout: React.FC = () => {
  const { i18n } = useTranslation();
  useParams();
  const navigate = useNavigate();
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
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setTranslateMenuAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // Update the lang attribute on the <html> element whenever the currentLanguage changes
    const rootHTMLlang = languageMode === "en-US" ? "en" : "es";
    document.documentElement.lang = rootHTMLlang;
  }, [languageMode]);

  const languageOptions = ["English", "castellano"];

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
                  fontSize: "clamp(1rem, 6vw, 4rem)",
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
                      handleLanguageMode(lang, i18n, setLanguageMode);
                      handleTranslateMenuClose();
                    }}
                  >
                    {lang}
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
