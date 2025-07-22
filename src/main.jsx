import React from "react";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
  position="bottom-right"
  reverseOrder={true}
/>
  </React.StrictMode>
);