import { Variant } from '@enums/components/CommonEnum';
import { SpinnerSizes, SpinnerTypes } from '@enums/components/SpinnerEnum';
import React, { CSSProperties } from 'react';
import { Spinner } from 'reactstrap';

export type SpinnerProps = {
  type?: SpinnerTypes;
  color?: Variant;
  className?: string;
  size?: SpinnerSizes;
  thickness?: string;
  style?: CSSProperties;
};

const CdSpinner: React.FC<SpinnerProps> = ({
  type = SpinnerTypes.Border,
  color = Variant.light,
  className,
  size,
  thickness,
  style,
}) => {
  return (
    <Spinner
      size={size}
      type={type}
      color={color}
      className={className}
      style={{
        ...style,
        borderWidth: thickness, // px value recommended
      }}
    />
  );
};

export default CdSpinner;
