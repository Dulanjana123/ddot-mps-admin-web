import CdCardBody from "@atoms/Card/CardBody";
import CdCard from "@atoms/Card/CdCard";
import { CdButton } from "@atoms/index";
import CdTypography from "@atoms/Typography/CdTypography";
import { ReactNode } from "react";

interface InfoCardProps {
  children: ReactNode;
  indicatorColor?: string; 
  indicatorColorWidth?: string;
  pattern?: boolean; 
  onClick?: () => void;
  buttonContent?: ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  children,
  onClick,
  indicatorColor,
  indicatorColorWidth = "15px",
  pattern = false, 
  buttonContent = "Remove",
  className,
}: InfoCardProps) => {
  return (
    <CdCard className="border-0">
      <CdCardBody className="p-0">
        <div className={`rounded-2 d-flex align-items-center position-relative p-3 border-bottom mb-1 ${className}`}>
          {/* Indicator with Pattern */}
          {indicatorColor && (
            <div
              className="position-absolute top-0 bottom-0 start-0 rounded-start"
              style={{width: indicatorColorWidth, backgroundColor: pattern ? "transparent" : indicatorColor, position: "relative"}}
            >
              {/* Optional Pattern Layer */}
              {pattern && (
                <div
                  className="position-absolute top-0 start-0 rounded-start w-100 h-100"
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${indicatorColor} 25%, transparent 25%, transparent 50%, ${indicatorColor} 50%, ${indicatorColor} 75%, transparent 75%, transparent)`,
                    backgroundSize: "8px 8px",
                    opacity: 0.8,
                  }}
                ></div>
              )}
            </div>
          )}

          <div className="ms-4 d-flex align-items-center">
            <CdTypography className="text-secondary fw-semibold">
              {children}
            </CdTypography>
          </div>

          {onClick && (
            <CdButton className="ms-auto p-0 d-flex align-items-right no-blink" onClick={onClick}>
              {buttonContent}
            </CdButton>
          )}
        </div>
      </CdCardBody>
    </CdCard>
  );
}

export default InfoCard;
