import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type DialogType =
  | 'login'
  | 'forgotPassword'
  | 'verifyResetCode'
  | 'resetPassword'
  | 'editUser'
  | { type: 'alertDelete'; id: string }
  | null;

interface DialogState {
  activeDialog: DialogType;
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: { activeDialog: null } as DialogState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogType>) => {
      state.activeDialog = action.payload;
    },
    closeDialog: state => {
      state.activeDialog = null;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export const dialogReducer = dialogSlice.reducer;
