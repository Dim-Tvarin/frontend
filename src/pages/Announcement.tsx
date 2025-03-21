import CustomRadioGroup from 'components/CustomRadioGroup';
import announce1 from '../assets/announce1.jpg'
import announce2 from '../assets/announce2.jpg'
import announce3 from '../assets/announce3.jpg'
import { InputField } from 'components/InputField';
import { CustomButton } from 'components/CustomButton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaDemo } from 'components/CustomTextarea';

const petType = [
  {
    value: "cat",
    label: "Кіт",
  },
  {
    value: "dog",
    label: "Собака",
  },
    {
    value: "bird",
    label: "Птах",
  },
  {
    value: "another",
    label: "Інша тварина",
  },
];

const petSex = [
  {
    value: "girl",
    label: "Дівчинка",
  },
  {
    value: "boy",
    label: "Хлопчик",
  }
];

const announceSchema = z.object({
  petType: z.enum(['cat', 'dog', 'bird', 'another']),
  petSex: z.enum(['boy', 'girl']),
  age: z.string().regex(/^\d+$/).transform(Number),
  breed: z.string().trim(),
  petName: z.string().trim(),
  city: z.string().trim(),
  text: z.string().trim(),
})

type AnnouncementForm = z.infer<typeof announceSchema>

const Announcement = () => {
  const { register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AnnouncementForm>({
    resolver: zodResolver(announceSchema),
    mode: 'onChange',
  })

  const onSubmit = (data: AnnouncementForm) => {
    const result = announceSchema.safeParse(data)
    console.log(data, result);
    if (result.success) {
      console.log('11');
    }
  }

  return (
    <div className='container flex flex-row gap-16'>
      <div className="flex flex-col flex-1/2 mt-100">
        <h2 className="text-xl mb-32">Додати оголошення</h2>

        <form className='flex flex-col items-start' onSubmit={handleSubmit(onSubmit)}>
         <p className='text-20 mb-16'>Оберіть вид тварини</p>
          <CustomRadioGroup items={petType} className="grid grid-cols-2" itemWidth='305'
            {...register('petType')}
           onChange={value =>
            setValue('petType', value as 'cat'| 'dog' | 'bird' | 'another')
          }
            error={errors.petType?.message}
          />
          
          <p className='text-20 mt-32 mb-16'>Стать </p>
          <CustomRadioGroup items={petSex} itemWidth='305'
            {...register('petSex')}
            onChange={value =>
              setValue('petSex', value as 'boy'| 'girl')
            }
            error={errors.petSex?.message}
          />
          
          <div className='flex mt-32 gap-16'>
            <InputField
              label="Вік"
              id="age"
              className='w-[305px] h-[40px] mt-16'
              labelSize={20}
              {...register('age')}
               error={errors.age?.message}
            />
            <InputField
              label="Порода"
              id="breed"
              className='w-[305px] h-[40px] mt-16'
              labelSize={20}
              {...register('breed')}
              error={errors.breed?.message}
              />
          </div>

          <div className='flex mt-32 gap-16'>
            <InputField
              label="Ім’я тварини"
              id="petName"
              className='w-[305px] h-[40px] mt-16'
              labelSize={20}
              {...register('petName')}
              error={errors.petName?.message}
            />
            <InputField
              label="Місто"
              id="city"
              className='w-[305px] h-[40px] mt-16'
              labelSize={20}
              {...register('city')}
              error={errors.city?.message}
              />
          </div>

          <TextareaDemo id="text" className='text-left mt-32'
            placeholder="Опишіть тварину, її характер, історію, забарвлення"
            label="Текст оголошення"
            {...register('text')}
          />

          <CustomButton type="submit" styleType="defaultButton">
            Створити оголошення
          </CustomButton>
        </form>
      </div>


       <div className="w-[630px] bg-orange rounded-[30px] flex flex-col gap-32 py-32 items-end mt-100">
          <div className="w-[600px] rounded-l-[30px] overflow-hidden">
              <img src={announce1} alt="хлопець з хаскі"/>
        </div>
         <div className="w-[600px] rounded-l-[30px] overflow-hidden">
              <img src={announce2} alt="хлопець з хаскі"/>
        </div>
         <div className="w-[600px] rounded-l-[30px] overflow-hidden">
              <img src={announce3} alt="хлопець з хаскі"/>
          </div>
        </div>
    </div>
  )
}


export default Announcement;