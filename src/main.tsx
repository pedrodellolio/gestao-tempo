import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import Pomodoro from "./routes/Pomodoro";
import Home from "./routes/Home";
import Progresso from "./routes/Progresso";
import { PreferencesProvider } from "./context/PreferencesContext";
import Login from "./routes/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PreferencesProvider>
      <RouterProvider router={router} />
    </PreferencesProvider>
  </React.StrictMode>
);
