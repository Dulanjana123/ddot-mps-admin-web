import React from 'react';

type MainHeadingProps = {
  id: string;
  title: string;
  className?: string;
};

const CdMainHeading: React.FC<MainHeadingProps> = ({ id, title, className }) => {
  return (
    <div className={`main-heading-container ${className}`}>
      <h1 id={id} className="main-heading">
        {title}
      </h1>
    </div>
  );
};

export default CdMainHeading;
