import { H6, LI, UL } from "../../../AbstractElements";
import { darkColorData } from "@data/layout-data/theme-customizer-data";
import { useAppDispatch } from "@store/state-hooks";
import { setDarkMode } from "@store/reducers/layoutSlice";
import { PropsLightColor } from "@layout/ThemeCustomizerTypes";
import { DarkLayout } from "@utils/Constant";

const ColorDarkLayout = () => {
  const dispatch = useAppDispatch();
  const handleColor = (data: PropsLightColor) => {
    dispatch(setDarkMode(true));
    document.documentElement.style.setProperty("--theme-default", data.primary);
    document.documentElement.style.setProperty(
      "--theme-secondary",
      data.secondary
    );
  };
  return (
    <>
      <H6>{DarkLayout}</H6>
      <UL className="layout-grid customizer-color flex-row dark">
        {darkColorData.map((data, i) => (
          <LI
            className="color-layout"
            data-attr={`color-${i + 1}`}
            data-primary={data.primary}
            onClick={() => handleColor(data)}
            key={i}
          >
            <div></div>
          </LI>
        ))}
      </UL>
    </>
  );
};

export default ColorDarkLayout;
