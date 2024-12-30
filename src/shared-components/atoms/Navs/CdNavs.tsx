import { NavlinkHrAlignment } from '@enums/components/NavsEnum';
import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export type NavLinkType = {
  id: string;
  href: string;
  navText: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

type NavProps = {
  links: NavLinkType[];
  verticle?: boolean;
  textJustified?: boolean;
  fill?: boolean;
  pills?: boolean;
  linkHrAlignment?: NavlinkHrAlignment;
};

const CdNavs: React.FC<NavProps> = ({ links, verticle, textJustified, fill, pills, linkHrAlignment }) => {
  const navItems = links.map((item) => (
    <NavItem key={item.id}>
      <NavLink id={item.id} active={item.active} href={item.href} disabled={item.disabled} onClick={item.onClick}>
        {item.navText}
      </NavLink>
    </NavItem>
  ));

  return (
    <Nav
      vertical={verticle}
      justified={textJustified}
      fill={fill}
      pills={pills}
      horizontal={linkHrAlignment}
      className="me-auto"
      navbar
    >
      {navItems}
    </Nav>
  );
};

export default CdNavs;
