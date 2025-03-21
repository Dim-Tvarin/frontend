import { CustomButton } from './CustomButton';
import { InputField } from './InputField';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { loginThunk } from '../redux/users/usersOperations';
import { loginSchema } from 'helpers/authValidation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import CloseSVG from '../assets/CloseSVG';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
import { PasswordField } from './PasswordField';
import { NavLink } from 'react-router-dom';
import CabinetSVG from '../assets/CabinetSVG';
import { selectError } from '../redux/users/usersSlice';

type FormData = z.infer<typeof loginSchema>;

const CustomDialogLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton
          type="button"
          styleType="defaultButton"
          className="w-100 m-auto"
        >
          <CabinetSVG />
          <span>Вхід</span>
        </CustomButton>
      </DialogTrigger>
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        className="w-[400px] rounded-[30px] p-30 bg-dialog text-center"
        onPointerDownOutside={e => e.preventDefault()}
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
          className="flex flex-col gap-10 mt-30"
        >
          <InputField
            label="Електронна пошта"
            placeholder="user@gmail.com"
            className="w-[340px]"
            id="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordField
            label="Пароль"
            placeholder="**********"
            className="w-[340px]"
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
        <DialogClose asChild>
          <NavLink
            to="/register"
            end
            className="mt-20 mb-10px text-[12px] text-link"
          >
            Зареєструватися
          </NavLink>
        </DialogClose>
        <DialogClose asChild>
          <NavLink to="/forgot-password" end className="text-[12px] text-link ">
            Забули пароль?
          </NavLink>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
export default CustomDialogLogin;
