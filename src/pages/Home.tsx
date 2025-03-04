import { CustomButton } from "components/CustomButton"
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="container">
      <section className="flex flex-row gap-[20px] mt-[60px]">
        <div className="flex flex-col gap-[24px] justify-center w-2/4 items-center">
          <p className="text-[32px] px-[20px]">Знайдіть свого ідеального домашнього улюбленця, або допоможіть безпритульним тваринкам знайти свій дім</p>
          <CustomButton className="w-[236px] bg-[#042D4A] rounded-[20px]">
            <Link to="/lookfor">Створити оголошення</Link>
          </CustomButton>
        </div>
        <div className="h-[510px] w-[580px] bg-[#f7ebeb] rounded-[30px]  border-l-[50px] border-t-[50px]"></div>
      </section>

      <section className="flex flex-row gap-[20px] mt-[134px]">
        <div className="h-[475px] w-[580px] bg-[#f7ebeb] rounded-[30px] border-r-[50px] border-t-[50px]"></div>
        <div className="flex flex-col gap-[24px] justify-start w-2/4 items-start">
          <h3 className="mb-[67px] text-[48px]">Трішки про нас</h3>
          <p className="text-[30px]">Ми любимо тварин тому...</p>
        </div>
        
      </section>
      
    </div>
  )
}
