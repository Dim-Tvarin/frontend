import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/color-logo.svg';
import { CustomButton } from 'components/CustomButton';
import { FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { selectIsLoggedIn, selectUser } from '../../redux/users/usersSlice';
import CabinetSVG from '../../assets/CabinetSVG';
import { openDialog } from '../../redux/dialogs/dialogSlice';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from 'components/components/ui/avatar';
import fallbackIcon from '../../assets/avatar-icon.png';
import { cn } from 'components/lib/utils';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <header className="h-100 bg-header flex items-center">
      <nav className="container">
        <ul className="flex flex-row items-center text-lg">
          <li className="mr-auto">
            <NavLink className="flex flex-col items-center" to="/" end>
              <img src={logo} alt="logo" className="w-46 h-46" />
              <span className="text-xxs hover:text-default-btn transition:all duration-300">
                Dim Tvaryn
              </span>
            </NavLink>
          </li>
          <li className="mr-56">
            <NavLink
              to="/allpets"
              className={({ isActive }) =>
                cn(
                  'hover:text-default-btn transition-all duration-300',
                  isActive ? 'text-default-btn underline' : 'text-black'
                )
              }
              end
            >
              Знайти тварину
            </NavLink>
          </li>
          <li className="mr-56">
            <NavLink
              to="/announcement"
              className={({ isActive }) =>
                cn(
                  'hover:text-default-btn transition-all duration-300',
                  isActive ? 'text-default-btn underline' : 'text-black'
                )
              }
              end
            >
              Віддати в добрі руки
            </NavLink>
          </li>
          <li className="mr-56">
            <NavLink
              to="/lookfor"
              className={({ isActive }) =>
                cn(
                  'hover:text-default-btn transition-all duration-300',
                  isActive ? 'text-default-btn underline' : 'text-black'
                )
              }
              end
            >
              Догляд за твариною
            </NavLink>
          </li>

          {/* <li className="ml-auto mr-20">
            <NavLink to="/favorite" end>
              <img src={search} alt="search" />
            </NavLink>
          </li> */}
          <li className="mr-20">
            <NavLink to="/favorite" end>
              <FaRegHeart size="30px" />
            </NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <div className="flex flex-col items-center max-h-[54px]">
                <Avatar
                  className="size-9 text-[10px] p-0 m-4"
                  onClick={() => navigate('/profile')}
                >
                  <AvatarImage
                    src={user.avatarURL}
                    alt={`Аватар ${user.name}`}
                  />
                  <AvatarFallback>
                    <img
                      src={fallbackIcon}
                      alt={`Аватар ${user.name}`}
                      className="w-full h-full object-cover rounded-full m-0 p-0"
                    />
                  </AvatarFallback>
                </Avatar>
                <span className="text-[10px] leading-[140%] tracking-[0.01em] m-0">
                  {user.name}
                </span>
              </div>
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
