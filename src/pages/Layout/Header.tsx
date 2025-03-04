import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import hart from '../../assets/hart.svg';
import cabinet from '../../assets/cabinet.svg';
import { CustomButton } from 'components/CustomButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { logoutThunk } from '../../redux/users/usersOperations';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(logoutThunk());
  };

  return (
    <header className="h-[100px] bg-[#f7ebeb] flex items-center container">
      <nav className="w-full">
        <ul className="flex flex-row items-center">
          <li className="mr-auto">
            <NavLink to="/" end>
              <img src={logo} alt="logo" />
            </NavLink>
          </li>
          <li className="mr-[80px]">
            <NavLink to="/find" end>
              Знайти тваринку
            </NavLink>
          </li>
          <li className="mr-[80px]">
            <NavLink to="/giveaway" end>
              Віддати тваринку
            </NavLink>
          </li>
          <li className="mr-[80px]">
            <NavLink to="/lookfor" end>
              Доглянути за тваринкою
            </NavLink>
          </li>
          <li className="ml-auto mr-[20px]">
            <NavLink to="/favorite" end>
              <img src={hart} alt="favorite pets" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" end>
              <img src={cabinet} alt="personal cabinet" />
            </NavLink>
          </li>
          <li>
            <CustomButton
              type="button"
              styleType="defaultButton"
              className="w-[100px] m-auto ml-[20px]"
              onClick={handleClick}
            >
              Вийти
            </CustomButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};
