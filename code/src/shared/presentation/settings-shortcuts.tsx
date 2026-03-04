import { Button } from "./button";
import { Input } from "./input";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemActions,
} from "./item";
import type { Shortcut } from "../domain/models/shortcut-setting";
import type { TabsService } from "../domain/interfaces/tabs-service";

export function SettingsShortcuts({tabsService, shortcuts }: { tabsService: TabsService, shortcuts: Shortcut[] }) {
  return (
    <>
      {shortcuts.map((shortcut, idx) => (
        <Item key={idx}>
          <ItemContent>
            <ItemTitle>{shortcut.name}</ItemTitle>
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