import announce2 from '../../assets/announce2.jpg';
import announce3 from '../../assets/announce3.jpg';
import announce4 from '../../assets/announce4.jpg';
import { InputField } from 'components/InputField';
import { CustomButton } from 'components/CustomButton';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaDemo } from 'components/CustomTextarea';

import { announceSchema } from '../../validations/announceValidation';
import { animalTypeOptions, genderOption } from './types';
import track from '../../../public/track.png';
import { LuCirclePlus } from 'react-icons/lu';
import { CitySelect } from 'components/CitySelect';
import CustomRadioGroup from 'components/CustomRadioGroup';
import { Spinner } from 'components/Spinner';
import { useCreateAnimalMutation } from 'src/redux/animals/animalsApi';
import FormError from 'components/FormError';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'src/redux/users/usersSlice';
import { useNavigate } from 'react-router';
import { showToast } from 'components/Toast';
import BreedSelect from 'components/BreedSelect';
import { FilesInput } from 'components/FilesInputWithCrop';
import { useEffect } from 'react';

type AnnouncementForm = z.infer<typeof announceSchema>;

const Announcement = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<AnnouncementForm>({
    resolver: zodResolver(announceSchema),
    mode: 'onChange',
  });
  const [createAnimal, { isLoading }] = useCreateAnimalMutation();

  watch('images');
  const animalTypeValue = watch('animalType');
  const genderValue = watch('gender');
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      showToast({
        title: 'Звурніть увагу!',
        description: 'Щоб додати оголошення ви повинні бути залогіненими',
        status: 'info',
      });
      const timer = setTimeout(() => {
        navigate('/register');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (data: AnnouncementForm) => {
    const result = announceSchema.safeParse(data);
    if (result.error) {
      console.error('Щось пішло не по плану', result.error);
    }
    const bodyFormData = new FormData();

    const { images, ...otherData } = data;
    images?.forEach((image: File) => bodyFormData.append('images', image));
    const genderData = otherData.gender ? otherData.gender : 'unknown';

    bodyFormData.append(
      'animalData',
      JSON.stringify({
        ...otherData,
        gender: genderData,
        age: otherData.age,
      })
    );

    try {
      await createAnimal(bodyFormData).unwrap();
      showToast({
        title: 'Оголошення успішно створене',
        status: 'success',
      });

      reset();
    } catch (error: any) {
      if (error?.status === 400) {
        showToast({
          title: 'Невірний формат даних',
          description: `Виправте помилку ${error.message}`,
          status: 'error',
        });
      }
      if (error?.status === 401) {
        showToast({
          title: 'Щоб залишити оголошення, увійдіть у свій аккаунт',
          status: 'error',
        });
      }
      if (error?.status === 500) {
        showToast({
          title: 'Виникла помилка сервера',
          description: 'Спробуйте ще раз пізніше',
          status: 'error',
        });
      } else {
        console.error('error', error);
        showToast({
          title: 'Щось пішло не по плану',
          status: 'error',
        });
      }
    }
  };

  return (
    <div className="z-10 relative flex flex-row gap-16 text-default-btn container">
      <div className="top-20 lg:top-[27px] left-10 lg:left-[84px] z-1 absolute">
        <img src={track} alt="track" className="w-[180px]" />
      </div>
      <div className="flex flex-col flex-1/2 mt-100">
        <h2 className="z-10 mb-32 text-[32px]">Додати оголошення</h2>
      <div className="flex flex-col flex-1/2 mt-72 lg:mt-100">
        <h2 className="z-10 mb-16 lg:mb-32 lg:text-[32px] text-lg">
          Додати оголошення
        </h2>
        <form
          className="z-20 flex flex-col items-start mb-50 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="z-10 mb-16 text-base">Оберіть вид тварини *</p>
          <p className="z-10 mb-10 lg:mb-16 text-base">Оберіть вид тварини *</p>
          <Controller
            name="animalType"
            control={control}
            render={({ field: { onChange, name, onBlur, ref } }) => (
              <CustomRadioGroup
                items={animalTypeOptions}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2"
                error={errors.animalType?.message}
                name={name}
                ref={ref}
                value={animalTypeValue}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />

          <p className="mt-32 mb-16 text-base">Стать </p>
          <p className="mt-16 lg:mt-32 mb-10 lg:mb-16 text-base">Стать</p>
          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, name, onBlur, ref } }) => (
              <CustomRadioGroup
                items={genderOption}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2"
                error={errors.gender?.message}
                name={name}
                ref={ref}
                value={genderValue}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />

          <div className="flex mt-32">
            <div className="gap-[10px] grid grid-cols-[150px_150px] mr-16">
          <div className="flex-wrap gap-0 md:gap-20 grid md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 mt-16 lg:mt-32 w-full">
            <div className="gap-16 lg:gap-[10px] grid grid-cols-2 w-full md:w-[296px]">
              <InputField
                label="Вік *"
                id="years"
                placeholder="0 років"
                className="mt-16 w-[150px] h-[40px] text-base"
                className="w-full lg:w-[150px] h-[40px] text-base"
                labelSize="base"
                {...register('age.years')}
              />
              <InputField
                label=" "
                id="months"
                placeholder="0 місяців"
                className="mt-16 mr-10 w-[150px] h-[40px] text-base"
                labelSize="base"
                {...register('age.months')}
              />
              {errors.age?.years?.message && (
                <FormError error={errors.age?.years?.message} />
              )}
              {errors.age?.months?.message && (
                <FormError error={errors.age?.months?.message} />
              )}
            </div>
            <div>
              <p className="mb-8 text-base text-left">Порода * </p>
              <Controller
                name="breed"
                control={control}
                render={({ field }) => (
                  <BreedSelect
                    onChange={field.onChange}
                    className="w-full h-[40px]"
                    type={animalTypeValue}
                    errorMess={errors?.breed?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="gap-16 grid grid-cols-[305px_305px] mt-32">
            <InputField
              label="Ім’я тварини *"
              id="animalName"
              className="mt-16 w-[305px] h-[40px] text-base"
              labelSize="base"
              {...register('animalName')}
              error={errors.animalName?.message}
            />
            <div>
              <p className="mb-8 text-base text-left">Місто * </p>
              <Controller
                name="animalLocation"
                control={control}
                render={({ field }) => (
                  <CitySelect
                    onChange={field.onChange}
                    className="w-full h-[40px]"
                    errorMess={errors?.animalLocation?.message}
                  />
                )}
              />
            </div>
          </div>

          <TextareaDemo
            id="announvementText"
            className="mt-32 text-sm text-left"
            placeholder="Опишіть тварину, її характер, історію, забарвлення"
            label="Опис тварини: *"
            labelSize="base"
            {...register('adText')}
            error={errors.adText?.message}
          />
          {/* <div className='z-1 relative mt-32'>
            <LuGlobe size={24} className='top-46 left-0 absolute'/>
            <InputField
              label="Додаткове посилання"
              id="link"
              placeholder='https://...'
              className="mt-16 ml-32 w-[calc(100%-32px)] h-[40px]"
              labelSize="xl"
              {...register('link')}
              error={errors.link?.message}
            />
            <p className='mt-10 ml-32 text-input-border text-xs text-left'> Це може бути сторінка тварини на сайті притулку, публікація у соцмережах або відео.
            Максимальна довжина: 255 символів.</p>
          </div> */}

          <Controller
            name="images"
            control={control}
            defaultValue={[]}
            render={({ field: { ref, name, onChange, value } }) => (
              <FilesInput
                ref={ref}
                groupLabel="Додайте фото тварини та документи *"
                labelClass="mb-16 mt-16 lg:mt-32"
                labelSize="base"
                className="w-full"
                name={name}
                onChange={onChange}
                error={errors.images?.message?.toString()}
                value={value}
              />
            )}
          />

          <CustomButton
            type="submit"
            styleType="defaultButton"
            disabled={isLoading}
            className="z-10 flex gap-8 w-[259px]"
          >
            {isLoading ? <Spinner /> : <LuCirclePlus size={20} />}
            Створити оголошення
          </CustomButton>
        </form>
      </div>

      <div className="flex flex-col items-end gap-32 bg-orange my-100 py-32 rounded-[30px]">
        <div className="ml-30 rounded-l-[30px] w-[600px] overflow-hidden">
          <img src={announce4} alt="хлопець з лабродором" />
        </div>
        <div className="rounded-l-[30px] w-[600px] overflow-hidden">
          <img src={announce2} alt="дівчина з собакою" />
        </div>
        <div className="rounded-l-[30px] w-[600px] overflow-hidden">
          <img src={announce3} alt="дівчина з котом" />
        </div>
      </div>

      <div className="-bottom-[16px] left-[43%] z-1 absolute rotate-[57deg]">
        <img src={track} alt="track" className="w-[180px]" />
      </div>
    </div>
  );
};

export default Announcement;
