import { LI, SVG } from "../../../../AbstractElements";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { setDarkMode } from "@store/reducers/layoutSlice";
import { setMixBackgroundLayout } from "@store/reducers/themeCustomizerSlice";

const DarkMode = () => {
  const { mix_background_layout } = useAppSelector(
    (state) => state.themeCustomizer
  );
  const { darkMode } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();
  const handleDarkMode = (name: string) => {
    dispatch(setDarkMode(!darkMode));
    if (name === "light" || name === "dark-sidebar") {
      dispatch(setMixBackgroundLayout("dark-only"));
    } else if (name === "dark-only") {
      dispatch(setMixBackgroundLayout("light"));
    }
  };
  return (
    <LI onClick={() => handleDarkMode(mix_background_layout)}>
      <div
        className={`mode ${
          mix_background_layout === "dark-only" ? "active" : ""
        }`}
      >
        <SVG iconId="fill-dark" />
      </div>
    </LI>
  );
};

export default DarkMode;
