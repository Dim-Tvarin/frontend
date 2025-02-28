import React from 'react'
import { InputField } from 'components/InputField';
import { PhoneInput } from 'components/PhoneInput';
import { PasswordField } from 'components/PasswordField';
import { CustomButton } from 'components/CustomButton';

export const Home = () => {
  return (
    <div>Home

       <div className="flex flex-col gap-8 bg-[#f7ebeb] p-30">
        <div className="flex gap-5">
          <InputField
            label="Імʼя"
            placeholder="Введіть ваше імʼя"
            className="w-[305px]"
          />
          <InputField
            label="Прізвище"
            placeholder="Введіть ваше прізвище"
            className="w-[305px]"
          />
        </div>
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[630px]"
        />
        <div className="flex gap-5">
          <InputField
            label="Місто"
            placeholder="Введіть ваше місто"
            className="w-[305px]"
          />
          <PhoneInput label="Номер телефону" placeholder="+380" />
        </div>
        <PasswordField
          label="Пароль"
          placeholder="Введіть надійний пароль"
          className="w-[630px]"
        >
          Пароль повинен містити не менше 7 символів. Для кращого пароля
          використайте букви, великі букви та цифри.
        </PasswordField>
        <PasswordField
          label="Повторіть пароль"
          placeholder="Введіть пароль повторно"
          className="w-[630px]"
        />
        <CustomButton
          type="submit"
          className="rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] bg-[#042d4a] mx-auto"
        >
          Register
        </CustomButton>
      </div>
    </div>
  )
}
