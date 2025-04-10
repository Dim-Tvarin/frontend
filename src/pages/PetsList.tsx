import { FiFilter } from "react-icons/fi";
import { CustomButton } from "components/CustomButton";
import { useGetAnimalsQuery } from "src/redux/animals/animalsApi";
import AnimalCard from "components/AnimalCard";
import { PetsListSkeleton } from "components/sceletons/PetsListSkeleton";
import Pagination from "components/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router";
import { showToast } from "components/Toast";

const limit = 8

const PetsList = () => {
  const [page, setPage] = useState(1)
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAnimalsQuery({page, limit})

  const totalPages = data &&  Math.ceil(data?.total / limit)

  if (error) {
    showToast({
      title: 'Щось пішло не по плану',
      description: 'Спробуйте ще раз пізніше',
      status: 'error',
    })
    navigate('/')
  }

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
      {isLoading ? (
        <PetsListSkeleton />
      ) : (
        <div className="grid grid-cols-4 gap-20 mb-50 wrap">
          {data?.animals.map(item => (
            <AnimalCard
              key={item.id}
              id={item.id}
              name={item.animalName}
              gender={item.gender}
              age={item.age}
              photoSrc={item.animalImages[0]}
              favorite={item.favorite}
            />
          ))}
        </div>
      )}
      {!isLoading && data && totalPages && totalPages > 1 &&
      <Pagination onPageChange={setPage} currentPage={page} totalPages={totalPages} className="mb-100"/>}
    </div>
  );
}

export default PetsList;

