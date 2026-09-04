import { FieldError, ListBox, Select } from "@heroui/react";

export const createList = <K extends string>(items: ListItemsDef<K>[]) => items;

export interface ListItemsDef<K extends string> {
  key: K;
  textValue: string;
}

interface SelectListProps<K extends string> {
  ListItems: ListItemsDef<K>[];
  placeholder: string;
  defaultValue?: K;
  selectedKey?: K;
  onChange?: (value: K) => void;
  width?: number;
  ariaLabel?: string;
  name?: string;
  isRequired?: boolean;
}

export default function SelectList<K extends string>({
  ListItems,
  placeholder,
  defaultValue,
  selectedKey,
  onChange,
  width = 200,
  ariaLabel,
  name,
  isRequired,
}: SelectListProps<K>) {
  const styleWidth = `${width}px`;
  const isControlled = selectedKey !== undefined;

  return (
    <Select
      isRequired={isRequired}
      placeholder={placeholder}
      {...(isControlled
        ? { value: selectedKey }
        : { defaultValue })}
      onChange={(value) => {
        if (value != null && onChange) {
          onChange(value as K);
        }
      }}
      style={{ width: styleWidth }}
      aria-label={ariaLabel}
      name={name}
    >
      <Select.Trigger className="rounded-md">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="rounded-md">
        <ListBox className="*:rounded-sm">
          {ListItems.map((item) => (
            <ListBox.Item key={item.key} id={item.key} textValue={item.textValue}>
              {item.textValue}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
      <FieldError />
    </Select>
  );
}