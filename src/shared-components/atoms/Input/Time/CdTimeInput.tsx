import CdInputLabel from "@atoms/Label/CdInputLabel";
import { InputSizes } from "@enums/components/InputEnum";
import { CSSProperties } from "react";
import { FormFeedback, FormGroup, Input } from "reactstrap";

type TimeInputProps = {
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
  readonly?: boolean;
};

const CdTimeInput: React.FC<TimeInputProps> = ({
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
        readOnly={readonly}
        style={{
          ...style,
          width: width,
        }}
        type="time"
      />
      <FormFeedback>{feedback}</FormFeedback>
    </FormGroup>
  );
};

export default CdTimeInput;
