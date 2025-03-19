import { CustomButton } from 'components/CustomButton';
import { Link } from 'react-router-dom';


export const Home = () => {
  return (
    <div className="container">
      <section className="flex flex-row gap-[20px] mt-[60px]">
        <div className="flex flex-col gap-[24px] justify-center w-2/4 items-center">
          <p className="text-xl px-[20px]">
            Знайдіть свого ідеального домашнього улюбленця, або допоможіть
            безпритульним тваринкам знайти свій дім
          </p>
          <CustomButton className="w-[236px] bg-default-btn rounded-[20px]">
            <Link to="/lookfor">Створити оголошення</Link>
          </CustomButton>
        </div>
        <div className="relative h-[557px] w-[631px] bg-main-pink-d rounded-[30px]">
          <div className="absolute bottom-0 right-0 h-[507px] w-[581px] bg-main-pink-l rounded-[30px]"></div>
        </div>
      </section>

      <section className="flex flex-row gap-[20px] mt-[134px]">
        <div className="relative h-[525px] w-[630px] bg-main-pink-d rounded-[30px]">
          <div className="absolute bottom-0 left-0 h-[475px] w-[580px] bg-main-pink-l rounded-[30px]"></div>
        </div>
        <div className="flex flex-col gap-[24px] justify-start w-2/4 items-start">
          <h3 className="mb-[67px] text-xxl">Трішки про нас</h3>
          <p className="text-l">Ми любимо тварин тому...</p>
        </div>
      </section>
    </div>
  );
};
