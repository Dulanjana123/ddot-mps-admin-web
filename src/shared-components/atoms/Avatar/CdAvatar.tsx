/*----Important-----*/
// You can create an avatar using either a textual name(name: Display first two letters of the firstname and lastname) or image(imgSrc).

import React from 'react';

type AvatarProps = {
  id: string;
  name?: string;
  size?: number;
  fontSize?: number;
  imgSrc?: string;
  borderWidth?: number;
  borderColor?: string;
  className?: string;
  onClick?: () => void;
};

const CdAvatar: React.FC<AvatarProps> = ({
  id,
  name,
  size = 50,
  fontSize,
  imgSrc,
  borderColor,
  borderWidth,
  className,
  onClick,
}) => {
  const getInitials = (name: string) => {
    if (name.includes(' ')) {
      return `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`;
    } else if (!name.includes(' ')) {
      return `${name.split(' ')[0][0].toUpperCase()}`;
    }
  };

  const generateBackground = (name: string) => {
    let hash = 1;
    for (let i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';

    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  let initials;
  let color;

  if (name) {
    initials = getInitials(name.trim());
    color = generateBackground(name.trim());
  }

  const letterCustomStyle = {
    display: 'flex',
    height: !className ? `${size}px` : undefined,
    width: !className ? `${size}px` : undefined,
    borderRadius: '100px',
    color: 'white',
    background: color,
    margin: 'auto',
    fontSize: fontSize ? `${fontSize}px` : '16px',
  };

  const imageCustomStyle = {
    display: 'flex',
    height: !className ? `${size}px` : undefined,
    width: !className ? `${size}px` : undefined,
    borderRadius: '100px',
    borderColor: 'red',
    border: `${borderWidth}px solid ${borderColor}`,
  };

  return (
    <>
      {name && (
        <div
          id={id}
          style={{ ...letterCustomStyle, cursor: onClick && 'pointer' }}
          className={className}
          onClick={onClick}
        >
          <span style={{ margin: 'auto' }}> {initials} </span>
        </div>
      )}
      {imgSrc && (
        <img
          id={id}
          src={imgSrc}
          style={{ ...imageCustomStyle, cursor: onClick && 'pointer' }}
          className={className}
          alt={id}
          onClick={onClick}
        />
      )}
    </>
  );
};

export default CdAvatar;
