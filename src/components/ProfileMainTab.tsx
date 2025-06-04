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
import { useNavigate } from 'react-router';
import { selectFavoriteAnimals } from 'src/redux/animals/favoriteAnimalsSlice';
import { selectViewedAnimals } from 'src/redux/animals/viewedAnimalsSlice';
import { useGetFilteredAnimalsQuery } from 'src/redux/animals/animalsApi';

const ProfileMainTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const favoriteAnimals = useSelector(selectFavoriteAnimals);
  const viewedAnimals = useSelector(selectViewedAnimals);
  const { data: animalsData, refetch } = useGetFilteredAnimalsQuery({
    page: 1,
    limit: 10,
  });
  const actualAnimalIds = animalsData?.animals.map(a => a.id) ?? [];
  const filteredFavorites = favoriteAnimals.filter(
    animal => actualAnimalIds.includes(animal.id) && !animal.isHidden
  );
  const visibleViewedAnimals = viewedAnimals.filter(
    animal => actualAnimalIds.includes(animal.id) && !animal.isHidden
  );

  const handleClick = () => {
    dispatch(logoutThunk());
    showToast({
      title: 'Ви успішно вийшли',
      status: 'success',
    });
  };

  return (
    <>
      <div className="flex">
        <div className="w-[305px] h-[305px] mr-30 shrink-0 rounded-[20px] overflow-hidden">
          <ResponsiveImage
            urlMax1x={user.avatarURL || avatarStubMax}
            urlMin1x={user.avatarURL || avatarStubMin}
            alt="аватар"
          />
        </div>
        <div
          className="flex flex-col w-full
          "
        >
          <div className="flex flex-col gap-10 text-left text-default-btn text-lg font-normal">
            <p className="text-[28px] font-bold">{user.name}</p>
            <p>
              {user.userType === 'guardian' ? 'Опікун' : 'Майбутній господар'}
            </p>
            <p>{user.location}</p>
            <p>{user.phone}</p>
            <p>{user.email}</p>
          </div>
          <div className="flex gap-20 mr-auto mt-auto">
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
      {user.userType === 'adopter' && (
        <>
          <h2 className="text-[28px] text-left mt-[43px] mb-[60px] text-default-btn">
            Обрані
          </h2>
          {filteredFavorites.length === 0 ? (
            <p className="text-center text-lg text-gray-500 mt-10">
              У вас поки немає обраних.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-20">
                {favoriteAnimals
                  .map(item => (
                    <AnimalCard
                      key={item.id}
                      id={item.id}
                      name={item.animalName}
                      gender={item.gender}
                      age={item.age}
                      photoSrc={item.animalImages[0].url}
                      status={item.status}
                      animal={item}
                      onRefetchMyAnimals={refetch}
                    />
                  ))
                  .reverse()
                  .slice(0, 3)}
              </div>
              <CustomButton
                styleType="defaultButton"
                onClick={() => navigate('/favorite')}
                className="mt-50 text-base"
              >
                Переглянути всіх
              </CustomButton>
            </>
          )}
          <h2 className="text-[28px] text-left mb-[60px] text-default-btn mt-100">
            Історія переглядів
          </h2>
          {visibleViewedAnimals.length === 0 ? (
            <p className="text-center text-lg text-gray-500 mt-10">
              У вас поки немає історії переглядів.
            </p>
          ) : (
            <div className="h-[820px] grid grid-cols-3 gap-20 overflow-hidden">
              {visibleViewedAnimals
                .reverse()
                .slice(0, 6)
                .map(item => (
                  <AnimalCard
                    key={item.id}
                    id={item.id}
                    name={item.animalName}
                    gender={item.gender}
                    age={item.age}
                    photoSrc={item.animalImages[0].url}
                    status={item.status}
                    animal={item}
                    onRefetchMyAnimals={refetch}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfileMainTab;
