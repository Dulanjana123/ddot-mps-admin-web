import CdCol from "@atoms/Base/CdCol";
import CdSVG from "@atoms/SVG";
import { CdNav } from "@atoms/Tab/CdNav";
import { CdNavItem } from "@atoms/Tab/CdNavItem";
import { CdNavLink } from "@atoms/Tab/CdNavLink";
import CdTypography from "@atoms/Typography/CdTypography";
import { OptionType } from "@interfaces/components/select";
import { WizardNav } from "@interfaces/components/wizard-nav";
import { PaginatedRequest } from "@interfaces/shared/paging-sorting.interface";
import { userService } from "@services/api/UserService";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  setActiveTab,
  setInspectorsList,
} from "@store/reducers/mps/swoWizardSlice";
import { Href } from "@utils/Constant";
import { useEffect } from "react";

export const addProductNav: WizardNav[] = [
  {
    id: 1,
    icon: "product-category",
    title: "Step 01",
    detail: "Select SWO Type",
  },
  {
    id: 2,
    icon: "product-category",
    title: "Step 02",
    detail: "Add SWO Details",
  },
  {
    id: 3,
    icon: "product-category",
    title: "Step 03",
    detail: "Add Violation Details",
  },
  {
    id: 4,
    icon: "product-category",
    title: "Step 04",
    detail: "Preview",
  },
];

const SWOLeftSidebar = () => {
  const { activeTab } = useAppSelector((state) => state.swoWizard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async () => {
    const request: PaginatedRequest<{ isAdmin }> = {
      pagingAndSortingInfo: {
        paging: {
          pageNo: 1,
          pageSize: 100, // Todo: this is set as default value until server-side scrolling enabled
        },
      },
      /**
       * Todo:
       * getting only admins and after completed role-based user config, this filter
       * should set to get list of inspectors with logged in user
       */
      filters: {
        isAdmin: true,
      },
    };
    await userService.getUsersPaginated(request).then((response) => {
      if (response?.data && response?.data?.entities.length > 0) {
        const userListL: OptionType[] = response.data.entities.map(
          (row: any) => ({
            key: row.userid,
            value: `${row.firstname} ${row.lastname}`,
          })
        );
        dispatch(setInspectorsList(userListL));
      }
    });
  };

  return (
    <CdCol xxl="3" xl="4" className="box-col-4e sidebar-left-wrapper m-3">
      <CdNav pills className="sidebar-left-icons" tabs>
        {addProductNav.map((data, i) => (
          <CdNavItem key={i}>
            <CdNavLink
              active={activeTab == data.id}
              onClick={() => {
                dispatch(setActiveTab(data.id));
              }}
              href={Href}
            >
              <div className="nav-rounded mt--2">
                <div className="product-icons">
                  <CdSVG className="stroke-icon" iconId={data.icon} />
                </div>
              </div>
              <div className="product-tab-content mt-2">
                <CdTypography className="h6">{data.title}</CdTypography>
                <CdTypography>{data.detail}</CdTypography>
              </div>
            </CdNavLink>
          </CdNavItem>
        ))}
      </CdNav>
    </CdCol>
  );
};

export default SWOLeftSidebar;
