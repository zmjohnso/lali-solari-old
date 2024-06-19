import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./routes/layout";
import { Home } from "./routes/home";
import { Manifiesto } from "./routes/manifiest";
import { About } from "./routes/about";
import "@fontsource/bebas-neue";
import "@fontsource/open-sans";
import { GalleryDisplay } from "./routes/gallery-display";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
        path: "gallery/:collection/:id",
        element: <GalleryDisplay />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
