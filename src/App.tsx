import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./routes/layout";
import { Home } from "./routes/home/home";
import { Manifesto } from "./routes/manifesto";
import { About } from "./routes/about";
import { GalleryDisplay } from "./routes/gallery-display/gallery-display";
import "@fontsource/bebas-neue";
import "@fontsource/open-sans";
import "@fontsource/arimo";
import "./fonts.css";
import { HomeLoader } from "./loaders/home-loader";
import { GalleryDisplayLoader } from "./loaders/gallery-display-loader";
import { useStore } from "./store/store";
import { useMemo } from "react";
import { Locale } from "./shared/types";
import { ManifestoLoader } from "./loaders/manifesto-loader";
import { AboutLoader } from "./loaders/about-loader";
import { ExclusiveDesigns } from "./routes/exclusive-designs";
import { Error } from "./routes/error";
import { Contact } from "./routes/contact";
import { ThemeProvider, createTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "Bebas Neue", "Bison", "Arimo"].join(","),
    h2: {
      fontFamily: "Bison", // Ensure Bison is used for h2 elements
    },
    h4: {
      fontFamily: "Bison", // Ensure Bison is used for h4 elements
    },
  },
});

const router = (languageMode: Locale) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: () => HomeLoader(languageMode),
        },
        {
          path: "manifesto",
          element: <Manifesto />,
          loader: () => ManifestoLoader(languageMode),
        },
        {
          path: "about",
          element: <About />,
          loader: () => AboutLoader(languageMode),
        },
        {
          path: "gallery/:thumbnailId",
          element: <GalleryDisplay />,
          loader: ({ params }) =>
            GalleryDisplayLoader(languageMode, params.thumbnailId),
        },
        {
          path: "exclusive-designs",
          element: <ExclusiveDesigns />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ]);

function App() {
  const { i18n } = useTranslation();
  const [languageMode, setLanguageMode] = useStore((state) => [
    state.languageMode,
    state.setLanguageMode,
  ]);

  const currentLanguage = navigator.language;

  useMemo(() => {
    // default to Spanish if user is not using English
    const i18nLanguageFormat = currentLanguage === "en" ? "en" : "es";
    i18n.changeLanguage(i18nLanguageFormat);
    setLanguageMode(currentLanguage === "en" ? "en-US" : "es");
  }, [currentLanguage, i18n, setLanguageMode]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router(languageMode)} />
    </ThemeProvider>
  );
}

export default App;
