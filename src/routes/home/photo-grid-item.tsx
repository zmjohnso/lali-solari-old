import { Grid, Skeleton } from "@mui/material";
import { Entry } from "contentful";
import { useNavigate } from "react-router-dom";
import { usePhotoLoader } from "../../hooks/usePhotoLoader";
import { MinimumHomePage } from "../../shared/types";

interface PhotoGridItemProps {
  photo: Entry<MinimumHomePage>;
  columns: number;
}

export const PhotoGridItem: React.FC<PhotoGridItemProps> = (props) => {
  const navigate = useNavigate();
  const { imageLoaded } = usePhotoLoader(props.photo.fields.thumbnail);

  const photoUrl = props.photo.fields.thumbnail.fields.file.url;
  const photoTitle = props.photo.fields.thumbnail.fields.title;

  return (
    <Grid
      key={photoTitle}
      item
      xs={12 / props.columns}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {imageLoaded ? (
        <img
          height="auto"
          width="100%"
          src={photoUrl}
          alt={photoTitle}
          loading="lazy"
          onClick={() =>
            navigate(`gallery/${props.photo.fields.thumbnail.sys.id}`)
          }
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          style={{
            display: imageLoaded ? "block" : "none",
            cursor: "pointer",
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            transition: "transform 0.3s",
            flexShrink: 0,
          }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="auto"
          sx={{ paddingTop: "75%" }}
        />
      )}
    </Grid>
  );
};
