import React from 'react';

type LogoProps = {
  id: string;
  src: string;
  height?: number;
  width?: number;
  className?: string;
  onClick?: () => void;
};

const CdLogo: React.FC<LogoProps> = ({ id, src, height, width, className, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={className}
      style={{
        height: height,
        width: width,
        padding: 0,
        border: 'none',
        background: 'none',
      }}
      aria-label="Logo button"
    >
      <img
        alt="logo"
        src={src}
        style={{
          height: '100%',
          width: 'auto',
        }}
      />
    </button>
  );
};

export default CdLogo;
