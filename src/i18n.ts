import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          contact: {
            title: "Hi, let's talk!",
            fullName: "Full Name",
            email: "Email",
            message: "Message",
            yourMessage: "Your message",
            submit: "Submit",
            required: "Field is required.",
            emailSent: "Email sent successfully!",
          },
          error: {
            title: "Oops! Something went wrong.",
            body: "We couldn't find the page you were looking for. It might have been removed, or you may have mistyped the address.",
            backHome: "Back to Home",
          },
        },
      },
      es: {
        translation: {
          contact: {
            title: "¡Hola, hablemos!",
            fullName: "Nombre completo",
            email: "Correo electrónico",
            message: "Mensaje",
            yourMessage: "Tu mensaje",
            submit: "Enviar",
            required: "Campo requerido.",
            emailSent: "¡Correo electrónico enviado exitosamente!",
          },
          error: {
            title: "¡Vaya! Algo salió mal.",
            body: "No pudimos encontrar la página que estabas buscando. Puede que haya sido eliminada, o tal vez escribiste mal la dirección.",
            backHome: "Volver a Inicio",
          },
        },
      },
    },
  });

export default i18n;
