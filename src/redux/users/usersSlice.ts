import { createSlice } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  phone: string;
  userType: string;
  avatarURL: string;
  theme: 'light' | 'dark';
}

interface UserState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: boolean;
}

const initialState: UserState = {
  user: {
    name: '',
    email: '',
    phone: '',
    userType: '',
    avatarURL: '',
    theme: 'light',
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: false,
};

const slice = createSlice({
  name: 'users',
  initialState,
  selectors: {
    selectUserName: state => state.user.name,
    selectUserType: state => state.user.userType,
    selectUserTheme: state => state.user.theme,
    selectToken: state => state.token,
    selectIsLoggedIn: state => state.isLoggedIn,
  },
  reducers: {},
  //   extraReducers: builder => {
  //   },
});

export const usersReducer = slice.reducer;
export const {
  selectUserName,
  selectUserType,
  selectUserTheme,
  selectToken,
  selectIsLoggedIn,
} = slice.selectors;
