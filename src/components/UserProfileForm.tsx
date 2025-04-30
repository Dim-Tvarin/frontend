import { InputField } from './InputField';
import { CustomButton } from './CustomButton';
import { selectError, selectUser } from 'src/redux/users/usersSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { PhoneInput } from './PhoneInput';
import { editUserSchema } from '../validations/editProfileValidation';
import { useEffect } from 'react';
import { useSmartUserUpdate } from 'hooks/useSmartUserUpdate';
import AvatarUploadField from './AvatarUploadField';
import { showToast } from './Toast';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from 'src/redux/store';
import { closeDialog, openDialog } from 'src/redux/dialogs/dialogSlice';
import { DialogFooter } from './components/ui/dialog';
import { Spinner } from './Spinner';

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
    if (user) {
      reset(defaultValues);
    }
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
          className="w-[510px] h-48 text-[18px] pl-28"
          labelClass="mb-10"
          labelSize="xl"
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[510px] h-48 text-[18px] pl-28"
          labelClass=" mb-10"
          labelSize="xl"
          id="email"
          {...register('email')}
          error={emailError || errors.email?.message}
        />
        <div className="flex justify-between gap-8">
          <InputField
            label="Місто"
            placeholder="Введіть ваше місто"
            className="w-[277px] h-48 text-[18px] pl-28"
            labelClass=" mb-10"
            labelSize="xl"
            id="location"
            {...register('location')}
            error={errors.location?.message}
          />
          <PhoneInput
            label="Номер телефону"
            placeholder="+380 (_ _) _ _ _-_ _-_ _"
            className="w-[225px] h-48 text-[18px] pl-28"
            labelClass=" mb-10"
            labelSize="xl"
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
              dispatch(
                openDialog({
                  type: 'alertDelete',
                  entity: 'user',
                })
              )
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
