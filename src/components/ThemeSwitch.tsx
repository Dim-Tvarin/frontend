import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectUserTheme,
  updateUserLocally,
} from 'src/redux/users/usersSlice';
import { changeThemeThunk } from 'src/redux/users/usersOperations';
import type { AppDispatch } from 'src/redux/store';
import dayTrack from '../assets/white-theme.png';
import nightTrack from '../assets/dark-theme.png';
import sunIcon from '../assets/white-theme-icon.png';
import moonIcon from '../assets/dark-theme-icon.png';

const ThemeSwitch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentTheme = useSelector(selectUserTheme);
  const newTheme: 'light' | 'dark' = currentTheme === 'dark' ? 'light' : 'dark';

  const toggleTheme = () => {
    if (isLoggedIn) {
      dispatch(changeThemeThunk({ theme: newTheme }));
    } else {
      dispatch(updateUserLocally({ theme: newTheme }));
      document.documentElement.classList.remove(
        currentTheme as 'light' | 'dark'
      );
      document.documentElement.classList.add(newTheme);
    }
  };

  const trackBg = currentTheme === 'dark' ? nightTrack : dayTrack;
  const thumbBg = currentTheme === 'dark' ? moonIcon : sunIcon;
  const translateX =
    currentTheme === 'dark' ? 'translate-x-0' : 'translate-x-40';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Перемикач теми"
      className="relative w-[80px] h-32 rounded-full px-[8px] bg-cover bg-center transition-colors duration-200 focus:outline-none"
      style={{ backgroundImage: `url(${trackBg})` }}
    >
      <div
        className={`
          absolute top-[4px] left-[8px] w-24 h-24 rounded-full bg-cover bg-center
          transition-transform duration-400 ${translateX}
        `}
        style={{ backgroundImage: `url(${thumbBg})` }}
      />
    </button>
  );
};

export default ThemeSwitch;
