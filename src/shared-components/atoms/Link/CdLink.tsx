import { Variant } from '@enums/components/CommonEnum';
import React from 'react';
import { Link } from 'react-router-dom';

type LinkProps = {
  id: string;
  text: string;
  href: string;
  type?: Variant;
  noUnderline?: boolean;
  onClick?: () => void;
};

const CdLink: React.FC<LinkProps> = ({ id, text, href, type = Variant.primary, noUnderline = false, onClick }) => {
  return (
    <Link onClick={onClick} id={id} className={`common-link-${type} ${noUnderline && 'no-underline'}`} to={href}>
      {text}
    </Link>
  );
};

export default CdLink;
