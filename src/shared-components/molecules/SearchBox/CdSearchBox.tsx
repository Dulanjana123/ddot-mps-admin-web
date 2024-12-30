import { CdFaIcon, CdInputLabel } from "@atoms/index";
import { InputSizes } from "@enums/components/InputEnum";
import React, { CSSProperties } from "react";
import { FormGroup, Input, InputGroup, InputGroupText } from "reactstrap";

type SearchInputProps = {
  id: string;
  size?: InputSizes;
  label?: string;
  placeHolder?: string;
  className?: string;
  onChange: (data: any) => void;
  onClick?: (data: any) => void;
  style?: CSSProperties;
  disabled?: boolean;
  value?: string;
};

const CdSearchBox: React.FC<SearchInputProps> = ({
  id,
  size = InputSizes.sm,
  className,
  placeHolder,
  label,
  onChange,
  onClick,
  style,
  disabled = false,
  value,
}) => {
  return (
    <FormGroup className="form-group">
      {label && <CdInputLabel labelText={label} size={size} id={id} />}
      <InputGroup className="border rounded-3 overflow-hidden">
        <InputGroupText className="bg-transparent border-0">
          <CdFaIcon icon={["fas", "search"]} />
        </InputGroupText>
        <Input
          aria-label={id}
          id={id}
          type="text"
          bsSize={size}
          className={`input-no-focus ${className}`}
          placeholder={placeHolder}
          onChange={onChange}
          onClick={onClick}
          style={{
            border: "none",
            ...style,
          }}
          disabled={disabled}
          value={value}
        />
      </InputGroup>
    </FormGroup>
  );
};

export default CdSearchBox;
