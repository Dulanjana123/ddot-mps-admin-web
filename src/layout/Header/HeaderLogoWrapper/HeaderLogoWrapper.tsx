import { Link } from "react-router-dom";
import Image from "@common-elements/Media";
import { SVG } from "../../../AbstractElements";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { setToggleSidebar } from "@store/reducers/layoutSlice";

const HeaderLogoWrapper = () => {
  const dispatch = useAppDispatch();
  const { toggleSidebar } = useAppSelector((state) => state.layout);
  return (
    <div className="header-logo-wrapper col-auto p-0">
      <div className="logo-wrapper">
        <Link to={"/"}>
          <Image className="img-fluid" src={""} alt="CrocsLogo" />
        </Link>
      </div>
      <div className="toggle-sidebar">
        <SVG
          className="stroke-icon sidebar-toggle status_toggle middle"
          iconId={"toggle-icon"}
          onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}
        ></SVG>
      </div>
    </div>
  );
};

export default HeaderLogoWrapper;
