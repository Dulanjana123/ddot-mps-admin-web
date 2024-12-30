import React, { ElementType, Ref } from 'react';
import { Input } from 'reactstrap';

export enum INPUT_SIZES {
  sm = 'sm',
  lg = 'lg',
}

export enum INPUT_TYPE {
  TEXT = 'text',
  TEL = 'tel',
  SWITCH = 'switch',
  SUBMIT = 'submit',
  SELECT = 'select',
  SEARCH = 'search',
  RESET = 'reset',
  RANGE = 'range',
  RADIO = 'radio',
  PASSWORD = 'password',
  NUMBER = 'number',
  MONTH = 'month',
  FILE = 'file',
  EMAIL = 'email',
  DATETIMELOCAL = 'datetime-local',
  DATE = 'date',
  COLOR = 'color',
  CHECKBOX = 'checkbox',
  BUTTON = 'button',
}

type InputProps = {
  inpChildren?: React.ReactNode;
  inpType: INPUT_TYPE;
  inpBsSize?: INPUT_SIZES;
  inpValid?: boolean;
  inpInvalid?: boolean;
  inpTag?: ElementType;
  inpInnerRef?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  inpPlaintext?: boolean;
  inpAddon?: boolean;
  inpClassName?: string;
  inpCssModule?: {};
  inpPlaceHolder?: string;
};

const ATInput: React.FC<InputProps> = ({
  inpChildren,
  inpType,
  inpBsSize,
  inpValid,
  inpInvalid,
  inpTag,
  inpInnerRef,
  inpPlaintext,
  inpAddon,
  inpClassName,
  inpCssModule,
  inpPlaceHolder,
}) => {
  return (
    <Input
      type={inpType}
      bsSize={inpBsSize}
      valid={inpValid}
      invalid={inpInvalid}
      tag={inpTag}
      innerRef={inpInnerRef}
      plaintext={inpPlaintext}
      addon={inpAddon}
      className={inpClassName}
      cssModule={inpCssModule}
      placeholder={inpPlaceHolder}
    >
      {inpChildren}
    </Input>
  );
};

export default ATInput;
