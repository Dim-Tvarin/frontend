import HartSVG from 'src/assets/HartSVG';
import { CustomButton } from './CustomButton';
import {
  useToggleFavoriteAnimalMutation,
  type Animal,
  type animalAge,
  useToggleHideAnimalMutation,
  useGetMyAnimalsQuery,
} from 'src/redux/animals/animalsApi';
import { getYearDeclension } from 'src/helpers/getYearDeclension';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavoriteAnimals,
  toggleAnimal,
} from 'src/redux/animals/favoriteAnimalsSlice';
import type { AppDispatch } from 'src/redux/store';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { openDialog } from 'src/redux/dialogs/dialogSlice';
import { selectIsLoggedIn } from 'src/redux/users/usersSlice';
import { useLocation } from 'react-router';
import { cn } from './lib/utils';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';

export const genderMapping: Record<string, string> = {
  male: 'Хлопчик',
  female: 'Дівчинка',
  unknown: 'Невідомо',
};

const AnimalCard = ({
  id,
  name,
  gender,
  age,
  photoSrc,
  status,
  isMyProfile = false,
  animal,
}: {
  id: string;
  name: string;
  gender: string;
  age: animalAge;
  photoSrc: string;
  status?: string;
  isMyProfile?: boolean;
  animal?: Animal;
}) => {
  const favAnimals = useSelector(selectFavoriteAnimals);
  const isInFavorites = favAnimals.some(a => a.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [toggleFavorite] = useToggleFavoriteAnimalMutation();
  const [toggleHideAnimal] = useToggleHideAnimalMutation();
  const { refetch } = useGetMyAnimalsQuery({ page: 1, limit: 9 });
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const isAllPetsPage = location.pathname.includes('/allpets');

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
    <div
      className={cn(
        'relative flex items-end overflow-visible bg-white border-2 border-orange rounded-4xl z-1 max-w-sm xl:scale-90 2xl:scale-100',
        isAllPetsPage
          ? 'w-[156px] h-[198px] md:w-[242px] md:h-[318px] xl:w-[305px] xl:h-[400px]'
          : 'w-[242px] h-[318px] md:w-[294px] md:h-[400px] lg:w-[305px]'
      )}
    >
      <Link to={`/allpets/${id}`}>
        <img
          src={photoSrc}
          alt={name}
          className="z-1 absolute inset-0 rounded-4xl w-full h-full object-cover object-top"
        />
      </Link>
      {animal?.isHidden && (
        <div className="z-19 absolute inset-0 flex justify-center items-center bg-white/60 rounded-4xl">
          <div className="top-[18px] absolute flex justify-center items-center bg-link/50 rounded-full w-[268px] h-[36px] font-bold text-white text-sm leading-[171%]">
            Оголошення приховано
          </div>
        </div>
      )}
      <div className="z-10 relative bg-main-pink-l/80 px-16 md:px-32 py-8 md:py-12 rounded-4xl w-full">
        <div className="text-left">
          <div className="flex justify-between">
            <h2 className="font-medium text-lg">{name}</h2>
            {status === 'inactive' && (
              <div className="bg-orange mt-2 rounded-full w-[162px] h-[28px] font-bold text-white text-sm text-center leading-[171%]">
                Знайшов родину
              </div>
            )}
          </div>
          <div className="flex gap-1 overflow-hidden font-medium text-base lg:text-lg">
            {gender !== 'unknown' && <span>{genderMapping[gender]}</span>}
            {!!age.years && <span>{getYearDeclension(age.years)} </span>}
            {!!age.months && <span>{`${age.months}\u00A0міс.`}</span>}
          </div>
          {!isMyProfile && animal && (
            <div
              className="top-[14px] right-[18px] absolute cursor-pointer"
              onClick={handleAddFavorite}
            >
              <HartSVG
                hartFill={isInFavorites}
                className="w-24 lg:w-[36px] h-24 lg:h-[36px]"
              />
            </div>
          )}
        </div>

        <CustomButton
          type="button"
          styleType="defaultButton"
          className="hidden md:flex mt-28 w-[149px] h-[46px]"
          onClick={() => navigate(`/allpets/${id}`)}
        >
          Переглянути
        </CustomButton>
      </div>
      {isMyProfile && (
        <TooltipProvider>
          <div className="top-[18px] right-[18px] z-20 absolute flex flex-col gap-10 overflow-visible cursor-pointer">
            <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton
                  styleType="iconButton"
                  onClick={handleToggleHidden}
                >
                  {animal?.isHidden ? (
                    <FaEyeSlash className="text-white" size={24} />
                  ) : (
                    <FaEye className="text-white" size={22} />
                  )}
                </CustomButton>
              </TooltipTrigger>
              <TooltipContent
                side="right"
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
                side="right"
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
                side="right"
                align="center"
                className="bg-dialog fill-none px-8 py-[1px] rounded-[6px] text-default-btn text-base"
                sideOffset={4}
              >
                Видалити
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      )}
    </div>
  );
};

export default AnimalCard;
