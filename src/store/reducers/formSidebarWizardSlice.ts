import { createSlice } from "@reduxjs/toolkit";

interface FormSidebarWizardState {
    activeTab: number;
    completedTabs: number[]
}

const initialState: FormSidebarWizardState = {
    activeTab: 1,
    completedTabs: [],
};

const FormSidebarWizardSlice = createSlice({
    name: "FormSidebarWizardSlice",
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        },
        setCompletedTab: (state, action) => {
            state.completedTabs = action.payload
        },
        resetFormWizard: () => initialState,
    }
});

export const { setActiveTab, setCompletedTab, resetFormWizard } = FormSidebarWizardSlice.actions;

export default FormSidebarWizardSlice.reducer;