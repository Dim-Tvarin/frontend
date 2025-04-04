import { FiFilter } from "react-icons/fi";
import { CustomButton } from "components/CustomButton";
import { useGetAnimalsQuery } from "src/redux/animals/animalsApi";


const PetsList = () => {

  const { data, error, isLoading } = useGetAnimalsQuery('')

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
    </div>
  );
}

export default PetsList;

