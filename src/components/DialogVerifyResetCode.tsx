import { CustomButton } from './CustomButton';
import { InputField } from './InputField';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import {
  forgotPasswordThunk,
  verifyResetPasswordThunk,
} from '../redux/users/usersOperations';
import { verifyResetCodeSchema } from '../validations/forgotPasswordValidation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavLink } from 'react-router-dom';
import {
  selectError,
  selectLoading,
  selectUserEmail,
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
import { useEffect, useState } from 'react';
import { Spinner } from './Spinner';

type FormData = z.infer<typeof verifyResetCodeSchema>;

const DialogVerifyResetCode: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const verifyResetCodeError = useSelector(selectError);
  const userEmail = useSelector(selectUserEmail);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, canResend]);

  const handleResendCode = async () => {
    if (!canResend || !userEmail) return;
    setCanResend(false);
    const result = await dispatch(forgotPasswordThunk(userEmail));
    if (forgotPasswordThunk.fulfilled.match(result)) {
      alert('Код повторно надіслано на вашу пошту');
      setTimer(30);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(verifyResetCodeSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    const result = await dispatch(
      verifyResetPasswordThunk({ resetPasswordCode: data.code })
    );
    if (verifyResetPasswordThunk.fulfilled.match(result)) {
      dispatch(openDialog('resetPassword'));
      reset();
    }
  };

  return (
    <Dialog
      open={activeDialog === 'verifyResetCode'}
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
          <p className="text-center  text-xs text-input-border leading-[125%]">
            Ми відправили код на вашу електронну пошту. Будь ласка, введіть його
            у поле для відновлення паролю, щоб продовжити
          </p>
          <InputField
            label="Введіть код"
            placeholder="Введіть перевірочний код"
            labelClass="text-input-border"
            className="w-[340px] mt-10"
            id="code"
            {...register('code')}
            error={verifyResetCodeError || errors.code?.message}
          />
          <p className="mt-[-5px] text-xs text-center text-input-border">
            {!canResend && timer !== 0 ? (
              `Не отримали код? Надіслати повторно через 0:${timer < 10 ? '0' + timer : timer}`
            ) : (
              <CustomButton
                type="button"
                styleType="linkButton"
                className="mt-[-5px]"
                onClick={handleResendCode}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Надіслати повідомлення ще раз'}
              </CustomButton>
            )}
          </p>
          <DialogFooter>
            <CustomButton
              type="submit"
              styleType="orangeButton"
              className="mt-20"
              disabled={isLoading}
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
export default DialogVerifyResetCode;
