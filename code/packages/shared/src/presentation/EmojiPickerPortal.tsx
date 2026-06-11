import EmojiPicker, {
  type EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface EmojiPickerPortalProps {
  open: boolean;
  pickerRef: React.RefObject<HTMLDivElement | null>;
  onEmojiClick: (data: EmojiClickData) => void;
}

export async function imageUrlToDataUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Failed to convert image URL to data URL:", error);
    return url;
  }
}

export function EmojiPickerPortal({
  open,
  pickerRef,
  onEmojiClick,
}: EmojiPickerPortalProps) {
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
      className="[&_.epr-emoji-category-label]:text-(length:--epr-category-label-text-size,12px)!"
      style={{
        position: "fixed",
        top: "13%",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: open ? "block" : "none",
      }}
    >
      <EmojiPicker
        width="100%"
        height="100%"
        style={
          {
            "--epr-emoji-size": "24px",
            "--epr-category-navigation-button-size": "23px",
            "--epr-emoji-padding": "3px",
            "--epr-horizontal-padding": "3px",
            "--epr-category-label-text-size": "13px",
            "--epr-category-label-height": "13px",
          } as React.CSSProperties
        }
        theme={Theme.AUTO}
        onEmojiClick={onEmojiClick}
        emojiStyle={EmojiStyle.APPLE}
        lazyLoadEmojis
        searchDisabled
        skinTonesDisabled
        previewConfig={{ showPreview: false }}
      />
    </div>,
    document.body,
  );
}
