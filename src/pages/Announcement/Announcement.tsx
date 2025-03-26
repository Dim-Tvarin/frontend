import CustomRadioGroup from 'components/CustomRadioGroup';
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
import { animalType, genderType } from './types';

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

  const token = useSelector(selectToken);
  watch('images');

  const onSubmit = async (data: AnnouncementForm) => {
    const result = announceSchema.safeParse(data);
    if (result.error) {
      console.error('Щось пішло не по плану', result.error);
    }
    const bodyFormData = new FormData();

    const { images, ...otherData } = data;
    images.forEach((image: File) => bodyFormData.append('images', image));

    bodyFormData.append(
      'animalData',
      JSON.stringify({
        ...otherData,
        age: `${otherData.age}`,
      })
    );
    axios
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
        }
      })
      .catch(error => {
        if (error.status === 401) {
          alert('Щоб залишити оголошення, увійдіть у свій аккаунт');
        } else {
          console.error('error', error);
          alert('Щось пішло не по плану');
        }
      });
  };

  return (
    <div className="container flex flex-row gap-16 text-default-btn">
      <div className="flex flex-col flex-1/2 mt-100">
        <h2 className="text-xl mb-32">Додати оголошення</h2>

        <form
          className="flex flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-20 mb-16">Оберіть вид тварини</p>
          <CustomRadioGroup
            items={animalType}
            className="grid grid-cols-2"
            itemWidth="305"
            {...register('animalType')}
            onChange={value =>
              setValue(
                'animalType',
                value as 'cat' | 'dog' | 'bird' | 'another'
              )
            }
            error={errors.animalType?.message}
          />

          <p className="text-20 mt-32 mb-16">Стать </p>
          <CustomRadioGroup
            items={genderType}
            itemWidth="197"
            {...register('gender')}
            onChange={value => setValue('gender', value as 'male' | 'female')}
            error={errors.animalType?.message}
          />

          <div className="flex mt-32 gap-16">
            <InputField
              label="Вік"
              id="age"
              className="w-[305px] h-[40px] mt-16"
              labelSize={20}
              {...register('age')}
              error={errors.age?.message}
            />
            <InputField
              label="Порода"
              id="breed"
              className="w-[305px] h-[40px] mt-16"
              labelSize={20}
              {...register('breed')}
              error={errors.breed?.message}
              value="невідомо"
            />
          </div>

          <div className="flex mt-32 gap-16">
            <InputField
              label="Ім’я тварини"
              id="animalName"
              className="w-[305px] h-[40px] mt-16"
              labelSize={20}
              {...register('animalName')}
              error={errors.animalName?.message}
            />
            <InputField
              label="Місто"
              id="animalLocation"
              className="w-[305px] h-[40px] mt-16"
              labelSize={20}
              {...register('animalLocation')}
              error={errors.animalLocation?.message}
            />
          </div>

          <TextareaDemo
            id="adText"
            className="text-left mt-32"
            placeholder="Опишіть тварину, її характер, історію, забарвлення"
            label="Опис тварини:"
            {...register('adText')}
            error={errors.adText?.message}
          />

          <p className="text-20 mb-16 mt-32">
            Добавте фото тварини та документи
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

          <CustomButton type="submit" styleType="defaultButton">
            Створити оголошення
          </CustomButton>
        </form>
      </div>

      <div className="w-[630px] bg-orange rounded-[30px] flex flex-col gap-32 py-32 items-end mt-100">
        <div className="w-[600px] rounded-l-[30px] overflow-hidden">
          <img src={announce1} alt="хлопець з хаскі" />
        </div>
        <div className="w-[600px] rounded-l-[30px] overflow-hidden">
          <img src={announce2} alt="хлопець з хаскі" />
        </div>
        <div className="w-[600px] rounded-l-[30px] overflow-hidden">
          <img src={announce3} alt="хлопець з хаскі" />
        </div>
      </div>
    </div>
  );
};

export default Announcement;
