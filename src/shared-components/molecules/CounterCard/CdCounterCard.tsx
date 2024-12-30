import CdCard from "@atoms/Card/CdCard";
import CommonCardHeader from "@common-elements/CommonCardHeader/CommonCardHeader";
import React, { CSSProperties } from "react";

type CounterCardProps = {
  title: string;
  count?: number;
  onClick?: () => void;
  headClass?: string;
  className?: string;
  style?: CSSProperties;
};

const CdCounterCard: React.FC<CounterCardProps> = ({
  title,
  count = 0,
  onClick,
  headClass,
  className,
  style,
}) => {
  return (
    <CdCard className="h-100">
      <CommonCardHeader
        headClass={`d-flex justify-content-center text-center ${headClass}`}
        title={title}
      />
      <div className={`d-flex justify-content-center p-3 pt-0 ${className}`}>
        <h2
          className={`me-2 ${onClick && "counter-card-count"}`}
          onClick={onClick}
          style={{ ...style, cursor: `${onClick && "pointer"}` }}
        >
          {count}
        </h2>
      </div>
    </CdCard>
  );
};

export default CdCounterCard;
