import React from "react";
import ReactDOM from "react-dom/client";

import { PopUp } from "../../app/presentation/pop-up";
import "./style.css";

document.title = t("extension_full_name");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopUp />
  </React.StrictMode>,
);
