import { CustomButton } from 'components/CustomButton';
import ResponsiveImage from 'components/ResponsiveImage';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/components/ui/tabs';
import avatarStubMin from '../assets/avatar-stub.png';
import avatarStuMax from '../assets/avatar-stub@2x.png';
import { selectUser } from 'src/redux/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from 'src/redux/store';
import { logoutThunk } from 'src/redux/users/usersOperations';
import { showToast } from 'components/Toast';
import { LuCirclePlus } from 'react-icons/lu';
import { FiFilter } from 'react-icons/fi';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import AnimalCard from 'components/AnimalCard';
import { useGetMyAnimalsQuery } from 'src/redux/animals/animalsApi';
import { useEffect } from 'react';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(logoutThunk());
    showToast({
      title: 'Ви успішно вийшли',
      status: 'success',
    });
  };
  const { data, isLoading, error } = useGetMyAnimalsQuery({
    page: 1,
    limit: 9,
  });
  useEffect(() => {
    if (error) {
      showToast({
        title: 'Щось пішло не по плану',
        description: 'Виникла помилка при завантаженні даних',
        status: 'error',
      });
    }
  }, [error]);
  return (
    <Tabs
      defaultValue="main-info"
      className="py-100 px-80 flex-row gap-40"
      data-orientation="vertical"
    >
      <TabsList className="flex flex-col gap-25 h-full">
        <TabsTrigger
          value="main-info"
          aria-orientation="vertical"
          className="w-[285px] h-[77px] text-lg m-0 data-[state=active]:shadow-none"
        >
          <CustomButton
            asChild
            styleType="defaultButton"
            className="w-[285px] h-[77px] text-lg m-0 border-none"
          >
            Основна інформація
          </CustomButton>
        </TabsTrigger>

        <TabsTrigger
          value="my-adverts"
          aria-orientation="vertical"
          className="w-[285px] h-[77px] text-lg m-0 data-[state=active]:shadow-none"
        >
          <CustomButton
            asChild
            styleType="whiteButton"
            className="w-[285px] h-[77px] text-lg"
          >
            Мої оголошення
          </CustomButton>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="main-info" data-orientation="vertical">
        <div className="flex">
          <div className="w-[305px] h-[305px] mr-30 shrink-0">
            <ResponsiveImage
              urlMax={avatarStuMax}
              urlMin={avatarStubMin}
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
      </TabsContent>
      <TabsContent value="my-adverts" data-orientation="vertical">
        <CustomButton
          type="submit"
          styleType="defaultButton"
          className="flex gap-8 w-[238px] text-base m-0"
        >
          <LuCirclePlus size={24} />
          Додати оголошення
        </CustomButton>
        <CustomButton
          type="button"
          styleType="defaultButton"
          className="flex gap-[6px] w-[108px] h-[45px] m-0 text-base"
        >
          <FiFilter className="w-25 h-[29px]" />
          Фільтр
        </CustomButton>
        {isLoading ? (
          <PetsListSkeleton className="grid-cols-3" />
        ) : (
          <div className="grid grid-cols-3 gap-20 mb-50 wrap">
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
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePage;
