import { RouterProvider } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { router } from "./routes";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza.shop" />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
