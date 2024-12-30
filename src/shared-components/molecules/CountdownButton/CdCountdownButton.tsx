import React, { useEffect } from "react";
import { Variant } from "@enums/components/CommonEnum";
import useCountdownTimer from "@hooks/useCountdownTimer";
import { CdButton } from "@atoms/index";

type CountdownButtonProps = {
  id: string;
  initialTime: number;
  onResend: () => void;
  text: string;
  triggerOnLoad?: boolean;
};

const CdCountdownButton: React.FC<CountdownButtonProps> = ({
  initialTime,
  onResend,
  text,
  id,
  triggerOnLoad,
}) => {
  useEffect(() => {
    if (triggerOnLoad) {
      startTimer();
    }
  }, [triggerOnLoad]);

  const { timeLeft, isActive, startTimer, formatTime } =
    useCountdownTimer(initialTime);

  const handleClick = () => {
    onResend();
    startTimer();
  };

  return (
    <CdButton
      onClick={handleClick}
      text={isActive ? `${text} in ${formatTime(timeLeft)}` : text}
      color={Variant.link}
      disabled={isActive}
      id={id}
    />
  );
};

export default CdCountdownButton;
