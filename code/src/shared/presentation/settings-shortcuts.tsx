import { Button } from "./button";
import { Input } from "./input";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemActions,
  ItemDescription,
} from "./item";
import type { Shortcut } from "../domain/models/shortcut-setting";
import type { BrowserTabsService } from "../domain/interfaces/browser-tabs-service";

export function SettingsShortcuts({tabsService, shortcuts }: { tabsService: BrowserTabsService, shortcuts: Shortcut[] }) {
  return (
    <>
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
      <Button
        variant={"outline"}
        size="sm"
        className="col-span-4 hover:text-blue-500"
        onClick={() => tabsService.createTab("chrome://extensions/shortcuts")}
      >
        Edit shortcuts
      </Button>
    </>
  );
}