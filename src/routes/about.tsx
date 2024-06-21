import { Box, Grid, Typography, ImageList, ImageListItem } from "@mui/material";

const aboutBioPictures = [
  {
    id: 1,
    file: "/public/assets/about/1.webp",
  },
  {
    id: 2,
    file: "/public/assets/about/2.webp",
  },
  {
    id: 3,
    file: "/public/assets/about/3.webp",
  },
];

export const About: React.FC = () => {
  return (
    <Box width="100vw" mt={4}>
      <Typography variant="h2" align="center">
        About
      </Typography>
      <Grid container spacing={2} mt={7}>
        <Grid item xs={12} md={6}>
          <ImageList
            sx={{ width: { xs: "100vw", md: "50vw" }, height: 400 }}
            variant="woven"
            cols={3}
            rowHeight={150}
          >
            {aboutBioPictures.map((item) => (
              <ImageListItem key={item.id}>
                <img src={item.file} alt={`${item.id}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box marginRight="1rem" marginLeft="1rem">
            <Typography mb={3} variant="body1">
              Lali Solari es una artista plástica, fotógrafa y productora de
              moda nacida en Buenos Aires, Argentina, en 1989.
            </Typography>
            <Typography mb={3} variant="body1">
              Originaria de una familia de distinguidos artistas, entre los
              cuales destacan el primer escultor argentino Francisco Cafferata y
              la artista plástica Maggie Atienza Larsson, su fascinación por el
              arte se despertó desde temprana edad. Inspirada por las obras y
              voces de sus antepasados, ha cultivado un camino creativo propio,
              encontrando en sus raíces su fuente de motivación.
            </Typography>
            <Typography mb={3} variant="body1">
              Actualmente reside en la ciudad de Barcelona. Fue allí donde dio
              un giro en su carrera al estudiar creatividad publicitaria,
              fusionando su amor por el arte visual con la estrategia y
              comunicación. Ámbito que la llevó a ser reconocida en la escena
              internacional, siendo seleccionada en la shortlist del prestigioso
              Festival de Cannes y siendo finalista en dos categorías en el
              reconocido festival publicitario El Ojo de Iberoamérica.
            </Typography>
            <Typography variant="body1">
              Su obra se basa en técnicas mixtas sobre papel y lienzo, creando
              textura con acrílicos y eléctricos acentos metalizados con
              acuarelas. Realizadas en pequeño formato para expandirlas luego en
              maxi reproducciones brindando al espectador una experiencia
              inmersiva que invita a redescubrir su obra, haciendo suyo cada
              detalle.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
