import CdContainer from '@atoms/Container/CdContainer';
import { CdInputLabel } from '@atoms/index';
import { AlignItems, FlexDirection, JustifyContent } from '@enums/components/Container';
import { isEqualTo, isNullOrEmpty } from '@utils/stringValidation';
import React, { useEffect, useRef, useState } from 'react';
import { FormGroup, Input } from 'reactstrap';

type OtpInputProps = {
  id: string;
  label?: string;
  invalid?: boolean;
  feedback?: string;
  onChange: (data: string) => void;
  length?: number;
};

const CdOtpInput: React.FC<OtpInputProps> = ({ id, label, invalid = false, feedback, onChange, length = 6 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | HTMLTextAreaElement | null>>([]);

  useEffect(() => {
    const otpCombined = otp.join('');
    onChange(otpCombined);
  }, [otp]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newArr = [...otp];
    newArr[index] = isNaN(parseInt(value)) ? '' : value;
    setOtp(newArr);

    if (index < otp.length - 1 && !isNullOrEmpty(value)) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index > 0 && isNullOrEmpty(value)) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const { code } = event;

    //Avoid 'e' in number type input field
    if (isEqualTo(code, 'KeyE', false)) {
      event.preventDefault();
      return;
    }

    if (isEqualTo(code, 'ArrowUp') || isEqualTo(code, 'ArrowDown')) {
      event.preventDefault();
      return;
    }

    if (isEqualTo(code, 'ArrowLeft', false) || isEqualTo(code, 'ArrowRight', false)) {
      // Handle left and right arrow keys
      const nextIndex = isEqualTo(code, 'ArrowLeft', false) ? index - 1 : index + 1;

      if (nextIndex >= 0 && nextIndex < otp.length) {
        event.preventDefault();
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') ?? '';
    const isInvalidOtp = !!pastedText.match(/\D/); // check for non digits
    if (isInvalidOtp) return;
    const cleanedOtp = pastedText.trim();
    if (cleanedOtp.length === otp.length) {
      setOtp(pastedText.split(''));
    }
  };

  return (
    <FormGroup className="form-group">
      {label && (
        <div className="text-center mb-1">
          <CdInputLabel labelText={label} id={`${id}-label`} />
        </div>
      )}
      <CdContainer
        flex
        flexDirection={FlexDirection.row}
        justifyContent={JustifyContent.center}
        alignItems={AlignItems.center}
        gap="8px"
      >
        {otp.map((value, index) => (
          <Input
            aria-label={`${id}-${index}`}
            id={`${id}-${index}`}
            maxLength={1}
            value={value}
            invalid={invalid}
            key={`${id}-${index}`}
            className="square-input"
            type="number"
            innerRef={(input) => (inputRefs.current[index] = input)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handleOnPaste}
          />
        ))}
      </CdContainer>
      <p className="text-center feedback mt-2">{feedback}</p>
    </FormGroup>
  );
};

export default CdOtpInput;
