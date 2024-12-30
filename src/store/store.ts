import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./reducers/layoutSlice";
import BookmarkHeaderSlice from "./reducers/bookmarkHeaderSlice";
import ThemeCustomizerSlice from "./reducers/themeCustomizerSlice";
import systemMessageReducer from "./reducers/systemMessageSlice";
import WatchLockFormSlice from "./reducers/watchLockFormWizard";
import SWOWizardSlice from "./reducers/mps/swoWizardSlice";
import FormSidebarWizardSlice from './reducers/formSidebarWizardSlice';

export const store = configureStore({
  reducer: {
    layout: LayoutSlice,
    bookmarkHeader: BookmarkHeaderSlice,
    themeCustomizer: ThemeCustomizerSlice,
    systemMessage: systemMessageReducer,
    watchLockWizard: WatchLockFormSlice,
    swoWizard: SWOWizardSlice,
    formSidebarWizard: FormSidebarWizardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
