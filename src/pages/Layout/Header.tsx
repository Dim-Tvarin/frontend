import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/color-logo.svg';
import { CustomButton } from 'components/CustomButton';
import { GoHeart } from 'react-icons/go';
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
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { cn } from 'components/lib/utils';
import { useState } from 'react';

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const favoriteAnimals = useSelector(selectFavoriteAnimals);
  const favoritesCount = favoriteAnimals.length;

  return (
    <>
      <header className="h-80 lg:h-100 bg-header flex items-center z-30">
        {/* DESKTOP NAV */}
        <nav className="xs:hidden container lg:flex items-center justify-between">
          <NavLink className="flex flex-col items-center gap-2" to="/" end>
            <img src={logo} alt="logo" className="w-46 h-46" />
            <span className="text-sm hover:text-default-btn transition:all duration-300">
              Dim Tvaryn
            </span>
          </NavLink>

          <ul
            className={cn(
              'flex flex-row items-center text-lg gap-28 xl:gap-[60px] mt-4',
              isLoggedIn ? 'ml-16' : 'ml-20 xl:ml-[76px]'
            )}
          >
            <li>
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
            <li>
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
            <li>
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
          </ul>
          {/* {/* <li className="ml-auto mr-20">
            <NavLink to="/favorite" end>
              <img src={search} alt="search" />
            </NavLink>
          </li> */}
          <div className="flex items-center gap-28">
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
                className="w-[102px] m-auto"
              >
                <CabinetSVG />
                <span>Вхід</span>
              </CustomButton>
            )}
          </div>
        </nav>

        {/* MOBILE HEADER */}
        <div className="container xs:flex hidden items-center justify-between w-full px-4 lg:hidden z-30">
          <button
            onClick={() => {
              setMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <RxCross2 size={24} />
            ) : (
              <RxHamburgerMenu size={24} />
            )}
          </button>

          <NavLink to="/" className="flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="w-40 h-40" />
            <span className="text-sm">Dim Tvaryn</span>
          </NavLink>

          <div className="flex gap-4">
            <button onClick={() => navigate('/favorite')}>
              <GoHeart size={24} />
            </button>
            <button
              onClick={() => navigate(isLoggedIn ? '/profile' : '/login')}
            >
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
                <CabinetSVG color="black" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU PANEL */}
        <div
          className={cn(
            'absolute top-80 left-0 w-full bg-dialog shadow-md z-50 rounded-b-lg flex flex-col gap-32  text-base font-semibold text-default-btn py-16 transition-all duration-700 ease-in-out transform lg:hidden will-change-transform',
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : '-translate-y-[300px] opacity-0 pointer-events-none'
          )}
        >
          <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
            Особистий кабінет
          </NavLink>
          <NavLink to="/allpets" onClick={() => setMobileMenuOpen(false)}>
            Знайти тварину
          </NavLink>
          <NavLink to="/announcement" onClick={() => setMobileMenuOpen(false)}>
            Віддати в добрі руки
          </NavLink>
          <NavLink to="/lookfor" onClick={() => setMobileMenuOpen(false)}>
            Догляд за твариною
          </NavLink>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-20 bg-black/80 transition-opacity duration-700 ease-in-out',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
