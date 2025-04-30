import { CustomButton } from 'components/CustomButton';
import ResponsiveImage from 'components/ResponsiveImage';
import { useNavigate } from 'react-router-dom';
import homeDogMin from '../assets/home-dog1.jpg';
import homeDogMax from '../assets/home-dog2.png';
import homeGirlDogMin from '../assets/home-girl&dog1.jpg';
import homeGirlDogMax from '../assets/home-girl&dog@2.jpg';
import track from '../../public/track.png';
import { LuCirclePlus } from "react-icons/lu";
import AnimalsCarousel from 'components/AnimalsCarousel';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'src/redux/users/usersSlice';


export const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleNavigateAnnouncement = () => {
    if (isLoggedIn) {
      navigate('/announcement')
    } else {
      navigate('/register')
    }
  }
  
  return (
    <div className="container text-default-btn relative">
      <section className="flex flex-row gap-[20px] mt-[100px]">
        <div className="absolute z-1 left-[88px] top-[35px]">
          <img src={track} alt="track" />
        </div>
        <div className="flex flex-col gap-[24px] justify-center w-2/4 items-center z-10">
          <p className="text-[32px] px-[20px] font-normal z-10">
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
          <div className="absolute z-1 top-[405px] left-[444px] rotate-[57deg]">
            <img src={track} className="w-[300px] h-[320px]" alt="track" />
          </div>
        </div>
        <div className="relative h-[500px] w-[630px] bg-orange rounded-[30px] overflow-hidden">
          <div className="absolute bottom-0 right-0 h-[468px] w-[600px] rounded-[30px] z-10">
            <ResponsiveImage
              urlMax={homeDogMax}
              urlMin={homeDogMin}
              alt="піклування про собаку"
            />
          </div>
        </div>
        <div className="absolute z-1 right-[10px] top-[585px]">
          <img src={track} alt="track" />
        </div>
      </section>

      <section className="flex flex-row gap-[20px] mt-[100px] mb-[100px]">
        <div className="relative h-[500px] w-[630px] bg-orange rounded-[30px] overflow-hidden z-10">
          <div className="absolute bottom-0 left-0 h-[468px] w-[600px]  rounded-[30px] overflow-hidden">
            <ResponsiveImage
              urlMax={homeGirlDogMax}
              urlMin={homeGirlDogMin}
              alt="дівчина грає з собакою"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[24px] justify-start w-2/4 items-start text-start">
          <h3 className="mb-8 text-[32px] font-semibold">Чому саме ми?</h3>
          <p className="text-2xl font-normal">
            Ми та платформа, що об&#39;єднує людей, яким небайдужа доля тварин!
            Ми створили цей сервіс для того, щоб повертати загублених
            улюбленців, знаходити новий дім для тварин, а також забезпечувати
            безпечний та відповідальний пошук чотирилапих друзів.
          </p>
          <p className="text-2xl font-normal z-10">
            Ми прагнемо створити суспільство відповідальних власників, де кожен
            чотирилапий друг отримає шанс на щасливе життя. Долучайтеся до нас,
            разом ми зможемо більше!
          </p>
        </div>
      </section>
      <section className='mb-100 flex flex-col justify-center items-center'>
        <div className="absolute z-1 top-[1055px] right-[108px] rotate-[57deg]">
          <img src={track} className="w-[300px] h-[320px]" alt="track" />
        </div>
        <h3 className="relative mb-[50px] text-5xl font-semibold z-10">
          Тварини які шукають дім
        </h3>
        <AnimalsCarousel />
         <CustomButton
            className="w-[236px] h-[44px] bg-default-btn rounded-[20px] z-10 flex gap-10 mt-50"
            onClick={() => navigate('/allpets')}
          >
            Переглянути всіх
          </CustomButton>
          <div className="absolute z-1 -bottom-[17px] left-[10px]">
          <img src={track} className="w-[245px] h-[245px]" alt="track" />
        </div>
      </section>
    </div>
  );
};
