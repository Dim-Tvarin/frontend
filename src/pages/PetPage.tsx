import { genderMapping } from 'components/AnimalCard';
import { PhoneReveal } from 'components/PhoneReveal';
import PetPageSceleton from 'components/sceletons/PetPageSceleton';
import { useNavigate, useParams } from 'react-router';
import { getYearDeclension } from 'src/helpers/getYearDeclension';
import {
  useGetAnimalByIdQuery,
  useToggleFavoriteAnimalMutation,
  useToggleHideAnimalMutation,
} from 'src/redux/animals/animalsApi';
import ImageCarousel from 'components/ImageCarousel';
import { showToast } from 'components/Toast';
import { AnimalType } from './Announcement/types';
import { addViewedAnimal } from 'src/redux/animals/viewedAnimalsSlice';
import { useEffect } from 'react';
import type { AppDispatch } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import formatDate from 'src/helpers/converDate';
import HartSVG from 'src/assets/HartSVG';
import { selectIsLoggedIn, selectUser } from 'src/redux/users/usersSlice';
import {
  selectFavoriteAnimals,
  toggleAnimal,
} from 'src/redux/animals/favoriteAnimalsSlice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/components/ui/tooltip';
import { CustomButton } from 'components/CustomButton';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { openDialog } from 'src/redux/dialogs/dialogSlice';

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
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favAnimals = useSelector(selectFavoriteAnimals);
  const owner = useSelector(selectUser);
  const isInFavorites = favAnimals.some(a => a.id === id);
  const [toggleFavorite] = useToggleFavoriteAnimalMutation();
  const [toggleHideAnimal] = useToggleHideAnimalMutation();

  if (!id) {
    showToast({
      title: 'Щось пішло не по плану',
      description: 'Ця тварина не буда знайдена',
      status: 'error',
    });
    setTimeout(() => navigate('/allpets'), 1000);

    return;
  }
  const { data, error, isLoading, refetch } = useGetAnimalByIdQuery(id, {
    skip: !id,
  });

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
  const isOwner = owner?.id === animal?.owner;
  const type =
    animal?.animalType && defaultTypes.includes(animal?.animalType)
      ? typeMapping[animal?.animalType]
      : animal?.animalType
          .split('/')[0]
          .toLowerCase()
          .replace(/^./, char => char.toUpperCase());

  const handleAddFavorite = () => {
    if (!animal) return;
    const shouldBeFavorite = !isInFavorites;
    dispatch(toggleAnimal(animal));
    if (isLoggedIn) {
      toggleFavorite({ id: animal.id, favorite: shouldBeFavorite });
    }
  };

  const handleToggleHidden = async () => {
    if (!animal) return;
    try {
      await toggleHideAnimal({
        id: animal.id,
        isHidden: !animal.isHidden,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error('Не вдалося змінити видимість:', error);
    }
  };

  return (
    <div className="container min-h-screen">
      <div className="relative flex lg:flex-row flex-col gap-20 mt-72 lg:mt-100 mb-100 text-default-btn">
        <div className="absolute bg-[url('../src/assets/bg-paws-card-mob.png')] dark:bg-[url('../src/assets/bg-paws-card-dark-mob.png')] top-[702px] right-[84px] w-[90px] h-[165px] md:top-[86px] md:right-[8px] md:w-[270px] md:h-[513px] md:bg-[url('../src/assets/bg-paws-card.png')] dark:md:bg-[url('../src/assets/bg-paws-card-dark.png')] bg-contain bg-no-repeat " />
        <div className="w-full lg:w-1/2">
          {animal && <ImageCarousel images={animal?.animalImages} />}
        </div>

        <div className="z-10 flex flex-col w-full lg:w-1/2 text-base text-left">
          <div className="flex items-center">
            <h2 className="mb-16 lg:mb-24 font-bold text-2xl md:text-4xl lg:text-5xl mr-100  block text-ellipsis whitespace-nowrap overflow-hidden">
              {animal?.animalName}
            </h2>
            {!isOwner && (
              <div
                className="flex items-center cursor-pointer"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddFavorite();
                }}
              >
                <div>
                  <HartSVG hartFill={isInFavorites} context="header" />
                </div>
                <p className="ml-[4px] text-base">До обраних</p>
              </div>
            )}
          </div>

          <div className="text-input-border text-sm mb-20 lg:mb-24">
            Опубліковано: {animal?.updatedAt && formatDate(animal?.updatedAt)}
          </div>
          <div className="gap-x-auto gap-y-10 lg:gap-y-16 grid grid-cols-2 mb-16 lg:mb-32">
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
          <p className="mb-20 lg:mb-32 text-medium text-wrap truncate">
            {animal?.adText}
          </p>
          <div className="gap-y-16 grid grid-cols-2 mb-32 lg:mb-50">
            <p className="font-bold">Контакта особа:</p>
            <p className="text-medium  z-10">{ownerName}</p>
            <p className="font-bold">Тел:</p>
            <PhoneReveal
              phone={ownerPhone || '+380987654321'}
              className="m-0 lg:-ml-[10px] z-10"
            />
          </div>
          {isOwner ? (
            <div>
              <TooltipProvider>
                <div className=" flex gap-11 overflow-visible cursor-pointer justify-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CustomButton
                        styleType="iconButton"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleHidden();
                        }}
                      >
                        {animal?.isHidden ? (
                          <FaEyeSlash className="text-white" size={24} />
                        ) : (
                          <FaEye className="text-white" size={22} />
                        )}
                      </CustomButton>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="center"
                      className="bg-dialog fill-none px-8 py-[1px] rounded-[6px] text-default-btn text-base"
                      sideOffset={4}
                    >
                      Приховати
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CustomButton
                        styleType="iconButton"
                        onClick={() => navigate(`/editannouncement/${id}`)}
                      >
                        <FiEdit className="text-white" size={22} />
                      </CustomButton>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="center"
                      className="bg-dialog fill-none px-8 py-[1px] rounded-[6px] text-default-btn text-base"
                      sideOffset={4}
                    >
                      Редагувати
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CustomButton
                        styleType="iconButton"
                        onClick={() =>
                          dispatch(
                            openDialog({
                              type: 'alertDelete',
                              entity: 'animal',
                              id: id,
                            })
                          )
                        }
                        className="hover:bg-error-input"
                      >
                        <FiTrash2 className="text-white" size={22} />
                      </CustomButton>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="center"
                      className="bg-dialog fill-none px-8 py-[1px] rounded-[6px] text-default-btn text-base"
                      sideOffset={4}
                    >
                      Видалити
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          ) : (
            <a
              href={`tel:${ownerPhone}`}
              className="place-content-center self-end grid bg-default-btn rounded-[20px] w-[236px] h-[44px] text-white text-base dark:bg-orange dark:hover:bg-btn-orange-hov dark:text-black"
            >
              Зв’язатися з господарем
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetPage;
