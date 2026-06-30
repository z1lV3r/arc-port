import { useEffect, useState } from "react";

import type { Shortcut } from "@repo/shared/domain/models/shortcut-setting";
import { Button } from "@repo/shared/presentation/button";
import {
  GroupCard,
  GroupCardContent,
} from "@repo/shared/presentation/group-card";
import { ItemGroup } from "@repo/shared/presentation/item";
import { SelectSetting } from "@repo/shared/presentation/select-setting";
import { Separator } from "@repo/shared/presentation/separator";
import { SettingsShortcuts } from "@repo/shared/presentation/settings-shortcuts";
import { ToggleSetting } from "@repo/shared/presentation/toggle-setting";

import { DependencyProvider } from "../dependency-provider";

export function Settings() {
  const tabsService = DependencyProvider.getBrowserTabsService();
  const shortcutSettingsService =
    DependencyProvider.getShortcutSettingsService();
  const shortcutListeners = DependencyProvider.getShortcutListeners();
  const showContextMenuSettingUseCases =
    DependencyProvider.getShowContextMenuSettingUseCases();
  const extensionActionSettingUseCases =
    DependencyProvider.getExtensionActionSettingUseCases();
  const actionListeners = DependencyProvider.getActionListeners();

  const [extensionAction, setExtensionAction] = useState<string>("");
  const [showContextMenu, setShowContextMenu] = useState(true);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      const extensionActionValue =
        await extensionActionSettingUseCases.getExtensionAction();
      setExtensionAction(extensionActionValue);
      setShowContextMenu(
        await showContextMenuSettingUseCases.getShowContextMenu(),
      );
    };
    const loadShortcuts = async () => {
      const currentShortcuts =
        await shortcutSettingsService.getShortcuts(shortcutListeners);
      setShortcuts(currentShortcuts);
    };

    loadSettings();
    loadShortcuts();
  }, []);

  const handleSelectExtensionAction = async (value: string) => {
    await extensionActionSettingUseCases.setExtensionAction(value);
    setExtensionAction(
      await extensionActionSettingUseCases.getExtensionAction(),
    );
  };

  const handleToggleShowContextMenu = async () => {
    await showContextMenuSettingUseCases.setShowContextMenu(!showContextMenu);
    setShowContextMenu(
      await showContextMenuSettingUseCases.getShowContextMenu(),
    );
  };

  const handleResetSettings = async () => {
    const resetExtensionAction =
      extensionActionSettingUseCases.resetExtensionAction();
    const resetShowContextMenu =
      showContextMenuSettingUseCases.resetShowContextMenu();
    await resetExtensionAction;
    await resetShowContextMenu;
    setExtensionAction(
      await extensionActionSettingUseCases.getExtensionAction(),
    );
    setShowContextMenu(
      await showContextMenuSettingUseCases.getShowContextMenu(),
    );
  };

  return (
    <GroupCard className="w-fit">
      <GroupCardContent>
        <div className="flex flex-col gap-4 min-w-[300px]">
          {/* Settings Options */}
          <ItemGroup className="grid grid-cols-2 gap-4">
            {/* Context Menu Setting */}
            <SelectSetting
              title={t("settings.action.title")}
              description={t("settings.action.description")}
              currentValue={extensionAction}
              values={actionListeners}
              onSelect={handleSelectExtensionAction}
            />
            <ToggleSetting
              title={t("settings.context_menu.title")}
              description={t("settings.context_menu.description")}
              isActive={showContextMenu}
              onToggle={handleToggleShowContextMenu}
            />

            <Separator className="col-span-4" />

            {/* Shortcuts */}
            <SettingsShortcuts
              className="col-span-4"
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
