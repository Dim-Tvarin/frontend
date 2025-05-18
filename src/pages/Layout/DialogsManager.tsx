import { useSelector } from 'react-redux';
import type { RootState } from 'src/redux/store';
import DialogLogin from 'components/DialogLogin';
import DialogForgotPassword from 'components/DialogForgotPassword';
import DialogVerifyResetCode from 'components/DialogVerifyResetCode';
import DialogResetPassword from 'components/DialogResetPassword';
import DialogAlertDelete from 'components/DialogAlertDelete';
import DialogEditUser from 'components/DialogEditUser';
import DialogEditAvatarUpload from 'components/DialogEditAvatarUpload';
import DialogEditAvatarCrop from 'components/DialogEditAvatarCrop';

const DialogsManager = () => {
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );

  return (
    <>
      {activeDialog === 'login' && <DialogLogin />}
      {activeDialog === 'forgotPassword' && <DialogForgotPassword />}
      {activeDialog === 'verifyResetCode' && <DialogVerifyResetCode />}
      {activeDialog === 'resetPassword' && <DialogResetPassword />}
      {activeDialog === 'editUser' && <DialogEditUser />}
      {activeDialog === 'editAvatarUpload' && <DialogEditAvatarUpload />}
      {activeDialog === 'editAvatarCrop' && <DialogEditAvatarCrop />}
      {typeof activeDialog === 'object' &&
        activeDialog?.type === 'alertDelete' && <DialogAlertDelete />}
    </>
  );
};

export default DialogsManager;
