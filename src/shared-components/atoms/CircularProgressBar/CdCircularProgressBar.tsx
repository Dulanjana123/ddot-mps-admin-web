import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

type CircularProgressBarProps = {
  value: number;
  minValue?: number;
  maxValue?: number;
  className?: string;
  text?: string;
  strokeWidth?: number;
  background?: boolean;
  backgroundPadding?: number;
  counterClockwise?: boolean;
  circleRatio?: number;
};

const CdCircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  minValue,
  maxValue,
  className,
  text,
  strokeWidth,
  background,
  backgroundPadding,
  counterClockwise,
  circleRatio,
}) => {
  return (
    <CircularProgressbar
      value={value}
      text={text}
      minValue={minValue}
      maxValue={maxValue}
      className={className}
      strokeWidth={strokeWidth}
      background={background}
      backgroundPadding={backgroundPadding}
      counterClockwise={counterClockwise}
      circleRatio={circleRatio}
    />
  );
};

export default CdCircularProgressBar;
