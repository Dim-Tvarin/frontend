import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from 'components/InputField';
import { PhoneInput } from 'components/PhoneInput';
import { PasswordField } from 'components/PasswordField';
import { CustomButton } from 'components/CustomButton';
import CustomSelect from 'components/CustomSelect';
import { SelectItem } from 'components/components/ui/select';
import { registerThunk } from '../redux/users/usersOperations';
import { registrationSchema } from 'helpers/authValidation';
import type { AppDispatch } from '../redux/store';
import { z } from 'zod';

type FormData = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    dispatch(registerThunk(data));
    console.log(data);
  };
  const userTypeValue = watch('userType', '');

  return (
    <div className=" flex flex-col max-w-[630px] mx-auto">
      <h1 className="mb-[41px] text-[32px] text-black">Реєстрація акаунту</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <InputField
          label="Імʼя"
          placeholder="Введіть ваше імʼя"
          className="w-[630px]"
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[630px]"
          id="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <div className="flex gap-5">
          <InputField
            label="Місто"
            placeholder="Введіть ваше місто"
            className="w-[305px]"
            id="location"
            {...register('location')}
            error={errors.location?.message}
          />
          <PhoneInput
            label="Номер телефону"
            placeholder="+380"
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>

        <PasswordField
          label="Пароль"
          placeholder="Введіть надійний пароль"
          className="w-[630px]"
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
          className="w-[630px]"
          id="confirmPassword"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <CustomSelect
          label="Тип користувача"
          value={userTypeValue}
          placeholder="Оберіть тип користувача"
          onChange={value =>
            setValue('userType', value as 'guardian' | 'adopter')
          }
          error={errors.userType?.message}
        >
          <SelectItem value="guardian">Опікун</SelectItem>
          <SelectItem value="adopter">Усиновлювач</SelectItem>
        </CustomSelect>

        <CustomButton
          type="submit"
          styleType="defaultButton"
          // disabled={!isValid}
        >
          Зареєструватися
        </CustomButton>
      </form>
    </div>
  );
};

export default RegistrationForm;
