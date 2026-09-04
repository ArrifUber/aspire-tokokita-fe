import { SearchField } from "@heroui/react";

interface Props {
  placeholder: string;
  aria_label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export default function TableSearchField({
  placeholder,
  aria_label,
  value,
  onChange,
  onClear,
}: Props) {
  return (
    <SearchField name="search" aria-label={aria_label}>
      <SearchField.Group className={"rounded-md"}>
        <SearchField.SearchIcon />
        <SearchField.Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <SearchField.ClearButton onClick={onClear} />
      </SearchField.Group>
    </SearchField>
  );
}