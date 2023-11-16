import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage.jsx";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <LoginPage />
    </PrimeReactProvider>
  </React.StrictMode>
);
