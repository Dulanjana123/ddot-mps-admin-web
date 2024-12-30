import React, { CSSProperties } from "react";
import { FormFeedback, FormGroup, Input, InputProps } from "reactstrap";
import { InputSizes } from "@enums/components/InputEnum";
import { CdInputLabel } from "@atoms/index";

export interface TextInputProps {
  id: string;
  size?: InputSizes;
  valid?: boolean;
  invalid?: boolean;
  plainText?: boolean;
  addon?: boolean;
  className?: string;
  placeHolder?: string;
  label?: string;
  value?: string;
  onChange: (data: any) => void;
  defaultValue?: string;
  width?: string;
  style?: CSSProperties;
  feedback?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  onFocus?: (data: any) => void;
};

const CdTextInput: React.FC<TextInputProps> = ({
  id,
  size = InputSizes.sm,
  valid,
  invalid,
  plainText,
  addon,
  className,
  placeHolder,
  label,
  value,
  onChange,
  defaultValue,
  width,
  style,
  feedback,
  required = false,
  disabled = false,
  readonly,
  onFocus,
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
        readOnly={readonly}
        aria-label={id}
        id={id}
        type="text"
        bsSize={size}
        valid={valid}
        invalid={invalid}
        plaintext={plainText}
        addon={addon}
        className={className}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        style={{
          ...style,
        }}
        width={width}
        onFocus={onFocus}
      />
      {invalid && <FormFeedback>{feedback}</FormFeedback>}
    </FormGroup>
  );
};

export default CdTextInput;
