import announce2 from '../../assets/announce2.jpg';
import announce3 from '../../assets/announce3.jpg';
import announce4 from '../../assets/announce4.jpg';
import { InputField } from 'components/InputField';
import { CustomButton } from 'components/CustomButton';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaDemo } from 'components/CustomTextarea';
import { FilesInput } from 'components/FilesInput';
import { announceSchema } from '../../validations/announceValidation';
import { animalType, gender } from './types';
import track from '../../../public/track.png';
import { LuCirclePlus } from "react-icons/lu";
import { CitySelect } from 'components/CitySelect';
import CustomRadioGroup from 'components/CustomRadioGroup';
import { Spinner } from 'components/Spinner';
import { useCreateAnimalMutation } from 'src/redux/animals/animalsApi';

import FormError from 'components/FormError';

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


  const onSubmit = async (data: AnnouncementForm) => {
    const result = announceSchema.safeParse(data);
    if (result.error) {
      console.error('Щось пішло не по плану', result.error);
    }
    const bodyFormData = new FormData();

    const { images, ...otherData } = data;
    images?.forEach((image: File) => bodyFormData.append('images', image));
    const genderData = otherData.gender ? otherData.gender : 'unknown'

    bodyFormData.append(
      'animalData',
      JSON.stringify({
        ...otherData,
        gender: genderData,
        age: otherData.age
      })
    );

     try {
      await createAnimal(bodyFormData).unwrap();
      alert('Оголошення успішно створене');
      reset();
    } catch (error: any) {
      if (error?.status === 401) {
        alert('Щоб залишити оголошення, увійдіть у свій аккаунт');
      } if (error?.status === 500) {
        alert('Ой, щось сервер притомився, спробуйте пізніше');
      }else {
        console.error('error', error);
        alert('Щось пішло не по плану');
      }
    }
  };

  return (
    <div className="container flex flex-row gap-16 text-default-btn relative z-10">
      <div className="absolute z-1  left-[84px] top-[27px]">
        <img src={track} alt="track" className="w-[180px]" />
      </div>
      <div className="flex flex-col flex-1/2 mt-100">
        <h2 className="text-[32px] mb-32 z-10">Додати оголошення</h2>
        <form
          className="flex flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-xl mb-16 z-10">Оберіть вид тварини *</p>

          <Controller
            name="animalType"
            control={control}
            render={({ field: { onChange, name, onBlur, ref, value } }) => (
              <CustomRadioGroup
                defaultValue={animalTypeValue}
                items={animalType}
                className="grid grid-cols-2"
                itemWidth="305"
                error={errors.animalType?.message}
                name={name}
                ref={ref}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />

          <p className="text-xl mt-32 mb-16">Стать </p>
          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, name, onBlur, ref, value } }) => (
              <CustomRadioGroup
                defaultValue={genderValue}
                items={gender}
                className="grid grid-cols-2"
                itemWidth="305"
                error={errors.gender?.message}
                name={name}
                ref={ref}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />

          <div className="flex mt-32">
            <div className="grid grid-cols-[150px_150px] gap-[10px] mr-16">
              <InputField
                label="Вік"
                id="years"
                placeholder="0 років"
                className="w-[150px] h-[40px] mt-16"
                labelSize="xl"
                {...register('age.years')}
              />
              <InputField
                label=" "
                id="months"
                placeholder="0 місяців"
                className="w-[150px] h-[40px] mt-16 mr-10"
                labelSize="xl"
                {...register('age.months')}
              />
              {errors.age?.months?.message && (
                <FormError error={errors.age?.months?.message} />
              )}
              {errors.age?.years?.message && (
                <FormError error={errors.age?.years?.message} />
              )}
            </div>
            <InputField
              label="Порода *"
              id="breed"
              className="w-[305px] h-[40px] mt-16"
              labelSize="lg"
              {...register('breed')}
              error={errors.breed?.message}
            />
          </div>

          <div className="grid grid-cols-[305px_305px] mt-32 gap-16">
            <InputField
              label="Ім’я тварини *"
              id="animalName"
              className="w-[305px] h-[40px] mt-16"
              labelSize="xl"
              {...register('animalName')}
              error={errors.animalName?.message}
            />
            <div>
              <p className="text-xl mb-[13px] text-left">Місто * </p>
              <Controller
                name="animalLocation"
                control={control}
                render={({ field }) => (
                  <CitySelect
                    onChange={field.onChange}
                    className="w-[305px] h-[40px]"
                    error={errors?.animalLocation?.message}
                  />
                )}
              />
            </div>
          </div>

          <TextareaDemo
            id="announvementText"
            className="text-left mt-32"
            placeholder="Опишіть тварину, її характер, історію, забарвлення"
            label="Опис тварини: *"
            {...register('adText')}
            error={errors.adText?.message}
          />

          <Controller
            name="images"
            control={control}
            defaultValue={[]}
            render={({ field: { ref, name, onChange, value } }) => (
              <FilesInput
                ref={ref}
                groupLabel="Добавте фото тварини та документи *"
                labelClass="mb-16 mt-32"
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
            className="flex gap-10 z-10"
          >
            {isLoading ? <Spinner /> : <LuCirclePlus size={20} />}
            Створити оголошення
          </CustomButton>
        </form>
      </div>

      <div className=" bg-orange rounded-[30px] flex flex-col gap-32 py-32 items-end my-100">
        <div className="w-[600px] rounded-l-[30px] overflow-hidden ml-30">
          <img src={announce4} alt="хлопець з лабродором" />
        </div>
        <div className="w-[600px] rounded-l-[30px] overflow-hidden">
          <img src={announce2} alt="дівчина з собакою" />
        </div>
        <div className="w-[600px] rounded-l-[30px] overflow-hidden">
          <img src={announce3} alt="дівчина з котом" />
        </div>
      </div>

      <div className="absolute z-1  left-[39%] bottom-[85px] rotate-[57deg]">
        <img src={track} alt="track" className="w-[180px]" />
      </div>
    </div>
  );
};

export default Announcement;
