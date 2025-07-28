import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Enables client-side routing across the app */}
    <BrowserRouter>
      {/* Main application component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
