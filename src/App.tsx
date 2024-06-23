import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./routes/layout";
import { Home } from "./routes/home";
import { Manifiesto } from "./routes/manifiest";
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

const router = (languageMode: Locale) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: async () => {
        const loader = await HomeLoader();
        return loader;
      },
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "manifiesto",
          element: <Manifiesto />,
        },
        {
          path: "about",
          element: <About />,
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

  return <RouterProvider router={router(languageMode)} />;
}

export default App;
