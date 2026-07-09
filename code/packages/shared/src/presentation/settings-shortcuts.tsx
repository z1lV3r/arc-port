import type { BrowserTabsService } from "../domain/interfaces/browser-tabs-service";
import type { Shortcut } from "../domain/models/shortcut-setting";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "../lib/utils";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./item";

export function SettingsShortcuts({
  className,
  tabsService,
  shortcuts,
  editShortcutsButtonMessage,
}: {
  className?: string;
  tabsService: BrowserTabsService;
  shortcuts: Shortcut[];
  editShortcutsButtonMessage: string;
}) {
  const getContainerClass = () => {
    switch (shortcuts.length) {
      case 1:
        return "flex justify-center w-full";
      case 2:
        return "grid grid-cols-2 w-full gap-4";
      case 3:
        return "grid grid-cols-3 w-full gap-4";
      case 4:
        return "grid grid-cols-4 w-full gap-4";
      default:
        return "grid grid-cols-2 w-full gap-4";
    }
  };
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      <div className={getContainerClass()}>
        {shortcuts.map((shortcut, idx) => (
          <Item key={idx}>
            <ItemContent>
              <ItemTitle>{shortcut.name}</ItemTitle>
              <ItemDescription>{shortcut.defaultKey}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Input
                type="text"
                placeholder={shortcut.key}
                disabled
                className="text-center"
              />
            </ItemActions>
          </Item>
        ))}
      </div>
      <Button
        variant={"outline"}
        size="sm"
        className="w-full hover:text-blue-500"
        onClick={() =>
          tabsService.createTabByUrl("chrome://extensions/shortcuts")
        }
      >
        {editShortcutsButtonMessage}
      </Button>
    </div>
  );
}
