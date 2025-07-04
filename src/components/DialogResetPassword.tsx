import { CustomButton } from './CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { resetPasswordThunk } from '../redux/users/usersOperations';
import { resetPasswordSchema } from '../validations/forgotPasswordValidation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavLink } from 'react-router-dom';
import { clearError, selectError } from '../redux/users/usersSlice';
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
import { PasswordField } from './PasswordField';
import { showToast } from './Toast';

type FormData = z.infer<typeof resetPasswordSchema>;

const DialogResetPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const resetCodeError = useSelector(selectError);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    const result = await dispatch(resetPasswordThunk(data));
    if (resetPasswordThunk.fulfilled.match(result)) {
      showToast({
        title: 'Успіх',
        description: 'Пароль успішно відновлено!',
        status: 'success',
      });
      reset();
      dispatch(clearError());
      dispatch(closeDialog());
    }
  };

  return (
    <Dialog
      open={activeDialog === 'resetPassword'}
      onOpenChange={() => {
        dispatch(clearError());
        dispatch(closeDialog());
      }}
    >
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        className="max-w-full sm:w-[413px] min-h-[490px] sm:min-h-[532px] rounded-[30px] px-16 py-24 sm:p-32 bg-dialog text-center gap-0"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="Забули пароль?"
        aria-describedby={undefined}
      >
        <DialogClose className="absolute top-24 right-24 focus:outline-none focus-visible:outline-none">
          <CloseSVG />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl leading-[140%] text-default-btn mb-32 sm:mb-30 text-center">
            Забули пароль?
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-left"
        >
          <PasswordField
            label="Введіть новий пароль"
            placeholder="********"
            className="h-40 text-[16px] mb-16"
            labelSize="base"
            labelClass="text-input-border mb-10 sm:mb-16"
            id="password"
            {...register('password')}
            error={errors.password?.message}
            autoComplete="new-password"
          />
          <PasswordField
            label="Введіть новий пароль повторно"
            placeholder="********"
            className="h-40 text-[16px] mb-16"
            labelSize="base"
            labelClass="text-input-border mb-10 sm:mb-16"
            id="repeat_password"
            {...register('repeat_password')}
            error={resetCodeError || errors.repeat_password?.message}
            autoComplete="new-password"
          >
            Пароль повинен містити не менше 8 символів. Для кращого пароля
            використайте маленькі та великі букви, а також цифри.
          </PasswordField>
          <DialogFooter>
            <CustomButton
              type="submit"
              styleType="defaultButton"
              className="mt-32 w-[196px] h-[44px] text-base"
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
          className="mt-16 text-lg text-default-btn hover:text-orange"
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
export default DialogResetPassword;
