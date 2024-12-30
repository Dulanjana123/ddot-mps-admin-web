import { ReactNode } from "react";

interface CdTypographyProps {
  children?: ReactNode;
  className?: string;
}

const CdTypography: React.FC<CdTypographyProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default CdTypography;
