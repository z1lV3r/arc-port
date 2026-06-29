import { Eraser, SmilePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type EmojiClickData } from "emoji-picker-react";
import { GroupCard, GroupCardContent, GroupCardHeader, GroupCardTitle } from "@repo/shared/presentation/group-card";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@repo/shared/presentation/input-group";
import { EmojiPickerPortal, imageUrlToDataUrl } from "@repo/shared/presentation/EmojiPickerPortal";
import { DependencyProvider } from "../dependency-provider";
import type { TabRebrandSettingsUseCases } from "../use-cases/tab-rebrand-settings-use-cases.ts";
import type { SetTabCustomNameMessageEventSender } from "./messages/custom-name/set-tab-custom-name-message-event-sender.ts";
import type { GetTabCustomNameMessageEventSender } from "./messages/custom-name/get-tab-custom-name-message-event-sender.ts";
import type { ClearTabCustomNameMessageEventSender } from "./messages/custom-name/clear-tab-custom-name-message-event-sender.ts";
import type { SetTabCustomIconMessageEventSender } from "./messages/custom-icon/set-tab-custom-icon-message-event-sender.ts";
import type { GetTabCustomIconMessageEventSender } from "./messages/custom-icon/get-tab-custom-icon-message-event-sender.ts";
import type { ClearTabCustomIconMessageEventSender } from "./messages/custom-icon/clear-tab-custom-icon-message-event-sender.ts";

function PopUp() {
  const setTabCustomNameMessageEventSender: SetTabCustomNameMessageEventSender = DependencyProvider.getSetTabCustomNameMessageEventSender();
  const getTabCustomNameMessageEventSender: GetTabCustomNameMessageEventSender = DependencyProvider.getGetTabCustomNameMessageEventSender();
  const clearTabCustomNameMessageEventSender: ClearTabCustomNameMessageEventSender = DependencyProvider.getClearTabCustomNameMessageEventSender();
  const setTabCustomIconMessageEventSender: SetTabCustomIconMessageEventSender = DependencyProvider.getSetTabCustomIconMessageEventSender();
  const getTabCustomIconMessageEventSender: GetTabCustomIconMessageEventSender = DependencyProvider.getGetTabCustomIconMessageEventSender();
  const clearTabCustomIconMessageEventSender: ClearTabCustomIconMessageEventSender = DependencyProvider.getClearTabCustomIconMessageEventSender();
  const settingsUseCases: TabRebrandSettingsUseCases = DependencyProvider.getTabRebrandSettingsUseCases();

  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [showPopUp, setShowPopUp] = useState(false);
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

  // Force Chrome popup to resize when picker opens/closes
  useEffect(() => {
    const html = document.documentElement;
    if (pickerOpen) {
      html.style.minHeight = "480px";
    } else {
      html.style.minHeight = "";
      void html.offsetHeight;
    }
  }, [pickerOpen]);

  
  useEffect(() => {
    const fetchInitialData = async () => {
      const [name, iconUrl, popUpVisible] = await Promise.all([
        getTabCustomNameMessageEventSender.sendGetCurrentTabCustomNameEventMessage(),
        getTabCustomIconMessageEventSender.sendGetCurrentTabCustomIconEventMessage(),
        settingsUseCases.getShowPopUp(),
      ]);
      setName(name);
      setIconUrl(iconUrl);
      setShowPopUp(popUpVisible);
    };

    fetchInitialData();
  }, [
    getTabCustomIconMessageEventSender,
    getTabCustomNameMessageEventSender,
    settingsUseCases,
  ]);

  useEffect(() => {
    // Check if the popup was opened via shortcut with a specific focus target
    chrome.storage.session.get("focusElementId").then(({ focusElementId }) => {
      if (focusElementId) {
        if (focusElementId === "custom-icon") {
          setPickerOpen(true);
          sparkleRef.current?.focus();
        } else if (focusElementId === "custom-name") {
          inputRef.current?.focus();
        }
        chrome.storage.session.remove("focusElementId");
      }
    });
  }, []);

  const handleEmojiClick = async (emojiData: EmojiClickData) => {
    setPickerOpen(false);
    const emojiDataUrl = await imageUrlToDataUrl(emojiData.imageUrl);
    setIconUrl(emojiDataUrl);
    await setTabCustomIconMessageEventSender.sendSetCurrentTabCustomIconEventMessage(emojiDataUrl);
    inputRef.current?.focus();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (name.length > 0) {
        await setTabCustomNameMessageEventSender.sendSetCurrentTabCustomNameEventMessage(name);
      } else {
        await clearTabCustomNameMessageEventSender.sendClearCurrentTabCustomNameEventMessage();
      }
    }
    if (e.key === "Escape") {
      if (pickerOpen) {
        setPickerOpen(false);
      }
    }
  };

  const handleClear = async () => {
    setName("");
    inputRef.current?.focus();
    await clearTabCustomNameMessageEventSender.sendClearCurrentTabCustomNameEventMessage();
  };

  const handleClearIcon = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIconUrl(null);
    inputRef.current?.focus();
    await clearTabCustomIconMessageEventSender.sendClearCurrentTabCustomIconEventMessage();
  };
  if (!showPopUp) {
    return null;
  }
  return (
    <GroupCard className="w-full min-w-64">
      <GroupCardHeader>
        <GroupCardTitle>Tab Rebrand</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent className="p-3">
        <InputGroup>
          <InputGroupAddon>
            <div className="group/icon relative">
              <InputGroupButton
                id="custom-icon"
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
                    className="size-5"
                    style={{ imageRendering: "smooth" }}
                  />
                ) : (
                  <SmilePlus className="size-5" />
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
            id="custom-name"
            ref={inputRef}
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
      </GroupCardContent>

      <EmojiPickerPortal
        open={pickerOpen}
        pickerRef={pickerRef}
        onEmojiClick={handleEmojiClick}
      />
    </GroupCard>
  );
}

export { PopUp };
