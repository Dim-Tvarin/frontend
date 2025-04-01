import { CustomButton } from './CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { resetPasswordThunk } from '../redux/users/usersOperations';
import { resetPasswordSchema } from '../validations/forgotPasswordValidation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavLink } from 'react-router-dom';
import { selectError } from '../redux/users/usersSlice';
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
      alert('Пароль успішно змінено! Увійдіть з новим паролем');
      reset();
      dispatch(openDialog('login'));
    }
  };

  return (
    <Dialog
      open={activeDialog === 'resetPassword'}
      onOpenChange={() => dispatch(closeDialog())}
    >
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        className="w-[400px] rounded-[30px] p-30 bg-dialog text-center"
        onPointerDownOutside={e => e.preventDefault()}
        aria-describedby="Забули пароль?"
      >
        <DialogClose className="absolute top-30 right-30 ">
          <CloseSVG />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl leading-[140%] text-default-btn">
            Забули пароль?
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-left gap-10 mt-10"
        >
          <PasswordField
            label="Введіть новий пароль"
            placeholder="Пароль"
            className="w-[340px] mt-10"
            labelClass="text-input-border"
            id="password"
            {...register('password')}
            error={errors.password?.message}
            hideToggle
          />
          <PasswordField
            label="Повторіть новий пароль для підтвердження"
            placeholder="Пароль"
            className="w-[340px] mt-10"
            labelClass="text-input-border mt-30"
            id="repeat_password"
            {...register('repeat_password')}
            error={resetCodeError || errors.repeat_password?.message}
            hideToggle
          >
            <p className="text-center">
              Пароль повинен містити не менше 8 символів. Для кращого пароля
              використайте букви, великі букви та цифри.
            </p>
          </PasswordField>
          <DialogFooter>
            <CustomButton
              type="submit"
              styleType="orangeButton"
              className="mt-20"
            >
              Підтвердити
            </CustomButton>
          </DialogFooter>
        </form>

        <NavLink
          onClick={() => dispatch(closeDialog())}
          to="/register"
          end
          className="mt-20 mb-10px text-xs text-link"
        >
          Зареєструватись
        </NavLink>

        <CustomButton
          styleType="linkButton"
          onClick={() => dispatch(openDialog('login'))}
        >
          Увійти
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
};
export default DialogResetPassword;
