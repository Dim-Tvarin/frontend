import CustomRadioGroup from 'components/CustomRadioGroup';
import announce1 from '../assets/announce1.jpg'
import announce2 from '../assets/announce2.jpg'
import announce3 from '../assets/announce3.jpg'

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

 const Announcement = () => {
  return (
    <div className='container flex flex-row gap-16'>
      <div className="flex flex-col flex-1/2 mt-100">
        <h2 className="text-xl mb-32">Додати оголошення</h2>

        <form className='flex flex-col items-start'>
          <p className='text-20 mb-16'>Оберіть вид тварини</p>
          <CustomRadioGroup items={ petType} className="flex-wrap" itemWidth='305'/>
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