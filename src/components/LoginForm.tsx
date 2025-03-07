import { InputField } from 'components/InputField';
import { PasswordField } from 'components/PasswordField';
import { CustomButton } from 'components/CustomButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { loginThunk } from '../redux/users/usersOperations';
import { loginSchema } from 'helpers/authValidation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    dispatch(loginThunk(data));
  };

  return (
    <div className="flex flex-col max-w-[630px] mx-auto">
      <h1 className="mb-[41px] text-[32px] text-black">Авторизація</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[630px]"
          id="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <PasswordField
          label="Пароль"
          placeholder="Введіть надійний пароль"
          className="w-[630px]"
          id="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <CustomButton type="submit" styleType="defaultButton">
          Увійти
        </CustomButton>
      </form>
    </div>
  );
};

export default LoginForm;
