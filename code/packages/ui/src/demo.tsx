import * as React from "react";

export default function Demo(): React.JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
        background: "linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)",
        borderRadius: "12px",
        color: "#cdd6f4",
        gap: "8px",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>
        arc-port
      </h1>
      <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.7 }}>
        Browser extension ready
      </p>
    </div>
  );
}
