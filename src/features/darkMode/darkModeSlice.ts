import { createSlice } from "@reduxjs/toolkit";

interface initialState {
    darkMode: boolean,
    modeName: "light" | "dark"
}
// Define the initial data for the state
const initialState = {
    darkMode: false,
    modeName: "light"
}

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        activateDarkMode: (state) => {
            state.darkMode = true;
            state.modeName = "dark";
        },
        
        deactivateDarkMode: (state) => {
            state.darkMode = false;
            state.modeName = "light";
        },

        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            state.modeName = state.modeName === "dark" ? "light" : "dark";
        }
    },
    extraReducers: {}
})

export default darkModeSlice.reducer;

export const { activateDarkMode, deactivateDarkMode, toggleDarkMode } = darkModeSlice.actions;
