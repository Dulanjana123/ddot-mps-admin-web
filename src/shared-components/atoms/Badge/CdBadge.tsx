import { SoftVariant } from "@enums/components/CommonEnum";
import React from "react";
import { Badge, BadgeProps } from "reactstrap";

interface CdBadgeProps extends BadgeProps {
  id: string;
  text: string;
  color?: SoftVariant | string;
}

const CdBadge: React.FC<CdBadgeProps> = ({
  id,
  color = SoftVariant.Info,
  text,
  ...props
}) => {
  return (
    <Badge
      id={id}
      color={color}
      pill
      {...props}
      style={{ color: "black", ...props.style }}
    >
      {text}
    </Badge>
  );
};

export default CdBadge;
