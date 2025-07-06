import { CustomButton } from './CustomButton';
import { InputField } from 'components/InputField';
import { PasswordField } from 'components/PasswordField';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { loginThunk } from '../redux/users/usersOperations';
import { loginSchema } from '../validations/authValidation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { clearError, selectError } from '../redux/users/usersSlice';
import CloseSVG from '../assets/CloseSVG';
import { NavLink } from 'react-router-dom';
import {
  Dialog,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import { openDialog, closeDialog } from '../redux/dialogs/dialogSlice';
import { useEffect } from 'react';
import { showToast } from './Toast';
type FormData = z.infer<typeof loginSchema>;

const DialogLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const navigate = useNavigate();
  const authError = useSelector(selectError);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    const result = await dispatch(loginThunk(data));
    if (loginThunk.fulfilled.match(result)) {
      showToast({
        title: 'Успіх',
        description: 'Ви успішно авторизувались',
        status: 'success',
      });
      reset();
      navigate('/');
      dispatch(clearError());
      dispatch(closeDialog());
    }
  };
  return (
    <Dialog
      open={activeDialog === 'login'}
      onOpenChange={() => {
        dispatch(clearError());
        dispatch(closeDialog());
      }}
    >
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        className="max-w-full sm:w-[413px] min-h-[420px] sm:min-h-[463px] rounded-[30px] px-16 py-24 sm:p-32 bg-dialog text-center gap-0"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="dialog-content"
        aria-describedby={undefined}
      >
        <DialogClose className="absolute top-24 right-24 focus:outline-none focus-visible:outline-none">
          <CloseSVG />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl leading-[140%] text-default-btn mb-32 sm:mb-30 text-center">
            Авторизація
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-left m-0"
        >
          <InputField
            label="Електронна пошта"
            placeholder="user@gmail.com"
            className="h-40 text-[16px] mb-16"
            labelSize="base"
            labelClass="text-input-border mb-10 sm:mb-16"
            id="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordField
            label="Пароль"
            placeholder="********"
            className="h-40 text-[16px]"
            labelSize="base"
            labelClass="text-input-border mb-10 sm:mb-16"
            id="password"
            {...register('password')}
            error={
              (activeDialog === 'login' && authError) ||
              errors.password?.message
            }
          />
          <DialogFooter>
            <CustomButton
              type="submit"
              styleType="defaultButton"
              className="mt-32 w-[196px] h-[44px] text-base"
            >
              Увійти
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
          Зареєструватися
        </NavLink>

        <CustomButton
          styleType="linkButton"
          className="mt-10 text-lg"
          onClick={() => {
            dispatch(clearError());
            dispatch(openDialog('forgotPassword'));
          }}
        >
          Забули пароль?
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
};
export default DialogLogin;
