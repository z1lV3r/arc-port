import type { ActionListener } from "../domain/models/action-listener";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "./item";
import { Switch } from "./switch";

type ToggleSettingProps = {
  title: string;
  description: string;
  isActive: boolean;
  onToggle: () => void;
};

function ToggleSetting({ title, description, isActive, onToggle }: ToggleSettingProps) {
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

export { ToggleSetting };
export type { ToggleSettingProps };
