import "@fontsource/arimo";
import "@fontsource/bebas-neue";
import "@fontsource/open-sans";
import { lazy, Suspense, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./fonts.css";
import { AboutLoader } from "./loaders/about-loader";
import { GalleryDisplayLoader } from "./loaders/gallery-display-loader";
import { HomeLoader } from "./loaders/home-loader";
import { ManifestoLoader } from "./loaders/manifesto-loader";
import { Error } from "./routes/error";
import Home from "./routes/home/home";
import { Layout } from "./routes/layout";
import Spinner from "./shared/spinner";
import { Locale } from "./shared/types";
import { useStore } from "./store/store";

const Manifesto = lazy(() => import("./routes/manifesto"));
const About = lazy(() => import("./routes/about"));
const GalleryDisplay = lazy(
  () => import("./routes/gallery-display/gallery-display"),
);
const ExclusiveDesigns = lazy(() => import("./routes/exclusive-designs"));
const Contact = lazy(() => import("./routes/contact"));

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
          element: (
            <Suspense fallback={<Spinner />}>
              <Manifesto />
            </Suspense>
          ),
          loader: () => ManifestoLoader(languageMode),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<Spinner />}>
              <About />
            </Suspense>
          ),
          loader: () => AboutLoader(languageMode),
        },
        {
          path: "gallery/:thumbnailId",
          element: (
            <Suspense fallback={<Spinner />}>
              <GalleryDisplay />
            </Suspense>
          ),
          loader: ({ params }) =>
            GalleryDisplayLoader(languageMode, params.thumbnailId),
        },
        {
          path: "exclusive-designs",
          element: (
            <Suspense fallback={<Spinner />}>
              <ExclusiveDesigns />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<Spinner />}>
              <Contact />
            </Suspense>
          ),
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

  return <RouterProvider router={router(languageMode)} />;
}

export default App;
