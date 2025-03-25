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

type FormData = z.infer<typeof forgotPasswordSchema>;

const DialogForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const emailError = useSelector(selectError);

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
    const result = await dispatch(forgotPasswordThunk(data.forgotEmail));

    if (forgotPasswordThunk.fulfilled.match(result)) {
      alert('Код підтвердження успішно надіслано, будь ласка перевірте пошту');
      dispatch(openDialog('verifyResetCode'));
      reset();
    }
  };

  return (
    <Dialog
      open={activeDialog === 'forgotPassword'}
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
          className="flex flex-col text-left gap-10 mt-30"
        >
          <InputField
            label="Електронна пошта"
            placeholder="user@gmail.com"
            className="w-[340px] mt-10"
            labelClassName="text-xs text-input-border"
            id="forgotEmail"
            {...register('forgotEmail')}
            error={emailError || errors.forgotEmail?.message}
          />
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
export default DialogForgotPassword;
