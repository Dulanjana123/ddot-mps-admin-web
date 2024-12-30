import React, { CSSProperties } from "react";
import { FormFeedback, FormGroup, Input } from "reactstrap";
import { InputSizes } from "@enums/components/InputEnum";
import { CdInputLabel } from "@atoms/index";

type EmailInputProps = {
  id: string;
  size?: InputSizes;
  valid?: boolean;
  invalid?: boolean;
  className?: string;
  placeHolder?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  onChange: (data: any) => void;
  defaultValue?: string;
  width?: string;
  style?: CSSProperties;
  feedback?: string;
  required?: boolean;
  onFocus?: () => void;
};

const CdEmailInput: React.FC<EmailInputProps> = ({
  size = InputSizes.sm,
  valid,
  invalid,
  className,
  placeHolder,
  label,
  value,
  disabled = false,
  onChange,
  defaultValue,
  width,
  style,
  feedback,
  required,
  onFocus,
  id,
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
        type="text"
        bsSize={size}
        valid={valid}
        invalid={invalid}
        className={className}
        placeholder={placeHolder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e)}
        onFocus={onFocus}
        defaultValue={defaultValue}
        style={{
          ...style,
          width: width,
        }}
      />
      <FormFeedback>{feedback}</FormFeedback>
    </FormGroup>
  );
};

export default CdEmailInput;
