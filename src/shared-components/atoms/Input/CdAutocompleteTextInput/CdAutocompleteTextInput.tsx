import React, { CSSProperties } from "react";
import Autocomplete from "@mui/joy/Autocomplete";

type CdAutocompleteTextInputProps = {
  id: string;
  sx?: CSSProperties;
  placeholder?: string;
  type?: string;
  freeSolo?: boolean;
  disableClearable?: boolean;
  options: any[];
  value?: any;
  error?: boolean;
  onInputChange: (event: React.SyntheticEvent, newInputValue: string) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  defaultValue?: string;
};

const CdAutocompleteTextInput: React.FC<CdAutocompleteTextInputProps> = ({
  id,
  sx,
  placeholder,
  type = "search",
  freeSolo = true,
  disableClearable = true,
  options,
  value,
  error,
  onInputChange,
  onKeyDown,
  defaultValue,
}) => {
  return (
    <Autocomplete
      id={id}
      sx={{ width: 400, ...sx }}
      placeholder={placeholder}
      type={type}
      freeSolo={freeSolo}
      disableClearable={disableClearable}
      options={options}
      value={value}
      defaultValue={defaultValue}
      error={error}
      onInputChange={onInputChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default CdAutocompleteTextInput;
