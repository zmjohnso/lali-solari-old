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

const router = createBrowserRouter([
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
          const loader = await GalleryDisplayLoader(entryId);
          return loader;
        }
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
