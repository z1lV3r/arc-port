import { useEffect, useRef, useState } from "react";
import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react";
import {
  GroupCard,
  GroupCardHeader,
  GroupCardTitle,
  GroupCardContent,
} from "@/shared/presentation/group-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/presentation/input-group";
import { Eraser, SmilePlus } from "lucide-react";


function PopUp() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const hasCustomIcon = iconUrl !== null;
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLButtonElement>(null);

  // Close picker on outside click
  useEffect(() => {
    if (!pickerOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !pickerRef.current?.contains(target) &&
        !sparkleRef.current?.contains(target)
      ) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [pickerOpen]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setIcon(emojiData.emoji);
    setIconUrl(emojiData.imageUrl);
    setPickerOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(name);
    }
    if (e.key === "Escape") {
      if (pickerOpen) {
        setPickerOpen(false);
      } else {
        setName("");
      }
    }
  };

  const handleClear = () => {
    setName("");
    inputRef.current?.focus();
  };

  const handleClearIcon = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIcon("");
    setIconUrl(null);
    inputRef.current?.focus();
  };

  return (
    <GroupCard>
      <GroupCardHeader>
        <GroupCardTitle>Tab Rebrand</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent className="p-3">
        <div className="relative">
          <InputGroup>
            <InputGroupAddon>
              <div className="group/icon relative">
                <InputGroupButton
                  ref={sparkleRef}
                  size="icon-sm"
                  className="text-base"
                  aria-label="Open emoji picker"
                  aria-expanded={pickerOpen}
                  onClick={() => setPickerOpen((o) => !o)}
                >
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={icon}
                      className="size-6"
                      style={{ imageRendering: "smooth" }}
                    />
                  ) : (
                    <SmilePlus className="size-4" />
                  )}
                </InputGroupButton>
                {hasCustomIcon && (
                  <button
                    type="button"
                    aria-label="Reset emoji"
                    onClick={handleClearIcon}
                    className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-destructive text-[8px] font-bold leading-none text-destructive-foreground shadow-sm transition-opacity opacity-0 group-hover/icon:opacity-100 hover:brightness-110"
                  >
                    ×
                  </button>
                )}
              </div>
            </InputGroupAddon>
            <InputGroupInput
              ref={inputRef}
              autoFocus
              autoComplete="off"
              maxLength={64}
              placeholder="Custom name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-sm"
                aria-label="Clear name"
                disabled={!name}
                onClick={handleClear}
              >
                <Eraser className="text-destructive" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          {pickerOpen && (
            <div
              ref={pickerRef}
              className="absolute left-0 top-full z-50 mt-1"
            >
              <EmojiPicker
                theme={Theme.AUTO}
                onEmojiClick={handleEmojiClick}
                lazyLoadEmojis
              />
            </div>
          )}
        </div>
      </GroupCardContent>
    </GroupCard>
  );
}

export { PopUp };
