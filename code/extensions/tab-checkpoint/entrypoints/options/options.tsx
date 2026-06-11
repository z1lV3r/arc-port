import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./style.css";
import { Settings } from "../../app/presentation/settings";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Settings />
  </StrictMode>,
);
