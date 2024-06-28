import { Box, Typography } from "@mui/material";

export const ExclusiveDesigns: React.FC = () => {
  return (
    <Box width="100vw" mt={2}>
      <Typography
        variant="h2"
        align="center"
        fontWeight="bold"
        sx={{
          fontSize: "clamp(1rem, 10vw, 3rem)",
          fontFamily: "Open Sans",
        }}
      >
        EXCLUSIVE DESIGNS
      </Typography>
      <Typography
        variant="h5"
        align="center"
        mt={15}
        sx={{ fontSize: "clamp(1rem, 10vw, 3rem)", fontFamily: "Arimo" }}
      >
        Coming Soon
      </Typography>
    </Box>
  );
};
