import { NavLink } from 'react-router-dom';
import logo from '../../assets/color-logo.svg';
import search from '../../assets/search.svg';
import { CustomButton } from 'components/CustomButton';
import { FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { logoutThunk } from '../../redux/users/usersOperations';
import { selectIsLoggedIn, selectUserName } from '../../redux/users/usersSlice';
import CabinetSVG from '../../assets/CabinetSVG';
import { openDialog } from '../../redux/dialogs/dialogSlice';
export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(logoutThunk());
    alert('Ви успішно вийшли');
  };
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const username = useSelector(selectUserName);

  return (
    <header className="h-100 bg-header flex items-center">
      <nav className="container">
        <ul className="flex flex-row items-center text-s">
          <li className="mr-auto">
            <NavLink className="flex flex-col items-center" to="/" end>
              <img src={logo} alt="logo" className="w-46 h-46" />
              <span className="text-xxs">Dim Tvaryn</span>
            </NavLink>
          </li>
          <li className="mr-56">
            <NavLink to="/find" end>
              Знайти тварину
            </NavLink>
          </li>
          <li className="mr-56">
            <NavLink to="/announcement" end>
              Віддати в добрі руки
            </NavLink>
          </li>
          <li className="mr-56">
            <NavLink to="/lookfor" end>
              Догляд за твариною
            </NavLink>
          </li>

          <li className="ml-auto mr-20">
            <NavLink to="/favorite" end>
              <img src={search} alt="search" />
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink to="/favorite" end>
              <FaRegHeart size="30px" />
            </NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <>
                <span className="text-black text-s">{username}</span>
                <CustomButton
                  type="button"
                  styleType="redButton"
                  className="w-[100px] m-auto ml-[20px]"
                  onClick={handleClick}
                >
                  Вийти
                </CustomButton>
              </>
            ) : (
              <CustomButton
                onClick={() => dispatch(openDialog('login'))}
                type="button"
                styleType="defaultButton"
                className="w-100 m-auto"
              >
                <CabinetSVG />
                <span>Вхід</span>
              </CustomButton>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
