import { Link } from "react-router-dom";
import { H6, Image, LI, UL } from "../../AbstractElements";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import LogoWrapper from "./LogoWrapper";
import SimpleBar from "simplebar-react";
import { Back, Pinned } from "@utils/Constant";
import { dynamicImage } from "@services/dynamic-image.service";
import { ArrowLeft, ArrowRight } from "react-feather";
import SidebarMenuList from "./SidebarMenuList";
import { scrollToLeft, scrollToRight } from "@store/reducers/layoutSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { layout } = useAppSelector((state) => state.themeCustomizer);
  const { toggleSidebar, margin } = useAppSelector((state) => state.layout);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  return (
    <div className={`sidebar-wrapper ${toggleSidebar ? "close_icon" : ""}`}>
      <div>
        <LogoWrapper />
        <nav className="sidebar-main">
          <div
            className={`left-arrow ${margin === 0 ? "disabled" : ""}`}
            onClick={() => dispatch(scrollToLeft())}
          >
            <ArrowLeft />
          </div>
          <div
            id="sidebar-menu"
            style={{
              marginLeft:
                layout === "horizontal-wrapper" ? `${margin}px` : "0px",
            }}
          >
            <UL className="sidebar-links" id="simple-bar">
              <SimpleBar style={{ margin: "0px" }}>
                <LI className="back-btn">
                  <Link to={`${process.env.PUBLIC_URL}/pages/sample_page`}>
                    <Image
                      className="img-fluid"
                      src={dynamicImage("logo/logo-icon.webp")}
                      alt="logo"
                    />
                  </Link>
                  <div className="mobile-back text-end ">
                    <span>{Back}</span>
                    <i
                      className="fa fa-angle-right ps-2"
                      aria-hidden="true"
                    ></i>
                  </div>
                </LI>
                <LI
                  className={`pin-title sidebar-main-title ${
                    pinedMenu.length > 1 ? "show" : ""
                  } `}
                >
                  <div>
                    <H6>{Pinned}</H6>
                  </div>
                </LI>
                <SidebarMenuList />
              </SimpleBar>
            </UL>
          </div>
          <div
            className={`right-arrow ${margin === -3500 ? "disabled" : ""}`}
            onClick={() => dispatch(scrollToRight())}
          >
            <ArrowRight />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
