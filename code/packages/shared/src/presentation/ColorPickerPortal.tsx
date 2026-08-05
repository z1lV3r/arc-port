import { Circle } from "@uiw/react-color";
import type { ColorResult } from "@uiw/react-color";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const COLORS : Record<string,string> = {
  "#bdc1c6": "grey",
  "#1a73e8": "blue",
  "#d93025": "red",
  "#f29900": "yellow",
  "#1e8e3e": "green",
  "#d81b60": "pink",
  "#9334e6": "purple",
  "#12b5cb": "cyan",
  "#e8710a": "orange"
}

export interface ColorPickerPortalProps {
  open: boolean;
  pickerRef: React.RefObject<HTMLDivElement | null>;
  color: string;
  onColorChange: (hex: string) => void;
}

export function ColorPickerPortal({
  open,
  pickerRef,
  color,
  onColorChange,
}: ColorPickerPortalProps) {
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (open) {
      setHasBeenOpened(true);
    }
  }, [open]);

  if (!hasBeenOpened) return null;

  return createPortal(
    <div
      ref={pickerRef}
      style={{
        position: "fixed",
        top: "13%",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: open ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
      }}
    >
      <div
        style={{
          background: "var(--card, #1c1c1e)",
          borderRadius: "12px",
          padding: "16px",
          width: "100%",
          maxWidth: "320px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <Circle
          colors={Object.keys(COLORS)}
          color={color}
          pointProps={{
            style: { width: 25, height: 25 },
          }}
          rectProps={{
            style: { width: 15, height: 15, backgroundColor: '#171717' },
          }}
          onChange={(c: ColorResult) => onColorChange(c.hex)}
        />
      </div>
    </div>,
    document.body,
  );
}
