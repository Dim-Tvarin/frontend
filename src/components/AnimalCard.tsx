import HartSVG from 'src/assets/HartSVG';
import { CustomButton } from './CustomButton';
import {
  useToggleFavoriteAnimalMutation,
  type Animal,
  type animalAge,
  useToggleHideAnimalMutation,
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
import { useWindowSize } from '@uidotdev/usehooks';

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
  onRefetchMyAnimals,
}: {
  id: string;
  name: string;
  gender: string;
  age: animalAge;
  photoSrc: string;
  status?: string;
  isMyProfile?: boolean;
  animal?: Animal;
  onRefetchMyAnimals?: () => void;
}) => {
  const favAnimals = useSelector(selectFavoriteAnimals);
  const isInFavorites = favAnimals.some(a => a.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [toggleFavorite] = useToggleFavoriteAnimalMutation();
  const [toggleHideAnimal] = useToggleHideAnimalMutation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const windowSize = useWindowSize();
  const tabletSize = windowSize.width !== null && windowSize.width < 1024;
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isProfileAdsPage = location.pathname === '/profile/ads';
  const isProfileInfoPage = location.pathname === '/profile/info';

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

      if (animal.isHidden === false) {
        dispatch(toggleAnimal(animal));
      }

      onRefetchMyAnimals?.();
    } catch (error) {
      console.error('Не вдалося змінити видимість:', error);
    }
  };

  return (
    <div
      className={cn(
        'relative flex items-end overflow-visible bg-white border-2 border-orange rounded-[30px] z-1 max-w-sm xl:scale-90 2xl:scale-100 text-black hover:scale-102 transition-transform duration-300',
        'w-[156px] h-[198px] md:w-[242px] md:h-[318px] xl:w-[305px] xl:h-[400px]',
        (isHomePage || isProfileInfoPage) &&
          'w-[242px] h-[318px] md:w-[294px] md:h-[400px] lg:w-[305px]',
        isProfileAdsPage &&
          'w-[156px] h-[198px] md:w-[294px] md:h-[400px] lg:w-[305px]'
      )}
    >
      <Link to={`/allpets/${id}`}>
        <img
          src={photoSrc}
          alt={name}
          className="z-1 absolute inset-0 rounded-[28px] w-full h-full object-cover object-top"
        />
      </Link>
      {animal?.isHidden && (
        <div className="z-19 absolute inset-0 flex justify-center items-center bg-white/60 rounded-[30px]">
          <div className="top-[11px] lg:top-[18px] absolute flex justify-center items-center bg-link/50 rounded-[36px] lg:rounded-full w-[150px] lg:w-[268px] h-[24px] lg:h-[36px] font-bold text-white text-sm leading-[171%]">
            {tabletSize ? 'Приховано' : 'Оголошення приховано'}
          </div>
        </div>
      )}
      <div className="z-10 relative bg-main-pink-l/80 px-16 md:px-32 pt-8 md:pt-10 pb-[9px] md:pb-[14px] md:py-12 rounded-[28px] w-full">
        <div className="text-left flex flex-col gap-[4px] md:gap-2.5">
          <div className="flex justify-between relative">
            <h2 className="font-medium dark:text-default-btn text-base lg:text-lg">
              {name}
            </h2>
            {status === 'inactive' && (
              <div className="absolute -top-[32px] -left-[16px] lg:block bg-orange lg:mt-2 rounded-[24px] lg:rounded-full w-[152px] lg:w-[162px] h-[24px] lg:h-[28px] font-bold text-white dark:text-black text-sm text-center leading-[171%]">
                Знайшов родину
              </div>
            )}
          </div>

          <div className="block text-ellipsis whitespace-nowrap sm:flex gap-1 overflow-hidden dark:text-default-btn font-medium text-base lg:text-lg">
            {gender !== 'unknown' && (
              <span>{`${genderMapping[gender]}\u00A0`}</span>
            )}

            {!!age.years && <span>{getYearDeclension(age.years)} </span>}
            {!!age.months && <span>{`${age.months}\u00A0міс.`}</span>}
          </div>
          {animal && (
            <div
              className="top-[14px] right-[18px] absolute cursor-pointer"
              onClick={handleAddFavorite}
            >
              <HartSVG
                hartFill={isInFavorites}
                className="dark:text-orange w-24 lg:w-[36px] h-24 lg:h-[36px]"
              />
            </div>
          )}
        </div>

        <CustomButton
          type="button"
          styleType="defaultButton"
          className={cn(
            'hidden md:flex mt-28 w-[149px] h-[36px]',
            (isHomePage || isProfileInfoPage) && 'max-md:flex max-md:mt-[12px]'
          )}
          onClick={() => navigate(`/allpets/${id}`)}
        >
          Переглянути
        </CustomButton>
      </div>
      {isMyProfile && (
        <TooltipProvider>
          <div className="top-[12px] lg:top-[18px] right-[12px] lg:right-[18px] z-20 absolute flex flex-col gap-8 lg:gap-10 overflow-visible cursor-pointer">
            <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton
                  styleType="iconButton"
                  onClick={handleToggleHidden}
                  className={cn(animal?.isHidden && 'bg-link')}
                >
                  {animal?.isHidden ? (
                    <FaEyeSlash className="text-white dark:text-header w-[13px] lg:w-[42px] h-[13px] lg:h-[24px]" />
                  ) : (
                    <FaEye className="text-white dark:text-header w-[13px] lg:w-[22px] h-[13px] lg:h-[22px]" />
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
                  <FiEdit className="text-white dark:text-header w-[13px] lg:w-[22px] h-[13px] lg:h-[22px]" />
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
                  className="hover:bg-error-input dark:hover:bg-error-input"
                >
                  <FiTrash2 className="text-white  dark:text-header w-[13px] lg:w-[22px] h-[13px] lg:h-[22px]" />
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
