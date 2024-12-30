import { Link } from "react-router-dom";
import Image from "@common-elements/Media";
import { dynamicImage } from "@services/dynamic-image.service";
import { SVG } from "../../AbstractElements";
import { setToggleSidebar } from "@store/reducers/layoutSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const HeaderLogo = () => {
  const dispatch = useAppDispatch();
  const { toggleSidebar } = useAppSelector((state) => state.layout);
  return (
    <div className="header-logo-wrapper col-auto p-0">
      <div className="logo-wrapper">
        <Link to={`${process.env.PUBLIC_URL}/pages/sample_page`}>
          <Image
            className="img-fluid for-light"
            src={dynamicImage("logo/logo.webp")}
            alt="logo"
          />
          <Image
            className="img-fluid for-dark"
            src={dynamicImage("logo/logo.webp")}
            alt="logo"
          />
        </Link>
      </div>
      <div className="toggle-sidebar">
        <SVG
          className="sidebar-toggle"
          iconId="stroke-animation"
          onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}
        />
      </div>
    </div>
  );
};

export default HeaderLogo;
