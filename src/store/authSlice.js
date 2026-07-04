import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({  // this is a slice of the store , it is used to manage the state of the auth slice
    name: "auth",
    initialState,  
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload; // action.payload is the data that is passed to the reducer
        },
        logout: (state, action) => {
            state.status = false;
            state.userData = null;
        }
    }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;



