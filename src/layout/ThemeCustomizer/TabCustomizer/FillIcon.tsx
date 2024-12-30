import { Badges, LI } from "../../../AbstractElements";
import { useAppSelector } from "@store/state-hooks";
import { SidebarIconProp } from "@layout/ThemeCustomizerTypes";
import { Fill } from "@utils/Constant";
import CommonUL from "./CommonUL";

const FillIcon = ({ handleSideBarIconType }: SidebarIconProp) => {
  const { sidebarIconType } = useAppSelector((state) => state.themeCustomizer);
  return (
    <LI
      className={`border-0 ${sidebarIconType === "fill" ? "active" : ""}`}
      onClick={() => handleSideBarIconType("fill")}
    >
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body bg-light">
        <Badges color="primary">{Fill}</Badges>
      </div>
    </LI>
  );
};

export default FillIcon;
