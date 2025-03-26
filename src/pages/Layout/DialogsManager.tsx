import { useSelector } from 'react-redux';
import type { RootState } from 'src/redux/store';
import DialogLogin from 'components/DialogLogin';
import DialogForgotPassword from 'components/DialogForgotPassword';
import DialogVerifyResetCode from 'components/DialogVerifyResetCode';
import DialogResetPassword from 'components/DialogResetPassword';

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
    </>
  );
};

export default DialogsManager;
