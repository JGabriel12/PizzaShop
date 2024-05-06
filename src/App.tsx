import { RouterProvider } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { router } from "./routes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizza-shop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Pizza.shop" />
        <Toaster richColors closeButton />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
