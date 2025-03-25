import { CustomButton } from './CustomButton';
import { InputField } from './InputField';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { verifyResetPasswordThunk } from '../redux/users/usersOperations';
import { verifyResetCodeSchema } from 'helpers/forgotPasswordValidation';
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

type FormData = z.infer<typeof verifyResetCodeSchema>;

const DialogVerifyResetCode: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const verifyResetCodeError = useSelector(selectError);

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
          className="flex flex-col gap-10 mt-30"
        >
          <p>
            Ми відправили код на вашу електронну пошту. Будь ласка, введіть його
            у поле для відновлення паролю, щоб продовжити
          </p>
          <InputField
            label="Введіть код"
            placeholder="Введіть перевірочний код"
            className="w-[340px]"
            id="code"
            {...register('code')}
            error={verifyResetCodeError || errors.code?.message}
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

        <a
          onClick={() => dispatch(openDialog('login'))}
          className="text-xs text-link "
        >
          Увійти
        </a>
      </DialogContent>
    </Dialog>
  );
};
export default DialogVerifyResetCode;
