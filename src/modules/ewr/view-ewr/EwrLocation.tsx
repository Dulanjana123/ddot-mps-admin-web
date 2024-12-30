import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { CdContainer, CdTypography } from "@atoms/index";
import CdBaseMap from "@atoms/Map/CdBaseMap";
import { DateFormat } from "@enums/date-format-types";
import { Coordinate } from "@interfaces/components/map-data";
import { formatBoolResponse } from "@utils/boolean-format-utils";
import { formatDate } from "@utils/format-date-utils";
import { useTranslation } from "react-i18next";

type EwrLocationProps = {
  startDate?: string | null;
  endDate?: string | null;
  ewrNo?: string | null;
  addressType?: number | null;
  locationCategory?: number | null;
  location?: string | null;
  quadrant?: string | null;
  ward?: string | null;
  lot?: string | null;
  square?: string | null;
  rushHourRestriction?: boolean | null;
  isPsNeed?: boolean | null;
  mapCoordinates: Coordinate[];
};

const EwrLocation: React.FC<EwrLocationProps> = ({
  startDate,
  endDate,
  ewrNo,
  addressType,
  locationCategory,
  location,
  quadrant,
  ward,
  lot,
  square,
  rushHourRestriction,
  isPsNeed,
  mapCoordinates,
}) => {
  return (
    <>
      <CdContainer className="g-0 p-4" fluid>
        <CdRow>
          <CdCol xs={12} md={4}>
            <CdContainer fluid>
              <CdBaseMap
                mapDivId="map-view-div-ewr"
                calciteShellId="calcite-shell-ewr"
                coordinates={mapCoordinates}
                zoomLevel={15}
              />
            </CdContainer>
          </CdCol>
          <CdCol xs={12} md={8} className="tab-panel mt-sm-4 mt-md-0">
            <CdContainer fluid>
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
                <CdCol xs={12} md={2}>
                  <CdTypography className="m-0 ewr-text-key">
                    {"Address Type"}
                  </CdTypography>
                  <CdTypography className="ewr-text-value">
                    {addressType ?? "-"}
                  </CdTypography>
                </CdCol>
                <CdCol xs={12} md={2}>
                  <CdTypography className="m-0 ewr-text-key">
                    {"Location Category"}
                  </CdTypography>
                  <CdTypography className="ewr-text-value">
                    {locationCategory ?? "-"}
                  </CdTypography>
                </CdCol>
              </CdRow>
              <CdRow className="mb-3">
                <CdCol>
                  <CdTypography className="m-0 ewr-text-key">
                    {"Location"}
                  </CdTypography>
                  <CdTypography className="ewr-text-value">
                    {location ?? "-"}
                  </CdTypography>
                </CdCol>
              </CdRow>
              <CdRow className="mb-3">
                <CdCol xs={12} md={2}>
                  <CdTypography className="m-0 ewr-text-key">
                    {"Quadrant"}
                  </CdTypography>
                  <CdTypography className="ewr-text-value">
                    {quadrant ?? "-"}
                  </CdTypography>
                </CdCol>
                <CdCol xs={12} md={2}>
                  <CdTypography className="m-0 ewr-text-key">
                    {"Ward"}
                  </CdTypography>
                  <CdTypography className="ewr-text-value">
                    {ward ?? "-"}
                  </CdTypography>
                </CdCol>
                <CdCol xs={12} md={2}>
                  <CdTypography className="m-0 ewr-text-key">
                    {"Lot"}
                  </CdTypography>
                  <CdTypography className="ewr-text-value">
                    {lot ?? "-"}
                  </CdTypography>
                </CdCol>
                <CdCol xs={12} md={2}>
                  <CdTypography className="m-0 ewr-text-key">
                    {"Square"}
                  </CdTypography>
                  <CdTypography className="ewr-text-value">
                    {square ?? "-"}
                  </CdTypography>
                </CdCol>
              </CdRow>
              <CdRow className="mb-3">
                <CdCol md={6}>
                  <CdTypography className="m-0 ewr-text-key">
                    {"Rush Hour Restrictions"}
                  </CdTypography>
                  <CdTypography className="ewr-text-value">
                    {formatBoolResponse(rushHourRestriction)}
                  </CdTypography>
                </CdCol>
              </CdRow>
              <CdRow className="mb-3">
                <CdCol md={6}>
                  <CdTypography className="m-0 ewr-text-key">
                    {"Is PS need to add construction work"}
                  </CdTypography>
                  <CdTypography className="ewr-text-value">
                    {formatBoolResponse(isPsNeed)}
                  </CdTypography>
                </CdCol>
              </CdRow>
            </CdContainer>
          </CdCol>
        </CdRow>
      </CdContainer>
    </>
  );
};

export default EwrLocation;
