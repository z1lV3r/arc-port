import { Button } from "./button";
import { Input } from "./input";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemActions,
} from "./item";
import type { Shortcut } from "../domain/models/shortcut-setting";

export function SettingsShortcuts({ shortcuts }: { shortcuts: Shortcut[] }) {
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
      >
        Edit shortcuts
      </Button>
    </>
  );
}