import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslation } from "react-i18next";
import { useForm, ValidationError } from "@formspree/react";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm(
    import.meta.env.VITE_FORMSPREE_CONTACT_FORM
  );

  const emailAddress = "hola@lalisolari.com";
  const requiredErrorMessage = t("contact.required");

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        mb={4}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          sx={{
            fontSize: "clamp(1rem, 10vw, 3rem)",
            fontFamily: "Open Sans",
          }}
          gutterBottom
          mb={5}
        >
          {t("contact.title")}
        </Typography>
        <Box display="flex" alignItems="center" mb={6}>
          <EmailIcon sx={{ mr: 1, fontSize: 40, color: "#3bff00" }} />
          <Typography
            variant="body1"
            sx={{
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              fontFamily: "Arimo",
            }}
          >
            <Link href={`mailto:${emailAddress}`} color="inherit">
              {emailAddress}
            </Link>
          </Typography>
        </Box>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                style={{ height: "100%" }}
              >
                <Typography color="text.secondary" gutterBottom>
                  {t("contact.message")}
                </Typography>
                <TextField
                  variant="outlined"
                  name="fullName"
                  label={t("contact.fullName")}
                  error={Boolean(state.errors)}
                  helperText={state.errors ? requiredErrorMessage : ""}
                  style={{ height: "5rem" }}
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
                <TextField
                  variant="outlined"
                  name="email"
                  label={t("contact.email")}
                  error={Boolean(state.errors)}
                  helperText={state.errors ? requiredErrorMessage : ""}
                  style={{ height: "5rem" }}
                />
                <TextField
                  variant="outlined"
                  name="message"
                  label={t("contact.yourMessage")}
                  multiline
                  error={Boolean(state.errors)}
                  helperText={state.errors ? requiredErrorMessage : ""}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button type="submit" size="small" disabled={state.submitting}>
                {t("contact.submit")}
              </Button>
            </CardActions>
          </form>
          {state.succeeded && (
            <CardContent>
              <Typography>{t("contact.messageSent")}</Typography>
            </CardContent>
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default Contact;
