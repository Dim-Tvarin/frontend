import announce1 from '../../assets/announce1.jpg';
import announce2 from '../../assets/announce2.jpg';
import announce3 from '../../assets/announce3.jpg';
import { InputField } from 'components/InputField';
import { CustomButton } from 'components/CustomButton';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaDemo } from 'components/CustomTextarea';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/users/usersSlice';
import { FilesInput } from 'components/FilesInput';
import { announceSchema } from '../../validations/announceValidation';
import { animalType, gender } from './types';
import track from '../../../public/track.png';
import { MdErrorOutline } from 'react-icons/md';
import { CitySelect } from 'components/CitySelect';
import CustomRadioGroup from 'components/CustomRadioGroup';
import { Spinner } from 'components/Spinner';
import { useState } from 'react';

type AnnouncementForm = z.infer<typeof announceSchema>;

const Announcement = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<AnnouncementForm>({
    resolver: zodResolver(announceSchema),
    mode: 'onChange',
  });
  const [isLoading, setIsLoading] = useState(false)

  const token = useSelector(selectToken);
  watch('images');

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
    setIsLoading(true)
    return axios
      .post(
        'https://marketplace-backend-wrk2.onrender.com/animals',
        bodyFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(res => {
        if (res.status === 200) {
          alert('Оголошення успышно створене');
          reset();
          setIsLoading(false)
        }
      })
      .catch(error => {
        setIsLoading(false)
        if (error.status === 401) {
          alert('Щоб залишити оголошення, увійдіть у свій аккаунт');
        } else {
          console.error('error', error);
          alert('Щось пішло не по плану');
        }
      });
  };

  return (
    <div className="container flex flex-row gap-16 text-default-btn relative z-10">
   
      <div className="absolute z-1  left-[84px] top-[27px]">
          <img src={track} alt="track" className='w-[180px]'/>
      </div>
      

      <div className="flex flex-col flex-1/2 mt-100">
        <h2 className="text-[32px] mb-32 z-10">Додати оголошення</h2>

        <form
          className="flex flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-20 mb-16 z-10">Оберіть вид тварини *</p>

        <Controller
          name="animalType"
          control={control}
          render={({ field }) => (
            <CustomRadioGroup
              items={animalType}
              className="grid grid-cols-2"
              itemWidth="305"
              onChange={val => field.onChange(val)}
              error={errors.animalType?.message}
            />
          )}
        />
          
          <p className="text-20 mt-32 mb-16">Стать </p>
          <CustomRadioGroup
            items={gender}
            itemWidth="305"
            {...register('gender')}
            onChange={value => setValue('gender', value as 'male' | 'female')}
          />
         
          <div className="flex mt-32">
            <div className='grid grid-cols-[150px_150px] gap-[10px] mr-16'>
              <InputField
                label='Вік'
                  id="months"
                  placeholder='0 місяців'
                  className="w-[150px] h-[40px] mt-16 mr-10"
                  labelSize={20}
                  {...register('age.months')}
              />
             
              <InputField
                label=' '
                  id="years"
                  placeholder='0 років'
                  className="w-[150px] h-[40px] mt-16"
                  labelSize={20}
                  {...register('age.years')}
              />
              {errors.age?.months?.message ?
                (<div className="flex items-center mt-[10px] gap-[4px]">
                        <MdErrorOutline size={18} className="text-error" />
                        <p className="text-left text-error text-xs">{errors.age?.months?.message}</p>
                </div>) : ''}
              {errors.age?.years?.message ? 
                (<div className="flex items-center mt-[10px] gap-[4px]">
                        <MdErrorOutline size={18} className="text-error" />
                        <p className="text-left text-error text-xs">{errors.age?.years?.message}</p>
                </div>) : ''}
              
            </div>

              <InputField
                label='Порода *'
                id="breed"
                className="w-[305px] h-[40px] mt-16"
                labelSize={20}
                {...register('breed')}
                error={errors.breed?.message}
                />
          
          </div>

          <div className="grid grid-cols-[305px_305px] mt-32 gap-16">
            <InputField
              label="Ім’я тварини *"
              id="animalName"
              className="w-[305px] h-[40px] mt-16"
              labelSize={20}
              {...register('animalName')}
              error={errors.animalName?.message}
            />
            <div>
            <p className="text-20 mb-[13px] text-left">Місто * </p>
             <Controller
              name="animalLocation"
              control={control}
              render={({ field }) => <CitySelect onChange={field.onChange} className="w-[305px] h-[40px]"/>}
              />
            </div>
          </div>

          <TextareaDemo
            id="adText"
            className="text-left mt-32"
            placeholder="Опишіть тварину, її характер, історію, забарвлення"
            label="Опис тварини: *"
            {...register('adText')}
            error={errors.adText?.message}
          />

          <p className="text-20 mb-16 mt-32">
            Добавте фото тварини та документи *
          </p>
          <Controller
            name="images"
            control={control}
            render={({ field: { ref, name, onChange } }) => (
              <FilesInput
                ref={ref}
                name={name}
                onChange={onChange}
                error={errors.images?.message?.toString()}
              />
            )}
          />

          <CustomButton type="submit" styleType="defaultButton" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Створити оголошення'}
          </CustomButton>
        </form>
      </div>

      <div className=" bg-orange rounded-[30px] flex flex-col gap-32 py-32 items-end my-100">
        <div className="w-[600px] rounded-l-[30px] overflow-hidden ml-30">
          <img src={announce1} alt="хлопець з хаскі" />
        </div>
        <div className="w-[600px] rounded-l-[30px] overflow-hidden">
          <img src={announce2} alt="хлопець з хаскі" />
        </div>
        <div className="w-[600px] rounded-l-[30px] overflow-hidden">
          <img src={announce3} alt="хлопець з хаскі" />
        </div>
      </div>

        <div className="absolute z-1  left-[39%] bottom-[85px] rotate-[57deg]">
          <img src={track} alt="track" className='w-[180px]'/>
      </div>
    </div>
  );
};

export default Announcement;
