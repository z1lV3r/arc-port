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
import { SettingsShortcuts, type Shortcut } from "@/shared/presentation/settings-shortcuts";
import { Separator } from "@/shared/presentation/separator";
import { DefaultUrlShortcutListenerProvider } from "./background/shortcut-listener-provider";

type SettingProps = {
  title: string;
  description: string;
  isActive: boolean;
  onToggle: () => void;
};

export function Setting({ title, description, isActive, onToggle }: SettingProps) {
  return (
    <Item>
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
  const [autoRedirect, setAutoRedirect] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      // You can implement loading settings from Chrome storage here
      // For now, using default values
      // Example: const settings = await defaultUrlRepository.getSettings();
      // setAutoRedirect(settings.autoRedirect);
      // setShowNotifications(settings.showNotifications);
      
      if (typeof chrome !== "undefined" && chrome.commands) {
        const commands = await chrome.commands.getAll();
        const shortcutListeners = new DefaultUrlShortcutListenerProvider().getShortcutListeners();

        const currentShortcuts = commands.reduce<Shortcut[]>((shortcuts, cmd) => {
          const listener = cmd.name ? shortcutListeners.find(l => l.name === cmd.name) : undefined;
          
          if (listener) {
            shortcuts.push({
              name: cmd.description || cmd.name || "Shortcut",
              description: listener.description || "",
              key: cmd.shortcut || "Not set"
            });
          }
          
          return shortcuts;
        }, []);
          
        setShortcuts(currentShortcuts);
      }
    };

    loadSettings();
  }, []);

  const handleToggleAutoRedirect = () => {
    setAutoRedirect(!autoRedirect);
    // Save to Chrome storage
    // Example: await defaultUrlRepository.saveSetting('autoRedirect', !autoRedirect);
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Save to Chrome storage
    // Example: await defaultUrlRepository.saveSetting('showNotifications', !showNotifications);
  };

  const handleResetSettings = async () => {
    setAutoRedirect(true);
    setShowNotifications(true);
    // Reset in Chrome storage
    // Example: await defaultUrlRepository.resetSettings();
  };


  return (
    <GroupCard className="w-fit">
      <GroupCardHeader>
        <GroupCardTitle>Default URL</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex flex-col gap-4 min-w-[300px]">
          {/* Settings Options */}
            <ItemGroup className="grid grid-cols-2 gap-4">
              {/* Auto Redirect Setting */}
              <Setting
                title="Pop Up UI"
                description="Show UI in extension pop up"
                isActive={autoRedirect}
                onToggle={handleToggleAutoRedirect}
              />

              {/* Notifications Setting */}
              <Setting
                title="Context Menu"
                description="Show item on right click context menu"
                isActive={showNotifications}
                onToggle={handleToggleNotifications}
              />

              <Separator className="col-span-2" />

              {/* Shortcuts */}
              <SettingsShortcuts shortcuts={shortcuts} />

              <Separator className="col-span-2" />
              
              <Button
                variant="outline"
                className="hover:text-destructive col-span-2"
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
