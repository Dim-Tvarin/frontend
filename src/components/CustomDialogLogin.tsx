import { CustomButton } from './CustomButton';
import { InputField } from './InputField';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { loginThunk } from '../redux/users/usersOperations';
import { loginSchema } from 'helpers/authValidation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
import { PasswordField } from './PasswordField';
import { NavLink } from 'react-router-dom';

type FormData = z.infer<typeof loginSchema>;

const CustomDialogLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
    dispatch(loginThunk(data));
    reset();
    alert('Ви успішно авторизувались');
    navigate('/');
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton type="button" styleType="defaultButton">
          Увійти
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Авторизація</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <InputField
            label="Електронна пошта"
            placeholder="Введіть адресу електронної пошти"
            className="w-[340px]"
            id="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordField
            label="Пароль"
            placeholder="Введіть надійний пароль"
            className="w-[340px]"
            id="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <DialogFooter>
            <CustomButton type="submit" styleType="defaultButton">
              Увійти
            </CustomButton>
          </DialogFooter>
        </form>
        <NavLink to="/register" end>
          Зареєструватися
        </NavLink>
        <NavLink to="/forgot-password" end>
          Забули пароль?
        </NavLink>
      </DialogContent>
    </Dialog>
  );
};
export default CustomDialogLogin;
