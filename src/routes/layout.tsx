import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const handleInstagramClick = () => {
    window.open(
      "https://www.instagram.com/solarilali/",
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
        // sx={{ background: "white"}}
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
              >
                LALI SOLARI
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color="black"
                sx={{
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
            <IconButton onClick={handleInstagramClick}>
              <InstagramIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
};
