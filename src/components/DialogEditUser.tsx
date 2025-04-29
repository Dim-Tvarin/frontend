import * as Dialog from '@radix-ui/react-dialog';
import { CustomButton } from './CustomButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import CloseSVG from 'src/assets/CloseSVG';
import { closeDialog } from 'src/redux/dialogs/dialogSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'src/redux/store';
import {
  DialogHeader,
  DialogFooter,
  DialogOverlay,
} from './components/ui/dialog';
import { InputField } from './InputField';
import { selectError, selectUser } from 'src/redux/users/usersSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { z } from 'zod';
import { PhoneInput } from './PhoneInput';
import { editUserSchema } from '../validations/editProfileValidation';
import { useEffect, useState } from 'react';
import { useSmartUserUpdate } from 'hooks/useSmartUserUpdate';
import AvatarUploadField from './AvatarUploadField';
import { showToast } from './Toast';

type FormData = z.infer<typeof editUserSchema>;

const DialogEditUser: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
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

  const onSubmit = async (data: FormData) => {
    await updateUserSmart(data);
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(closeDialog());
    } else if (isError) {
      showToast({ title: 'Щось пішло не так', status: 'error' });
    }
  }, [isSuccess, isError, dispatch]);

  return (
    <Dialog.Root
      open={activeDialog === 'editUser'}
      onOpenChange={() => dispatch(closeDialog())}
    >
      <Dialog.Portal>
        <DialogOverlay className="fixed inset-0 bg-black/70 " />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          onPointerDownOutside={e => e.preventDefault()}
          aria-describedby="Забули пароль?"
        >
          <Dialog.Close className="absolute top-30 right-30 ">
            <CloseSVG size="24" />
          </Dialog.Close>
          <DialogHeader>
            <Dialog.Title className="text-2xl leading-[140%] text-default-btn mb-30">
              <Tabs
                defaultValue="account"
                value={activeTab}
                onValueChange={setActiveTab}
                className={`rounded-[30px] p-[60px] pb-[84px]  text-center gap-0 bg-dialog ${
                  activeTab === 'account'
                    ? 'w-[965px] min-h-[589px]'
                    : 'w-[630px] min-h-[604px]'
                }`}
              >
                <TabsList className="felx gap-20">
                  <TabsTrigger
                    value="account"
                    aria-orientation="vertical"
                    className="w-[185px] h-[45px] m-0 outline-none shadow-none rounded-[20px] py-[26px]
          data-[state=active]:shadow-none 
          data-[state=active]:outline-none 
          text-white hover:text-default-btn bg-default-btn hover:bg-orange hover:border-default-btn hover:border-2 disabled:bg-disabled  
          data-[state=active]:text-default-btn 
          data-[state=active]:bg-white 
          data-[state=active]:border-2
          data-[state=active]:border-default-btn 
          data-[state=active]:hover:border-orange"
                  >
                    Основна інформація
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    aria-orientation="vertical"
                    className="w-[185px] h-[45px] m-0 outline-none shadow-none rounded-[20px] py-[26px]
          data-[state=active]:shadow-none 
          data-[state=active]:outline-none 
          text-white hover:text-default-btn bg-default-btn hover:bg-orange hover:border-default-btn hover:border-2 disabled:bg-disabled  
          data-[state=active]:text-default-btn 
          data-[state=active]:bg-white 
          data-[state=active]:border-2
          data-[state=active]:border-default-btn 
          data-[state=active]:hover:border-orange"
                  >
                    Зміна паролю
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="flex mt-30">
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
                        className="w-[510px] h-48 text-[18px]"
                        labelClass="mb-16"
                        labelSize="xl"
                        id="name"
                        {...register('name')}
                        error={errors.name?.message}
                      />
                      <InputField
                        label="Адреса електронної пошти"
                        placeholder="Введіть адресу електронної пошти"
                        className="w-[510px] h-48 text-[18px]"
                        labelClass=" mb-16"
                        labelSize="xl"
                        id="email"
                        {...register('email')}
                        error={emailError || errors.email?.message}
                      />
                      <div className="flex justify-between gap-8">
                        <InputField
                          label="Місто"
                          placeholder="Введіть ваше місто"
                          className="w-[277px] h-48 text-[18px]"
                          labelClass=" mb-16"
                          labelSize="xl"
                          id="location"
                          {...register('location')}
                          error={errors.location?.message}
                        />
                        <PhoneInput
                          label="Номер телефону"
                          placeholder="+380"
                          className="w-[225px] h-48 text-[18px]"
                          labelClass=" mb-16"
                          labelSize="xl"
                          id="phone"
                          {...register('phone')}
                          error={errors.phone?.message}
                        />
                      </div>
                      <DialogFooter className="flex flex-row">
                        <CustomButton
                          type="submit"
                          styleType="defaultButton"
                          className="mt-32 w-[196px] h-[44px] text-base"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Збереження...' : 'Зберегти зміни'}
                        </CustomButton>
                        <CustomButton
                          type="submit"
                          styleType="whiteButton"
                          className="mt-32 w-[196px] h-[44px] text-base"
                        >
                          Видалити профіль
                        </CustomButton>
                      </DialogFooter>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="password"></TabsContent>
              </Tabs>
            </Dialog.Title>
          </DialogHeader>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogEditUser;
