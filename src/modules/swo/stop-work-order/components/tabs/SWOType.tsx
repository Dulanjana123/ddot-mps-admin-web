import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import CdButton from "@atoms/Button/CdButton";
import CdCard from "@atoms/Card/CdCard";
import { CdSelectInput } from "@atoms/index";
import CdTypography from "@atoms/Typography/CdTypography";
import { swoTypes } from "@constants/swo-types";
import { setActiveTab, setSWOData } from "@store/reducers/mps/swoWizardSlice";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";

const SWOTypeSelect = () => {
  const { swoData, inspectorsList } = useAppSelector(
    (state) => state.swoWizard
  );
  const dispatch = useAppDispatch();

  return (
    <div className="sidebar-body m-10">
      <form>
        <CdTypography className="h5 mb-3">Select Reason for SWO</CdTypography>

        <CdRow className="mt-10">
          {swoTypes.map((row, index) => (
            <CdCol md="3" key={index}>
              <CdCard className="border border-primary p-3">
                <div className="d-flex align-content-between flex-wrap">
                  <CdTypography className="h6 h-75">{row.title}</CdTypography>
                </div>
                <CdButton
                  color={swoData?.type === row.type ? "primary" : "light"}
                  onClick={() =>
                    dispatch(setSWOData({ ...swoData, type: row.type }))
                  }
                >
                  {swoData?.type === row.type ? "Selected" : "Select"}
                </CdButton>
              </CdCard>
            </CdCol>
          ))}
        </CdRow>

        <CdTypography className="h5 mb-3">Select Inspector</CdTypography>

        {/* Todo: Until the user session data retrieval feature done, cannot set default logged in user to this list */}
        <CdRow className="mb-3">
          <CdCol sx={12} md={6}>
            {inspectorsList && (
              <CdSelectInput
                id={"swo-inspector"}
                options={inspectorsList}
                onSelect={(event) =>
                  dispatch(
                    setSWOData({ ...swoData, inspectorId: event.target.value })
                  )
                }
              />
            )}
          </CdCol>
        </CdRow>

        <CdButton
          color="primary"
          onClick={() => dispatch(setActiveTab(2))}
          disabled={swoData?.type && swoData?.inspectorId ? false : true}
        >
          Next
        </CdButton>
      </form>
    </div>
  );
};

export default SWOTypeSelect;
