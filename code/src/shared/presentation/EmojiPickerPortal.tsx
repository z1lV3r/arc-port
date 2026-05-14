
import { createPortal } from "react-dom";
import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react";

export interface EmojiPickerPortalProps {
  open: boolean;
  pickerRef: React.RefObject<HTMLDivElement | null>;
  onEmojiClick: (data: EmojiClickData) => void;
}

export function EmojiPickerPortal({
  open,
  pickerRef,
  onEmojiClick,
}: EmojiPickerPortalProps) {

  if (!open) return null;

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
      }}
    >
      <EmojiPicker
        width="100%"
        height="100%"
        style={{ 
          "--epr-emoji-size": "24px", 
          "--epr-category-navigation-button-size": "23px",
          "--epr-emoji-padding": "3px",
          "--epr-horizontal-padding": "3px",
          "--epr-category-label-text-size": "13px",
          "--epr-category-label-height": "13px"
        } as React.CSSProperties}
        theme={Theme.AUTO}
        onEmojiClick={onEmojiClick}
        lazyLoadEmojis
        searchDisabled
        skinTonesDisabled
        previewConfig={{showPreview: false}}
        
      />
    </div>,
    document.body
  );
}
