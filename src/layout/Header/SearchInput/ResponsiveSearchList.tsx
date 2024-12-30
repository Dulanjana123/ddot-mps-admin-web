import { Link } from "react-router-dom";
import { P, SVG } from "../../../AbstractElements";
import { SearchSuggestionListType } from "@layout/SidebarType";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { setResponsiveSearch } from "@store/reducers/layoutSlice";

const ResponsiveSearchList = ({
  searchedArray,
  setSearchedWord,
}: SearchSuggestionListType) => {
  const dispatch = useAppDispatch();
  const { sidebarIconType } = useAppSelector((state) => state.themeCustomizer);
  const handleSearch = () => {
    setSearchedWord("");
    dispatch(setResponsiveSearch());
  };
  return (
    <>
      {searchedArray?.map((item, index) => (
        <div className="ProfileCard u-cf" key={index}>
          <div className="ProfileCard-avatar">
            <SVG
              className={`${sidebarIconType}-icon`}
              iconId={`${sidebarIconType}-${item.icon}`}
            />
          </div>
          <div className="ProfileCard-details">
            <div className="ProfileCard-realName">
              <Link
                className="realname  w-auto d-flex justify-content-start gap-2"
                to={item.path}
                onClick={handleSearch}
              >
                {item.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
      {!searchedArray?.length && <P>Opps!! There are no result found.</P>}
    </>
  );
};

export default ResponsiveSearchList;
