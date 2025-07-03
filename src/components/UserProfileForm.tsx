import { useEffect, useRef } from 'react';
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
import avatarStubMin from '../assets/avatar-stub.png';
import avatarStubMax from '../assets/avatar-stub@2x.png';
import { showToast } from './Toast';
import { Spinner } from './Spinner';
import { CitySelect } from './CitySelect';
import { useSmartUserUpdate } from 'hooks/useSmartUserUpdate';
import ResponsiveImage from './ResponsiveImage';
import { LuCirclePlus } from 'react-icons/lu';
import { useImageCrop } from 'src/context/ImageCropContext';

type FormData = z.infer<typeof editUserSchema>;

const UserProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const emailError = useSelector(selectError);
  const user = useSelector(selectUser);
  const formRef = useRef<HTMLFormElement | null>(null);
  const avatarRef = useRef<File | undefined>(undefined);
  const { setImageAfterCrop, setFormSubmit } = useImageCrop();

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

  const onSubmit = async (data: FormData) => {
    await updateUserSmart({ ...data, avatar: avatarRef.current });
    console.log('[onSubmit] Avatar ref:', avatarRef.current);
  };
  const handleClick = () => {
    setImageAfterCrop((file: File) => {
      avatarRef.current = file;
    });
    setFormSubmit(handleSubmit(onSubmit));
    dispatch(openDialog('editAvatarUpload'));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeDialog());
    } else if (isError) {
      showToast({ title: 'Щось пішло не так', status: 'error' });
    }
  }, [isSuccess, isError, dispatch]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-[97px] md:gap-0"
    >
      <div className="w-[328px] lg:w-[305px] h-[328px] lg:h-[305px] md:mr-30 shrink-0 relative">
        <div className="rounded-[20px] overflow-hidden">
          <ResponsiveImage
            urlMin1x={user.avatarURL || avatarStubMin}
            urlMax1x={user.avatarURL || avatarStubMax}
            alt="Аватар"
          />
        </div>
        <LuCirclePlus
          onClick={handleClick}
          size={36}
          fill="white"
          className="absolute bottom-[3px] right-[3px] cursor-pointer"
        />
        <ul className="flex flex-col text-xs text-input-border mt-20 leading-[15px]">
          <li>Формати: JPG, PNG, GIF</li>
          <li>Макс. розмір: 2 МБ</li>
          <li>Рекомендований розмір: 150×150 – 500×500 px</li>
        </ul>
      </div>
      <div className="flex flex-col gap-[16px]">
        <InputField
          label="Ім’я або назва організації"
          placeholder="Введіть ваше імʼя"
          className="w-[328px] lg:w-[530px] h-40 text-[16px] pl-28"
          labelClass="mb-10 text-default-btn"
          labelSize="[16px]"
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="Адреса електронної пошти"
          placeholder="Введіть адресу електронної пошти"
          className="w-[328px] lg:w-[530px] h-40 text-[16px] pl-28"
          labelClass="text-default-btn mb-10"
          labelSize="[16px]"
          id="email"
          {...register('email')}
          error={emailError || errors.email?.message}
        />
        <div className="flex flex-col lg:flex-row justify-between gap-20">
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
                  className="h-40 text-[16px] hover:border-input-border"
                  widthClass="w-[328px] lg:w-[255px]"
                  errorMess={errors.location?.message}
                />
              )}
            />
          </div>
          <PhoneInput
            label="Номер телефону"
            placeholder="+380 (_ _) _ _ _-_ _-_ _"
            className="w-[328px] lg:w-[255px] h-40 text-[16px] pl-28"
            labelClass="mb-10 text-default-btn"
            labelSize="[16px]"
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>
        <DialogFooter className="flex flex-col sm:flex-col md:flex-row gap-20 m-auto sm:justify-start lg:ml-[19px] mt-16 lg:mt-30">
          <CustomButton
            type="submit"
            styleType="defaultButton"
            className="mt-32 h-[44px] text-base m-0"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Зберегти зміни'}
          </CustomButton>
          <CustomButton
            type="button"
            styleType="whiteButton"
            className="mt-32 lg:w-[219px] h-[44px] text-base m-0"
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
