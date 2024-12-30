import React from "react";
import CdTypography from "@atoms/Typography/CdTypography";
import { string } from "zod";

interface ProgressBarSegment {
  label: string;
  value: number;
  color: string;
  pattern?: boolean;
}

interface ProgressBarWidgetProps {
  title: string;
  subtitle?: string;
  segments: ProgressBarSegment[];
  className?: string;
  style?: React.CSSProperties;
}

const ProgressBarWidget: React.FC<ProgressBarWidgetProps> = ({
  title,
  subtitle,
  segments,
  className = "",
  style = {}, 
}) => {
  let total = 0;
  segments.forEach((item) => {total += item.value;});

  return (
    <div
      className={`border rounded p-3 bg-white shadow-sm mb-3 d-flex flex-column justify-content-between`}
      style={{ height: "100%", width: "100%", ...style }} // Merge provided style with default height
    >
     
      <div className="mb-4">
        <CdTypography className="mb-1 h6">{title}</CdTypography>
        <CdTypography className="text-secondary small">{subtitle}</CdTypography>
      </div>

      {/* Progress Bar Container */}
      <div className="progress mx-auto mb-4" style={{ height: "20px", width: "95%" }}>
        {segments.map((segment, index) => {
          const widthPercentage = (segment.value / total) * 100;
          return (
            <div
              key={index}
              className="position-relative"
              style={{
                width: `${widthPercentage}%`,
                backgroundColor: segment.pattern ? "transparent" : segment.color,
              }}
            >
              {/* Pattern Layer */}
              {segment.pattern && (
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${segment.color} 25%, transparent 25%, transparent 50%, ${segment.color} 50%, ${segment.color} 75%, transparent 75%, transparent)`,
                    backgroundSize: "8px 8px",
                    opacity: 0.8,
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
        {segments.map((segment, index) => (
          <div key={index} className="d-flex align-items-center gap-2">
            <span
              className="d-inline-block square"
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: segment.pattern ? "transparent" : segment.color,
                position: "relative",
              }}
            >
              {/* Pattern for Legend */}
              {segment.pattern && (
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${segment.color} 25%, transparent 25%, transparent 50%, ${segment.color} 50%, ${segment.color} 75%, transparent 75%, transparent)`,
                    backgroundSize: "8px 8px",
                    opacity: 0.8,
                  }}
                ></div>
              )}
            </span>
            <CdTypography className="fw-bold small">{segment.value}</CdTypography>
            <CdTypography className="small text-secondary">{segment.label}</CdTypography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBarWidget;
