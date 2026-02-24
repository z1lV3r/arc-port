import { Button } from "./button";
import { Input } from "./input";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "./item";

export type Shortcut = {
  name: string;
  description: string;
  key: string;
};

export function SettingsShortcuts({ shortcuts }: { shortcuts: Shortcut[] }) {
  return (
    <>
      {shortcuts.map((shortcut, idx) => (
        <Item key={idx}>
          <ItemContent>
            <ItemTitle>{shortcut.name}</ItemTitle>
            <ItemDescription>{shortcut.description}</ItemDescription>
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
        className="col-span-2 hover:text-blue-500"
      >
        Edit shortcuts
      </Button>
    </>
  );
}