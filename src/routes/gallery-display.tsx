import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  abstractReverberationsPaintings,
  pandemiaPaintings,
  raicesPaintings,
  simbiosisPaintings,
} from "../shared/photos";
import { Collection } from "../shared/types";

interface RouteParams extends Record<string, string | undefined> {
    collection?: Collection;
    id?: string;
  }

export const GalleryDisplay: React.FC = () => {
  const { collection, id } = useParams<RouteParams>();
  const photoArray =
    collection === "abstract-reverberations"
      ? abstractReverberationsPaintings
      : collection === "raices"
        ? raicesPaintings
        : collection === "simbiosis"
          ? simbiosisPaintings
          : pandemiaPaintings;
  const displayPhoto = photoArray.find((x) => x.id.toString() === id);

  return (
    <Box paddingX="10rem" paddingTop="5rem">
      <Typography variant="h3">ABSTRACT REBERVERATIONS</Typography>
      <Typography variant="body1" sx={{ maxWidth: "400px" }}>
        Esta serie creada en Buenos Aires, nace a raíz de la música y mi
        interpretación en papel. Me permite explorar y expresar de manera
        genuina mis emociones más profundas al reconectarme con mi cuna,
        actuando como un catalizador para mi creatividad. Así, cada pintura se
        transforma en una representación tangible de mis sentimientos al vivir y
        crear rodeada del entorno inspirador en el que me crié.
      </Typography>
      <img src={displayPhoto?.file} loading="lazy" width="60%" />
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontStyle: "italic",
          fontFamily: "Bison",
          "&:hover": {
            color: "#3bff00",
            cursor: "pointer",
          },
        }}
        mt={2}
      >
        GALLERY
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontFamily: "Bebas Neue",
          "&:hover": {
            color: "#3bff00",
            cursor: "pointer",
          },
        }}
        mt={2}
      >
        CONTACT
      </Typography>
    </Box>
  );
};
