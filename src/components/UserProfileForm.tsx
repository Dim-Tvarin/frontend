import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import type { z } from 'zod';

import { editUserSchema } from '../validations/editProfileValidation';
import { selectError, selectUser } from 'src/redux/users/usersSlice';
import { closeDialog, openDialog } from 'src/redux/dialogs/dialogSlice';
import type { AppDispatch } from 'src/redux/store';

import { InputField } from './InputField';
import { PhoneInput } from './PhoneInput';
import { CustomButton } from './CustomButton';
import { DialogFooter } from './components/ui/dialog';
import AvatarUploadField from './AvatarUploadField';
import { showToast } from './Toast';
import { Spinner } from './Spinner';
import { CitySelect } from './CitySelect';
import { useSmartUserUpdate } from 'hooks/useSmartUserUpdate';

type FormData = z.infer<typeof editUserSchema>;

const UserProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const emailError = useSelector(selectError);
  const user = useSelector(selectUser);

  const defaultValues = {
    name: user.name || '',
    email: user.email || '',
    location: user.location || '',
    phone: user.phone || '',
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editUserSchema),
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    if (user) reset(defaultValues);
  }, [user, reset]);

  const { updateUserSmart, isLoading, isSuccess, isError } =
    useSmartUserUpdate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeDialog());
    } else if (isError) {
      showToast({ title: 'Щось пішло не так', status: 'error' });
    }
  }, [isSuccess, isError, dispatch]);

  const onSubmit = async (data: FormData) => {
    await updateUserSmart(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <AvatarUploadField
        currentAvatar={user.avatarURL}
        onFileSelect={file =>
          setValue('avatar', file, { shouldValidate: true })
        }
        error={
          typeof errors.avatar?.message === 'string'
            ? errors.avatar.message
            : undefined
        }
      />
      <div className="flex flex-col gap-[15px]">
        <InputField
          label="Ім’я або назва організації"
          placeholder="Введіть ваше імʼя"
          className="w-[510px] h-48 text-[16px] pl-28"
          labelClass="mb-10 text-default-btn"
          labelSize="[16px]"
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[510px] h-48 text-[16px] pl-28"
          labelClass="text-default-btn mb-10"
          labelSize="[16px]"
          id="email"
          {...register('email')}
          error={emailError || errors.email?.message}
        />
        <div className="flex justify-between gap-20">
          <div className="flex flex-col text-[16px]">
            <label
              htmlFor="location"
              className="text-base text-left text-default-btn mb-10 leading-[125%]"
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
                  className="w-[255px] h-40 text-[16px] hover:border-input-border"
                  errorMess={errors.location?.message}
                />
              )}
            />
          </div>
          <PhoneInput
            label="Номер телефону"
            placeholder="+380 (_ _) _ _ _-_ _-_ _"
            className="w-[255px] h-40 text-[16px] pl-28"
            labelClass="mb-10 text-default-btn"
            labelSize="[16px]"
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>
        <DialogFooter className="flex flex-row gap-20 ml-0 mt-30">
          <CustomButton
            type="submit"
            styleType="defaultButton"
            className="mt-32 w-[196px] h-[44px] text-base m-0"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Зберегти зміни'}
          </CustomButton>
          <CustomButton
            type="button"
            styleType="whiteButton"
            className="mt-32 w-[196px] h-[44px] text-base m-0"
            onClick={() =>
              dispatch(openDialog({ type: 'alertDelete', entity: 'user' }))
            }
          >
            Видалити профіль
          </CustomButton>
        </DialogFooter>
      </div>
    </form>
  );
};

export default UserProfileForm;
