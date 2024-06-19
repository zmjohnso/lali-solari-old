import { Box, Typography, Grid } from "@mui/material";

export const Manifiesto: React.FC = () => {
  return (
    <Box width="100vw">
      <Typography
        align="center"
        id="manifiesto"
        variant="h2"
        mt={2}
        fontWeight="bold"
      >
        MANIFIESTO
      </Typography>
      <Box paddingLeft={{ xs: "1rem", md: "10rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} paddingRight={{ xs: "1rem", md: "6rem" }}>
            <Typography mb={3} variant="body1">
              En la vida, como en el arte, los detalles son los que nos
              enriquecen y nos hacen apreciar verdaderamente la belleza que nos
              rodea. Cada pequeña pincelada, cada sutileza en la textura, son
              como los momentos que conforman nuestra existencia capturando las
              emociones en ellas. Es en la atención a estos detalles en donde
              encontramos el verdadero significado y la profundidad de la vida.
            </Typography>
            <Typography mb={3} variant="body1">
              Al igual que una obra de arte en pequeño formato, la vida nos
              presenta momentos que pueden parecer insignificantes a simple
              vista. Pero al detenernos, al tomar el tiempo para observar con
              atención, descubrimos la riqueza que se esconde en cada acento.
            </Typography>
            <Typography mb={3} variant="body1">
              Al hacerlo, nos sumergimos en una experiencia inmersiva que nos
              permite redescubrir el mundo que nos rodea, encontrar belleza en
              lo inesperado y profundizar en nuestro entendimiento de nosotros
              mismos.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src="/assets/manifiesto1.jpg"
              width={1198}
              height={600}
              alt="Manifiesto 1"
              loading="lazy"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              src="/assets/manifiesto2.jpg"
              width={1198}
              height={600}
              alt="Manifiesto 2"
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
