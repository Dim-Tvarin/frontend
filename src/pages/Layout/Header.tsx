import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/color-logo.svg';
import search from '../../assets/search.svg';
import { CustomButton } from 'components/CustomButton';
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
import { selectFavoriteAnimals } from 'src/redux/animals/favoriteAnimalsSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const favoriteAnimals = useSelector(selectFavoriteAnimals);
  const favoritesCount = favoriteAnimals.length;

  return (
    <header className="h-100 bg-header flex items-center">
      <nav className="container">
        <ul className="flex flex-row items-center text-lg">
          <li className="mr-auto">
            <NavLink className="flex flex-col items-center" to="/" end>
              <img src={logo} alt="logo" className="w-46 h-46" />
              <span className="text-xxs">Dim Tvaryn</span>
            </NavLink>
          </li>
          <li className="mr-56">
            <NavLink to="/allpets" end>
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
            <NavLink to="/favorite" className="relative" end>
              {favoritesCount > 0 ? (
                <FaHeart size={32} className="text-error-input" />
              ) : (
                <FaRegHeart size={32} />
              )}
              {favoritesCount > 0 && (
                <span className="absolute -top-5 -right-[3px] bg-none text-black rounded-full w-8 h-20 text-sm flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
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
