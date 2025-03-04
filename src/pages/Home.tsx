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
        <div className="h-[630px] w-[557px] bg-[#f7ebeb] rounded-[30px]"></div>

      </section>
      
    </div>
  )
}
