import { CdModal, CdContainer, CdButton } from "@atoms/index";
import globalAppConfig from "@config/global-app-config";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import { JustifyContent } from "@enums/components/Container";
import useCountdownTimer from "@hooks/useCountdownTimer";
import { authDatService } from "@services/data/AuthDataService";
import { IPInfoContext } from "ip-info-react";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
interface TimerComponentProps {
  logout: () => void;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ logout }) => {
  const userInfo = useContext(IPInfoContext);
  const { t } = useTranslation(["timeout", "common"]);
  const warningTimeout = globalAppConfig.sessiontimeoutInit;
  const timeoutTime = globalAppConfig.sessiontimeout;

  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showTimeOut, setShowTimeOut] = useState<boolean>(false);
  const { timeLeft, resetTimer, startTimer, formatTime } =
    useCountdownTimer(timeoutTime);
  let timer: NodeJS.Timeout;
  const handleActivity = useCallback(() => {
    if (!showTimeOut && !showWarning) {
      if (timer) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          setShowWarning(true);
          startTimer();
        }, warningTimeout * 1000);
      }
    }
  }, [warningTimeout, startTimer]);

  useEffect(() => {
    const activityListener = () => handleActivity();
    window.addEventListener("mousemove", activityListener);
    window.addEventListener("keypress", activityListener);

    timer = setTimeout(() => {
      setShowWarning(true);
      startTimer();
    }, warningTimeout * 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      window.removeEventListener("mousemove", activityListener);
      window.removeEventListener("keypress", activityListener);
    };
  }, [handleActivity, warningTimeout, startTimer]);

  useEffect(() => {
    if (timeLeft === 0) {
      authDatService.resetSession(userInfo.ip ?? "");
      setShowWarning(false);
      if (timer) {
        clearTimeout(timer);
      }
      const activityListener = () => handleActivity();
      window.removeEventListener("mousemove", activityListener);
      window.removeEventListener("keypress", activityListener);
      setShowTimeOut(true);
    }
  }, [timeLeft, logout, handleActivity]);

  const handleStaySignedIn = () => {
    setShowWarning(false);
    resetTimer();
    handleActivity();
  };
  const handleSignIn = () => {
    setShowWarning(false);
    setShowTimeOut(false);
    if (timer) {
      clearTimeout(timer);
    }
    const activityListener = () => handleActivity();
    window.removeEventListener("mousemove", activityListener);
    window.removeEventListener("keypress", activityListener);
    setShowTimeOut(true);

    logout();
  };

  const toggle = () => {};

  return (
    <>
      {showWarning && (
        <CdModal
          isOpen={showWarning}
          toggle={toggle}
          showFooter={false}
          className="text-center"
          id={"system-message-modal"}
          body={
            <>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {" "}
                {t("timeout:ABOUT_TO_TIME_OUT")}
              </span>
              <p></p>
              <p className={`instruction`}>
                {t("timeout:ABOUT_TO_TIME_OUT_MESSAGE")}
              </p>
              <p className="instruction">{`${t(
                "timeout:LOGOUT_IN"
              )} ${formatTime(timeLeft)}`}</p>
              <CdContainer
                flex
                justifyContent={JustifyContent.center}
                className="button-container"
              >
                <CdButton
                  onClick={logout}
                  text={t("timeout:SIGNOUT")}
                  outline
                  size={ButtonSizes.sm}
                  color={Variant.primary}
                  id={"signin-out"}
                />
                <CdButton
                  text={t("timeout:STAY_SIGNEDIN")}
                  size={ButtonSizes.sm}
                  type={ButtonTypes.submit}
                  id={"signin-button"}
                  onClick={handleStaySignedIn}
                />
              </CdContainer>
            </>
          }
        ></CdModal>
      )}

      {showTimeOut && (
        <CdModal
          isOpen={showTimeOut}
          toggle={toggle}
          showFooter={false}
          className="text-center"
          id={"system-message-modal"}
          body={
            <>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {t("timeout:TIMED_OUT")}
              </span>
              <p></p>
              <p className={`instruction`}>
                {t("timeout:TIMED_OUT_MESSAGE_ONE")}
              </p>
              <p className="instruction">
                {t("timeout:TIMED_OUT_MESSAGE_TWO")}
              </p>
              <CdContainer
                flex
                justifyContent={JustifyContent.center}
                className="button-container"
              >
                <CdButton
                  text={"Close"}
                  outline
                  size={ButtonSizes.sm}
                  color={Variant.primary}
                  id={"signin-out"}
                />
                <CdButton
                  text={t("timeout:SIGNIN")}
                  size={ButtonSizes.sm}
                  type={ButtonTypes.submit}
                  id={"signin-button"}
                  onClick={handleSignIn}
                />
              </CdContainer>
            </>
          }
        ></CdModal>
      )}
    </>
  );
};

export default TimerComponent;
