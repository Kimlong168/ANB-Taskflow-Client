import { RouterProvider } from "react-router-dom";
import router from "./router";
import { NuqsAdapter } from "nuqs/adapters/react";
import { AuthProvider } from "./contexts/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

export default function App() {
  return (
    <NuqsAdapter>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider autoHideDuration={3000}>
            <AuthProvider>
              <RouterProvider router={router} />
              <ToastContainer limit={3} />
              <Toaster />
            </AuthProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
}
