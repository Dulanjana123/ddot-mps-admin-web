import {
  FlexDirection,
  JustifyContent,
  AlignItems,
} from "@enums/components/Container";
import React, { CSSProperties } from "react";
import { Container } from "reactstrap";

type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
  backgroundColor?: string;
  width?: string;
  height?: string;
  flex?: boolean;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  gap?: string;
  style?: CSSProperties;
  fluid?: boolean | string;
};

const CdContainer: React.FC<ContainerProps> = ({
  className,
  children,
  backgroundColor,
  width,
  height,
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  style,
  fluid = true,
}) => {
  return (
    <Container
      fluid={fluid}
      className={className}
      style={{
        ...style,
        display: flex ? "flex" : undefined,
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        gap: gap,
      }}
    >
      {children}
    </Container>
  );
};

export default CdContainer;
