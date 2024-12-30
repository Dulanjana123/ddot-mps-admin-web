import React, { CSSProperties } from "react";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import { CdButton, CdSpinner } from "@atoms/index";
import { SpinnerSizes } from "@enums/components/SpinnerEnum";

type CustomButtonProps = {
  id: string;
  isLoading?: boolean;
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
  content: React.ReactNode;
};

const CdCustomButton: React.FC<CustomButtonProps> = ({
  id,
  isLoading,
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
  content,
}) => {
  return (
    <CdButton
      type={type}
      onClick={onClick}
      color={color}
      style={buttonStyle}
      block={block}
      size={size}
      className={className}
      disabled={disabled}
      outline={outline}
      id={id}
    >
      {isLoading ? (
        <CdSpinner style={spinnerStyle} size={SpinnerSizes.sm} />
      ) : (
        content
      )}
    </CdButton>
  );
};

export default CdCustomButton;
