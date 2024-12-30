import { CdInputLabel } from "@atoms/index";
import { InputSizes } from "@enums/components/InputEnum";
import React, { CSSProperties, useEffect, useState } from "react";
import { FormFeedback, FormGroup, Input } from "reactstrap";

type MobileInputProps = {
  id: string;
  size?: InputSizes;
  valid?: boolean;
  invalid?: boolean;
  className?: string;
  placeHolder?: string;
  label?: string;
  onChange: (data: any) => void;
  defaultValue?: string;
  disabled?: boolean;
  style?: CSSProperties;
  feedback?: string;
  required?: boolean;
  mask?: string;
  width?: string;
  readonly?: boolean;
};

const CdMobileInput: React.FC<MobileInputProps> = ({
  id,
  size = InputSizes.sm,
  invalid,
  className,
  placeHolder,
  label,
  onChange,
  defaultValue = "",
  disabled = false,
  style,
  feedback,
  required,
  mask = "(999) 999-9999",
  valid,
  width,
  readonly = false,
}) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(formatPhoneNumber(defaultValue));
  }, [defaultValue]);

  const applyMask = (value: string): string => {
    let formattedValue = "";
    let valueIndex = 0;

    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      if (valueIndex >= value.length) break;

      if (mask[maskIndex] === "9") {
        if (/\d/.test(value[valueIndex])) {
          formattedValue += value[valueIndex];
          valueIndex++;
        } else {
          break;
        }
      } else {
        formattedValue += mask[maskIndex];
      }
    }
    return formattedValue;
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");
    return applyMask(phoneNumber);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setValue(formattedPhoneNumber);
    if (onChange) {
      onChange({ ...e, target: { ...e.target, value: formattedPhoneNumber } });
    }
  };

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
        invalid={invalid}
        valid={valid}
        value={value}
        disabled={disabled}
        className={className}
        placeholder={placeHolder}
        onChange={(e) => handleChange(e)}
        style={{
          ...style,
          width: width,
        }}
        readOnly={readonly}
      />
      <FormFeedback>{feedback}</FormFeedback>
    </FormGroup>
  );
};

export default CdMobileInput;
