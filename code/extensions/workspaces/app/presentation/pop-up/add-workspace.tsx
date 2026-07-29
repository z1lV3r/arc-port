import { Button } from "@repo/shared/presentation/button";
import { GroupCard, GroupCardHeader, GroupCardTitle, GroupCardContent } from "@repo/shared/presentation/group-card";
import { LIST_VIEW_NAME } from "./list-workspaces";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@repo/shared/presentation/input-group";
import { Layers, CirclePlus } from "lucide-react";
import { EmojiPickerPortal, imageUrlToDataUrl } from "@repo/shared/presentation/EmojiPickerPortal";
import { type EmojiClickData } from "emoji-picker-react";

export const ADD_VIEW_NAME = "add";

export function WorkspaceForm({ currentView, setCurrentView }: { currentView: string, setCurrentView: (currentView: string) => void }) {
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLButtonElement>(null);
  const hasCustomIcon = iconUrl !== null;

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

  const handleEmojiClick = async (emojiData: EmojiClickData) => {
    setPickerOpen(false);
    const emojiDataUrl = await imageUrlToDataUrl(emojiData.imageUrl);
    setIconUrl(emojiDataUrl);
    //
    inputRef.current?.focus();
  };
  
  const handleClearIcon = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIconUrl(null);
    inputRef.current?.focus();
    //await clearTabCustomIconMessageEventSender.sendClearCurrentTabCustomIconEventMessage();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (name.length > 0) {
        //await setTabCustomNameMessageEventSender.sendSetCurrentTabCustomNameEventMessage(name);
      } else {
        //await clearTabCustomNameMessageEventSender.sendClearCurrentTabCustomNameEventMessage();
      }
    }
    if (e.key === "Escape") {
      if (pickerOpen) {
        setPickerOpen(false);
      }
    }
  };

  const handleCreateWorkspace = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (name.length > 0) {
      setCurrentView(LIST_VIEW_NAME)
    } else {
      //error
    }
  };

  return (
    <GroupCard>
      <GroupCardHeader>
        <GroupCardTitle>{t("extension_name")}</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex flex-col items-center gap-2">
          <InputGroup>
            <InputGroupAddon>
              <div className="group/icon relative">
              <InputGroupButton
                id="custom-icon"
                ref={sparkleRef}
                size="icon-sm"
                className="text-base"
                aria-label={t("pop_up.open_emoji_picker_label")}
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
                <Layers className="size-5" />
                )}
              </InputGroupButton>
              {hasCustomIcon && (
                <button
                type="button"
                aria-label={t("pop_up.reset_emoji_label")}
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
              placeholder={t("pop_up.name_placeholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
          <div className="flex flex-row items-center gap-2">
            <Button variant="outline" className="hover:text-blue-500" onClick={handleCreateWorkspace}><CirclePlus className="text-blue-500"/> {"Create"}</Button>
            <Button variant="outline" className="hover:text-destructive" onClick={() => setCurrentView(LIST_VIEW_NAME)}>{"Cancel"}</Button>
          </div>
        </div>
      </GroupCardContent>
      <EmojiPickerPortal
        open={pickerOpen}
        pickerRef={pickerRef}
        onEmojiClick={handleEmojiClick}
      />
    </GroupCard>
  );
}