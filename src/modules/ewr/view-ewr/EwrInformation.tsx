import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { CdContainer, CdTypography } from "@atoms/index";
import { DateFormat } from "@enums/date-format-types";
import { formatBoolResponse } from "@utils/boolean-format-utils";
import { formatDate } from "@utils/format-date-utils";
import { useTranslation } from "react-i18next";

type EwrInformationProps = {
  startDate?: string | null;
  endDate?: string | null;
  ewrNo?: string | null;
  lossOfVital?: boolean | null;
  emergencyType?: string | null;
  emergencyCause?: string | null;
  inspectionStatus?: string | null;
  iuTrackingNo?: string | null;
  trafficControlPlan?: string | null;
  description?: string | null;
};

const EwrInformation: React.FC<EwrInformationProps> = ({
  startDate,
  endDate,
  ewrNo,
  lossOfVital,
  emergencyType,
  emergencyCause,
  inspectionStatus,
  iuTrackingNo,
  trafficControlPlan,
  description,
}) => {
  return (
    <>
      <CdContainer className="g-0 p-4" fluid>
        <CdRow className="mb-3">
          <CdCol xs={12} md={2}>
            <CdTypography className="m-0 ewr-text-key">
              {"Start Date"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {formatDate(startDate, DateFormat.MM_DD_YYYY)}
            </CdTypography>
          </CdCol>
          <CdCol xs={12} md={2}>
            <CdTypography className="m-0 ewr-text-key">
              {"End Date"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {formatDate(endDate, DateFormat.MM_DD_YYYY)}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol>
            <CdTypography className="m-0 ewr-text-key">
              {"Emergency Request Number"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {ewrNo ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol>
            <CdTypography className="m-0 ewr-text-key">
              {"Loss of Vital Service / Immediate Safety Hazard"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {formatBoolResponse(lossOfVital)}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol xs={12} md={2}>
            <CdTypography className="m-0 ewr-text-key">
              {"Type of Emergency"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {emergencyType ?? "-"}
            </CdTypography>
          </CdCol>
          <CdCol xs={12} md={2}>
            <CdTypography className="m-0 ewr-text-key">
              {"Cause of Emergency"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {emergencyCause ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol>
            <CdTypography className="m-0 ewr-text-key">
              {"Inspection Status"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {inspectionStatus ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol>
            <CdTypography className="m-0 ewr-text-key">
              {"Internal Utility Tracking Number"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {iuTrackingNo ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol md={6}>
            <CdTypography className="m-0 ewr-text-key">
              {"Traffic Control Plan"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {trafficControlPlan ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol md={6}>
            <CdTypography className="m-0 ewr-text-key">
              {"Problem in Detail"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {description ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
      </CdContainer>
    </>
  );
};

export default EwrInformation;
