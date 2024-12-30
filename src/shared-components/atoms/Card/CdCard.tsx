import { CSSProperties } from "react";
import { Card } from "reactstrap";

type CardProps = {
  className?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
};

const CdCard: React.FC<CardProps> = ({ className, children, style }) => {
  return (
    <Card className={className} style={style}>
      {children}
    </Card>
  );
};

export default CdCard;
