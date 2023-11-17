import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

// PAGES IMPORTS

import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";

// REACT ROUTER IMPORTS
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="home" element={<HomePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);
