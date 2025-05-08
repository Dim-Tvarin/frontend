import ResponsiveImage from 'components/ResponsiveImage';
import avatarStubMin from '../assets/avatar-stub.png';
import avatarStubMax from '../assets/avatar-stub@2x.png';
import { openDialog } from 'src/redux/dialogs/dialogSlice';
import { selectUser } from 'src/redux/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from 'src/redux/store';
import { logoutThunk } from 'src/redux/users/usersOperations';
import { showToast } from './Toast';
import { CustomButton } from './CustomButton';
import AnimalCard from './AnimalCard';
import { selectFavoriteAnimals } from 'src/redux/animals/favoriteAnimalsSlice';

const ProfileMainTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logoutThunk());
    showToast({
      title: 'Ви успішно вийшли',
      status: 'success',
    });
  };

  const favoriteAnimals = useSelector(selectFavoriteAnimals);

  return (
    <>
      <div className="flex">
        <div className="w-[305px] h-[305px] mr-30 shrink-0">
          <ResponsiveImage
            urlMax={user.avatarURL || avatarStubMax}
            urlMin={user.avatarURL || avatarStubMin}
            alt="аватар"
          />
        </div>
        <div
          className="flex flex-col w-full
          "
        >
          <div className="flex flex-col gap-10 text-left text-default-btn text-lg">
            <p className="text-[28px] font-bold">{user.name}</p>
            <p>
              {user.userType === 'guardian' ? 'Опікун' : 'Майбутній господар'}
            </p>
            <p>{user.location}</p>
            <p>{user.phone}</p>
          </div>
          <div className="flex gap-20 ml-auto mt-auto">
            <CustomButton
              onClick={() => dispatch(openDialog('editUser'))}
              styleType="defaultButton"
              className="m-0 w-[210px] h-[45px]"
            >
              Редагувати профіль
            </CustomButton>
            <CustomButton
              styleType="whiteButton"
              className="w-[130px] h-[45px]"
              onClick={handleClick}
            >
              Вийти
            </CustomButton>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-10">Обрані</h2>
      <div className="grid grid-cols-3 gap-20">
        {favoriteAnimals.map(item => (
          <AnimalCard
            key={item.id}
            id={item.id}
            name={item.animalName}
            gender={item.gender}
            age={item.age}
            photoSrc={item.animalImages[0].url}
            status={item.status}
            animal={item}
          />
        ))}
      </div>
    </>
  );
};

export default ProfileMainTab;
