
import HartSVG from "src/assets/HartSVG";
import { CustomButton } from "./CustomButton";
import type { animalAge } from "src/redux/animals/animalsApi";
import { getYearDeclension } from "src/helpers/getYearDeclension";
import { useNavigate } from "react-router";


const genderMapping: Record<string, string> = {
  'male': "Хлопчик",
  'female': 'Дівчинка',
  'unknown': "Невідомо"
}

const AnimalCard = ({id, name, gender, age, photoSrc}: {id: string; name: string; gender: string; age: animalAge; photoSrc: string;}) => {
   const navigate = useNavigate();
  return (
    <div className="relative w-[305px] h-[400px] border-2 border-orange rounded-4xl max-w-sm bg-white overflow-hidden flex items-end">
      <img src={photoSrc} alt={name} className="absolute inset-0 w-full h-full object-cover z-1" />
      <div className="bg-main-pink-l/80 relative rounded-t-4xl z-10 w-full px-32 py-12">
        <div className="text-left">
          <h2 className="text-lg font-medium">{name}</h2>
          <div className="text-lg font-medium flex gap-1">
            <span>{genderMapping[gender]}</span> 
            {!!age.years &&  (<span>{getYearDeclension(age.years)} </span>)} 
            {!!age.months &&  (<span>{`${age.months} міс.`}</span>)} 
          </div>
          <div className="absolute right-[18px] top-[14px]"><HartSVG /></div>
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
