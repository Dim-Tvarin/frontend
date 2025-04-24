import HartSVG from 'src/assets/HartSVG';
import { CustomButton } from './CustomButton';
import { type animalAge } from 'src/redux/animals/animalsApi';
import { getYearDeclension } from 'src/helpers/getYearDeclension';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleId } from 'src/redux/animals/favoriteAnimalsSlice';
import type { AppDispatch, RootState } from 'src/redux/store';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { openDialog } from 'src/redux/dialogs/dialogSlice';

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
  favorite,
  status,
  isMyProfile = false,
}: {
  id: string;
  name: string;
  gender: string;
  age: animalAge;
  photoSrc: string;
  favorite?: boolean;
  status?: string;
  isMyProfile?: boolean;
}) => {
  const favIds = useSelector((state: RootState) => state.favoriteAnimals.ids);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(true);

  const handleAddFavorite = () => {
    dispatch(toggleId(id));
  };

  return (
    <div className="relative w-[305px] h-[400px] border-2 border-orange rounded-4xl max-w-sm bg-white overflow-hidden flex items-end">
      <img
        src={photoSrc}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover z-1"
      />
      {!visible && (
        <div className="absolute inset-0 z-19 bg-white/60 flex items-center justify-center rounded-4xl ">
          <div className="absolute top-[18px] w-[268px] h-[36px] rounded-full bg-link/50 flex items-center justify-center font-bold text-sm leading-[171%] text-white">
            Оголошення приховано
          </div>
        </div>
      )}
      <div className="bg-main-pink-l/80 relative rounded-t-4xl z-10 w-full px-32 py-12">
        <div className="text-left">
          <div className="flex justify-between">
            <h2 className="text-lg font-medium">{name}</h2>
            {status !== 'active' && (
              <div className="mt-2 w-[162px] h-[28px] rounded-full bg-orange text-center font-bold text-sm leading-[171%] text-white">
                Знайшов родину
              </div>
            )}
          </div>
          <div className="text-lg font-medium flex gap-1">
            <span>{genderMapping[gender]}</span>
            {!!age.years && <span>{getYearDeclension(age.years)} </span>}
            {!!age.months && <span>{`${age.months} міс.`}</span>}
          </div>
          {!isMyProfile && (
            <div
              className="absolute right-[18px] top-[14px] cursor-pointer"
              onClick={handleAddFavorite}
            >
              <HartSVG hartFill={favorite || favIds.includes(id)} />
            </div>
          )}
        </div>

        <CustomButton
          type="button"
          styleType="defaultButton"
          className="w-[129px] mt-28"
          onClick={() => navigate(`/allpets/${id}`)}
        >
          Переглянути
        </CustomButton>
      </div>
      {isMyProfile && (
        <div className="absolute right-[18px] top-[18px] cursor-pointer flex flex-col gap-10 z-20">
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
            onClick={() => navigate(`/edit/${id}`)}
          >
            <FiEdit className="text-white" size={22} />
          </CustomButton>
          <CustomButton
            styleType="iconButton"
            onClick={() => dispatch(openDialog({ type: 'alertDelete', id }))}
            className="hover:bg-error-input "
          >
            <FiTrash2 className="text-white" size={22} />
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default AnimalCard;
