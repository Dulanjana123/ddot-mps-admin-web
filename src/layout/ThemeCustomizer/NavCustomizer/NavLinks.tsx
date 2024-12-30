import { Image } from "../../../AbstractElements";
import { navLinkList } from "@data/layout-data/theme-customizer-data";
import { NavLink } from "reactstrap";

const NavLinks = () => {
  return (
    <>
      {navLinkList &&
        navLinkList.map((item, index) => (
          <NavLink key={index} href={item.path} target="_blank">
            <div>
              <Image src={""} alt="icons" />
            </div>
            <span>{item.name}</span>
          </NavLink>
        ))}
    </>
  );
};

export default NavLinks;
