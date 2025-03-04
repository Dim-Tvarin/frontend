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
      <div>Home - Текст домашньої сторінки marketplace</div>
      <CustomButton
        type="button"
        styleType="defaultButton"
        className="w-[30px]"
        onClick={handleClick}
      >
        Вийти
      </CustomButton>
    </>
  );
};
