import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from 'components/InputField';
import { PhoneInput } from 'components/PhoneInput';
import { PasswordField } from 'components/PasswordField';
import { CustomButton } from 'components/CustomButton';
import { registerThunk } from '../redux/users/usersOperations';
import { registrationSchema } from '../validations/authValidation';
import type { AppDispatch } from '../redux/store';
import { z } from 'zod';
import { clearError, selectError } from '../redux/users/usersSlice';
import CustomRadioGroup from './CustomRadioGroup';
import { useEffect } from 'react';
import { showToast } from './Toast';

type FormData = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const emailError = useSelector(selectError);
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  });
  const onSubmit = async (data: FormData) => {
    try {
      const result = await dispatch(registerThunk(data));
      if (registerThunk.fulfilled.match(result)) {
        showToast({
          title: 'Успіх',
          description:
            'Акаунт успішно створено! Підтвердіть свій email, ми відправили лист вам на пошту',
          status: 'success',
        });
        reset();
      }
    } catch (error) {
      console.error('Помилка реєстрації:', error);
    }
  };
  const userTypeValue = watch('userType');
  const userTypeOptions = [
    { value: 'guardian', label: 'Опікун' },
    { value: 'adopter', label: 'Майбутній господар' },
  ];

  return (
    <div className=" flex flex-col max-w-[630px]">
      <h1 className="mb-[41px] text-[32px] text-black">Реєстрація акаунту</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-left gap-32"
      >
        <InputField
          label="Ім’я або назва організації"
          placeholder="Введіть ваше імʼя"
          className="w-[630px] text-[18px]"
          labelClass="mb-16"
          labelSize="xl"
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[630px] text-[18px]"
          labelClass=" mb-16"
          labelSize="xl"
          id="email"
          {...register('email')}
          error={emailError || errors.email?.message}
        />
        <div className="flex gap-5">
          <InputField
            label="Місто"
            placeholder="Введіть ваше місто"
            className="w-[305px] text-[18px]"
            labelClass=" mb-16"
            labelSize="xl"
            id="location"
            {...register('location')}
            error={errors.location?.message}
          />
          <PhoneInput
            label="Номер телефону"
            placeholder="+380"
            className="text-[18px]"
            labelClass=" mb-16"
            labelSize="xl"
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>
        <CustomRadioGroup
          groupLabel="Оберіть хто Ви"
          labelSize="xl"
          labelClass="mb-16"
          className="text-lg"
          items={userTypeOptions}
          value={userTypeValue}
          onChange={value =>
            setValue('userType', value as 'guardian' | 'adopter')
          }
          error={errors.userType?.message}
        />

        <PasswordField
          label="Пароль"
          placeholder="Введіть надійний пароль"
          className="w-[630px] text-[18px]"
          labelClass="leading-[125%] mb-16"
          labelSize="xl"
          id="password"
          {...register('password')}
          error={errors.password?.message}
        >
          Пароль повинен містити не менше 8 символів. Для кращого пароля
          використайте букви, великі букви та цифри.
        </PasswordField>
        <PasswordField
          label="Повторіть пароль"
          placeholder="Введіть пароль повторно"
          className="w-[630px] text-[18px]"
          labelClass="leading-[125%] mb-16"
          labelSize="xl"
          id="repeat_password"
          {...register('repeat_password')}
          error={errors.repeat_password?.message}
        />
        <CustomButton
          type="submit"
          styleType="defaultButton"
          className="mt-50 text-[16px]"
        >
          Зареєструватися
        </CustomButton>
      </form>
    </div>
  );
};

export default RegistrationForm;
