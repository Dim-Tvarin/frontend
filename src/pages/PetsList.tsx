import { FiFilter } from "react-icons/fi";
import { CustomButton } from "components/CustomButton";
import { useGetAnimalsQuery } from "src/redux/animals/animalsApi";
import AnimalCard from "components/AnimalCard";
import { PetsListSkeleton } from "components/sceletons/PetsListSkeleton";
import Pagination from "components/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router";
import { showToast } from "components/Toast";
import FilterItem from "components/FilterItem";
import { age, animalType, gender, size } from "./Announcement/types";

const limit = 12

const PetsList = () => {
  const [page, setPage] = useState(1);
  const [openFilters, setOpenFilters] = useState(false)
  const [animType, setAnimalType] = useState('')
  const [animGender, setGender] = useState('')
  const [animAge, setAge] = useState('')
  const [animSize, setSize] = useState('')
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
      <div className=" relative flex justify-center mt-100 mb-50">
        <CustomButton
          type="button"
          styleType="defaultButton"
          className="w-[129px] m-0 absolute top-0 left-0"
          onClick={() => setOpenFilters((prev) => !prev)}
        >
          <FiFilter size={18} />
          <span className="text-lg">Фільтр</span>
        </CustomButton>
        <h1 className="text-[32px]">Всі тварини</h1>
      </div>
      {isLoading ? (
        <PetsListSkeleton />
      ) : (
        <div className="flex gap-20">
        {openFilters && (<div className="w-1/4 flex flex-col gap-32">
          <FilterItem 
            value={animType}
            label="Вид тварини"
            items={animalType}
            onChange={setAnimalType}
          />
          <FilterItem 
            value={animGender}
            label="Стать"
            items={gender}
            onChange={setGender}
          />
          <FilterItem 
            value={animAge}
            label="Вік"
            items={age}
            onChange={setAge}
          />
          <FilterItem 
            value={animSize}
            label="Розмір"
            items={size}
            onChange={setSize}
          />

        <CustomButton
          type="button"
          styleType="defaultButton"
          className="m-0"
        >
          Застосувати фільтр
        </CustomButton>
        </div>)}
        <div className={`grid gap-20 mb-50 wrap ${openFilters ? 'grid-cols-3 w-3/4' : 'grid-cols-4'}`}>
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
        </div>
        
      )}
      {!isLoading && data && totalPages && totalPages > 1 &&
      <Pagination onPageChange={setPage} currentPage={page} totalPages={totalPages} className="mb-100"/>}
    </div>
  );
}

export default PetsList;

