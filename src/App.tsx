import { RouterProvider } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { router } from "./routes";
import { Toaster } from "sonner";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza.shop" />
      <Toaster richColors closeButton />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
