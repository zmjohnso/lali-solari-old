import { Box, Typography } from "@mui/material";

const ExclusiveDesigns: React.FC = () => {
  return (
    <Box width="100vw">
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        sx={{
          fontSize: "clamp(1rem, 10vw, 3rem)",
          fontFamily: "Open Sans",
        }}
        mt={2}
        lang="en"
      >
        EXCLUSIVE DESIGNS
      </Typography>
      <Typography
        variant="h5"
        align="center"
        mt={15}
        sx={{ fontSize: "clamp(1rem, 10vw, 3rem)", fontFamily: "Arimo" }}
        lang="en"
      >
        Coming Soon
      </Typography>
    </Box>
  );
};

export default ExclusiveDesigns;
