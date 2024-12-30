import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Image, SVG } from "../../AbstractElements";
import { setToggleSidebar } from "@store/reducers/layoutSlice";
import { dynamicImage } from "@services/dynamic-image.service";

const LogoWrapper = () => {
  const dispatch = useAppDispatch();
  const { toggleSidebar } = useAppSelector((state) => state.layout);

  return (
    <>
      <div className="logo-wrapper">
        <Link to={`${process.env.PUBLIC_URL}/pages/sample_page`}>
          <Image
            className="img-fluid"
            src={dynamicImage("logo/logo.webp")}
            alt="logo"
          />
        </Link>
        <div className="toggle-sidebar">
          <SVG
            className={`sidebar-toggle`}
            iconId={`toggle-icon`}
            onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}
          />
        </div>
      </div>
      <div className="logo-icon-wrapper">
        <Link to={`${process.env.PUBLIC_URL}/pages/sample_page`}>
          <Image
            className="img-fluid"
            src={dynamicImage("logo/logo-icon.webp")}
            alt="logo"
          />
        </Link>
      </div>
    </>
  );
};

export default LogoWrapper;
