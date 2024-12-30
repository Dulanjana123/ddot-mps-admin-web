import { WatchLock } from '@enums/watch-lock-types';
import { createSlice } from '@reduxjs/toolkit';

interface WatchLockFormState {
    formData: {
        tab: number,
        watchLockAreaDetails: {
            category: WatchLock
            name: string
            startDate: string
            endDate: string
            areaDescription: string
            reason: string
        },
        emailConfig: {
            newSubmission: boolean
            approval: boolean
            emailMe: boolean
            emails?: string[]
        },
        interactiveMap: {
            coordinates: Array<any>
            image: string
        }
    }

}

const initialState: WatchLockFormState = {
    formData: {
        tab: 1,
        watchLockAreaDetails: {
            category: WatchLock.Watch,
            name: '',
            startDate: '',
            endDate: '',
            areaDescription: '',
            reason: '',
        },
        emailConfig: {
            newSubmission: false,
            approval: false,
            emailMe: false,
            emails: [],
        },
        interactiveMap: {
            coordinates: [],
            image: ""
        }
    }

};

const watchLockFormSlice = createSlice({
    name: 'watchLockForm',
    initialState,
    reducers: {
        setTab(state, action) {
            state.formData.tab = action.payload.tab
        },
        updateForm: (state, action) => {
            state.formData[action.payload.step] = action.payload.data;
        },
        clearForm(state) {
            state.formData = initialState.formData
        }

    },
});

export const { setTab, updateForm, clearForm } = watchLockFormSlice.actions;
export default watchLockFormSlice.reducer;
