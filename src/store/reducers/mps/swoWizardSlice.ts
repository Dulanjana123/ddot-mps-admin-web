import { OptionType } from "@interfaces/components/select";
import { SWODto } from "@interfaces/request/swo-dto";
import { createSlice } from "@reduxjs/toolkit";

interface SWOWizardState {
    activeTab: number;
    stepData: { [key: number]: any };
    swoData?: SWODto;
    inspectorsList?: OptionType[];
}

const initialState: SWOWizardState = {
    activeTab: 1,
    stepData: {},
    swoData: undefined
};

const SWOWizardSlice = createSlice({
    name: "SWOWizardSlice",
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        },
        setStepData: (state, action) => {
            state.stepData = action.payload
        },
        setSWOData: (state, action) => {
            state.swoData = action.payload;
        },
        setInspectorsList: (state, action) => {
            state.inspectorsList = action.payload;
        }
    }
});

export const { setActiveTab, setStepData, setSWOData, setInspectorsList } = SWOWizardSlice.actions;

export default SWOWizardSlice.reducer;