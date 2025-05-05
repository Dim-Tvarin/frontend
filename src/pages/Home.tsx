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
    <div className="container text-default-btn relative">
      <section className="flex flex-col sm:items-center md:flex-row gap-[20px] mt-[100px]">
        <div className="hidden lg:block absolute z-1 left-[88px] top-[35px]">
          <img src={track} alt="track" />
        </div>
        <div className="sm:w-full order-2 md:order-1 flex flex-col gap-16 lg:gap-[24px] justify-center md:w-2/4 items-center z-10">
          <p className="text-base md:text-xl lg:text-[32px] px-[35px] md:px-0 font-normal z-10">
            Оберіть для себе ідеального домашнього улюбленця, або допоможіть
            безпритульним тваринам знайти свій дім
          </p>
          <CustomButton
            className="w-[236px] h-[44px] bg-default-btn rounded-[20px] z-10 flex gap-8"
            onClick={handleNavigateAnnouncement}
          >
            <LuCirclePlus size={20} />
            Створити оголошення
          </CustomButton>
          <div className="hidden lg:block absolute z-1 top-[405px] left-[444px] rotate-[57deg]">
            <img src={track} className="w-[300px] h-[320px]" alt="track" />
          </div>
        </div>
        <div className="h-[202px] w-[328px] order-1 md:order-2 relative md:h-[213px] md:w-[294px] lg:h-[500px] lg:w-[630px] bg-orange rounded-[30px] overflow-hidden">
          <div className="h-[186px] w-[312px] absolute bottom-0 right-0 md:h-[198px] md:w-[278px] lg:h-[468px] lg:w-[600px] rounded-[30px] z-10 overflow-hidden">
            <ResponsiveImage
              urlMax={homeDogMax}
              urlMin={homeDogMin}
              alt="піклування про собаку"
            />
          </div>
        </div>
        <div className="hidden lg:block absolute z-1 right-[10px] top-[585px]">
          <img src={track} alt="track" />
        </div>
      </section>

      <section className="flex flex-col items-center md:flex-row gap-[20px] mt-32 md:mt-80 lg:mt-100p mb-32 md:mb-80 lg:mb-100">
        <div className="relative h-[202px] w-[293px] md:h-[315px] md:w-[293px] lg:h-[500px] lg:w-[630px] bg-orange rounded-[30px] overflow-hidden z-10">
          <div className="absolute bottom-0 left-0 h-[186px] w-[312px] md:h-[303px] md:w-[277px] lg:h-[468px] lg:w-[600px]  rounded-[30px] overflow-hidden">
            <ResponsiveImage
              urlMax={homeGirlDogMax}
              urlMin={homeGirlDogMin}
              alt="дівчина грає з собакою"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-10 md:gap-[24px] justify-start md:w-2/4 items-start text-start">
          <h3 className="text-base lg:mb-8 lg:text-[32px] font-semibold">
            Чому саме ми?
          </h3>
          <p className="text-sm lg:text-2xl font-normal">
            Ми та платформа, що об&#39;єднує людей, яким небайдужа доля тварин!
            Ми створили цей сервіс для того, щоб повертати загублених
            улюбленців, знаходити новий дім для тварин, а також забезпечувати
            безпечний та відповідальний пошук чотирилапих друзів.
          </p>
          <p className="text-sm lg:text-2xl font-normal z-10">
            Ми прагнемо створити суспільство відповідальних власників, де кожен
            чотирилапий друг отримає шанс на щасливе життя. Долучайтеся до нас,
            разом ми зможемо більше!
          </p>
        </div>
      </section>
      <section className="mb-80 lg:mb-100 flex flex-col justify-center items-center gap-20 md:gap-36 lg:gap-50">
        <div className="hidden lg:block absolute z-1 top-[1055px] right-[108px] rotate-[57deg]">
          <img src={track} className="w-[300px] h-[320px]" alt="track" />
        </div>
        <h3 className="relative text-base md:text-2xl lg:text-5xl font-semibold z-10">
          Тварини які шукають дім
        </h3>
        <AnimalsCarousel />
        <CustomButton
          className="w-[236px] h-[44px] bg-default-btn rounded-[20px] z-10 flex gap-10 mt-0 md:mt-16"
          onClick={() => navigate('/allpets')}
        >
          Переглянути всіх
        </CustomButton>
        <div className="hidden lg:block absolute z-1 -bottom-[17px] left-[10px]">
          <img src={track} className="w-[245px] h-[245px]" alt="track" />
        </div>
      </section>
    </div>
  );
};
