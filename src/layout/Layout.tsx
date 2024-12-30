import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setToggleSidebar } from "@store/reducers/layoutSlice";
import { setLayout } from "@store/reducers/themeCustomizerSlice";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Loader from "./Loader/Loader";
import Sidebar from "./Sidebar/Sidebar";
import TapTop from "./TapTop/TapTop";
import ThemeCustomizer from "./ThemeCustomizer/ThemeCustomizer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  const { layout } = useAppSelector((state) => state.themeCustomizer);
  const { toggleSidebar, scroll } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();
  const compactSidebar = () => {
    let windowWidth = window.innerWidth;
    if (layout === "compact-wrapper") {
      if (windowWidth < 1200) {
        dispatch(setToggleSidebar(true));
      } else {
        dispatch(setToggleSidebar(false));
      }
    } else if (layout === "horizontal-wrapper") {
      if (windowWidth < 992) {
        dispatch(setToggleSidebar(true));
        dispatch(setLayout("compact-wrapper"));
      } else {
        dispatch(setToggleSidebar(false));
        dispatch(setLayout(localStorage.getItem("layout")));
      }
    }
  };
  useEffect(() => {
    compactSidebar();
    window.addEventListener("resize", () => {
      compactSidebar();
    });
  }, [layout]);
  return (
    <>
      <Loader />
      <TapTop />
      <div className={`page-wrapper ${layout}`}>
        <div
          className={`page-header ${toggleSidebar ? "close_icon" : ""}`}
          style={{ display: scroll ? "none" : "" }}
        >
          <Header />
        </div>
        <div className={`page-body-wrapper ${scroll ? "scorlled" : ""}`}>
          <Sidebar />
          {children}
          <Footer />
        </div>
      </div>
      {/* <ThemeCustomizer /> */}
    </>
  );
};

export default Layout;
