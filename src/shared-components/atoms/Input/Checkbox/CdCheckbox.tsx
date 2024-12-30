import React, { CSSProperties } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

type CheckboxProps = {
  id: string;
  label?: string;
  checked?: boolean;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  style?: CSSProperties;
  defaultChecked?: boolean;
};

const CdCheckboxInput: React.FC<CheckboxProps> = ({
  id,
  label,
  checked = false,
  className,
  onChange,
  disabled = false,
  required = false,
  style,
  defaultChecked = false,
}) => {
  return (
    <FormGroup check className={className} style={style}>
      <Input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-label={label || id}
        defaultChecked={defaultChecked}
      />
      {label && (
        <Label for={id} check>
          {label}
        </Label>
      )}
    </FormGroup>
  );
};

export default CdCheckboxInput;
