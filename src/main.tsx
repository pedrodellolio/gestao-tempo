import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Pomodoro from "./routes/Pomodoro";
import Home from "./routes/Home";
import Progresso from "./routes/Progresso";
import { PreferencesProvider } from "./context/PreferencesContext";
import Login from "./routes/Login";
import Register from "./routes/Register";
import PrivateRoot from "./routes/PrivateRoot";
import { AuthProvider } from "./context/AuthContext";
import AuthRoot from "./routes/AuthRoot";

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
        element: <Progresso />,
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
        <RouterProvider router={router} />
      </PreferencesProvider>
    </AuthProvider>
  </React.StrictMode>
);
