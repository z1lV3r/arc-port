import { Button } from "@repo/shared/presentation/button";
import { GroupCard, GroupCardHeader, GroupCardTitle, GroupCardContent } from "@repo/shared/presentation/group-card";
import { LIST_VIEW_NAME } from "./list-workspaces";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@repo/shared/presentation/input-group";
import { Layers, CirclePlus, PaintbrushVertical } from "lucide-react";
import { EmojiPickerPortal, imageUrlToDataUrl } from "@repo/shared/presentation/EmojiPickerPortal";
import { ColorPickerPortal, COLORS } from "@repo/shared/presentation/ColorPickerPortal";
import { type EmojiClickData } from "emoji-picker-react";
import { CreateWorkspaceUseCases } from "../../use-cases/create-workspace-use-cases";
import { DependencyProvider } from "@/app/dependency-provider";

export const ADD_VIEW_NAME = "add";

export function WorkspaceForm({ currentView, setCurrentView }: { currentView: string, setCurrentView: (currentView: string) => void }) {
  const workspaceUseCases = DependencyProvider.getCreateWorkspaceUseCases();

  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#bdc1c6");
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLButtonElement>(null);
  const paletteRef = useRef<HTMLButtonElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const hasCustomIcon = iconUrl !== null;

  // Focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

  // Close color picker on outside click
  useEffect(() => {
    if (!paletteOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !colorPickerRef.current?.contains(target) &&
        !paletteRef.current?.contains(target)
      ) {
        setPaletteOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [paletteOpen]);

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
  };

  const createWorkspace = async () => {
    if (name.trim().length > 0) {
      setError(null);
      await workspaceUseCases.createWorkspace(name, iconUrl || "", COLORS[selectedColor]);
      window.close();
    } else {
      setError(t("pop_up.name_empty_error"));
    }
  };

  const handleCreateWorkspace = async (e: React.MouseEvent) => {
    e.stopPropagation();
    createWorkspace();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createWorkspace();
    }
    if (e.key === "Escape") {
      if (pickerOpen) {
        setPickerOpen(false);
      }
      if (paletteOpen) {
        setPaletteOpen(false);
      }
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
              aria-invalid={!!error}
              placeholder={t("pop_up.name_placeholder")}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                ref={paletteRef}
                size="icon-sm"
                aria-label={t("pop_up.color_palette")}
                aria-expanded={paletteOpen}
                onClick={() => setPaletteOpen((o) => !o)}
              >
                <PaintbrushVertical style={{ color: selectedColor }} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          {error && (
            <span className="w-full text-left text-xs text-destructive px-1">
              {error}
            </span>
          )}
          <div className="flex flex-row items-center gap-2">
            <Button variant="outline" className="hover:text-blue-500" onClick={handleCreateWorkspace}><CirclePlus className="text-blue-500" /> {"Create"}</Button>
            <Button variant="outline" className="hover:text-destructive" onClick={() => setCurrentView(LIST_VIEW_NAME)}>{"Cancel"}</Button>
          </div>
        </div>
      </GroupCardContent>
      <EmojiPickerPortal
        open={pickerOpen}
        pickerRef={pickerRef}
        onEmojiClick={handleEmojiClick}
      />
      <ColorPickerPortal
        open={paletteOpen}
        pickerRef={colorPickerRef}
        color={selectedColor}
        onColorChange={(hex) => {
          setSelectedColor(hex);
          setPaletteOpen(false);
        }}
      />
    </GroupCard>
  );
}