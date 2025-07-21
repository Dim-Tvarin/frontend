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
import { useNavigate } from 'react-router';
import { selectFavoriteAnimals } from 'src/redux/animals/favoriteAnimalsSlice';
import { selectViewedAnimals } from 'src/redux/animals/viewedAnimalsSlice';
import { useGetFilteredAnimalsQuery } from 'src/redux/animals/animalsApi';
import { cn } from './lib/utils';
import AnimalsCarousel from './AnimalsCarousel';
import { useWindowSize } from '@uidotdev/usehooks';
import AnimalCard from './AnimalCard';
import pawsBg from '../assets/bg-paws-profile-main.png';

const ProfileMainTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const tabletSize = windowSize.width !== null && windowSize.width < 1440;
  const user = useSelector(selectUser);
  const favoriteAnimals = useSelector(selectFavoriteAnimals);
  const viewedAnimals = useSelector(selectViewedAnimals);
  const {
    data: animalsData,
    isLoading: animalsLoading,
    refetch: animalsRefetch,
  } = useGetFilteredAnimalsQuery({ page: 1, limit: 10 });
  const actualAnimalIds = animalsData?.animals.map(a => a.id) ?? [];
  const filteredFavorites = favoriteAnimals
    .filter(animal => actualAnimalIds.includes(animal.id) && !animal.isHidden)
    .reverse()
    .slice(0, 3);
  const filteredFavoritesMobile = favoriteAnimals
    .filter(animal => actualAnimalIds.includes(animal.id) && !animal.isHidden)
    .reverse();
  const visibleViewedAnimals = viewedAnimals
    .filter(animal => actualAnimalIds.includes(animal.id) && !animal.isHidden)
    .reverse()
    .slice(0, 6);
  const visibleViewedMobile = viewedAnimals
    .filter(animal => actualAnimalIds.includes(animal.id) && !animal.isHidden)
    .reverse();

  const handleClick = () => {
    dispatch(logoutThunk());
    showToast({
      title: 'Ви успішно вийшли',
      status: 'success',
    });
  };

  return (
    <>
      <div className="relative flex flex-col md:flex-row">
        {!tabletSize && (
          <div
            className="absolute  overflow-hidden top-[170px] 2xl:-left-[324px] "
            style={{
              backgroundImage: `url(${pawsBg})`,
              backgroundRepeat: 'no-repeat',
              width: '285px',
              height: '1436px',
            }}
          ></div>
        )}
        <div
          className={cn(
            'w-[328px] h-[324px] lg:w-[305px] lg:h-[305px] md:mr-30 shrink-0 rounded-[20px] overflow-hidden',
            user.userType === 'adopter' &&
              'max-lg:absolute top-0 left-0 w-[70px] h-[64px]'
          )}
        >
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
          <div
            className={cn(
              'flex flex-col mt-16 lg:mt-0 gap-10 text-left text-default-btn text-lg font-normal',
              user.userType === 'adopter' && 'mt-0 ml-[86px] lg:ml-0'
            )}
          >
            <p
              className={cn(
                'text-[28px] font-bold truncate',
                user.userType === 'adopter' && 'text-xl'
              )}
            >
              {user.name}
            </p>
            <p>
              {user.userType === 'guardian' ? 'Опікун' : 'Майбутній господар'}
            </p>
            <p>{user.location}</p>
            <p>{user.phone}</p>
            <p className=" truncate">{user.email}</p>
          </div>
          <div
            className={cn(
              'flex lg:flex-row gap-20 mr-auto mt-32 2xl:mt-auto',
              user.userType === 'adopter' && 'mt-[44px]'
            )}
          >
            <CustomButton
              onClick={() => dispatch(openDialog('editUser'))}
              styleType="defaultButton"
              className="m-0 w-[200px] md:w-[196px]"
            >
              Редагувати профіль
            </CustomButton>
            <CustomButton
              styleType="whiteButton"
              className="m-0 w-[108px]"
              onClick={handleClick}
            >
              Вийти
            </CustomButton>
          </div>
        </div>
      </div>
      {user.userType === 'adopter' && (
        <>
          <h2 className="text-xl lg:text-[28px] text-left mt-32 lg:mt-[43px] mb-16 lg:mb-[60px] text-default-btn">
            Обрані
          </h2>
          {filteredFavorites.length === 0 ? (
            <p className="text-center text-lg text-gray-500 mt-10">
              У вас поки немає обраних.
            </p>
          ) : (
            <>
              {tabletSize ? (
                <AnimalsCarousel
                  animals={filteredFavoritesMobile}
                  isLoading={animalsLoading}
                  onRefetch={animalsRefetch}
                />
              ) : (
                <div className="grid grid-cols-3 gap-20">
                  {filteredFavorites.map(item => (
                    <AnimalCard
                      key={item.id}
                      id={item.id}
                      name={item.animalName}
                      gender={item.gender}
                      age={item.age}
                      photoSrc={item.animalImages[0].url}
                      status={item.status}
                      animal={item}
                      onRefetchMyAnimals={animalsRefetch}
                    />
                  ))}
                </div>
              )}
              <CustomButton
                styleType="defaultButton"
                onClick={() => navigate('/favorite')}
                className="hidden 2xl:flex mt-50 text-base"
              >
                Переглянути всіх
              </CustomButton>
            </>
          )}
          <h2 className="text-xl lg:text-[28px] text-left mt-32 lg:mt-100 mb-16 lg:mb-[60px] text-default-btn ">
            Історія переглядів
          </h2>
          {visibleViewedAnimals.length === 0 ? (
            <p className="text-center text-lg text-gray-500 mt-10">
              У вас поки немає історії переглядів.
            </p>
          ) : tabletSize ? (
            <AnimalsCarousel
              animals={visibleViewedMobile}
              isLoading={animalsLoading}
            />
          ) : (
            <div className="h-[820px] grid grid-cols-3 gap-20 overflow-hidden">
              {visibleViewedAnimals.map(item => (
                <AnimalCard
                  key={item.id}
                  id={item.id}
                  name={item.animalName}
                  gender={item.gender}
                  age={item.age}
                  photoSrc={item.animalImages[0].url}
                  status={item.status}
                  animal={item}
                  onRefetchMyAnimals={animalsRefetch}
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
