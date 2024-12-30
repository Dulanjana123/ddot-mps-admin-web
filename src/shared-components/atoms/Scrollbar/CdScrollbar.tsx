import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

type ScrollbarProps = {
  children?: React.ReactNode;
  wheelPropagation?: boolean;
  wheelSpeed?: number;
  swipeEasing?: boolean;
  useBothWheelAxes?: boolean;
  suppressScrollX?: boolean; //Disable x axis scrollbar
  suppressScrollY?: boolean; //Disable y axis scrollbar
  style?: React.CSSProperties;
};

const CdScrollbar: React.FC<ScrollbarProps> = ({
  wheelPropagation = false,
  children,
  wheelSpeed = 1,
  swipeEasing = true,
  useBothWheelAxes = false,
  suppressScrollX = false,
  suppressScrollY = false,
  style,
}) => {
  return (
    <PerfectScrollbar
      options={{
        wheelPropagation: wheelPropagation,
        wheelSpeed: wheelSpeed,
        swipeEasing: swipeEasing,
        useBothWheelAxes: useBothWheelAxes,
        suppressScrollX: suppressScrollX,
        suppressScrollY: suppressScrollY,
      }}
      style={{
        ...style,
        position: 'absolute',
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </PerfectScrollbar>
  );
};

export default CdScrollbar;
