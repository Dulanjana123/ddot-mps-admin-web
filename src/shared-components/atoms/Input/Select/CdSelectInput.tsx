import React, { CSSProperties, useEffect, useState } from "react";
import { FormFeedback, FormGroup, Input } from "reactstrap";
import { InputSizes } from "@enums/components/InputEnum";
import { CdInputLabel } from "@atoms/index";
import { OptionType } from "@interfaces/components/select";

export interface SelectInputProps {
  id: string;
  options: OptionType[];
  size?: InputSizes;
  valid?: boolean;
  invalid?: boolean;
  plainText?: boolean;
  addon?: boolean;
  className?: string;
  placeHolder?: string;
  label?: string;
  onSelect: (data: any) => void;
  defaultChecked?: string;
  width?: string;
  style?: CSSProperties;
  feedback?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
};

const CdSelectInput: React.FC<SelectInputProps> = ({
  id,
  options,
  size = InputSizes.sm,
  valid,
  invalid,
  plainText,
  addon,
  className,
  placeHolder = "Choose...",
  label,
  onSelect,
  defaultChecked,
  width,
  style,
  feedback,
  required = false,
  value,
  disabled = false,
}) => {
  const [selected, setSelected] = useState<string | undefined>(defaultChecked);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
    onSelect(event);
  };

  const optionList = options.map((item) => (
    <option key={item.key} value={item.key}>
      {item.value}
    </option>
  ));

  return (
    <FormGroup className="form-group">
      {label && (
        <CdInputLabel
          labelText={label}
          size={size}
          required={required}
          id={id}
        />
      )}
      <Input
        aria-label={id}
        id={id}
        type="select"
        bsSize={size}
        valid={valid}
        invalid={invalid}
        plaintext={plainText}
        addon={addon}
        className={className}
        onChange={onChange}
        value={value ?? selected}
        disabled={disabled}
        style={{
          ...style,
          width: width,
        }}
      >
        {!defaultChecked && <option value={""}>{placeHolder}</option>}
        {optionList}
      </Input>
      <FormFeedback>{feedback}</FormFeedback>
    </FormGroup>
  );
};

export default CdSelectInput;
