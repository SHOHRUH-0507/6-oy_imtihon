import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-left" />
  </React.StrictMode>
);