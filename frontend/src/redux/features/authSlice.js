import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const initialState = {
  user: null,
  accessToken:  null,
  isAuthenticated: false,
  loading: true,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated= true;
    },
    setAccessToken: (state, action)=> {
      state.accessToken = action.payload;
      // cookies.set('accessToken', action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      // cookies.remove('accessToken')
      // localStorage.removeItem('role')
    },
  }
})

export const { setUser, setLoading, logOut, setAccessToken} = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;