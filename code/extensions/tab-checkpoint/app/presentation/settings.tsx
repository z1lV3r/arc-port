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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@repo/shared/presentation/select";

type ToogleSettingProps = {
  title: string;
  description: string;
  isActive: boolean;
  onToggle: () => void;
};

function ToogleSetting({ title, description, isActive, onToggle }: ToogleSettingProps) {
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

type SelectSettingProps = {
  title: string;
  description: string;
  values: string[];
  onSelect: (value: string) => void;
  currentValue: string;
};

function SelectSetting({ title, description, values, onSelect, currentValue }: SelectSettingProps) {
  return (
    <Item className="col-span-2">
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Select onValueChange={onSelect} defaultValue={currentValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {values.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </ItemActions>
    </Item>
  );
}

export function Settings() {
  const [extensionAction, setExtensionAction] = useState<string>("show-popup");
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
      setExtensionAction(await settingsUseCases.getExtensionAction());
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

  const handleToggleExtensionAction = async (value: string) => {
    await settingsUseCases.setExtensionAction(value);
    setExtensionAction(await settingsUseCases.getExtensionAction());
  };

  const handleToggleShowContextMenu = async () => {
    await settingsUseCases.setShowContextMenu(!showContextMenu);
    setShowContextMenu(await settingsUseCases.getShowContextMenu());
  };

  const handleResetSettings = async () => {
    const resetExtensionAction = settingsUseCases.resetExtensionAction();
    const resetShowContextMenu = settingsUseCases.resetShowContextMenu();
    await resetExtensionAction;
    await resetShowContextMenu;
    setExtensionAction(await settingsUseCases.getExtensionAction());
    setShowContextMenu(await settingsUseCases.getShowContextMenu());
  };

  return (
    <GroupCard className="w-fit">
      <GroupCardContent>
        <div className="flex flex-col gap-4 min-w-[300px]">
          {/* Settings Options */}
          <ItemGroup className="grid grid-cols-4 gap-4">
            {/* Context Menu Setting */}
            <SelectSetting
              title={t("settings.action.title")}
              description={t("settings.action.description")}
              currentValue={extensionAction}
              values={["show-popup", "reset-current-tab-to-checkpoint"]}
              onSelect={handleToggleExtensionAction}
            />
            <ToogleSetting
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
