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
    <div className="relative flex items-end bg-white border-2 border-orange rounded-4xl w-[242px] md:w-[294px] lg:w-[305px] max-w-sm h-[318px] md:h-[400px] hover:scale-110 transition-all duration-300">
      <div className="z-1 absolute inset-0 rounded-4xl overflow-hidden">
        <img src={photoSrc} alt={name} className="w-full h-full object-cover" />
      </div>
      {animal?.isHidden && (
        <div className="z-19 absolute inset-0 flex justify-center items-center bg-white/60 rounded-4xl">
          <div className="top-[18px] absolute flex justify-center items-center bg-link/50 rounded-full w-[268px] h-[36px] font-bold text-white text-sm leading-[171%]">
            Оголошення приховано
          </div>
        </div>
      )}
      <div className="z-10 relative bg-main-pink-l/80 px-16 md:px-32 py-12 rounded-4xl w-full">
        <div className="text-left">
          <div className="flex justify-between">
            <h2 className="font-medium text-lg">{name}</h2>
            {status === 'inactive' && (
              <div className="bg-orange mt-2 rounded-full w-[162px] h-[28px] font-bold text-white text-sm text-center leading-[171%]">
                Знайшов родину
              </div>
            )}
          </div>
          <div className="flex gap-1 font-medium text-lg">
            {gender !== 'unknown' && <span>{genderMapping[gender]}</span>}
            {!!age.years && <span>{getYearDeclension(age.years)} </span>}
            {!!age.months && <span>{`${age.months}\u00A0міс.`}</span>}
          </div>
          {!isMyProfile && animal && (
            <div
              className="top-[14px] right-[18px] absolute cursor-pointer"
              onClick={handleAddFavorite}
            >
              <HartSVG hartFill={isInFavorites} />
            </div>
          )}
        </div>

        <CustomButton
          type="button"
          styleType="defaultButton"
          className="mt-28 w-[149px] h-[36px]"
          onClick={() => navigate(`/allpets/${id}`)}
        >
          Переглянути
        </CustomButton>
      </div>
      {isMyProfile && (
        <div className="top-[18px] right-[18px] z-20 absolute flex flex-col gap-10 overflow-visible cursor-pointer">
          <div className="group relative flex items-center">
            <CustomButton styleType="iconButton" onClick={handleToggleHidden}>
              {animal?.isHidden ? (
                <FaEyeSlash className="text-white" size={24} />
              ) : (
                <FaEye className="text-white" size={22} />
              )}
            </CustomButton>
            <span className="left-[40px] absolute bg-dialog opacity-0 group-hover:opacity-100 rounded-[6px] text-default-btn text-base transition-all translate-x-2 group-hover:translate-x-0 duration-200">
              Приховати
            </span>
          </div>
          <div className="group relative flex items-center">
            <CustomButton
              styleType="iconButton"
              onClick={() => navigate(`/editannouncement/${id}`)}
            >
              <FiEdit className="text-white" size={22} />
            </CustomButton>
            <span className="left-[40px] absolute bg-dialog opacity-0 group-hover:opacity-100 rounded-[6px] text-default-btn text-base transition-all translate-x-2 group-hover:translate-x-0 duration-200">
              Редагувати
            </span>
          </div>
          <div className="group relative flex items-center">
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
            <span className="left-[40px] absolute bg-dialog opacity-0 group-hover:opacity-100 rounded-[6px] text-default-btn text-base transition-all translate-x-2 group-hover:translate-x-0 duration-200">
              Видалити
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalCard;
