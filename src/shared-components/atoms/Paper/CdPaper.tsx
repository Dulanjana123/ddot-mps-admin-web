import React, { CSSProperties } from 'react';
import { Container } from 'reactstrap';

type PaperProps = {
  className?: string;
  children?: React.ReactNode;
  elevation?: number; // Optional prop for elevation (shadow)
  rounded?: boolean; // Optional prop for rounded corners
  style?: CSSProperties;
  fluid?: boolean;
};

const CdPaper: React.FC<PaperProps> = ({ children, elevation, rounded, className, style, fluid = false }) => {
  let paperClassNames = `${className} paper `;

  if (elevation) {
    paperClassNames += ` paper-elevation-${elevation}`;
  }

  if (rounded) {
    paperClassNames += ` paper-rounded`;
  }

  return (
    <Container fluid={fluid} className={paperClassNames} style={{ ...style }}>
      {children}
    </Container>
  );
};

export default CdPaper;
