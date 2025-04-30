import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: undefined,
        token:"",
    },
    reducers: {
        setToken(state, action) {
            const {token} = action.payload;
            state.token = token;
        },
        setInfo(state, action) {
            const {user} = action.payload;
            state.user = user;
        },
        logout(state, action) {
            state.user = undefined;
            state.token = "";
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice;