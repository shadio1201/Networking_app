import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null
    },
    reducers: {

        //methods
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setToken: (state) => {
            state.token = localStorage.getItem('accessToken');
        },
        removeToken: (state) => {
            state.token = null;
        },

    }
})

export const { login, logout, setToken, removeToken } = userSlice.actions

//Selector
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer;