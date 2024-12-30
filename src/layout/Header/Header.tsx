import { Row } from "reactstrap";
import HeaderLogo from "./HeaderLogo";
import SearchInput from "./SearchInput/SearchInput";
import { useAppSelector } from "@store/hooks";
import RightHeaderIcon from "./RightHeaderIcon/RightHeaderIcon";

const Header = () => {
  const { toggleSidebar, scroll } = useAppSelector((state) => state.layout);
  return (
    <Row
      className={`header-wrapper m-0 ${toggleSidebar ? "close_icon" : ""}`}
      style={{ display: scroll ? "none" : "" }}
    >
      <HeaderLogo />
      {/* <SearchInput /> */}
      <RightHeaderIcon />
    </Row>
  );
};

export default Header;
