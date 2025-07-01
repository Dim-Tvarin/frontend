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
import { addViewedAnimal } from 'src/redux/animals/viewedAnimalsSlice';
import { useEffect } from 'react';
import type { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import formatDate from 'src/helpers/converDate';
import HartSVG from 'src/assets/HartSVG';

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
  const dispatch = useDispatch<AppDispatch>();
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
  const { data, error, isLoading } = useGetAnimalByIdQuery(id, { skip: !id });
  useEffect(() => {
    if (data?.animal) {
      dispatch(addViewedAnimal(data.animal));
    }
  }, [data?.animal, dispatch]);

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
      <div className="relative flex lg:flex-row flex-col gap-20 mt-72 lg:mt-100 mb-100 text-default-btn">
        <div className="hidden lg:block -top-[85px] right-[8px] z-1 absolute">
          <img src={tracks4} className="w-[270px] h-[515px]" alt="track" />
        </div>
        <div className="w-full lg:w-1/2">
          {animal && <ImageCarousel images={animal?.animalImages} />}
        </div>

        <div className="z-10 flex flex-col w-full lg:w-1/2 text-lg lg:text-xl text-left">
          <div className="flex items-center">
            <h2 className="mb-16 lg:mb-24 font-bold text-2xl md:text-4xl lg:text-5xl mr-100">
              {animal?.animalName}
            </h2>
            <div className="flex items-center">
              <HartSVG fill="none" stroke="#042D4A" />{' '}
              <p className=" text-base">До обраних</p>
            </div>
          </div>

          <div className="text-input-border text-sm mb-6">
            Опубліковано: {animal?.updatedAt && formatDate(animal?.updatedAt)}
          </div>
          <div className="gap-x-auto gap-y-16 grid grid-cols-2 mb-16 lg:mb-32">
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
          <p className="mb-16 font-bold">Опис:</p>
          <p className="mb-20 lg:mb-32 text-medium">{animal?.adText}</p>
          <div className="gap-y-16 grid grid-cols-2 mb-32 lg:mb-50">
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
            className="place-content-center self-center grid bg-default-btn rounded-[20px] w-[236px] h-[44px] text-white text-base"
          >
            Зв’язатися з господарем
          </a>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
