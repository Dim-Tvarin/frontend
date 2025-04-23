
import HartSVG from "src/assets/HartSVG";
import { CustomButton } from "./CustomButton";
import type { animalAge } from "src/redux/animals/animalsApi";
import { getYearDeclension } from "src/helpers/getYearDeclension";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleId } from "src/redux/animals/favoriteAnimalsSlice";
import type { AppDispatch, RootState } from "src/redux/store";

export const genderMapping: Record<string, string> = {
  'male': "Хлопчик",
  'female': 'Дівчинка',
  'unknown': "Невідомо"
}

const AnimalCard = ({id, name, gender, age, photoSrc, favorite}:
  {id: string; name: string; gender: string; age: animalAge; photoSrc: string; favorite?: boolean}) => {
  const favIds = useSelector((state: RootState) => state.favoriteAnimals.ids);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const handleAddFavorite = () => {
    dispatch(toggleId(id)); 
  }

  return (
    <div className="relative w-[305px] h-[400px] border-2 border-orange rounded-4xl max-w-sm bg-white overflow-hidden flex items-end">
      <img src={photoSrc} alt={name} className="absolute inset-0 w-full h-full object-cover z-1" />
      <div className="bg-main-pink-l/80 relative rounded-t-4xl z-10 w-full px-32 py-12">
        <div className="text-left">
          <h2 className="text-lg font-medium">{name}</h2>
          <div className="text-lg font-medium flex gap-1">
            {gender !== 'unknown' && <span>{genderMapping[gender]}</span> }
            {!!age.years &&  (<span>{getYearDeclension(age.years)} </span>)} 
            {!!age.months &&  (<span>{`${age.months} міс.`}</span>)} 
          </div>
          <div className="absolute right-[18px] top-[14px] cursor-pointer" onClick={handleAddFavorite}><HartSVG hartFill={ favorite || favIds.includes(id) } /></div>
        </div>
        <CustomButton
          type="button"
          styleType="defaultButton"
          className="w-[129px] mt-28"
          onClick={() =>navigate(`/allpets/${id}`)}>
          Переглянути
        </CustomButton>
      </div>
    </div>
  );
}

export default AnimalCard;
