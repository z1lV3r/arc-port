import React from "react";
import ReactDOM from "react-dom/client";

import { Page } from "../../app/presentation/page";
import "./style.css";

document.title = t("extension_full_name");
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
);
