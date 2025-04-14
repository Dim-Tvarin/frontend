import { CustomButton } from './CustomButton';
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
import { CodeInput } from './CodeInput';

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
    handleSubmit,
    reset,
    setValue,
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
        className="w-[413px] min-h-[432px] rounded-[30px] p-32 bg-dialog text-center gap-0"
        onPointerDownOutside={e => e.preventDefault()}
        aria-describedby="Забули пароль?"
      >
        <DialogClose className="absolute top-24 right-24 ">
          <CloseSVG size="32" />
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
          <p className="text-center mb-24 text-sm text-input-border leading-[125%]">
            Ми відправили код на вашу електронну пошту. Будь ласка, введіть його
            у поле для відновлення паролю, щоб продовжити
          </p>
          <CodeInput
            onChange={value => setValue('code', value)}
            error={verifyResetCodeError || errors.code?.message}
          />
          <p className="mt-20 text-sm text-center text-input-border">
            {!canResend && timer !== 0 ? (
              `Не отримали код? Надіслати повторно через 0:${timer < 10 ? '0' + timer : timer}`
            ) : (
              <CustomButton
                type="button"
                styleType="linkButton"
                className="text-sm "
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
              styleType="defaultButton"
              className="mt-32 w-[196px] h-[44px] text-base"
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
          className="mt-16 text-link"
        >
          Зареєструватись
        </NavLink>

        <CustomButton
          styleType="linkButton"
          className="mt-10 text-base"
          onClick={() => dispatch(openDialog('login'))}
        >
          Увійти
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVerifyResetCode;
