import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { CdTypography, CdButton, CdFaIcon, CdContainer } from "@atoms/index";
import CdTextArea from "@atoms/Input/TextArea/CdTextArea";
import { Variant } from "@enums/components/CommonEnum";
import { FlexDirection } from "@enums/components/Container";
import { DateFormat } from "@enums/date-format-types";
import { InspectionDocumentDto } from "@interfaces/response/inspection-response-dto";
import { InfoCardV2, CdLoadingButton } from "@molecules/index";
import { formatDate } from "@utils/format-date-utils";

const fileDetailInfoCard = (file: InspectionDocumentDto) => {
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="d-flex gap-3">
        <CdTypography>{`${file.documentName}.${file.documentType} (${file.documentSize} kb)`}</CdTypography>
        <CdTypography>
          {formatDate(file.createdDate, DateFormat.MM_DD_YYYY_SLASH)}
        </CdTypography>
      </div>
      <div className="d-flex gap-4">
        <CdButton
          outline
          onClick={() => {
            // Implement file download logic here
            if (file.cloudPath) {
              window.open(file.cloudPath, "_blank");
            }
          }}
        >
          Download
        </CdButton>
        <CdButton
          color={Variant.link}
          onClick={() => {
            if (file.cloudPath) {
              window.open(file.cloudPath, "_blank");
            }
          }}
        >
          <CdFaIcon icon={["fas", "up-right-from-square"]} />
        </CdButton>
      </div>
    </div>
  );
};

export const MasterDetailPanel = (
  inspectionDate: string,
  hoursSpent: number,
  minSpent: number,
  internalNote: string,
  externalNote: string,
  files: InspectionDocumentDto[]
) => {
  return (
    <CdContainer className="g-0 p-3 master-detail-panel" fluid>
      <CdTypography className="h6">Inspection Details</CdTypography>
      <CdRow className="mt-3">
        <CdCol className="d-flex gap-5">
          <div>
            <CdTypography className="m-0 ewr-text-key">
              Inspection Date
            </CdTypography>
            <CdTypography className="fw-medium">{inspectionDate}</CdTypography>
          </div>
          <div>
            <CdTypography className="m-0 ewr-text-key">Hour Spent</CdTypography>
            <CdTypography className="fw-medium">
              {`${hoursSpent} h ${minSpent} min`}
            </CdTypography>
          </div>
        </CdCol>
      </CdRow>
      <CdRow className="mt-3">
        <CdCol xs={12} md={6}>
          <CdTypography className="m-0 ewr-text-key">
            External Notes
          </CdTypography>
          <CdTextArea
            className="ewr-text-key"
            readOnly
            value={externalNote}
            style={{ backgroundColor: "white" }}
          />
        </CdCol>
      </CdRow>
      <CdRow className="mt-3">
        <CdCol xs={12} md={6}>
          <CdTypography className="m-0 ewr-text-key">
            Internal Notes
          </CdTypography>
          <CdTextArea
            className="ewr-text-key"
            readOnly
            value={internalNote}
            style={{ backgroundColor: "white" }}
          />
        </CdCol>
      </CdRow>
      <CdRow className="mt-3">
        <CdCol xs={12}>
          <CdTypography className="h6">Uploaded Documents</CdTypography>
          <CdContainer
            className="master-detail-panel-file-section ms-0 mt-2"
            flex
            flexDirection={FlexDirection.column}
          >
            {files && files?.length > 0 ? (
              files?.map((file, index) => (
                <InfoCardV2
                  className="mb-2"
                  key={index}
                  content={fileDetailInfoCard(file)}
                  stripColor="#aed6f1"
                />
              ))
            ) : (
              <CdTypography>No files uploaded</CdTypography>
            )}
          </CdContainer>
        </CdCol>
      </CdRow>
      <CdRow className="mt-4">
        <CdCol>
          <CdLoadingButton
            color={Variant.primary}
            outline
            id={"export-exe-btn"}
            isLoading={false}
            text={"Export as EXE"}
          />
        </CdCol>
      </CdRow>
    </CdContainer>
  );
};
