import { NavLink } from 'react-router-dom';
import logo from '../../assets/color-logo.svg';
import { CustomButton } from 'components/CustomButton';
import { FaRegHeart } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { logoutThunk } from '../../redux/users/usersOperations';
import { selectIsLoggedIn, selectUserName } from '../../redux/users/usersSlice';
import CabinetSVG from '../../assets/CabinetSVG';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(logoutThunk());
    alert('Ви успішно вийшли');
  };
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const username = useSelector(selectUserName);

  return (
    <header className="h-100 bg-main-pink-l flex items-center container">
      <nav className="w-full">
        <ul className="flex flex-row items-center text-s">
          <li className="mr-auto">
            <NavLink className="flex flex-col items-center" to="/" end>
              <img src={logo} alt="logo" className='w-46 h-46'/>
              <span className='text-xxs'>Dim Tvaryn</span>
            </NavLink>
          </li>
          <li className="mr-56">
            <NavLink to="/find" end>
              Знайти тваринку
            </NavLink>
          </li>
          <li className="mr-56">
            <NavLink to="/giveaway" end>
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
              <IoIosSearch size="26px" />
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink to="/favorite" end>
              <FaRegHeart size="20px" />
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
              <NavLink to="/register" end>
                <CustomButton
                  type="button"
                  styleType="defaultButton"
                  className="w-100 m-auto"
                  >
                  <CabinetSVG />
                  <span>Вхід</span>
                </CustomButton>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
