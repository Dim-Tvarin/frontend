import { genderMapping } from 'components/AnimalCard';
import { PhoneReveal } from 'components/PhoneReveal';
import PetPageSceleton from 'components/sceletons/PetPageSceleton';
import { useNavigate, useParams } from 'react-router';
import { getYearDeclension } from 'src/helpers/getYearDeclension';
import { useGetAnimalByIdQuery } from 'src/redux/animals/animalsApi';
import tracks4 from '../assets/tracks4.png';
import ImageCarousel from 'components/ImageCarousel';
import { showToast } from 'components/Toast';
import { AnimalType } from './Announcement/types';

const defaultTypes = [
  AnimalType.dogs,
  AnimalType.cats,
  AnimalType.birds,
  AnimalType.other,
];

export const typeMapping: Record<AnimalType, string> = {
  [AnimalType.dogs]: 'Собака',
  [AnimalType.cats]: 'Кіт',
  [AnimalType.birds]: 'Птах',
  [AnimalType.other]: '',
};

const PetPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    showToast({
      title: 'Щось пішло не по плану',
      description: 'Ця тварина не буда знайдена',
      status: 'error',
    });
    setTimeout(() => navigate('/allpets'), 1000);

    return;
  }
  const { data, error, isLoading } = useGetAnimalByIdQuery(id);

  if (isLoading) {
    return <PetPageSceleton />;
  }
  if (error) {
    showToast({
      title: 'Щось пішло не по плану',
      description: 'Виникла помилка при завантаженні даних',
      status: 'error',
    });
    setTimeout(() => navigate('/allpets'), 1000);
    return;
  }
  const { animal, ownerName, ownerPhone } = data || {};
  const type =
    animal?.animalType && defaultTypes.includes(animal?.animalType)
      ? typeMapping[animal?.animalType]
      : animal?.animalType
          .split('/')[0]
          .toLowerCase()
          .replace(/^./, char => char.toUpperCase());

  return (
    <div className="container">
      <div className="relative flex flex-col lg:flex-row gap-20 text-default-btn mt-72 lg:mt-100 mb-100">
        <div className="hidden lg:block absolute z-1 -top-[85px] right-[8px]">
          <img src={tracks4} className="w-[270px] h-[515px]" alt="track" />
        </div>
        <div className="w-full lg:w-1/2">
          {animal && <ImageCarousel images={animal?.animalImages} />}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col text-left z-10 text-lg lg:text-xl">
          <h2 className="text-2xl font-bold md:text-4xl lg:text-5xl mb-16 lg:mb-24">
            {animal?.animalName}
          </h2>
          <div className="grid grid-cols-2 gap-x-auto gap-y-16  mb-16 lg:mb-32">
            <p className="font-bold">Статус:</p>
            <p>
              {animal?.status === 'active'
                ? 'Шукає господаря'
                : 'У надійних руках'}
            </p>
            <p className="font-bold">Вид:</p>
            <p>{type}</p>
            <p className="font-bold">Стать:</p>
            <p>{animal?.gender && genderMapping[animal?.gender]}</p>
            <p className="font-bold">Вік:</p>
            <div className="flex gap-5">
              {!!animal?.age.years && (
                <p>{getYearDeclension(animal?.age.years)}</p>
              )}
              {!!animal?.age.months && <p>{` ${animal?.age.months} міс.`}</p>}
              {!animal?.age.months && !animal?.age.years && <p>0</p>}
            </div>
            <p className="font-bold">Порода:</p>
            <p>{animal?.breed}</p>
            <p className="font-bold">Де знаходиться:</p>
            <p>{animal?.animalLocation}</p>
            <p className="font-bold">Розмір:</p>
            <p>{animal?.size ? animal?.size : '-'}</p>
          </div>
          <p className="font-bold  mb-16">Опис:</p>
          <p className=" text-medium mb-20 lg:mb-32">{animal?.adText}</p>
          <div className="grid grid-cols-2 gap-y-16 mb-32 lg:mb-50">
            <p className="font-bold">Контакта особа:</p>
            <p className="text-medium">{ownerName}</p>
            <p className="font-bold">Тел:</p>
            <PhoneReveal
              phone={ownerPhone || '+380987654321'}
              className="m-0 lg:-ml-[10px]"
            />
          </div>
          <a
            href={`tel:${ownerPhone}`}
            className="w-[236px] h-[44px] bg-default-btn rounded-[20px] text-white self-center grid place-content-center text-base"
          >
            Зв’язатися з господарем
          </a>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
