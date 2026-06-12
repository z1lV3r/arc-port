import { useEffect, useState } from "react";

import type { Shortcut } from "@repo/shared/domain/models/shortcut-setting";
import { Button } from "@repo/shared/presentation/button";
import {
  GroupCard,
  GroupCardContent,
  GroupCardHeader,
  GroupCardTitle,
} from "@repo/shared/presentation/group-card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@repo/shared/presentation/item";
import { Separator } from "@repo/shared/presentation/separator";
import { SettingsShortcuts } from "@repo/shared/presentation/settings-shortcuts";
import { Switch } from "@repo/shared/presentation/switch";

import { DependencyProvider } from "../dependency-provider";

type SettingProps = {
  title: string;
  description: string;
  isActive: boolean;
  onToggle: () => void;
};

function Setting({ title, description, isActive, onToggle }: SettingProps) {
  return (
    <Item className="col-span-2">
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Switch checked={isActive} onCheckedChange={onToggle} />
      </ItemActions>
    </Item>
  );
}

export function Settings() {
  const [showPopUp, setShowPopUp] = useState(true);
  const [showContextMenu, setShowContextMenu] = useState(true);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const tabsService = DependencyProvider.getBrowserTabsService();
  const shortcutSettingsService =
    DependencyProvider.getShortcutSettingsService();
  const shortcutListeners = DependencyProvider.getShortcutListeners();
  const settingsUseCases = DependencyProvider.getSettingsUseCases();

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      setShowPopUp(await settingsUseCases.getShowPopUp());
      setShowContextMenu(await settingsUseCases.getShowContextMenu());
    };
    const loadShortcuts = async () => {
      const currentShortcuts =
        await shortcutSettingsService.getShortcuts(shortcutListeners);
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
      <GroupCardContent>
        <div className="flex flex-col gap-4 min-w-[300px]">
          {/* Settings Options */}
          <ItemGroup className="grid grid-cols-4 gap-4">
            {/* Context Menu Setting */}
            <Setting
              title={t("settings.context_menu.title")}
              description={t("settings.context_menu.description")}
              isActive={showContextMenu}
              onToggle={handleToggleShowContextMenu}
            />

            <Separator className="col-span-4" />

            {/* Shortcuts */}
            <SettingsShortcuts
              tabsService={tabsService}
              shortcuts={shortcuts}
              editShortcutsButtonMessage={t("settings.edit_shortcuts")}
            />

            <Separator className="col-span-4" />

            <Button
              variant="outline"
              className="hover:text-destructive col-span-4"
              onClick={handleResetSettings}
            >
              {t("settings.reset_to_default")}
            </Button>
          </ItemGroup>
        </div>
      </GroupCardContent>
    </GroupCard>
  );
}
