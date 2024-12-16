import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/wrappers/App";

// Add Bootstrap
import "bootstrap/dist/css/bootstrap.css";

// Add our style
import "./assets/style/index.css";

// Get the root element
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
