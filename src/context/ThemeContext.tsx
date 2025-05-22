import { createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserTheme, selectIsLoggedIn } from 'src/redux/users/usersSlice';

export const ThemeContext = createContext<'light' | 'dark'>('light');

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const rawTheme = useSelector(selectUserTheme);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const theme: 'light' | 'dark' = rawTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    if (isLoggedIn) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme, isLoggedIn]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
