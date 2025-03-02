import { useState, type ChangeEvent, type FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { InputField } from 'components/InputField';
import { PhoneInput } from 'components/PhoneInput';
import { PasswordField } from 'components/PasswordField';
import { CustomButton } from 'components/CustomButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { registerThunk } from '../../redux/users/usersOperations';

interface FormData {
  name: string;
  surname: string;
  email: string;
  location: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // userType: string;
}

const Registration: React.FC = () => {
  const initialFormState: FormData = {
    name: '',
    surname: '',
    email: '',
    location: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // userType: '',
  };
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const isPasswordMatch = formData.password === formData.confirmPassword;
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    dispatch(
      registerThunk({
        name: formData.name + ' ' + formData.surname,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        password: formData.password,
        repeat_password: formData.confirmPassword,
        userType: 'guardian',
      })
    );
    // setFormData(initialFormState);
  };

  return (
    <>
      <h1>Registration</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 bg-[#f7ebeb] p-30"
      >
        <div className="flex gap-5">
          <InputField
            label="Імʼя"
            placeholder="Введіть ваше імʼя"
            className="w-[305px]"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Прізвище"
            placeholder="Введіть ваше прізвище"
            className="w-[305px]"
            id="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[630px]"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="flex gap-5">
          <InputField
            label="Місто"
            placeholder="Введіть ваше місто"
            className="w-[305px]"
            id="location"
            value={formData.location}
            onChange={handleChange}
          />
          <PhoneInput
            label="Номер телефону"
            placeholder="+380"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <PasswordField
          label="Пароль"
          placeholder="Введіть надійний пароль"
          className="w-[630px]"
          id="password"
          value={formData.password}
          onChange={handleChange}
        >
          Пароль повинен містити не менше 7 символів. Для кращого пароля
          використайте букви, великі букви та цифри.
        </PasswordField>
        <PasswordField
          label="Повторіть пароль"
          placeholder="Введіть пароль повторно"
          className="w-[630px]"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <CustomButton
          type="submit"
          className="rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] bg-[#042d4a] mx-auto disabled:bg-[#4b6578]"
          disabled={!isPasswordMatch}
        >
          Зареєструватися
        </CustomButton>
      </form>

      <NavLink to="/" end>
        Home
      </NavLink>
    </>
  );
};

export default Registration;
