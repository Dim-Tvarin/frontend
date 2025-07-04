import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/color-logo.svg';
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
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { cn } from 'components/lib/utils';
import { useState } from 'react';
import ThemeSwitch from 'components/ThemeSwitch';

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
      <header className="z-30 flex items-center bg-header h-80 lg:h-100">
        {/* DESKTOP NAV */}
        <nav className="xs:hidden lg:flex justify-between items-center container">
          <NavLink className="flex flex-col items-center gap-2" to="/" end>
            <img src={logo} alt="logo" className="w-46 h-46" />
            <span className="dark:text-default-btn hover:text-default-btn dark:hover:text-white text-sm duration-300 transition:all">
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
                    'hover:text-default-btn dark:text-white transition-all duration-300',
                    isActive
                      ? 'text-default-btn dark:text-white underline'
                      : 'text-black dark:text-default-btn'
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
                    'hover:text-default-btn dark:text-white transition-all duration-300',
                    isActive
                      ? 'text-default-btn dark:text-white underline'
                      : 'text-black dark:text-default-btn'
                  )
                }
                end
              >
                Віддати в добрі руки
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  cn(
                    'hover:text-default-btn dark:text-white transition-all duration-300',
                    isActive
                      ? 'text-default-btn dark:text-white underline'
                      : 'text-black dark:text-default-btn'
                  )
                }
                end
              >
                Догляд за твариною
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center gap-28">
            <ThemeSwitch />
            <NavLink to="/favorite" className="relative" end>
              {favoritesCount > 0 ? (
                <FaHeart size={32} className="text-error-input" />
              ) : (
                <FaRegHeart
                  className="text-black dark:text-default-btn"
                  size={32}
                />
              )}
              {favoritesCount > 0 && (
                <span className="-top-5 -right-[3px] absolute flex justify-center items-center bg-none rounded-full w-8 h-20 text-black dark:text-default-btn text-sm">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
            {isLoggedIn ? (
              <div className="flex flex-col items-center max-h-[54px]">
                <Avatar
                  className="m-4 p-0 size-9 text-[10px] cursor-pointer"
                  onClick={() => navigate('/profile/info')}
                >
                  <AvatarImage
                    src={user.avatarURL}
                    alt={`Аватар ${user.name}`}
                  />
                  <AvatarFallback>
                    <img
                      src={fallbackIcon}
                      alt={`Аватар ${user.name}`}
                      className="m-0 p-0 rounded-full w-full h-full object-cover"
                    />
                  </AvatarFallback>
                </Avatar>
                <span className="m-0 text-[10px] leading-[140%] tracking-[0.01em]">
                  {user.name}
                </span>
              </div>
            ) : (
              <CustomButton
                onClick={() => dispatch(openDialog('login'))}
                type="button"
                styleType="defaultButton"
                className="m-auto w-[102px]"
              >
                <CabinetSVG />
                <span>Вхід</span>
              </CustomButton>
            )}
          </div>
        </nav>

        {/* MOBILE HEADER */}
        <div className="hidden lg:hidden z-30 relative xs:flex justify-between items-center px-4 w-full container">
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

          <NavLink
            to="/"
            className="left-[calc(50%-41px)] absolute flex flex-col items-center gap-1"
          >
            <img src={logo} alt="logo" className="w-40 h-40" />
            <span className="text-sm">Dim Tvaryn</span>
          </NavLink>

          <div className="flex gap-4 items-center">
            <NavLink to="/favorite" className="relative" end>
              {favoritesCount > 0 ? (
                <FaHeart size={24} className="text-error-input" />
              ) : (
                <FaRegHeart size={24} />
              )}
              {favoritesCount > 0 && (
                <span className="-top-5 -right-[3px] absolute flex justify-center items-center bg-none rounded-full w-8 h-20 text-black text-sm">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
            <div
              className="cursor-pointer"
              onClick={() =>
                isLoggedIn
                  ? navigate('/profile/info')
                  : dispatch(openDialog('login'))
              }
            >
              {isLoggedIn ? (
                <div className="flex flex-col items-center max-h-[54px]">
                  <Avatar
                    className="m-4 p-0 size-9 text-[10px]"
                    onClick={() => navigate('/profile/info')}
                  >
                    <AvatarImage
                      src={user.avatarURL}
                      alt={`Аватар ${user.name}`}
                    />
                    <AvatarFallback>
                      <img
                        src={fallbackIcon}
                        alt={`Аватар ${user.name}`}
                        className="m-0 p-0 rounded-full w-full h-full object-cover"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <span className="m-0 text-[10px] leading-[140%] tracking-[0.01em]">
                    {user.name}
                  </span>
                </div>
              ) : (
                <CustomButton
                  onClick={() => dispatch(openDialog('login'))}
                  type="button"
                  className="focus-visible:shadow-none focus:shadow-none m-auto focus-visible:outline-none focus:outline-none focus-visible:ring-0"
                >
                  <CabinetSVG color="black" />
                </CustomButton>
              )}
            </div>
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
          <NavLink to="/profile/info" onClick={() => setMobileMenuOpen(false)}>
            Особистий кабінет
          </NavLink>
          <NavLink to="/allpets" onClick={() => setMobileMenuOpen(false)}>
            Знайти тварину
          </NavLink>
          <NavLink to="/announcement" onClick={() => setMobileMenuOpen(false)}>
            Віддати в добрі руки
          </NavLink>
          <NavLink to="/blog" onClick={() => setMobileMenuOpen(false)}>
            Догляд за твариною
          </NavLink>
          <div className="flex gap-16 m-auto">
            <p>Тема</p> <ThemeSwitch />
          </div>
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
