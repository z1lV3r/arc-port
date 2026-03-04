import {
  GroupCard,
  GroupCardHeader,
  GroupCardTitle,
  GroupCardContent,
} from "@/shared/presentation/group-card";
import { Button } from "@/shared/presentation/button";
import {
  ItemGroup,
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/shared/presentation/item";
import { useState, useEffect } from "react";
import { SettingsShortcuts } from "@/shared/presentation/settings-shortcuts";
import { Separator } from "@/shared/presentation/separator";
import type { Shortcut } from "@/shared/domain/models/shortcut-setting";
import { useSettingsContext } from "./settings-context";

type SettingProps = {
  title: string;
  description: string;
  isActive: boolean;
  onToggle: () => void;
};

export function Setting({ title, description, isActive, onToggle }: SettingProps) {
  return (
    <Item className="col-span-2">
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant={isActive ? "default" : "outline"}
          size="sm"
          onClick={onToggle}
        >
          {isActive ? "On" : "Off"}
        </Button>
      </ItemActions>
    </Item>
  );
}

export function Settings() {
  const [showPopUp, setShowPopUp] = useState(true);
  const [showContextMenu, setShowContextMenu] = useState(true);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const { tabsService, shortcutSettingsService, shortcutListeners, settingsUseCases } = useSettingsContext();

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      setShowPopUp(await settingsUseCases.getShowPopUp());
      setShowContextMenu(await settingsUseCases.getShowContextMenu());
    };
    const loadShortcuts = async () => {
      const shortcuts = shortcutListeners.map(shortcut => shortcut.name);
      const currentShortcuts = await shortcutSettingsService.getShortcuts(new Set(shortcuts));
      setShortcuts(currentShortcuts);
    };

    loadSettings();
    loadShortcuts();
  }, []);

  const handleToggleShowPopUp = async () => {
    await settingsUseCases.setShowPopUp(!showPopUp);
    setShowPopUp(await settingsUseCases.getShowPopUp());
  };

  const handleToggleShowContextMenu = async () => {
    await settingsUseCases.setShowContextMenu(!showContextMenu);
    setShowContextMenu(await settingsUseCases.getShowContextMenu());
  };

  const handleResetSettings = async () => {
    const resetShowPopUp = settingsUseCases.resetShowPopUp();
    const resetShowContextMenu = settingsUseCases.resetShowContextMenu();
    await resetShowPopUp;
    await resetShowContextMenu;
    setShowPopUp(await settingsUseCases.getShowPopUp());
    setShowContextMenu(await settingsUseCases.getShowContextMenu());
  };


  return (
    <GroupCard className="w-fit">
      <GroupCardHeader>
        <GroupCardTitle>Default URL</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex flex-col gap-4 min-w-[300px]">
          {/* Settings Options */}
            <ItemGroup className="grid grid-cols-4 gap-4">
              {/* Auto Redirect Setting */}
              <Setting
                title="Pop Up UI"
                description="Show UI in extension pop up"
                isActive={showPopUp}
                onToggle={handleToggleShowPopUp}
              />

              {/* Notifications Setting */}
              <Setting
                title="Context Menu"
                description="Show item on right click context menu"
                isActive={showContextMenu}
                onToggle={handleToggleShowContextMenu}
              />

              <Separator className="col-span-4" />

              {/* Shortcuts */}
              <SettingsShortcuts tabsService={tabsService} shortcuts={shortcuts} />

              <Separator className="col-span-4" />
              
              <Button
                variant="outline"
                className="hover:text-destructive col-span-4"
                onClick={handleResetSettings}
              >
                Reset to Default
              </Button>
            </ItemGroup>
        </div>
      </GroupCardContent>
    </GroupCard>
  );
}
