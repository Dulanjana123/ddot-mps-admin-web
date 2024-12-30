import React, { CSSProperties } from "react";
import { FormFeedback, FormGroup, Input } from "reactstrap";
import { InputSizes } from "@enums/components/InputEnum";
import { CdInputLabel } from "@atoms/index";

type NumberInputProps = {
  id: string;
  size?: InputSizes;
  valid?: boolean;
  invalid?: boolean;
  className?: string;
  placeHolder?: string;
  label?: string;
  onChange: (data: any) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
  width?: string;
  style?: CSSProperties;
  feedback?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

const CdNumberInput: React.FC<NumberInputProps> = ({
  id,
  size = InputSizes.sm,
  valid,
  invalid,
  className,
  placeHolder,
  label,
  onChange,
  defaultValue,
  min,
  max,
  width,
  style,
  feedback,
  required,
  disabled,
  readonly = false,
}) => {
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
        type="number"
        bsSize={size}
        valid={valid}
        invalid={invalid}
        className={className}
        placeholder={placeHolder}
        onChange={(e) => onChange(e)}
        defaultValue={defaultValue}
        min={min}
        max={max}
        style={{
          ...style,
          width: width,
        }}
        disabled={disabled}
        readOnly={readonly}
      />
      <FormFeedback>{feedback}</FormFeedback>
    </FormGroup>
  );
};

export default CdNumberInput;
