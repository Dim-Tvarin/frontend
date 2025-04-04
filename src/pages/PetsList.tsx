import { FiFilter } from "react-icons/fi";
import { CustomButton } from "components/CustomButton";
import { useGetAnimalsQuery } from "src/redux/animals/animalsApi";
import AnimalCard from "components/AnimalCard";


const PetsList = () => {

  const { data, error, isLoading } = useGetAnimalsQuery({})

  console.log(data, error, isLoading)

  return (
    <div className="container">
      <div className="flex justify-between mt-100 mb-50">
        <h1 className="text-[32px]">Всі тварини</h1>
        <CustomButton
          type="button"
          styleType="defaultButton"
          className="w-[129px] m-0"
        >
          <FiFilter size={18} />
          <span className="text-lg">Фільтр</span>
        </CustomButton>
      </div>
      <div className="grid grid-cols-4 gap-20">
        {data?.animals.map(item => <AnimalCard key={item.id} name={item.animalName} gender={item.gender} age={item.age} photoSrc={item.animalImages[0]}/>)}
      </div>
    </div>
  );
}

export default PetsList;

