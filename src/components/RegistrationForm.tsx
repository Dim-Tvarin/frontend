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
    <div className=" flex flex-col xs:px-16 sm:w-full 2xl:max-w-[630px]">
      <h1 className="text-default-btn xs:mb-[16px] xs:text-[18px] 2xl:mb-[41px] 2xl:text-[32px]">
        Реєстрація акаунту
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-left xs:gap-16 2xl:gap-32"
      >
        <InputField
          label="Ім’я або назва організації"
          placeholder="Введіть ваше імʼя"
          className="h-40 xs:w-full 2xl:w-[630px]"
          labelClass="text-default-btn xs:mb-10 2xl:mb-16"
          labelSize="base"
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="h-40 xs:w-full 2xl:w-[630px]"
          labelClass="text-default-btn xs:mb-10 2xl:mb-16"
          labelSize="base"
          id="email"
          {...register('email')}
          error={
            (activeDialog !== 'login' && emailError) || errors.email?.message
          }
        />
        <div className="flex gap-20 xs:flex-col 2xl:flex-row">
          <div className="flex flex-col text-[16px]">
            <label
              htmlFor="location"
              className="text-base text-left text-default-btn leading-[125%] xs:mb-10 2xl:mb-16"
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
                  className="h-40 text-[16px] hover:border-input-border xs:w-full 2xl:w-[305px]"
                  errorMess={errors.location?.message}
                />
              )}
            />
          </div>
          <PhoneInput
            label="Номер телефону"
            placeholder="+380"
            className="h-40 xs:w-full 2xl:w-[305px]"
            labelClass="text-default-btn xs:mb-10 2xl:mb-16"
            labelSize="base"
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>
        <CustomRadioGroup
          groupLabel="Оберіть хто Ви"
          labelSize="base"
          labelClass="text-default-btn xs:mb-10 2xl:mb-16"
          className="text-[16px] text-default-btn xs:flex-col xs:gap-10 sm:flex-row sm:gap-20"
          itemWidth="xs:w-full"
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
          className="h-40 xs:w-fulll 2xl:w-[630px]"
          labelClass="leading-[125%] text-default-btn xs:mb-10 2xl:mb-[16px]"
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
          className="h-40 xs:w-full 2xl:w-[630px]"
          labelClass="leading-[125%] text-default-btn xs:mb-10 2xl:mb-16"
          labelSize="base"
          id="repeat_password"
          {...register('repeat_password')}
          error={errors.repeat_password?.message}
        />
        <CustomButton
          type="submit"
          styleType="defaultButton"
          className="text-[16px] xs:mt-4 2xl:mt-50"
        >
          Зареєструватися
        </CustomButton>
      </form>
    </div>
  );
};

export default RegistrationForm;
