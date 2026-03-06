import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PopUp from "./app/presentation/pop-up";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PopUp />
  </StrictMode>,
);
