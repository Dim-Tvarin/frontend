import CustomRadioGroup from 'components/CustomRadioGroup';
import announce1 from '../assets/announce1.jpg'
import announce2 from '../assets/announce2.jpg'
import announce3 from '../assets/announce3.jpg'
import { InputField } from 'components/InputField';
import { CustomButton } from 'components/CustomButton';
import { z } from 'zod';

const petType = [
  {
    value: "Кіт",
    label: "Кіт",
  },
  {
    value: "Собака",
    label: "Собака",
  },
    {
    value: "Птах",
    label: "Птах",
  },
  {
    value: "Інша тварина",
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
  age: z.number(),
  breed: z.string(),
  petName: z.string(),
  city: z.string(),
})

 const Announcement = () => {
  return (
    <div className='container flex flex-row gap-16'>
      <div className="flex flex-col flex-1/2 mt-100">
        <h2 className="text-xl mb-32">Додати оголошення</h2>

        <form className='flex flex-col items-start'>
          <p className='text-20 mb-16'>Оберіть вид тварини</p>
          <CustomRadioGroup items={petType} className="flex-wrap" itemWidth='305' />
          
          <p className='text-20 mt-32 mb-16'>Стать </p>
          <CustomRadioGroup items={petSex} itemWidth='305' />
          
          <div className='flex mt-32 gap-16'>
            <InputField
              label="Вік"
              id="age"
              className='w-[305px] h-[40px] mt-16'
              labelSize={20}
            />
            <InputField
              label="Порода"
              id="breed"
              className='w-[305px] h-[40px] mt-16'
              labelSize={20}
              />
          </div>

          <div className='flex mt-32 gap-16'>
            <InputField
              label="Ім’я тварини"
              id="petName"
              className='w-[305px] h-[40px] mt-16'
              labelSize={20}
            />
            <InputField
              label="Місто"
              id="city"
              className='w-[305px] h-[40px] mt-16'
              labelSize={20}
              />
          </div>

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