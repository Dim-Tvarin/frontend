import { genderMapping } from "components/AnimalCard";
import { CustomButton } from "components/CustomButton";
import { PhoneReveal } from "components/PhoneReveal";
import PetPageSceleton from "components/sceletons/PetPageSceleton";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getYearDeclension } from "src/helpers/getYearDeclension";
import { useGetAnimalByIdQuery } from "src/redux/animals/animalsApi";
import { selectUserName } from "src/redux/users/usersSlice";
import tracks4 from '../assets/tracks4.png'
import ImageCarousel from "components/ImageCarousel";

const PetPage = () => {
 const navigate = useNavigate();
 const {id} = useParams<{ id: string }>()
 const username = useSelector(selectUserName);


  if (!id ) {
    alert("Щось пішло не так")
    navigate('/allpets')
    return
  } 
  const { data, error, isLoading } = useGetAnimalByIdQuery(id)

  if (isLoading ) {
    return <PetPageSceleton />
  } 
 if (error) {
    alert('Щось пішло не так');
    navigate('/allpets')
    return
  } 
  const { animal } = data || {}

  return (
    <div className="relative flex gap-20 text-default-btn mt-100">
      <div className="absolute z-1 -top-[85px] right-[8px]">
        <img src={tracks4} className="w-[270px] h-[515px]" alt="track" />
      </div>
      <div className="w-1/2">
        {animal && <ImageCarousel images={animal?.animalImages} />}
      </div>

      <div className="w-1/2 flex flex-col text-left z-10">
        <h2 className="text-medium text-5xl mb-16">{animal?.animalName}</h2>
        <div className="grid grid-cols-2 gap-x-auto gap-y-16 text-xl mb-32">
          <p className="font-bold">Статус:</p>
          <p className="text-xl text-base text-error">{animal?.status}</p>
          <p className="font-bold">Вид:</p>
          <p className="text-xl text-base">{animal?.animalType}</p>
          <p className="font-bold">Стать:</p>
          <p className="text-xl text-base">
            {animal?.gender && genderMapping[animal?.gender]}
          </p>
          <p className="font-bold">Вік:</p>
          <div className="flex gap-5">
            {!!animal?.age.years && (
              <p className="text-xl text-base">
                {getYearDeclension(animal?.age.years)}{' '}
              </p>
            )}
            {!!animal?.age.months && (
              <p className="text-xl text-base">{` ${animal?.age.months} міс.`}</p>
            )}
          </div>
          <p className="font-bold">Порода:</p>
          <p className="text-xl text-base">{animal?.breed}</p>
          <p className="font-bold">Де знаходиться:</p>
          <p className="text-xl text-base">{animal?.animalLocation}</p>
          <p className="font-bold">Розмір:</p>
          <p className="text-xl text-base text-error">добавить в базу данные</p>
        </div>
        <p className="font-bold text-xl mb-16">Опис:</p>
        <p className="text-xl text-medium mb-32">{animal?.adText}</p>
        <div className="grid grid-cols-2 gap-y-16 text-xl mb-50">
          <p className="font-bold">Контакта особа:</p>
          <p className="text-medium">{username}</p>
          <p className="font-bold">Тел:</p>
          <PhoneReveal phone="+380987654321" className="-ml-[10px]" />
        </div>
        <CustomButton
          className="w-[236px] h-[44px] bg-default-btn rounded-[20px] self-center"
          onClick={() => navigate('/')}
        >
          Забрати тварину
        </CustomButton>
      </div>
    </div>
  );
}

export default PetPage;
