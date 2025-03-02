import { CustomButton } from 'components/CustomButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { logoutThunk } from '../redux/users/usersOperations';

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(logoutThunk());
  };
  return (
    <>
      <div>Текст домашньої сторінки marketplace</div>
      <CustomButton
        type="button"
        className="rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] bg-[#042d4a] mx-auto disabled:bg-[#4b6578]"
        onClick={handleClick}
      >
        Вийти
      </CustomButton>
    </>
  );
};
