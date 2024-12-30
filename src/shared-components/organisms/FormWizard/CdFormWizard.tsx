import CdCol from '@atoms/Base/CdCol';
import { CdContainer, CdDivider, CdFaIcon } from '@atoms/index';
import { CdNav } from '@atoms/Tab/CdNav';
import { CdNavItem } from '@atoms/Tab/CdNavItem';
import { CdNavLink } from '@atoms/Tab/CdNavLink';
import CdTypography from '@atoms/Typography/CdTypography';
import { JustifyContent } from '@enums/components/Container';
import { FormWizardProps } from '@interfaces/components/formWizard';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setActiveTab } from '@store/reducers/formSidebarWizardSlice';

const CdFormWizard: React.FC<FormWizardProps> = ({ className, tabData, isTabClickEnabled = true }) => {
  const dispatch = useAppDispatch();
  const { activeTab, completedTabs } = useAppSelector((state) => state.formSidebarWizard);

  return (
    <>
      <CdCol xxl="3" xl="4" className={`sidebar-left-wrapper ${className}`}>
        {/* Vertical layout for larger(>md) screens */}
        <CdNav pills className="sidebar-left-icons d-none d-lg-flex flex-column verticle-wizard" tabs>
          {tabData.map((data, i) => (
            <CdNavItem key={i}>
              <CdNavLink
                className={`${completedTabs.includes(data.id) && 'completed'}`}
                active={activeTab == data.id}
                onClick={isTabClickEnabled ? () => dispatch(setActiveTab(data.id)) : undefined}
              >
                <div className="nav-rounded mt-2">
                  <div className="nav-icons">
                    <CdFaIcon icon={data.icon} />
                  </div>
                </div>
                <div className={`form-tab-content mt-2 ${!isTabClickEnabled && 'click-disable'}`}>
                  <CdTypography className="h6 mb-1">{data.title}</CdTypography>
                  <CdTypography>{data.detail}</CdTypography>
                </div>
              </CdNavLink>
            </CdNavItem>
          ))}
        </CdNav>

        {/* Horizontal layout for smaller(sm) screens */}
        <CdNav pills className="sidebar-left-icons d-flex d-lg-none flex-row flex-wrap justify-content-around" tabs>
          <CdContainer flex justifyContent={JustifyContent.spaceAround}>
            {tabData.map((data, i) => (
              <CdNavItem key={i} className="mx-2">
                <CdNavLink
                  className={`${completedTabs.includes(data.id) && 'completed'}`}
                  active={activeTab == data.id}
                  onClick={isTabClickEnabled ? () => dispatch(setActiveTab(data.id)) : undefined}
                >
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div className="nav-rounded">
                      <div className="nav-icons">
                        <CdFaIcon icon={data.icon} />
                      </div>
                    </div>
                    <div
                      className={`form-tab-content text-center  d-md-block ${!isTabClickEnabled && 'click-disable'}`}
                    >
                      <CdTypography className="h6 tab-title">{data.title}</CdTypography>
                      <CdTypography className="d-none">{data.detail}</CdTypography>
                    </div>
                  </div>
                </CdNavLink>
              </CdNavItem>
            ))}
          </CdContainer>
        </CdNav>
        <CdDivider className="d-flex d-lg-none" />
      </CdCol>
    </>
  );
};

export default CdFormWizard;
