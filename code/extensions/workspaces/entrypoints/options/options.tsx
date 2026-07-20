import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Settings } from "../../app/presentation/settings";
import "./style.css";

document.title = t("extension_settings");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Settings />
  </StrictMode>,
);
