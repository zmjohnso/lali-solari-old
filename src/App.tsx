import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./routes/layout";
import { Home } from "./routes/home";
import { Manifesto } from "./routes/manifesto";
import { About } from "./routes/about";
import { GalleryDisplay } from "./routes/gallery-display";
import "@fontsource/bebas-neue";
import "@fontsource/open-sans";
import "@fontsource/arimo";
import { HomeLoader } from "./loaders/home-loader";
import { GalleryDisplayLoader } from "./loaders/gallery-display-loader";
import { useStore } from "./store/store";
import { useMemo } from "react";
import { Locale } from "./shared/types";
import "./fonts.css";
import { ManifestoLoader } from "./loaders/manifesto-loader";
import { AboutLoader } from "./loaders/about-loader";
import { ExclusiveDesigns } from "./routes/exclusive-designs";
import { Error } from "./routes/error";
import { Contact } from "./routes/contact";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "Bebas Neue", "Bison", "Arimo"].join(","),
  },
});

const router = (languageMode: Locale) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      loader: async () => {
        const loader = await HomeLoader(languageMode);
        return loader;
      },
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "manifiesto",
          element: <Manifesto />,
          loader: async () => {
            const loader = await ManifestoLoader(languageMode);
            return loader;
          },
        },
        {
          path: "about",
          element: <About />,
          loader: async () => {
            const loader = await AboutLoader(languageMode);
            return loader;
          },
        },
        {
          path: "gallery/:entryId",
          element: <GalleryDisplay />,
          loader: async ({ params }) => {
            const { entryId } = params;
            const loader = await GalleryDisplayLoader(languageMode, entryId);
            return loader;
          },
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
  const [languageMode, setLanguageMode] = useStore((state) => [
    state.languageMode,
    state.setLanguageMode,
  ]);

  const currentLanguage = navigator.language;
  useMemo(() => {
    // default to Spanish if user is not using English
    setLanguageMode(currentLanguage === "en" ? "en-US" : "es");
  }, [currentLanguage, setLanguageMode]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router(languageMode)} />;
    </ThemeProvider>
  );
}

export default App;
