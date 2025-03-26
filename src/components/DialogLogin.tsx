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
import { selectError } from '../redux/users/usersSlice';
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
type FormData = z.infer<typeof loginSchema>;

const DialogLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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

  const onSubmit = (data: FormData) => {
    const result = dispatch(loginThunk(data));
    if (loginThunk.fulfilled.match(result)) {
      alert('Ви успішно авторизувались');
      reset();
      navigate('/');
    }
  };
  return (
    <Dialog
      open={activeDialog === 'login'}
      onOpenChange={() => dispatch(closeDialog())}
    >
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        className="w-[400px] rounded-[30px] p-30 bg-dialog text-center"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="dialog-content"
      >
        <DialogClose className="absolute top-30 right-30 ">
          <CloseSVG />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl leading-[140%] text-default-btn">
            Авторизація
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-left gap-10 mt-30"
        >
          <InputField
            label="Електронна пошта"
            placeholder="user@gmail.com"
            className="w-[340px] mt-10"
            labelClassName="text-xs text-input-border"
            id="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordField
            label="Пароль"
            placeholder="**********"
            className="w-[340px] mt-10"
            labelClassName="text-xs text-input-border"
            id="password"
            {...register('password')}
            error={authError || errors.password?.message}
          />
          <DialogFooter>
            <CustomButton
              type="submit"
              styleType="orangeButton"
              className="mt-20"
            >
              Увійти
            </CustomButton>
          </DialogFooter>
        </form>
        <NavLink
          onClick={() => dispatch(closeDialog())}
          to="/register"
          end
          className="mt-20 mb-10px text-xs text-link"
        >
          Зареєструватися
        </NavLink>

        <CustomButton
          styleType="linkButton"
          onClick={() => dispatch(openDialog('forgotPassword'))}
        >
          Забули пароль?
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
};
export default DialogLogin;
