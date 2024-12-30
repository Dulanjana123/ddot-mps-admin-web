import { useState, useEffect } from "react";

const useCountdownTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  let timer: NodeJS.Timeout;
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        localStorage.setItem("otp-left", timeLeft.toString());
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(initialTime);
    localStorage.setItem("otp-left", initialTime.toString());
    setIsActive(true);
  };
  const resetTimer = () => {
    clearTimeout(timer);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0
      ? `${minutes} minutes ${remainingSeconds} seconds`
      : `${remainingSeconds} seconds`;
  };

  return { timeLeft, isActive, startTimer, resetTimer, formatTime };
};

export default useCountdownTimer;
