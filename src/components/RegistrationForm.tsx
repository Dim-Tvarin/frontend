import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from 'components/InputField';
import { PhoneInput } from 'components/PhoneInput';
import { PasswordField } from 'components/PasswordField';
import { CustomButton } from 'components/CustomButton';
import { registerThunk } from '../redux/users/usersOperations';
import { registrationSchema } from 'helpers/authValidation';
import type { AppDispatch } from '../redux/store';
import { z } from 'zod';
import { selectError } from '../redux/users/usersSlice';
import CustomRadioGroup from './CustomRadioGroup';

type FormData = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const emailError = useSelector(selectError);

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
        alert(
          'Акаунт успішно створено! Підтвердіть свій email, ми відправили лист вам на пошту'
        );
        reset();
      }
    } catch (error) {
      console.error('Помилка реєстрації:', error);
    }
  };
  const userTypeValue = watch('userType');
  const userTypeOptions = [
    { value: 'guardian', label: 'Опікун' },
    { value: 'adopter', label: 'Усиновлювач' },
  ];

  return (
    <div className=" flex flex-col max-w-[630px]">
      <h1 className="mb-[41px] text-[32px] text-black">Реєстрація акаунту</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-left text-xl gap-32"
      >
        <InputField
          label="Ім’я або назва організації"
          placeholder="Введіть ваше імʼя"
          className="w-[630px] mt-10"
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[630px]  mt-10"
          id="email"
          {...register('email')}
          error={emailError || errors.email?.message}
        />
        <div className="flex gap-5">
          <InputField
            label="Місто"
            placeholder="Введіть ваше місто"
            className="w-[305px]  mt-10"
            id="location"
            {...register('location')}
            error={errors.location?.message}
          />
          <PhoneInput
            label="Номер телефону"
            placeholder="+380"
            className=" mt-10"
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>
        <CustomRadioGroup
          groupLabel="Оберіть тип"
          items={userTypeOptions}
          defaultValue={userTypeValue}
          onChange={value =>
            setValue('userType', value as 'guardian' | 'adopter')
          }
          error={errors.userType?.message}
        />

        <PasswordField
          label="Пароль"
          placeholder="Введіть надійний пароль"
          className="w-[630px]  mt-10"
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
          className="w-[630px]  mt-10"
          id="repeat_password"
          {...register('repeat_password')}
          error={errors.repeat_password?.message}
        />
        <CustomButton type="submit" styleType="defaultButton" className="mt-50">
          Зареєструватися
        </CustomButton>
      </form>
    </div>
  );
};

export default RegistrationForm;
