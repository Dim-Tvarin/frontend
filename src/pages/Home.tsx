import { CustomButton } from 'components/CustomButton';
import ResponsiveImage from 'components/ResponsiveImage';
import { useNavigate } from 'react-router-dom';
import homeDogMin from '../assets/home-dog1.jpg';
import homeDogMax from '../assets/home-dog2.png';
import homeGirlDogMin from '../assets/home-girl&dog1.jpg';
import homeGirlDogMax from '../assets/home-girl&dog@2.jpg';
import track from '../../public/track.png';
import { LuCirclePlus } from 'react-icons/lu';
import AnimalsCarousel from 'components/AnimalsCarousel';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'src/redux/users/usersSlice';

export const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleNavigateAnnouncement = () => {
    if (isLoggedIn) {
      navigate('/announcement');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="relative text-default-btn container">
      <section className="flex md:flex-row flex-col sm:items-center gap-[20px] mt-72 lg:mt-100">
        <div className="hidden md:block md:top-50 lg:top-[35px] md:left-46 lg:left-[88px] z-1 absolute w-[103px] lg:w-[207px] h-[105px] lg:h-[203px]">
          <img src={track} alt="track" />
        </div>
        <div className="z-10 flex flex-col justify-center items-center gap-30 lg:gap-50 order-2 md:order-1 sm:w-full md:w-2/4">
          <p className="z-10 md:px-0 lg:px-10 font-normal lg:text-[32px] text-base md:text-xl">
            Оберіть для себе ідеального домашнього улюбленця, або допоможіть
            безпритульним тваринам знайти свій дім
          </p>
          <CustomButton
            className="z-10 flex gap-8 bg-default-btn rounded-[20px] w-[236px] h-[44px] text-base"
            onClick={handleNavigateAnnouncement}
          >
            <LuCirclePlus size={20} />
            Додати оголошення
          </CustomButton>
          <div className="hidden md:block md:top-[266px] lg:top-[510px] xl:top-[455px] md:left-[248px] lg:left-[216px] xl:left-[354px] z-1 absolute w-[103px] lg:w-[300px] h-[105px] lg:h-[320px] rotate-[57deg]">
            <img src={track} alt="track" />
          </div>
        </div>
        <div className="relative order-1 md:order-2 bg-orange rounded-[30px] w-[328px] md:w-[294px] lg:w-[630px] h-[202px] md:h-[213px] lg:h-[500px] overflow-hidden">
          <div className="right-0 bottom-0 z-10 absolute rounded-[30px] w-[312px] md:w-[278px] lg:w-[600px] h-[186px] md:h-[198px] lg:h-[468px] overflow-hidden">
            <ResponsiveImage
              urlMax={homeDogMax}
              urlMin={homeDogMin}
              alt="піклування про собаку"
            />
          </div>
        </div>
      </section>

      <section className="relative flex md:flex-row flex-col items-center gap-[20px] mt-32 md:mt-80 lg:mt-100 mb-32 md:mb-80 lg:mb-100">
        <div className="-top-[175px] lg:-top-72 right-[10px] z-1 absolute w-[136px] lg:w-[210px] h-[133px] lg:h-[205px]">
          <img src={track} alt="track" />
        </div>
        <div className="z-10 relative bg-orange rounded-[30px] w-[293px] md:w-[293px] lg:w-[630px] h-[202px] md:h-[315px] lg:h-[500px] overflow-hidden">
          <div className="bottom-0 left-0 absolute rounded-[30px] w-[312px] md:w-[277px] lg:w-[600px] h-[186px] md:h-[303px] lg:h-[468px] overflow-hidden">
            <ResponsiveImage
              urlMax={homeGirlDogMax}
              urlMin={homeGirlDogMin}
              alt="дівчина грає з собакою"
            />
          </div>
        </div>
        <div className="z-10 flex flex-col justify-start items-start gap-10 md:gap-32 w-full md:w-2/4 text-start">
          <h3 className="font-semibold lg:text-[32px] text-base">
            Чому саме ми?
          </h3>
          <p className="lg:pr-30 font-normal text-sm lg:text-2xl">
            Ми та платформа, що об&#39;єднує людей, яким небайдужа доля тварин!
            Ми створили цей сервіс для того, щоб повертати загублених
            улюбленців, знаходити новий дім для тварин, а також забезпечувати
            безпечний та відповідальний пошук чотирилапих друзів.
          </p>
          <p className="z-10 lg:pr-16 font-normal text-sm lg:text-2xl">
            Ми прагнемо створити суспільство відповідальних власників, де кожен
            чотирилапий друг отримає шанс на щасливе життя. <br /> Долучайтеся
            до нас, разом ми зможемо більше!
          </p>
        </div>
      </section>
      <section className="relative flex flex-col justify-center items-center mb-50 lg:mb-100">
        <div className="-top-72 md:-top-[92px] right-0 md:right-16 z-1 absolute w-[103px] md:w-[172px] lg:w-[260px] h-[105px] md:h-[168px] lg:h-[270px] rotate-90 md:rotate-[57deg]">
          <img src={track} alt="track" />
        </div>
        <h3 className="z-10 relative mb-12 lg:mb-50 font-semibold text-base md:text-2xl lg:text-5xl leading-[1.4]">
          Тварини, які шукають дім
        </h3>
        <AnimalsCarousel />
        <CustomButton
          className="z-10 flex gap-10 bg-default-btn mt-50 rounded-[20px] w-[236px] h-[44px] text-base"
          onClick={() => navigate('/allpets')}
        >
          Переглянути всіх
        </CustomButton>
        <div className="hidden md:block -bottom-[88px] left-0 z-1 absolute w-[166px] lg:w-[186px] h-[170px] lg:h-[187px] -rotate-30">
          <img src={track} alt="track" />
        </div>
      </section>
    </div>
  );
};
