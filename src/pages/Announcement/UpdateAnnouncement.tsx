import PetPageSceleton from "components/sceletons/PetPageSceleton";
import { showToast } from "components/Toast";
import { useNavigate, useParams } from "react-router";
import { useGetAnimalByIdQuery } from "src/redux/animals/animalsApi";


const UpdateAnnouncement = () => {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>()
   
  if (!id ) {
    showToast({
      title: 'Щось пішло не по плану',
      description: 'Це оголошення не було знайдено',
      status: 'error',
    });
    setTimeout(() => navigate(`/allpets/${id}`), 1000);
    return;
  }
  const { data, error, isLoading } = useGetAnimalByIdQuery(id);
  if (isLoading) {
    return <PetPageSceleton />;
  }
  if (error) {
      showToast({
        title: 'Щось пішло не по плану',
        description: 'Виникла помилка при завантаженні даних',
        status: 'error',
      })
      setTimeout(() => navigate('/allpets'), 1000)
      return
    } 
   console.log('data', data, isLoading);
  return (
    <div>
      UpdateAnnouncement
    </div>
  );
}

export default UpdateAnnouncement;
