import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type DialogType =
  | 'login'
  | 'forgotPassword'
  | 'verifyResetCode'
  | 'resetPassword'
  | 'editUser'
  | 'editAvatarUpload'
  | 'editAvatarCrop'
  | 'modal'
  | { type: 'alertDelete'; entity: 'animal'; id: string }
  | { type: 'alertDelete'; entity: 'user' }
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
