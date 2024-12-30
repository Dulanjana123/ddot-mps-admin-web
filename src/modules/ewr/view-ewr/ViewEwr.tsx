import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import {
  CdButton,
  CdContainer,
  CdFaIcon,
  CdModal,
  CdNumberInput,
  CdTypography,
} from "@atoms/index";
import CdTabs, { Tab } from "@molecules/Tabs/CdTabs/CdTabs/CdTabs";
import React, { useEffect, useState } from "react";
import EwrInformation from "./EwrInformation";
import EwrLocation from "./EwrLocation";
import EwrInspectionDetails from "./EwrTrackingInspection";
import InspectionDetail from "./inspection-details/InspectionDetails";
import { ewrService } from "@services/api/ewr-service";
import { useParams } from "react-router-dom";
import { EwrResponseDto } from "@interfaces/response/ewr-response-dto";
import { useAppDispatch } from "@store/hooks";
import { setSystemMessage } from "@store/reducers/systemMessageSlice";
import { SystemMessageTypes } from "@enums/components/SystemMessageEnum";
import { Coordinate } from "@interfaces/components/map-data";
import { CdContentHeading } from "@organisms/index";
import { SoftVariant, Variant } from "@enums/components/CommonEnum";
import {
  addTime,
  currentDateTime,
  formatDate,
  getTimeDifference,
} from "@utils/format-date-utils";
import { DateFormat, TimeUnit } from "@enums/date-format-types";
import { EwrStatus } from "@enums/ewr-status-types";
import { formatEwrStatus } from "@utils/ewr-status-type-format";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { CdLoadingButton } from "@molecules/index";
import { InputSizes } from "@enums/components/InputEnum";
import EwrAssignmentDetails from "./EwrAssignmentDetails";
import CdAlert from "@atoms/Alert/CdAlert";

const ViewEwr: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [ewrData, setEwrData] = useState<EwrResponseDto | null>(null);
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
  useEffect(() => {
    getEwrData();
  }, []);

  const toggleModal = () => {
    setIsModelOpen((prevState) => !prevState);
  };

  const getEwrData = () => {
    if (id) {
      ewrService
        .getById(parseInt(id))
        .then((response) => {
          if (response.success && response.data) {
            setEwrData(response.data);
          } else {
            dispatch(
              setSystemMessage({
                type: SystemMessageTypes.Error,
                message: response.message,
              })
            );
          }
        })
        .catch(() => {
          dispatch(
            setSystemMessage({
              type: SystemMessageTypes.Error,
              message: "ERROR_OCCURED",
            })
          );
        });
    } else {
      dispatch(
        setSystemMessage({
          type: SystemMessageTypes.Error,
          message: "ERROR_OCCURED",
        })
      );
    }
  };

  const mapCoordinates: Coordinate[] =
    ewrData?.latitude && ewrData?.longitude
      ? [
          {
            x: ewrData.latitude,
            y: ewrData.longitude,
          },
        ]
      : [];

  const ewrViewTabs: Tab[] = [
    {
      id: "1",
      title: "EWR Information",
      content: (
        <EwrInformation
          startDate={ewrData?.effectiveDate}
          endDate={ewrData?.expirationDate}
          ewrNo={ewrData?.requestNumber}
          lossOfVital={ewrData?.isCondition}
          emergencyType={ewrData?.emergencyType}
          emergencyCause={ewrData?.emergencyCause}
          inspectionStatus={ewrData?.inspectionStatus}
          iuTrackingNo={ewrData?.internalUtilityTrackingNumber}
          trafficControlPlan={ewrData?.trafficControlPlan}
          description={ewrData?.problemDetails}
        />
      ),
    },
    {
      id: "2",
      title: "Location Information",
      content: (
        <EwrLocation
          startDate={ewrData?.effectiveDate}
          endDate={ewrData?.expirationDate}
          ewrNo={ewrData?.requestNumber}
          addressType={ewrData?.addressType}
          locationCategory={ewrData?.locationCategory}
          location={ewrData?.location}
          quadrant={ewrData?.quadrant}
          ward={ewrData?.ward}
          lot={ewrData?.lot}
          square={ewrData?.square}
          rushHourRestriction={ewrData?.hasRushHourRestriction}
          isPsNeed={ewrData?.isPsAddConstructionWork}
          mapCoordinates={mapCoordinates}
        />
      ),
    },
    {
      id: "3",
      title: "Tracking Information",
      content: (
        <EwrInspectionDetails
          requestId={ewrData?.requestId}
          locationId={ewrData?.locationId}
          startDate={ewrData?.effectiveDate}
          endDate={ewrData?.expirationDate}
          ewrNo={ewrData?.requestNumber}
          assignedInspector={ewrData?.assignedInspector}
          constructionPermitNo={ewrData?.constructionPermitNumberIfFiled}
          noiNo={ewrData?.noiApplicationId}
          swoNo={ewrData?.swoApplicationId}
          isPsNeed={ewrData?.isPsAddConstructionWork}
        />
      ),
    },
    {
      id: "4",
      title: "Assignment Details",
      content: <EwrAssignmentDetails ewrId={ewrData?.requestId} />,
    },
    {
      id: "5",
      title: "Inspection Details",
      content: (
        <InspectionDetail
          ewrNo={ewrData?.requestNumber}
          ewrApplicationId={ewrData?.requestId}
        />
      ),
    },
  ];

  const setStatusColor = (status?: string): string => {
    if (!status) return "";

    switch (status) {
      case EwrStatus.Cancelled:
        return SoftVariant.Secondary;
        break;
      case EwrStatus.Applied:
        return SoftVariant.Info;
        break;
      case EwrStatus.Rejected:
        return SoftVariant.Danger;
        break;
      case EwrStatus.Pending:
        return SoftVariant.Warning;
      default:
        return "";
        break;
    }
  };

  const headingActions = (
    <div className="d-flex flex-wrap flex-md-row flex-column gap-2">
      <CdButton
        size={ButtonSizes.md}
        color={Variant.primary}
        outline
        onClick={toggleModal}
      >
        {"Export as PDF"}
      </CdButton>
    </div>
  );

  const is72HoursPassed = (): boolean => {
    const currentTime = currentDateTime();
    const timeDifference = getTimeDifference(
      TimeUnit.Hours,
      ewrData?.creationDate,
      currentTime.toString()
    );
    return timeDifference > 72 ? true : false;
  };

  return (
    <div className="page-body">
      <CdContentHeading
        headingText={`${"Emergency Work Request Details"} | ${
          ewrData?.requestNumber ?? ""
        } - ${formatDate(
          ewrData?.expirationDate,
          DateFormat.MM_DD_YYYY_SLASH
        )}`}
        headingActions={headingActions}
        statusBadge={{
          Color: setStatusColor(ewrData?.status),
          status: formatEwrStatus(ewrData?.status),
        }}
        breadcrumPath={[
          "Emergency Work Requests",
          "Emergency Work Request Details",
        ]}
      />
      <CdContainer className="g-0" fluid>
        {ewrData?.status == EwrStatus.Pending && is72HoursPassed() && (
          <CdAlert className="alert-light- border-0 mt-3" color="danger">
            <div className="d-flex items-align-center gap-1">
              <CdFaIcon icon={["fas", "warning"]} className="mt-1 me-1" />
              <CdTypography className="fw-bold">
                {
                  "You must apply for a new Construction Permit for Restoration or link and existing one."
                }
              </CdTypography>
            </div>
            <li>
              {`Your action is due on ${formatDate(
                addTime(TimeUnit.Hours, 72, ewrData.creationDate),
                DateFormat.MM_DD_YYYY_SLASH
              )} at ${formatDate(
                addTime(TimeUnit.Hours, 72, ewrData.creationDate),
                DateFormat.HH_MM
              )}`}
            </li>
            <li>
              {
                "If you fail to apply or link a CP, your emergency work request will be closed, and you will incur an infraction of $XXXXX."
              }
            </li>
          </CdAlert>
        )}
        <CdRow>
          <CdCol xs={12} className="tab-panel mt-sm-4 mt-md-0">
            <CdTabs tabs={ewrViewTabs} />
          </CdCol>
        </CdRow>
      </CdContainer>
      <CdModal
        showFooter={false}
        toggle={toggleModal}
        isOpen={isModalOpen}
        title={"Link Construction Permit"}
        body={
          <>
            <CdTypography className="modal-sub-heading">
              {"Link a construction permit"}
            </CdTypography>
            <form>
              <CdContainer className="d-flex flex-column align-items-center">
                <CdNumberInput
                  id={"link-cp-input"}
                  onChange={() => {}}
                  label={"Construction Permit No"}
                  size={InputSizes.sm}
                />
                <CdLoadingButton
                  id={"link-cp-btn"}
                  isLoading={false}
                  text={"Link"}
                  className="w-50"
                  onClick={() => {}}
                  type={ButtonTypes.submit}
                  disabled
                />
              </CdContainer>
            </form>
          </>
        }
        id={""}
      />
    </div>
  );
};

export default ViewEwr;
