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
        styleType="defaultButton"
        onClick={handleClick}
      >
        Вийти
      </CustomButton>
    </>
  );
};
