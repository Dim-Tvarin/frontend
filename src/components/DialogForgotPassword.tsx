import { CustomButton } from './CustomButton';
import { InputField } from './InputField';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { forgotPasswordThunk } from '../redux/users/usersOperations';
import { forgotPasswordSchema } from '../validations/forgotPasswordValidation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavLink } from 'react-router-dom';
import {
  clearError,
  selectError,
  selectLoading,
  setUserEmail,
} from '../redux/users/usersSlice';
import CloseSVG from '../assets/CloseSVG';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from './components/ui/dialog';
import { openDialog, closeDialog } from '../redux/dialogs/dialogSlice';
import { showToast } from './Toast';

type FormData = z.infer<typeof forgotPasswordSchema>;

const DialogForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const emailError = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    dispatch(setUserEmail(data.forgotEmail));
    const result = await dispatch(forgotPasswordThunk(data.forgotEmail));

    if (forgotPasswordThunk.fulfilled.match(result)) {
      showToast({
        title: 'Успіх',
        description: 'Код підтвердження надіслано, будь ласка перевірте пошту',
        status: 'success',
      });
      reset();
      dispatch(clearError());
      dispatch(openDialog('verifyResetCode'));
    }
  };

  return (
    <Dialog
      open={activeDialog === 'forgotPassword'}
      onOpenChange={() => {
        dispatch(clearError());
        dispatch(closeDialog());
      }}
    >
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        className="w-[413px] min-h-[363px] rounded-[30px] p-32 bg-dialog text-center gap-0"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="Забули пароль?"
        aria-describedby={undefined}
      >
        <DialogClose className="absolute top-24 right-24 focus:outline-none focus-visible:outline-none">
          <CloseSVG />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl leading-[140%] text-default-btn mb-30">
            Забули пароль?
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-left"
        >
          <InputField
            label="Електронна пошта"
            placeholder="user@gmail.com"
            className="h-40 text-base"
            labelSize="base"
            labelClass="text-input-border mb-16"
            id="forgotEmail"
            {...register('forgotEmail')}
            error={emailError || errors.forgotEmail?.message}
          />

          <DialogFooter>
            <CustomButton
              type="submit"
              styleType="defaultButton"
              className="mt-32 w-[196px] h-[44px] text-base"
              disabled={isLoading}
            >
              Підтвердити
            </CustomButton>
          </DialogFooter>
        </form>

        <NavLink
          onClick={() => {
            dispatch(clearError());
            dispatch(closeDialog());
          }}
          to="/register"
          end
          className="mt-16 text-default-btn text-lg"
        >
          Зареєструватись
        </NavLink>

        <CustomButton
          styleType="linkButton"
          className="mt-10 text-lg"
          onClick={() => {
            dispatch(clearError());
            dispatch(openDialog('login'));
          }}
        >
          Увійти
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
};
export default DialogForgotPassword;
