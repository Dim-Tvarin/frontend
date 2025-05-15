import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from 'components/InputField';
import { PhoneInput } from 'components/PhoneInput';
import { PasswordField } from 'components/PasswordField';
import { CustomButton } from 'components/CustomButton';
import { registerThunk } from '../redux/users/usersOperations';
import { registrationSchema } from '../validations/authValidation';
import type { AppDispatch, RootState } from '../redux/store';
import { z } from 'zod';
import { clearError, selectError } from '../redux/users/usersSlice';
import CustomRadioGroup from './CustomRadioGroup';
import { useEffect } from 'react';
import { showToast } from './Toast';
import { CitySelect } from './CitySelect';

type FormData = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const emailError = useSelector(selectError);
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const {
    register,
    control,
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
          className="w-[630px] h-40"
          labelClass="mb-16 text-default-btn"
          labelSize="base"
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[630px] h-40"
          labelClass="text-default-btn mb-16"
          labelSize="base"
          id="email"
          {...register('email')}
          error={
            (activeDialog !== 'login' && emailError) || errors.email?.message
          }
        />
        <div className="flex gap-20">
          <div className="flex flex-col text-[16px]">
            <label
              htmlFor="location"
              className="text-base text-left text-default-btn mb-16 leading-[125%]"
            >
              Місто
            </label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <CitySelect
                  value={field.value}
                  onChange={field.onChange}
                  className="w-[305px] h-40 text-[16px] hover:border-input-border"
                  errorMess={errors.location?.message}
                />
              )}
            />
          </div>
          <PhoneInput
            label="Номер телефону"
            placeholder="+380"
            className="w-[305px] h-40"
            labelClass="text-default-btn mb-16"
            labelSize="base"
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>
        <CustomRadioGroup
          groupLabel="Оберіть хто Ви"
          labelSize="base"
          labelClass="mb-16 text-default-btn"
          className="text-[16px] text-default-btn"
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
          className="w-[630px] h-40"
          labelClass="leading-[125%] mb-16 text-default-btn"
          labelSize="base"
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
          className="w-[630px] h-40"
          labelClass="leading-[125%] mb-16 text-default-btn"
          labelSize="base"
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
