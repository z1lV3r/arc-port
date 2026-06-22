import type { Listener } from "../domain/models/listener";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type SelectSettingProps = {
  title: string;
  description: string;
  values: Listener[];
  onSelect: (value: string) => void;
  currentValue: string;
};

function SelectSetting({
  title,
  description,
  values,
  onSelect,
  currentValue,
}: SelectSettingProps) {
  return (
    <Item className="col-span-2">
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Select onValueChange={onSelect} value={currentValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {values.map((value) => (
                <SelectItem key={value.name} value={value.name}>
                  {value.description}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </ItemActions>
    </Item>
  );
}

export { SelectSetting };
export type { SelectSettingProps };
