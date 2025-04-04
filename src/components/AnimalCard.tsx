
import HartSVG from "src/assets/HartSVG";
import { CustomButton } from "./CustomButton";


const genderMapping = {
  'male': "Хлопчик",
  'female': 'Дівчинка',
  'unknown': "Невідомо"
}

const AnimalCard = ({name, gender, age, photoSrc}: {name: string; gender: string; age: string; photoSrc: string;}) => {
  return (
    <div className="relative w-[305px] h-[400px] border-2 border-orange rounded-4xl max-w-sm bg-white overflow-hidden flex items-end">
      <img src={photoSrc} alt={name} className="absolute inset-0 w-full h-full object-cover z-1" />
      <div className="bg-main-pink-l/80 relative rounded-t-4xl z-10 w-full px-32 py-12">
        <div className="text-left">
          <h2 className="text-lg font-medium">{name}</h2>
          <p className="text-lg font-medium">
            {genderMapping[gender]}, {age}
          </p>
          <div className="absolute right-[18px] top-[14px]"><HartSVG /></div>
          
        </div>
        <CustomButton
          type="button"
          styleType="defaultButton"
          className="w-[129px] mt-28"
        >
          Переглянути
        </CustomButton>
      </div>
    </div>
  );
}

export default AnimalCard;
