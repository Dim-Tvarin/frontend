import { useNavigate, useParams } from "react-router";
import { useGetAnimalByIdQuery } from "src/redux/animals/animalsApi";

const PetPage = () => {
 const navigate = useNavigate();
 const {id} = useParams<{ id: string }>()
  if (!id) {
    alert("Щось пішло не так")
    navigate('/allpets')
    return
  } 
  const { data, error, isLoading } = useGetAnimalByIdQuery(id)


  if (isLoading ) {
    return null
  } 
  const { animal } = data || {}

  console.log('', id, data, error);
  return (
    <div className="flex gap-20">
      <div className="w-1/2">Pic</div>
      <div className="w-1/2 flex flex-col text-5xl font-medium">
        <h2>{animal?.animalName}</h2>
        <div className="grid grid-col-2 gap-x-130 text-xl">
          <p className="font-bold">Статус:</p>
          <p className="text-base">{animal?.status}</p>
          <p className="font-bold">Вид:</p>
          <p className="text-base">{animal?.animalType}</p>

        </div>
      </div>
    </div>
  );
}

export default PetPage;
