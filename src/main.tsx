import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./ebike.css";
import App from "./App.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root application container");

const initialLanguage = root.dataset.initialLanguage === "EN" ? "EN" : "VI";
const app = (
  <StrictMode>
    <BrowserRouter>
      <App initialLanguage={root.dataset.prerendered === "true" ? initialLanguage : undefined} />
    </BrowserRouter>
  </StrictMode>
);

if (root.dataset.prerendered === "true") {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
