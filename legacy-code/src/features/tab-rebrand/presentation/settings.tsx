import { useEffect, useState } from "react";
import type { Shortcut } from "@/shared/domain/models/shortcut-setting";
import { Button } from "@/shared/presentation/button";
import {
  GroupCard,
  GroupCardContent,
  GroupCardHeader,
  GroupCardTitle,
} from "@/shared/presentation/group-card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/shared/presentation/item";
import { Separator } from "@/shared/presentation/separator";
import { SettingsShortcuts } from "@/shared/presentation/settings-shortcuts";
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

  useEffect(() => {
    const loadSettings = async () => {
      setShowPopUp(await settingsUseCases.getShowPopUp());
      setShowContextMenu(await settingsUseCases.getShowContextMenu());
    };
    const loadShortcuts = async () => {
      const currentShortcuts = await shortcutSettingsService.getShortcuts(shortcutListeners);
      setShortcuts(currentShortcuts);
    };

    loadSettings();
    loadShortcuts();
  }, [settingsUseCases, shortcutListeners, shortcutSettingsService]);

  const handleToggleShowPopUp = async () => {
    await settingsUseCases.setShowPopUp(!showPopUp);
    setShowPopUp(await settingsUseCases.getShowPopUp());
  };

  const handleToggleShowContextMenu = async () => {
    await settingsUseCases.setShowContextMenu(!showContextMenu);
    setShowContextMenu(await settingsUseCases.getShowContextMenu());
  };

  const handleResetSettings = async () => {
    await Promise.all([
      settingsUseCases.resetShowPopUp(),
      settingsUseCases.resetShowContextMenu(),
    ]);
    setShowPopUp(await settingsUseCases.getShowPopUp());
    setShowContextMenu(await settingsUseCases.getShowContextMenu());
  };

  return (
    <GroupCard className="w-fit">
      <GroupCardHeader>
        <GroupCardTitle>Tab Rebrand</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex flex-col gap-4 min-w-[300px]">
          <ItemGroup className="grid grid-cols-4 gap-4">
            <Setting
              title="Pop Up UI"
              description="Show UI in extension pop up"
              isActive={showPopUp}
              onToggle={handleToggleShowPopUp}
            />

            <Setting
              title="Context Menu"
              description="Show item on right click context menu"
              isActive={showContextMenu}
              onToggle={handleToggleShowContextMenu}
            />

            <Separator className="col-span-4" />

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
