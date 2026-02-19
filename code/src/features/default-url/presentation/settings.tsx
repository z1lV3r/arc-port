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
  ItemSeparator,
} from "@/shared/presentation/item";
import { Separator } from "@/shared/presentation/separator";
import { Info } from "lucide-react";
import { useState, useEffect } from "react";

export function Settings() {
  const [autoRedirect, setAutoRedirect] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      // You can implement loading settings from Chrome storage here
      // For now, using default values
      // Example: const settings = await defaultUrlRepository.getSettings();
      // setAutoRedirect(settings.autoRedirect);
      // setShowNotifications(settings.showNotifications);
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
          <ItemGroup>
            {/* Auto Redirect Setting */}
            <Item>
              <ItemContent>
                <ItemTitle>Auto Redirect</ItemTitle>
                <ItemDescription>
                  Automatically redirect to default URL on tab open
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant={autoRedirect ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleAutoRedirect}
                >
                  {autoRedirect ? "On" : "Off"}
                </Button>
              </ItemActions>
            </Item>

            <ItemSeparator />

            {/* Notifications Setting */}
            <Item>
              <ItemContent>
                <ItemTitle>Notifications</ItemTitle>
                <ItemDescription>
                  Show notifications when redirecting to default URL
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant={showNotifications ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleNotifications}
                >
                  {showNotifications ? "On" : "Off"}
                </Button>
              </ItemActions>
            </Item>
          </ItemGroup>

          <Separator />

          {/* Info Section */}
          <div className="flex items-start gap-2 bg-muted/50 p-3 rounded-lg">
            <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium">Extension Info</span>
              <span className="text-xs text-muted-foreground">
                This extension helps you manage default URLs for tabs. Set a
                default URL for any tab and quickly reset to it.
              </span>
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            className="hover:text-destructive"
            onClick={handleResetSettings}
          >
            Reset to Defaults
          </Button>
        </div>
      </GroupCardContent>
    </GroupCard>
  );
}
