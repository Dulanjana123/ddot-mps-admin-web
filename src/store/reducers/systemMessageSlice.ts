import { SystemMessageTypes } from '@enums/components/SystemMessageEnum';
import { createSlice } from '@reduxjs/toolkit';

interface SystemMessageState {
  type?: SystemMessageTypes;
  message?: string | Error;
  onToggle?: () => void;
}

const initialState: SystemMessageState = {
  type: undefined,
  message: undefined,
  onToggle: undefined,
};

const systemMessageSlice = createSlice({
  name: 'systemMessage',
  initialState,
  reducers: {
    setSystemMessage(state, action) {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.onToggle = action.payload.onToggle;
    },
    clearSystemMessage(state) {
      state.type = undefined;
      state.message = undefined;
      state.onToggle = undefined;
    },
  },
});

export const { clearSystemMessage, setSystemMessage } = systemMessageSlice.actions;
export default systemMessageSlice.reducer;
