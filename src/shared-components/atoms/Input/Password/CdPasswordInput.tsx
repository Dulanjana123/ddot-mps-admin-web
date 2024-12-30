import React, { CSSProperties, useState } from 'react';
import { Button, FormFeedback, FormGroup, Input, InputGroup } from 'reactstrap';
import { InputSizes } from '@enums/components/InputEnum';
import { Variant } from '@enums/components/CommonEnum';
import { CdInputLabel } from '@atoms/index';

type PasswordInputProps = {
  id: string;
  size?: InputSizes;
  valid?: boolean;
  invalid?: boolean;
  plainText?: boolean;
  addon?: boolean;
  className?: string;
  placeHolder?: string;
  label?: string;
  onChange: (data: any) => void;
  defaultValue?: string;
  width?: string;
  onFocus?: () => void;
  style?: CSSProperties;
  required?: boolean;
  feedback?: string;
  showPasswordText?: string;
  hidePasswordText?: string;
};

const CdPasswordInput: React.FC<PasswordInputProps> = ({
  id,
  size = InputSizes.sm,
  valid,
  invalid,
  plainText,
  addon,
  className,
  placeHolder,
  label,
  onChange,
  defaultValue,
  width,
  style,
  onFocus,
  required = false,
  feedback,
  showPasswordText = 'Show',
  hidePasswordText = 'Hide',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FormGroup className="form-group">
      {label && <CdInputLabel labelText={label} size={size} required={required} id={id} />}
      <InputGroup style={{ width: width }}>
        <Input
          aria-label={id}
          id={id}
          type={showPassword ? 'text' : 'password'}
          bsSize={size}
          valid={valid}
          invalid={invalid}
          plaintext={plainText}
          addon={addon}
          className={className}
          placeholder={placeHolder}
          onChange={onChange}
          defaultValue={defaultValue}
          onFocus={onFocus}
          style={{
            ...style,
          }}
        />
        <Button
          onClick={togglePasswordVisibility}
          color={Variant.link}
          style={{
            backgroundColor: 'white',
            borderColor: '#dee2e6',
            borderLeft: '0',
          }}
          size={size}
        >
          {showPassword ? hidePasswordText : showPasswordText}
        </Button>
        <FormFeedback>{feedback}</FormFeedback>
      </InputGroup>
    </FormGroup>
  );
};

export default CdPasswordInput;
