import { CustomButton } from 'components/CustomButton';
import ResponsiveImage from 'components/ResponsiveImage';
import { useNavigate } from 'react-router-dom';
import homeDogMin from '../assets/home-dog1.webp';
import homeDogMax from '../assets/home-dog2.webp';
import homeGirlDogMin from '../assets/home-girl&dog1.webp';
import homeGirlDogMax from '../assets/home-girl&dog@2.webp';
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
    <div className="relative text-default-btn container overflow-hidden">
      <div className="absolute w-[356px] h-[1188px] top-[291px] right-[4px] bg-[url('./src/assets/bg-paws-home-mob.png')] dark:bg-[url('./src/assets/bg-paws-home-dark-mob.png')] md:bg-[url('./src/assets/bg-paws-home.png')] md:dark:bg-[url('./src/assets/bg-paws-home-dark.png')] md:top-[48px] md:left-[40px] md:right-0 md:w-[660px] lg:w-[1319px] md:[h-995px] lg:h-[1990px] bg-contain bg-no-repeat" />
      <section className="flex md:flex-row flex-col sm:items-center gap-[20px] mt-72 lg:mt-100">
        <div className="z-10 flex flex-col justify-center items-center gap-30 lg:gap-50 order-2 md:order-1 sm:w-full md:w-2/4">
          <p className="z-10 md:px-0 lg:px-10 font-normal lg:text-[32px] text-base md:text-xl">
            Оберіть для себе ідеального домашнього улюбленця, або допоможіть
            безпритульним тваринам знайти свій дім
          </p>
          <CustomButton
            styleType="defaultButton"
            className="z-10 m-0 flex gap-8 bg-default-btn rounded-[20px] w-[236px] h-[44px] text-base"
            onClick={handleNavigateAnnouncement}
          >
            <LuCirclePlus size={20} />
            Додати оголошення
          </CustomButton>
        </div>
        <div className="relative order-1 md:order-2 bg-orange rounded-[30px] w-[328px] md:w-[294px] lg:w-[638px] h-[202px] md:h-[213px] lg:h-[500px] overflow-hidden">
          <div className="right-0 bottom-0 z-10 absolute rounded-[30px] w-[318px] md:w-[284px] lg:w-[615px] h-[192px] md:h-[203px] lg:h-[484px] overflow-hidden">
            <ResponsiveImage
              urlMax1x={homeDogMax}
              urlMin1x={homeDogMin}
              alt="піклування про собаку"
            />
          </div>
        </div>
      </section>

      <section className="relative flex md:flex-row flex-col items-start gap-[20px] mt-32 md:mt-80 lg:mt-100 mb-32 md:mb-80 lg:mb-100">
        <div className="z-10 relative bg-orange rounded-[30px] w-[328px] md:w-[294px] lg:w-[638px] h-[202px] md:h-[213px] lg:h-[500px] overflow-hidden">
          <div className="bottom-0 left-0 absolute rounded-[30px] w-[318px] md:w-[284px] lg:w-[615px] h-[192px] md:h-[203px] lg:h-[484px] overflow-hidden">
            <ResponsiveImage
              urlMax1x={homeGirlDogMax}
              urlMin1x={homeGirlDogMin}
              alt="дівчина грає з собакою"
            />
          </div>
        </div>
        <div className="z-10 flex flex-col justify-start items-center gap-10 md:gap-32 w-full md:w-2/4 text-center">
          <h3 className="font-semibold lg:text-[32px] text-base">
            Чому саме ми?
          </h3>
          <p className="lg:pr-30 font-normal text-sm lg:text-2xl leading-[150%]">
            Ми та платформа, що об&#39;єднує людей, яким небайдужа доля тварин!
            Ми створили цей сервіс для того, щоб повертати загублених
            улюбленців, знаходити новий дім для тварин, а також забезпечувати
            безпечний та відповідальний пошук чотирилапих друзів.
          </p>
          <p className="z-10 lg:pr-16 font-normal text-sm lg:text-2xl leading-[150%]">
            Ми прагнемо створити суспільство відповідальних власників, де кожен
            чотирилапий друг отримає шанс на щасливе життя. <br /> Долучайтеся
            до нас, разом ми зможемо більше!
          </p>
        </div>
      </section>
      <section className="relative flex flex-col justify-center items-center mb-50 lg:mb-100">
        <h3 className="z-10 relative mb-12 lg:mb-50 font-semibold text-base md:text-2xl lg:text-5xl leading-[1.4]">
          Тварини, які шукають дім
        </h3>
        <AnimalsCarousel />
        <CustomButton
          styleType="defaultButton"
          className="z-10 flex gap-10 bg-default-btn mt-50 rounded-[20px] w-[236px] h-[44px] text-base"
          onClick={() => navigate('/allpets')}
        >
          Переглянути всіх
        </CustomButton>
      </section>
    </div>
  );
};
