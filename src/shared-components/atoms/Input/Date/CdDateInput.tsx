import { FormFeedback, FormGroup, Input } from "reactstrap";
import CdInputLabel from "../../Label/CdInputLabel";
import { InputSizes } from "@enums/components/InputEnum";
import { CSSProperties } from "react";

type DateInputProps = {
  id: string;
  size?: InputSizes;
  valid?: boolean;
  invalid?: boolean;
  className?: string;
  placeHolder?: string;
  label?: string;
  onChange: (data: any) => void;
  defaultValue?: string;
  value?: string;
  width?: string;
  style?: CSSProperties;
  feedback?: string;
  required?: boolean;
  onFocus?: () => void;
  disabled?: boolean;
  readonly?: boolean;
};

const CdDateInput: React.FC<DateInputProps> = ({
  size = InputSizes.sm,
  valid,
  invalid,
  className,
  placeHolder,
  label,
  onChange,
  defaultValue,
  value,
  width,
  style,
  feedback,
  required,
  onFocus,
  id,
  disabled = false,
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
        bsSize={size}
        valid={valid}
        invalid={invalid}
        className={className}
        placeholder={placeHolder}
        onChange={(e) => onChange(e)}
        onFocus={onFocus}
        value={value}
        defaultValue={defaultValue}
        style={{
          ...style,
          width: width,
        }}
        type="date"
        disabled={disabled}
        readOnly={readonly}
      />
      <FormFeedback>{feedback}</FormFeedback>
    </FormGroup>
  );
};

export default CdDateInput;
