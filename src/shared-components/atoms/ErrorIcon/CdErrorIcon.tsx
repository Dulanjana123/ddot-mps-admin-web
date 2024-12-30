import React from "react";
// import tickIcon from '@icons/tick.svg';
// import closeIcon from '@icons/close.svg';

type ErrIconProps = {
  isFulfilled?: boolean;
  size?: number;
};

const CdErrorIcon: React.FC<ErrIconProps> = ({
  isFulfilled = false,
  size = 24,
}) => {
  return (
    <img
      alt="logo"
      src={""}
      style={{
        height: size,
        width: size,
      }}
    />
  );
};

export default CdErrorIcon;
