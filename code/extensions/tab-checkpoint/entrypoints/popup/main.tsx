import React from "react";
import ReactDOM from "react-dom/client";

import "./style.css";
import { PopUp } from "../../app/presentation/pop-up";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopUp />
  </React.StrictMode>,
);
