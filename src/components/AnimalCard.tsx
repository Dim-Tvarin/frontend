import HartSVG from 'src/assets/HartSVG';
import { CustomButton } from './CustomButton';
import {
  useToggleFavoriteAnimalMutation,
  type Animal,
  type animalAge,
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
import { useState } from 'react';
import { openDialog } from 'src/redux/dialogs/dialogSlice';
import { selectIsLoggedIn } from 'src/redux/users/usersSlice';
import { useLocation } from 'react-router';
import { cn } from './lib/utils';

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
  const [visible, setVisible] = useState(true);
  const [toggleFavorite] = useToggleFavoriteAnimalMutation();
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
  console.log('isAllPetsPage', isAllPetsPage);
  return (
    <div
      className={cn(
        'relative flex items-end bg-white border-2 border-orange rounded-4xl lg:w-[305px]',
        'max-w-sm h-[318px] md:h-[400px] overflow-hidden',
        isAllPetsPage ? 'w-[156px]' : 'w-[242px] md:w-[294px]'
      )}
    >
      <img
        src={photoSrc}
        alt={name}
        className="z-1 absolute inset-0 w-full h-full object-cover"
      />
      {!visible && (
        <div className="z-19 absolute inset-0 flex justify-center items-center bg-white/60 rounded-4xl">
          <div className="top-[18px] absolute flex justify-center items-center bg-link/50 rounded-full w-[268px] h-[36px] font-bold text-white text-sm leading-[171%]">
            Оголошення приховано
          </div>
        </div>
      )}
      <div className="z-10 relative bg-main-pink-l/80 px-16 md:px-32 py-12 rounded-t-4xl w-full">
        <div className="text-left">
          <div className="flex justify-between">
            <h2 className="font-medium text-lg">{name}</h2>
            {status !== 'active' && (
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
          className="mt-28 w-[129px]"
          onClick={() => navigate(`/allpets/${id}`)}
        >
          Переглянути
        </CustomButton>
      </div>
      {isMyProfile && (
        <div className="top-[18px] right-[18px] z-20 absolute flex flex-col gap-10 cursor-pointer">
          <CustomButton
            styleType="iconButton"
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <FaEye className="text-white" size={22} />
            ) : (
              <FaEyeSlash className="text-white" size={24} />
            )}
          </CustomButton>
          <CustomButton
            styleType="iconButton"
            onClick={() => navigate(`/editannouncement/${id}`)}
          >
            <FiEdit className="text-white" size={22} />
          </CustomButton>

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
        </div>
      )}
    </div>
  );
};

export default AnimalCard;
