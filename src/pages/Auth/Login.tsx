import { useState, type ChangeEvent, type FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { InputField } from 'components/InputField';
import { PasswordField } from 'components/PasswordField';
import { CustomButton } from 'components/CustomButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { loginThunk } from '../../redux/users/usersOperations';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const initialFormState: FormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState<FormData>(initialFormState);
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
    dispatch(loginThunk(formData));
    setFormData(initialFormState);
  };

  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 bg-[#f7ebeb] p-30"
      >
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[630px]"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <PasswordField
          label="Пароль"
          placeholder="Введіть надійний пароль"
          className="w-[630px]"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <CustomButton
          type="submit"
          className="rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] bg-[#042d4a] mx-auto disabled:bg-[#4b6578]"
        >
          Увійти
        </CustomButton>
      </form>

      <NavLink to="/" end>
        Home
      </NavLink>
    </>
  );
};

export default Login;
