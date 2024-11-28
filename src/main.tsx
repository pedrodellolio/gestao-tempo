import ReactDOM from "react-dom/client";
import "./index.css";
import AuthRoot from "./routes/auth/auth-root";
import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import PrivateRoot from "./routes/private-root";
import Progress from "./routes/progress";
import React from "react";
import { AuthProvider } from "./context/auth-context";
import { PreferencesProvider } from "./context/preferences-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import Home from "./routes/home";
import Pomodoro from "./routes/pomodoro";
import Settings from "./routes/settings";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pomodoro",
        element: <Pomodoro />,
      },
      {
        path: "progresso",
        element: <Progress />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthRoot />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <PreferencesProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="bottom-right" richColors /> {/* Add Toaster */}
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PreferencesProvider>
    </AuthProvider>
  </React.StrictMode>
);
