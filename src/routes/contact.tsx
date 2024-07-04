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
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IFormInput {
  fullName: string;
  email: string;
  message: string;
}

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const emailAddress = "hola@lalisolari.com";
  const requiredErrorMessage = t("contact.required");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // call Formspree
  };

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
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  label={t("contact.fullName")}
                  {...register("fullName", { required: true })}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName ? requiredErrorMessage : ""}
                  style={{ height: "5rem" }}
                />
                <TextField
                  variant="outlined"
                  label={t("contact.email")}
                  {...register("email", { required: true })}
                  error={Boolean(errors.email)}
                  helperText={errors.email ? requiredErrorMessage : ""}
                  style={{ height: "5rem" }}
                />
                <TextField
                  variant="outlined"
                  label={t("contact.yourMessage")}
                  multiline
                  {...register("message", { required: true })}
                  error={Boolean(errors.message)}
                  helperText={errors.message ? requiredErrorMessage : ""}
                />
              </Box>
            </form>
          </CardContent>
          <CardActions>
            <Button type="submit" size="small">
              {t("contact.submit")}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};
