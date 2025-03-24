import CustomRadioGroup from 'components/CustomRadioGroup';
import announce1 from '../../assets/announce1.jpg';
import announce2 from '../../assets/announce2.jpg';
import announce3 from '../../assets/announce3.jpg';
import { InputField } from 'components/InputField';
import { CustomButton } from 'components/CustomButton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaDemo } from 'components/CustomTextarea';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/users/usersSlice';

const animalType = [
  {
    value: 'cat',
    label: 'Кіт',
  },
  {
    value: 'dog',
    label: 'Собака',
  },
  {
    value: 'bird',
    label: 'Птах',
  },
  {
    value: 'another',
    label: 'Інша тварина',
  },
];

const gender = [
  {
    value: 'male',
    label: 'самець',
  },
  {
    value: 'female',
    label: 'самка',
  },
  {
    value: 'unknown',
    label: 'невідомо',
  },
];

const announceSchema = z.object({
  animalType: z.enum(['cat', 'dog', 'bird', 'another'], {
    errorMap: () => {
      return { message: 'Оберіть вид тварини' };
    },
  }),
  gender: z.enum(['male', 'female', 'unknown']),
  age: z.coerce
    .string()
    .regex(/^\d+$/, 'Введіть ціле число')
    .nonempty('Введіть вік тварини')
    .trim(),
  breed: z
    .string()
    .nonempty('Введіть назву породи або "НЕВІДОМО"')
    .max(30, 'Порода не може перевищувати 30 символів')
    .trim(),
  animalName: z.string().nonempty("Введіть ім'я тварини").trim(),
  animalLocation: z.string().min(2, 'Введіть назву населенного пункту').trim(),
  adText: z
    .string()
    .min(10, 'Текст должен содержать минимум 10 символов')
    .max(500, 'Текст не должен превышать 500 символов')
    .nonempty('Поле обязательно')
    .trim(),
});

type AnnouncementForm = z.infer<typeof announceSchema>;

const Announcement = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AnnouncementForm>({
    resolver: zodResolver(announceSchema),
    mode: 'onChange',
  });

  const token = useSelector(selectToken);

  console.log('errors', errors);
  const onSubmit = async (data: AnnouncementForm) => {
    const result = announceSchema.safeParse(data);
    if (result.error) {
      console.error('Щось пішло не по плану', result.error);
    }

    const bodyFormData = new FormData();
    bodyFormData.append(
      'animalData',
      JSON.stringify({
        ...data,
        age: `${data.age}`,
      })
    );

    const createAnnouncement = axios
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
      .then(res => console.log('res!!!!', res))
      .catch(error => {
        if (error.status === 401) {
          alert('Щоб залишити оголошення, увійдіть у свій аккаунт');
        } else {
          console.error('error', error);
          alert('Щось пішло не по плану');
        }
      });
    console.log(
      'createAnnouncement',
      createAnnouncement.then(res => console.log('res', res))
    );
  };

  return (
    <div className="container flex flex-row gap-16">
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
            items={gender}
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
              value="Песто"
            />
            <InputField
              label="Місто"
              id="animalLocation"
              className="w-[305px] h-[40px] mt-16"
              labelSize={20}
              {...register('animalLocation')}
              error={errors.animalLocation?.message}
              value="Львів"
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
