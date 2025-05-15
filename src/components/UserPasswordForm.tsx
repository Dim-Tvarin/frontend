import { CustomButton } from './CustomButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { changePasswordSchema } from '../validations/editProfileValidation';
import { showToast } from './Toast';
import { PasswordField } from './PasswordField';
import { useChangePasswordMutation } from 'src/redux/users/usersApi';
import { Spinner } from './Spinner';
import { closeDialog } from 'src/redux/dialogs/dialogSlice';
import type { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';

type PasswordFormData = z.infer<typeof changePasswordSchema>;

const UserPasswordForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await changePassword(data).unwrap();
      showToast({
        title: 'Ваш пароль було успішно змінено',
        status: 'success',
      });
      reset();
      dispatch(closeDialog());
    } catch (err) {
      showToast({ title: 'Не вдалося оновити пароль', status: 'error' });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <PasswordField
        label="Новий пароль"
        placeholder="********"
        className="w-[530px] h-40 text-base "
        labelClass="leading-[125%] text-default-btn "
        labelSize="[16px]"
        id="newPassword"
        {...register('newPassword')}
        error={errors.newPassword?.message}
      >
        <p className="leading-[107%]">
          Пароль повинен містити не менше 8 символів. Для кращого пароля
          використайте букви, великі букви та цифри. Новий пароль повинен
          відрізнятися від старого.
        </p>
      </PasswordField>
      <PasswordField
        label="Повторіть новий пароль для підтверждення"
        placeholder="********"
        className="w-[530px] h-40 text-base"
        labelClass="leading-[125%] text-default-btn mt-16"
        labelSize="[16px]"
        id="repeat_newPassword"
        {...register('repeat_newPassword')}
        error={errors.repeat_newPassword?.message}
      />
      <CustomButton
        type="submit"
        styleType="defaultButton"
        className="w-[236px] text-base mb-0 my-0 mt-50"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : 'Оновити пароль'}
      </CustomButton>
    </form>
  );
};

export default UserPasswordForm;
