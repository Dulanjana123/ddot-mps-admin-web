import React, { CSSProperties } from 'react';
import { ButtonSizes, ButtonTypes } from '@enums/components/ButtonEnum';
import { Variant } from '@enums/components/CommonEnum';
import { CdButton, CdSpinner } from '@atoms/index';
import { SpinnerSizes } from '@enums/components/SpinnerEnum';

type LoadingButtonProps = {
  id: string;
  isLoading: boolean;
  text: string;
  onClick?: () => void;
  color?: Variant;
  size?: ButtonSizes;
  buttonStyle?: CSSProperties;
  spinnerStyle?: CSSProperties;
  block?: boolean;
  outline?: boolean;
  className?: string;
  type?: ButtonTypes;
  disabled?: boolean;
};

const CdLoadingButton: React.FC<LoadingButtonProps> = ({
  id,
  isLoading,
  text,
  onClick,
  color = Variant.secondary,
  buttonStyle,
  spinnerStyle,
  block,
  size = ButtonSizes.sm,
  className,
  type,
  disabled,
  outline = false,
}) => {
  return (
    <CdButton
      type={type}
      onClick={onClick}
      text={!isLoading ? text : undefined}
      color={color}
      style={buttonStyle}
      block={block}
      size={size}
      className={className}
      disabled={disabled}
      outline={outline}
      id={id}
    >
      {isLoading ? <CdSpinner style={spinnerStyle} size={SpinnerSizes.sm} /> : undefined}
    </CdButton>
  );
};

export default CdLoadingButton;
