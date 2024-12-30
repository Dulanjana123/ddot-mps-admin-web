import React from "react";
import { FormFeedback, FormGroup, Input, InputProps } from "reactstrap";
import { InputSizes } from "@enums/components/InputEnum";
import CdInputLabel from "@atoms/Label/CdInputLabel";

interface TextAreaInputProps extends InputProps {
  height?: number | string;
  feedback?: string;
}

const CdTextArea: React.FC<TextAreaInputProps> = ({
  id,
  label,
  size = InputSizes.sm,
  feedback,
  required,
  height = 8,
  ...props
}) => {
  return (
    <FormGroup className="form-group">
      {label && (
        <CdInputLabel
          labelText={label}
          size={size as string}
          required={required}
          id={id}
        />
      )}
      <Input
        {...props}
        type="textarea"
        style={{ height: `${height}rem`, ...props.style }}
      />
      <FormFeedback>{feedback}</FormFeedback>
    </FormGroup>
  );
};

export default CdTextArea;
