import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { CdBadge, CdContainer, CdFaIcon, CdTypography } from "@atoms/index";
import { SoftVariant } from "@enums/components/CommonEnum";
import CdBreadcrumbNav from "@organisms/Breadcrumbs/CdBreadcrumbsNav";
import { useNavigate } from "react-router-dom";
interface HeadingStatus {
  status: string;
  Color: SoftVariant | string;
}
interface ContentHeadingProps {
  breadcrumPath: string[];
  headingText: string;
  statusBadge?: HeadingStatus;
  headingActions?: React.ReactNode;
  backIconDisabled?: boolean;
}

const CdContentHeading: React.FC<ContentHeadingProps> = ({
  headingText,
  statusBadge,
  headingActions,
  breadcrumPath,
  backIconDisabled: iconDisabled = false,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <CdContainer className="content-header" fluid>
        <CdRow>
          <CdCol>
            <CdBreadcrumbNav items={breadcrumPath} />
          </CdCol>
        </CdRow>
        <CdRow className="justify-content-between">
          <CdCol
            sm={12}
            md="auto"
            className="d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              {!iconDisabled && (
                <CdFaIcon
                  className="back-icon"
                  icon={["fas", "arrow-left"]}
                  onClick={() => {
                    navigate(-1);
                  }}
                />
              )}

              <CdTypography className={`h2 mb-0 ${!iconDisabled && "ms-2"}`}>
                {headingText}
              </CdTypography>
              {statusBadge && (
                <CdBadge
                  className="ms-3 py-2 px-3"
                  id={"status-badge"}
                  text={statusBadge.status}
                  color={statusBadge.Color}
                />
              )}
            </div>
          </CdCol>
          <CdCol sm={12} md="auto" className="mt-3 mt-lg-0">
            {headingActions}
          </CdCol>
        </CdRow>
      </CdContainer>
    </>
  );
};

export default CdContentHeading;
