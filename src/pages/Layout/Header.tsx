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
      <div className="container flex items-center justify-between text-medium tracking-1" >
        <NavLink className="flex flex-col items-center mr-auto" to="/" end>
          <img src={logo} alt="logo" className="w-46 h-46" />
          <span className="text-sm">Dim Tvaryn</span>
        </NavLink>

        <nav className="flex flex-row items-center text-lg gap-56">
          <NavLink to="/find" end>
            Знайти тварину
          </NavLink>
          <NavLink to="/announcement" end>
            Віддати в добрі руки
          </NavLink>
          <NavLink to="/lookfor" end>
            Догляд за твариною
          </NavLink>
        </nav>
        <div className="flex items-center gap-30 ml-100">
          <NavLink to="/favorite" end>
            <img src={search} alt="search" />
          </NavLink>

          <NavLink to="/favorite" end>
            <FaRegHeart size="30px" />
          </NavLink>
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
        </div>
      </div>
    </header>
  );
};
