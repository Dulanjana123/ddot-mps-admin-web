import { H6, LI, UL } from "../../../AbstractElements";
import { lightColorData } from "@data/layout-data/theme-customizer-data";
import { useAppDispatch } from "@store/state-hooks";
import { setDarkMode } from "@store/reducers/layoutSlice";
import { PropsLightColor } from "@layout/ThemeCustomizerTypes";
import { LightLayout } from "@utils/Constant";

const ColorLightLayout = () => {
  const dispatch = useAppDispatch();
  const handleColor = (data: PropsLightColor) => {
    dispatch(setDarkMode(false));
    document.documentElement.style.setProperty("--theme-default", data.primary);
    document.documentElement.style.setProperty(
      "--theme-secondary",
      data.secondary
    );
  };
  return (
    <>
      <H6>{LightLayout}</H6>
      <UL className="layout-grid customizer-color flex-row">
        {lightColorData.map((data, i) => (
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

export default ColorLightLayout;
